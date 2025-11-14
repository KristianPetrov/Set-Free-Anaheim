"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"
// removed dialog imports; checkout is inline now
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Elements, PaymentElement, useStripe, useElements, PaymentElementProps } from "@stripe/react-stripe-js"
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import { useRouter } from "next/navigation"

// Stripe promise hoisted at module scope to keep identity stable
const STRIPE_PROMISE = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")
//

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100)
}

export default function CartSummary({ forceCheckout = false, onCheckoutNavigate, hideCheckoutButton = false }: { forceCheckout?: boolean; onCheckoutNavigate?: () => void; hideCheckoutButton?: boolean }) {
  const {
    items,
    subtotalCents,
    removeItem,
    setQuantity,
    clear,
    appliedPromo,
    applyPromo,
    removePromo,
    shippingCents,
    setShippingCents,
    customerDetails,
    taxCents,
    paymentAmountCents,
    setTaxAndTotal,
  } = useCart()
  const [promoInput, setPromoInput] = useState("")
  const [uspsRates, setUspsRates] = useState<Array<{ serviceName: string; amountCents: number }>>([])
  const [selectedRateIndex, setSelectedRateIndex] = useState<number | null>(null)
  const [checkoutOpen, setCheckoutOpen] = useState<boolean>(forceCheckout)
  const [address, setAddress] = useState({
    streetAddress: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
  })
  const [usePickup, setUsePickup] = useState(false);
  // address verification removed
  //const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 33.84657, lng: -117.92773 })
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentSubmitting, setPaymentSubmitting] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [isFetchingRates, setIsFetchingRates] = useState(false)
  useEffect(() => {
    setCheckoutOpen(forceCheckout)
  }, [forceCheckout])

  const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const GOOGLE_MAPS_MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID
  // Stripe Elements is mounted locally (not in root) to keep most UI server-side

  // Update center when pickup toggles
  // useEffect(() => {
  //   if (usePickup) setMapCenter({ lat: 33.84657, lng: -117.92773 })
  // }, [usePickup])

//

  const isEmpty = items.length === 0

  const shippingLabel = useMemo(() => formatPrice(shippingCents || 0), [shippingCents])
  const taxLabel = useMemo(() => formatPrice(taxCents || 0), [taxCents])
  const totalCents = useMemo(() => paymentAmountCents ?? (subtotalCents + (shippingCents || 0) + (taxCents || 0)), [paymentAmountCents, subtotalCents, shippingCents, taxCents])
  const totalLabel = useMemo(() => formatPrice(totalCents), [totalCents])
  const subtotalLabel = useMemo(() => formatPrice(subtotalCents), [subtotalCents])

  const onCheckout = async () => {
    if (isEmpty) return
    if (onCheckoutNavigate) {
      onCheckoutNavigate()
    } else {
      setCheckoutOpen(true)
    }
  }

  const readyForPayment = usePickup || selectedRateIndex != null

  const paymentElementsOptions = useMemo<StripeElementsOptions>(() => ({
          clientSecret,
          appearance: { theme: 'night' },
          // Use nullableSessionSelector to avoid session selection errors during transient states
          nullableSessionSelector: (() => null) } as StripeElementsOptions), [clientSecret])

  const createPaymentIntent = async () => {
    if (!readyForPayment) return
    setPaymentError(null)
    const emailValue = typeof customerDetails?.email === "string" ? customerDetails.email.trim() : ""
    const phoneValue = typeof customerDetails?.phone === "string" ? customerDetails.phone.trim() : ""
    const nameParts = [
      typeof customerDetails?.name?.first === "string" ? customerDetails.name.first.trim() : "",
      typeof customerDetails?.name?.last === "string" ? customerDetails.name.last.trim() : "",
    ].filter(Boolean) as string[]
    const normalizedEmail = emailValue.length ? emailValue : undefined
    const normalizedPhone = phoneValue.length ? phoneValue : undefined
    const normalizedName = nameParts.length ? nameParts.join(" ") : undefined
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({ productId: i.productId, size: i.size, quantity: i.quantity })),
        promoCode: appliedPromo ?? undefined,
        shippingCents: usePickup ? 0 : (shippingCents || undefined),
        shippingLabel: usePickup ? 'Pickup at church' : (selectedRateIndex != null ? uspsRates[selectedRateIndex].serviceName : undefined),
        shippingAddress: usePickup ? undefined : address,
        customerEmail: normalizedEmail,
        customerPhone: normalizedPhone,
        customerName: normalizedName,
      }),
    })
    const data = await res.json()
    if (res.ok && data?.clientSecret) {
      const taxAmountFromApi = typeof data.taxAmount === "number" ? data.taxAmount : 0
      const paymentAmountFromApi = typeof data.amount === "number" ? data.amount : null
      setTaxAndTotal(taxAmountFromApi, paymentAmountFromApi)
      setClientSecret(data.clientSecret as string)
    } else {
      setTaxAndTotal(0, null)
      setPaymentError(data?.error || "Unable to initialize payment")
    }
  }

  // address entry only; rates are fetched via button below

  function PaymentActions() {
    const stripe = useStripe()
    const elements = useElements()
    //const router = useRouter()
    const [paymentReady, setPaymentReady] = useState(false)
    const { subtotalCents, shippingCents, taxCents, paymentAmountCents } = useCart()
    const shippingAmount = usePickup ? 0 : (shippingCents || 0)
    const taxAmount = taxCents || 0
    const totalCents = paymentAmountCents ?? (subtotalCents + shippingAmount + taxAmount)
    const onPay = async () => {
      if (!stripe || !elements || (!usePickup && selectedRateIndex == null)) return
      const paymentEl = elements.getElement(PaymentElement)
      if (!paymentEl) {
        setPaymentError("Payment not ready. Please wait a moment and try again.")
        return
      }
      setPaymentSubmitting(true)
      setPaymentError(null)
      try {
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/store?success=true`,
          }
        })
        if (error) setPaymentError(error.message || "Payment failed")
      //  else router.push("/store?success=true")
      } finally {
        setPaymentSubmitting(false)
      }
    }
    return (
      <div className="space-y-2">
        <PaymentElement options={{ layout: {type:"auto"}}} onReady={() => setPaymentReady(true)} />
        {paymentError ? <div className="text-xs text-red-400">{paymentError}</div> : null}
        <Button className="bg-red-600 text-white w-full" disabled={!stripe || !paymentReady || paymentSubmitting || (!usePickup && selectedRateIndex == null)} onClick={onPay}>
          {paymentSubmitting ? "Processing..." : `Pay ${formatPrice(totalCents)}`}
        </Button>
      </div>
    )
  }

  return (
    <Card className="bg-gray-900 border-red-900/30 sticky top-24">
      <CardContent className="p-4 space-y-4">
        <h2 className="font-bold text-lg text-white">Your Cart</h2>
        {isEmpty ? (
          <p className="text-sm text-gray-400">Your cart is empty.</p>
        ) : (
          <div className="space-y-3">
            {items.map((i) => (
              <div key={`${i.productId}-${i.size}`} className="flex items-center justify-between gap-3 overflow-hidden">
                <div className="text-sm min-w-0">
                  <div className="text-gray-200 font-medium leading-tight truncate">{i.name}</div>
                  <div className="text-gray-400 text-xs">Size {i.size} • {formatPrice(i.priceCents)}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      variant="secondary"
                      className="h-7 px-2 text-xs bg-black/40 border border-red-900/40 text-gray-200"
                      onClick={() => setQuantity(i.productId, i.size, Math.max(1, i.quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="text-gray-200 text-xs w-6 text-center">{i.quantity}</span>
                    <Button
                      variant="secondary"
                      className="h-7 px-2 text-xs bg-black/40 border border-red-900/40 text-gray-200"
                      onClick={() => setQuantity(i.productId, i.size, i.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-7 px-2 text-xs text-red-400"
                      onClick={() => removeItem(i.productId, i.size)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-gray-300 shrink-0 whitespace-nowrap">{formatPrice(i.priceCents * i.quantity)}</div>
              </div>
            ))}
          </div>
        )}

        {/* Promo code */}
        <div className="pt-2">
          {appliedPromo ? (
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-400">Promo applied: {appliedPromo} (10% off)</span>
              <button className="text-red-400 text-xs underline" onClick={removePromo}>Remove</button>
            </div>
          ) : (
            <div className="grid grid-cols-[1fr_auto] gap-2 w-full">
              <input
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Promo code"
                className="min-w-0 w-full px-2 py-1 text-sm bg-black/40 border border-red-900/40 text-gray-100 rounded"
              />
              <button
                className="px-3 py-1 text-sm bg-red-600 text-white rounded disabled:opacity-50 whitespace-nowrap"
                disabled={!promoInput.trim() || isEmpty}
                onClick={() => { applyPromo(promoInput); setPromoInput("") }}
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Shipping selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between pt-2 border-t border-red-900/30">
            <span className="text-gray-400 text-sm">Subtotal</span>
          <span className="text-white font-semibold">{subtotalLabel}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Shipping</span>
          <span className="text-gray-200 font-medium">{shippingLabel}</span>
          </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Tax</span>
          <span className="text-gray-200 font-medium">{taxLabel}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Total</span>
          <span className="text-white font-semibold">{totalLabel}</span>
        </div>
          {/* Moved shipping calculation into checkout modal */}
        </div>
        <div className="flex gap-2">
          {!hideCheckoutButton && (
            <Button
              className="flex-1 bg-gradient-to-r from-red-600 via-red-500 to-yellow-400 text-black font-bold"
              disabled={isEmpty}
              onClick={onCheckout}
            >
              Checkout
            </Button>
          )}
          {!isEmpty && (
            <Button
              variant="secondary"
              className="bg-black/40 border border-red-900/40 text-gray-200"
              onClick={clear}
            >
              Clear
            </Button>
          )}
        </div>
        <p className="text-[11px] text-gray-500">Totals update after shipping and tax are calculated.</p>

        {/* Checkout (inline) */}
        {checkoutOpen && (
          <div className="mt-4 rounded border border-red-900/40 bg-gray-900 p-3">
            <h3 className="text-base text-gray-100 font-semibold mb-2">Delivery or Pickup</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={usePickup}
                    onChange={(e) => {
                      const next = e.target.checked
                      setUsePickup(next)
                      if (next) {
                        setShippingCents(0)
                      }
                      setTaxAndTotal(0, null)
                      setClientSecret(null)
                    }}
                  />
                  <span className="text-gray-200">Pick up at 1171 N West St, Anaheim, CA 92801 (no shipping)</span>
                </label>
                <div className="space-y-2">
                  {!usePickup && (
                    <div className="grid grid-cols-2 gap-2">
                      <input className="px-2 py-1 bg-black/40 border border-red-900/40 rounded text-gray-100" placeholder="Street address" value={address.streetAddress} onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })} />
                      <input className="px-2 py-1 bg-black/40 border border-red-900/40 rounded text-gray-100" placeholder="Apt/Suite (optional)" value={address.addressLine2} onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })} />
                      <input className="px-2 py-1 bg-black/40 border border-red-900/40 rounded text-gray-100" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                      <input className="px-2 py-1 bg-black/40 border border-red-900/40 rounded text-gray-100" placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                      <input className="px-2 py-1 bg-black/40 border border-red-900/40 rounded text-gray-100" placeholder="ZIP" value={address.postalCode} onChange={(e) => setAddress({ ...address, postalCode: e.target.value })} />
                    </div>
                  )}

                {!usePickup && (
                    <Accordion type="single" collapsible defaultValue="rates">
                      <AccordionItem value="rates">
                        <AccordionTrigger className="text-sm">Shipping options</AccordionTrigger>
                        <AccordionContent>
                        <div className="max-h-48 overflow-auto space-y-2">
                          {isFetchingRates && (
                            <div className="flex items-center gap-2 text-gray-300 text-sm">
                              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                              </svg>
                              <span>Loading USPS options…</span>
                            </div>
                          )}
                          {uspsRates.map((r, idx) => {
                            const selected = selectedRateIndex === idx
                            return (
                              <button
                                key={`${r.serviceName}-${idx}`}
                                type="button"
                                onClick={() => { setSelectedRateIndex(idx); setShippingCents(r.amountCents) }}
                                className={[
                                  'w-full text-left rounded-md border px-3 py-3 transition',
                                  selected ? 'bg-red-600/20 border-red-500 text-gray-100' : 'bg-black/40 border-red-900/40 text-gray-200 hover:bg-black/60',
                                ].join(' ')}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <span className="text-sm font-medium">{r.serviceName}</span>
                                  <span className="text-sm font-semibold">{formatPrice(r.amountCents)}</span>
                                </div>
                              </button>
                            )
                          })}
                          {!uspsRates.length && (
                            <div className="text-xs text-gray-400">No USPS options available yet. Enter a full address to fetch rates.</div>
                          )}
                        </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}

                {clientSecret ? (
                  <div className="mt-3 rounded border border-red-900/30 bg-black/30 p-3">
                    {!usePickup && selectedRateIndex == null && (
                      <div className="mb-2 text-xs text-gray-400">Select a shipping option to enable payment.</div>
                    )}
                    {paymentElementsOptions ? (
                      <Elements stripe={STRIPE_PROMISE} options={paymentElementsOptions} key={clientSecret || 'no-client-secret'}>
                        <PaymentActions />
                      </Elements>
                    ) : null}
                  </div>
                ) : null}
                </div>

                <div className="pt-2 flex items-center justify-between gap-2">
                {!usePickup && (selectedRateIndex == null) ? (
                    <Button
                      className="bg-red-600 text-white"
                    disabled={isEmpty || !address.streetAddress || !address.city || !address.state || !address.postalCode || isFetchingRates}
                      onClick={async () => {
                        const res = await fetch('/api/shipping/usps', {
                          method: 'POST', headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ destination: { postalCode: address.postalCode.trim() }, items: items.map(i => ({ productId: i.productId, quantity: i.quantity })) })
                        })
                        const data = await res.json()
                        if (data?.rates?.length) {
                          const rates = Array.isArray(data.rates) ? data.rates : []
                          setUspsRates(rates)
                          setSelectedRateIndex(null)
                          setShippingCents(0)
                        }
                      }}
                    >
                      Get Shipping Rates
                    </Button>
                  ) : (
                    clientSecret ? (
                      <div className="w-full text-right text-xs text-gray-400">Secured by Stripe</div>
                    ) : (
                      <Button className="bg-red-600 text-white" disabled={!readyForPayment || !!paymentSubmitting} onClick={async () => {
                        await createPaymentIntent()
                        setTimeout(() => {}, 50)
                      }}>
                        Continue to Payment
                      </Button>
                    )
                  )}
                </div>
              </div>
          </div>
        )}

        {/* Ensure Places autocomplete dropdown is clickable above modal */}

      </CardContent>
    </Card>
  )
}


