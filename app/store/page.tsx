"use client"

import Image from "next/image"
import { Suspense, useCallback, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import FooterSection from "@/components/sections/FooterSection"
import { CartProvider, useCart } from "@/components/store/cart-context"
import { products } from "@/lib/store/products"
import ProductCard from "@/components/store/ProductCard"
import CheckoutForm from "@/components/store/Cart"
import Fulfillment from "@/components/store/Fulfillment"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const currencyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

function formatPrice(cents: number | null | undefined) {
  return currencyFormatter.format((cents ?? 0) / 100)
}

function CheckoutTabContent({ onBackToFulfillment }: { onBackToFulfillment: () => void }) {
  const {
    items,
    appliedPromo,
    shippingCents,
    fulfillmentMethod,
    shippingAddress,
    shippingLabel,
    customerDetails,
    subtotalCents,
    taxCents,
    paymentAmountCents,
    setTaxAndTotal,
  } = useCart()
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const isDelivery = fulfillmentMethod === 'delivery'
  const addressComplete = !!(shippingAddress?.streetAddress && shippingAddress?.city && shippingAddress?.state && shippingAddress?.postalCode)
  const fulfillmentReady = !isDelivery || (Boolean(shippingLabel) && addressComplete)

  useEffect(() => {
    const createIntent = async () => {
      if (!items.length || !fulfillmentReady) {
        if (taxCents !== 0 || paymentAmountCents !== null) {
          setTaxAndTotal(0, null)
        }
        setClientSecret(null)
        return
      }
      try {
        const emailValue = typeof customerDetails?.email === 'string' ? customerDetails.email.trim() : ''
        const phoneValue = typeof customerDetails?.phone === 'string' ? customerDetails.phone.trim() : ''
        const nameParts = [
          typeof customerDetails?.name?.first === 'string' ? customerDetails.name.first.trim() : '',
          typeof customerDetails?.name?.last === 'string' ? customerDetails.name.last.trim() : '',
        ].filter(Boolean) as string[]
        const normalizedEmail = emailValue.length ? emailValue : undefined
        const normalizedPhone = phoneValue.length ? phoneValue : undefined
        const normalizedName = nameParts.length ? nameParts.join(' ') : undefined
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items,
            promoCode: appliedPromo ?? undefined,
            shippingCents: isDelivery ? shippingCents : 0,
            shippingLabel: isDelivery ? (shippingLabel || 'USPS (calculated)') : 'Pickup at church',
            shippingAddress: isDelivery ? shippingAddress : undefined,
            customerEmail: normalizedEmail,
            customerPhone: normalizedPhone,
            customerName: normalizedName,
          })
        })
        const data = await res.json()
        if (res.ok && data?.clientSecret) {
          const taxAmountFromApi = typeof data.taxAmount === 'number' ? data.taxAmount : 0
          const paymentAmountFromApi = typeof data.amount === 'number' ? data.amount : null
          setTaxAndTotal(taxAmountFromApi, paymentAmountFromApi)
          setClientSecret(data.clientSecret)
        } else {
          setTaxAndTotal(0, null)
          setClientSecret(null)
        }
      } catch {
        setTaxAndTotal(0, null)
        setClientSecret(null)
      }
    }
    createIntent()
  }, [items, appliedPromo, shippingCents, fulfillmentReady, customerDetails, setTaxAndTotal])

  if (items.length === 0) return <div className="text-sm text-gray-400">Your cart is empty.</div>
  if (!fulfillmentReady) {
    return (
      <div className="space-y-3">
        <div className="text-sm text-gray-400">Please select delivery or pickup and, if delivering, choose a shipping option in the Fulfillment tab first.</div>
        <Button className="bg-red-600 text-white" onClick={onBackToFulfillment}>Go to Fulfillment</Button>
      </div>
    )
  }
  if (!clientSecret) return <div className="text-sm text-gray-400">Preparing checkout…</div>

  const shippingDisplayCents = isDelivery ? (shippingCents || 0) : 0
  const taxDisplayCents = taxCents || 0
  const totalCents = paymentAmountCents ?? (subtotalCents + shippingDisplayCents + taxDisplayCents)

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="rounded-xl border border-red-900/40 bg-black/40 p-4 md:p-6">
        <CheckoutForm clientSecret={clientSecret} />
      </div>
      <aside className="space-y-4">
        <div className="rounded-xl border border-red-900/40 bg-black/40 p-4 md:p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Order Summary</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm text-gray-100 font-medium truncate">{item.name}</div>
                  <div className="text-xs text-gray-400">Size {item.size} × {item.quantity}</div>
                </div>
                <div className="text-sm text-gray-200 font-semibold whitespace-nowrap">
                  {formatPrice(item.priceCents * item.quantity)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between text-gray-300">
              <span>Subtotal</span>
              <span className="font-medium text-white">{formatPrice(subtotalCents)}</span>
            </div>
            <div className="flex items-center justify-between text-gray-300">
              <span>Shipping</span>
              <span className="font-medium text-white">{formatPrice(shippingDisplayCents)}</span>
            </div>
            <div className="flex items-center justify-between text-gray-300">
              <span>Tax</span>
              <span className="font-medium text-white">{formatPrice(taxDisplayCents)}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-red-900/40 text-gray-100">
              <span className="font-semibold">Total</span>
              <span className="font-semibold text-white">{formatPrice(totalCents)}</span>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-red-900/40 bg-black/30 p-4 text-xs text-gray-400 space-y-2">
          <p>
            Review your items and payment details before confirming. Totals update automatically after shipping and tax are calculated.
          </p>
          <button className="text-red-400 underline" onClick={onBackToFulfillment}>
            Adjust shipping or pickup details
          </button>
        </div>
      </aside>
    </div>
  )
}

function OrderSuccessDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { clear } = useCart()
  const router = useRouter()

  const closeAndReset = useCallback(() => {
    clear()
    onOpenChange(false)
    router.replace('/store')
  }, [clear, onOpenChange, router])

  const handleClose = useCallback(() => {
    closeAndReset()
  }, [closeAndReset])

  const handleOpenChange = useCallback((value: boolean) => {
    if (value) {
      onOpenChange(value)
      return
    }
    closeAndReset()
  }, [closeAndReset, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-gray-900 text-gray-100 border border-red-900/40" aria-describedby="order-confirmed-desc">
        <DialogHeader>
          <DialogTitle>Order confirmed</DialogTitle>
        </DialogHeader>
        <p id="order-confirmed-desc" className="text-sm">Thank you! Your order was successfully placed and will ship within 24–72 hours.</p>
        <DialogFooter>
          <Button className="bg-red-600 text-white" onClick={handleClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function StoreCartSummaryBar({ onCheckout }: { onCheckout: () => void }) {
  const { items, subtotalCents } = useCart()
  if (!items.length) return null
  const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
  const total = fmt.format(subtotalCents / 100)
  return (
    <div className="mt-6 rounded-md border border-red-900/40 bg-black/40 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-200">
          <span className="font-semibold">{items.length}</span> {items.length === 1 ? 'item' : 'items'}
          <span className="mx-2 text-gray-500">•</span>
          <span className="font-bold text-white">{total}</span>
        </div>
        <Button className="bg-red-600 text-white" onClick={onCheckout}>Go to Checkout</Button>
      </div>

      <ul className="divide-y divide-red-900/30 rounded-md border border-red-900/30">
        {items.map((i) => (
          <li key={`${i.productId}-${i.size}`} className="flex items-center justify-between gap-3 p-3">
            <div className="min-w-0">
              <div className="text-sm text-gray-100 font-medium truncate">{i.name}</div>
              <div className="text-xs text-gray-400">Size {i.size} × {i.quantity}</div>
            </div>
            <div className="text-sm text-gray-100 font-semibold shrink-0 whitespace-nowrap">{fmt.format((i.priceCents * i.quantity) / 100)}</div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">Subtotal</span>
        <span className="text-white font-semibold">{total}</span>
      </div>
      <div className="text-[11px] text-gray-500">Shipping calculated at checkout (or free pickup).</div>
    </div>
  )
}

function StorePageFallback() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 md:pt-32 pb-12">
        <div className="max-w-2xl mx-auto text-center text-sm text-gray-400">
          Loading store experience…
        </div>
      </div>
      <FooterSection />
    </div>
  )
}

function StorePageContent() {
  const params = useSearchParams()
  const [successOpen, setSuccessOpen] = useState(false)
  const [tab, setTab] = useState<"store" | "fulfillment" | "checkout">("store")
  useEffect(() => {
    if (params?.get("success") === "true") {
      setSuccessOpen(true)
    }
  }, [params])

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {/* Store Logo above content, no frame */}
      <div className="container mx-auto px-4 pt-28 md:pt-32">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 mx-auto mb-4 animate-slow-glow">
          <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-red-600/25 blur-3xl opacity-70 animate-candle" />
          <Image
            src="/store/set-free-apparel-bloody-drip.png"
            alt="Set Free Store Logo"
            fill
            sizes="(min-width: 768px) 384px, (min-width: 640px) 288px, 256px"
            className="object-contain drop-shadow-[0_0_20px_rgba(239,68,68,0.55)]"
            priority={false}
          />
          {/* 25% OFF Badge over logo */}
          <div className="pointer-events-none absolute -top-10 -right-8 sm:-top-12 sm:-right-12 md:-top-16 md:-right-16 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rotate-12 z-10">
            <Image
              src="/store/25-off-sitewide.png"
              alt="25% OFF Storewide"
              fill
              sizes="(min-width: 768px) 128px, (min-width: 640px) 96px, 80px"
              className="object-contain"
              priority={false}
            />
          </div>
        </div>
      </div>
      <CartProvider>
        <section className="container mx-auto px-4 pt-6 pb-12 md:pt-8 md:pb-16">
          <div className="relative max-w-5xl mx-auto rounded-2xl border border-red-900/40 ring-1 ring-red-500/30 bg-black/60 overflow-hidden">
            <div className="pointer-events-none absolute -inset-8 -z-10 rounded-3xl bg-red-600/25 blur-3xl opacity-70 animate-candle" />
            <div className="p-6 md:p-10">
              <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <TabsList className="bg-black/40 border border-red-900/40">
                    <TabsTrigger value="store">Store</TabsTrigger>
                    <TabsTrigger value="fulfillment">Fulfillment</TabsTrigger>
                    <TabsTrigger value="checkout">Checkout</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="store">
                  <div className="grid gap-6 lg:grid-cols-4">
                    <div className="lg:col-span-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products.map((p) => (
                          <ProductCard key={p.id} product={p} />
                        ))}
                      </div>
                    </div>
                    <div className="lg:col-span-1" />
                  </div>
                  <StoreCartSummaryBar onCheckout={() => setTab('fulfillment')} />
                </TabsContent>
                <TabsContent value="fulfillment">
                  <div className="relative max-w-4xl mx-auto">
                    {tab === 'fulfillment' && (
                      <Fulfillment onContinueToCheckout={() => setTab('checkout')} />
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="checkout">
                  <div className="relative max-w-4xl mx-auto">
                    {tab === 'checkout' && <CheckoutTabContent onBackToFulfillment={() => setTab('fulfillment')} />}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        <OrderSuccessDialog open={successOpen} onOpenChange={setSuccessOpen} />
      </CartProvider>
      <FooterSection />
    </div>
  )
}

export default function StorePage() {
  return (
    <Suspense fallback={<StorePageFallback />}>
      <StorePageContent />
    </Suspense>
  )
}


