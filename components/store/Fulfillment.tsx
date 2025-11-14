"use client"

import { useCallback, useMemo, useState, useEffect,  } from "react"
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api"
import { useCart } from "./cart-context"
import { Button } from "@/components/ui/button"

const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format((cents || 0) / 100)
}

type AddressComponent = {
  long_name: string
  short_name: string
  types: string[]
}

const GOOGLE_MAPS_LIBRARIES: ("places")[] = ["places"]

function parseAddressComponents(components: AddressComponent[] = []) {
  const find = (type: string) => components.find((component) => component.types.includes(type))

  const streetNumber = find("street_number")?.long_name ?? ""
  const route = find("route")?.long_name ?? ""
  const city =
    find("locality")?.long_name ??
    find("sublocality")?.long_name ??
    find("administrative_area_level_2")?.long_name ??
    ""
  const state = find("administrative_area_level_1")?.short_name ?? ""
  const postalCode = find("postal_code")?.long_name ?? ""

  return {
    streetAddress: [streetNumber, route].filter(Boolean).join(" ").trim(),
    city,
    state,
    postalCode,
  }
}

export default function Fulfillment({ onContinueToCheckout }: { onContinueToCheckout: () => void }) {
  const {
    items,
    subtotalCents,
    shippingCents,
    setShippingCents,
    fulfillmentMethod,
    setFulfillmentMethod,
    shippingAddress,
    setShippingAddress,
    shippingLabel,
    setShippingLabel,
    customerDetails,
    setCustomerDetails,
    updateCustomerEmail,
    updateCustomerPhone,
    updateCustomerName,
    taxCents,
    paymentAmountCents,
  } = useCart()

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  })

  const [uspsRates, setUspsRates] = useState<Array<{ serviceName: string; amountCents: number }>>([])
  const [selectedRateIndex, setSelectedRateIndex] = useState<number | null>(null)
  const [isFetchingRates, setIsFetchingRates] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState(customerDetails?.email || "")
  const [phone, setPhone] = useState(customerDetails?.phone || "")
  const [firstName, setFirstName] = useState(customerDetails?.name?.first || "")
  const [lastName, setLastName] = useState(customerDetails?.name?.last || "")
  const [autocomplete, setAutocomplete] = useState<any>(null)
  const isEmpty = items.length === 0
  const isDelivery = fulfillmentMethod === "delivery"
  const requiredAddressFilled = Boolean(
    shippingAddress.streetAddress && shippingAddress.city && shippingAddress.state && shippingAddress.postalCode
  )
  const contactInfoComplete = Boolean(firstName.trim()) && Boolean(lastName.trim()) && Boolean(email.trim()) && Boolean(phone.trim())
  useEffect(() => {
    setEmail(customerDetails?.email || "")
    setPhone(customerDetails?.phone || "")
    setFirstName(customerDetails?.name?.first || "")
    setLastName(customerDetails?.name?.last || "")
  }, [customerDetails])
  const updateAddress = useCallback(
    (updates: Partial<typeof shippingAddress>) => {
      const nextAddress = { ...shippingAddress, ...updates }
      setShippingAddress(nextAddress)
      setSelectedRateIndex(null)
      setUspsRates([])
      setShippingLabel(undefined)
      setCustomerDetails({
        name: {
          first: firstName.trim(),
          last: lastName.trim(),
        },
        email,
        phone,
        address: nextAddress,
      })
    },
    [email, phone, firstName, lastName, setCustomerDetails, setShippingAddress, setShippingLabel, setUspsRates, shippingAddress, setSelectedRateIndex]
  )

  const handlePlaceChanged = useCallback(() => {
    if (!autocomplete) return

    const place = typeof autocomplete.getPlace === "function" ? autocomplete.getPlace() : null
    if (!place || !place.address_components) return

    const parsed = parseAddressComponents(place.address_components as AddressComponent[])
    updateAddress({
      streetAddress: parsed.streetAddress || place.formatted_address || shippingAddress.streetAddress,
      city: parsed.city || shippingAddress.city,
      state: parsed.state || shippingAddress.state,
      postalCode: parsed.postalCode || shippingAddress.postalCode,
    })
  }, [autocomplete, shippingAddress.streetAddress, shippingAddress.city, shippingAddress.state, shippingAddress.postalCode, updateAddress])
  const shippingDisplayCents = isDelivery ? (shippingCents || 0) : 0
  const taxDisplayCents = taxCents || 0
  const totalCents = useMemo(
    () => paymentAmountCents ?? (subtotalCents + shippingDisplayCents + taxDisplayCents),
    [paymentAmountCents, subtotalCents, shippingDisplayCents, taxDisplayCents]
  )

  const canContinue = !isEmpty && contactInfoComplete && (!isDelivery || selectedRateIndex != null || shippingLabel)

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Contact Information</h3>
        <div className="grid sm:grid-cols-2 gap-3">
        <input
          type="text"
          required
          className="w-full rounded border border-red-900/40 bg-black/40 px-2 py-1 text-gray-100"
          placeholder="First name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value)
            updateCustomerName({ first: e.target.value })
          }}
        />
        <input
          type="text"
          required
          className="w-full rounded border border-red-900/40 bg-black/40 px-2 py-1 text-gray-100"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value)
            updateCustomerName({ last: e.target.value })
          }}
        />
        <input
          type="email"
          required
          className="w-full rounded border border-red-900/40 bg-black/40 px-2 py-1 text-gray-100"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            updateCustomerEmail(e.target.value)
          }}
        />
        <input
          type="tel"
          required
          className="w-full rounded border border-red-900/40 bg-black/40 px-2 py-1 text-gray-100"
          placeholder="Phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value)
            updateCustomerPhone(e.target.value)
          }}
        />
      </div>
      {!contactInfoComplete && (<p className="text-xs text-red-400">Please fill out all contact information to continue</p>)}
      </div>
      <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white">Delivery or Pickup</h3>
<fieldset className={`${contactInfoComplete ? "" : "opacity-50"}`}
disabled={!contactInfoComplete}>
  <label className="flex items-center gap-2 text-gray-200">
    <input
      type="radio"
      name="fulfillment"
      checked={!isDelivery}
      onChange={() => {
        setFulfillmentMethod("pickup")
        setShippingCents(0)
        setShippingLabel(undefined)
        setSelectedRateIndex(null)
        setUspsRates([])
      }}
    />
    <span>Pickup at 1171 N West St, Anaheim, CA 92801 (free)</span>
  </label>
  <label className="flex items-center gap-2 text-gray-200">
    <input
      type="radio"
      name="fulfillment"
      checked={isDelivery}
      onChange={() => {
        setFulfillmentMethod("delivery")
      }}
    />
    <span>Delivery (enter address to calculate shipping)</span>
  </label>
</fieldset>


      {contactInfoComplete &&isDelivery && (
        <div className="space-y-3">


          {isLoaded ? (
            <Autocomplete onLoad={setAutocomplete} onPlaceChanged={handlePlaceChanged}>
              <input
                className="w-full rounded border border-red-900/40 bg-black/40 px-2 py-1 text-gray-100"
                placeholder="Street address"
                value={shippingAddress.streetAddress}
                onChange={(e) => updateAddress({ streetAddress: e.target.value })}
              />
            </Autocomplete>
          ) : (
            <input
              className="w-full rounded border border-red-900/40 bg-black/40 px-2 py-1 text-gray-100"
              placeholder="Street address"
              value={shippingAddress.streetAddress}
              onChange={(e) => updateAddress({ streetAddress: e.target.value })}
            />
          )}

          <div className="grid grid-cols-2 gap-2">
            <input
              className="rounded border border-red-900/40 bg-black/40 px-2 py-1 text-gray-100"
              placeholder="Apt/Suite (optional)"
              value={shippingAddress.addressLine2 ?? ""}
              onChange={(e) => updateAddress({ addressLine2: e.target.value })}
            />
            <input
              className="rounded border border-red-900/40 bg-black/40 px-2 py-1 text-gray-100"
              placeholder="City"
              value={shippingAddress.city}
              onChange={(e) => updateAddress({ city: e.target.value })}
            />
            <input
              className="rounded border border-red-900/40 bg-black/40 px-2 py-1 text-gray-100"
              placeholder="State"
              value={shippingAddress.state}
              onChange={(e) => updateAddress({ state: e.target.value })}
            />
            <input
              className="rounded border border-red-900/40 bg-black/40 px-2 py-1 text-gray-100"
              placeholder="ZIP"
              value={shippingAddress.postalCode}
              onChange={(e) => updateAddress({ postalCode: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              className="bg-red-600 text-white"
              disabled={isEmpty || !requiredAddressFilled || isFetchingRates}
              onClick={async () => {
                setError(null)
                setIsFetchingRates(true)
                try {
                  const res = await fetch('/api/shipping/usps', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      destination: { postalCode: shippingAddress.postalCode.trim() },
                      items: items.map(i => ({ productId: i.productId, quantity: i.quantity }))
                    })
                  })
                  const data = await res.json()
                  if (res.ok && Array.isArray(data?.rates)) {
                    setUspsRates(data.rates)
                    setSelectedRateIndex(null)
                    setShippingCents(0)
                    setShippingLabel(undefined)
                  } else {
                    setError(data?.error || 'Unable to fetch USPS rates')
                  }
                } catch (e) {
                  setError('Error fetching USPS rates')
                } finally {
                  setIsFetchingRates(false)
                }
              }}
            >
              {isFetchingRates ? 'Loading rates…' : 'Get Shipping Rates'}
            </Button>
            {error ? <span className="text-xs text-red-400">{error}</span> : null}
          </div>

          <div className="space-y-2">
            {uspsRates.length === 0 ? (
              <div className="text-xs text-gray-400">No USPS options yet. Enter full address and click Get Shipping Rates.</div>
            ) : (
              <div className="space-y-2">
                {uspsRates.map((r, idx) => {
                  const selected = selectedRateIndex === idx
                  return (
                    <button
                      key={`${r.serviceName}-${idx}`}
                      type="button"
                      onClick={() => {
                        setSelectedRateIndex(idx)
                        setShippingCents(r.amountCents)
                        setShippingLabel(r.serviceName)
                      }}
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
              </div>
            )}
          </div>
        </div>
      )}

      <div className="pt-2 border-t border-red-900/30 space-y-1">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Subtotal</span>
          <span className="text-white font-semibold">{formatPrice(subtotalCents)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Shipping</span>
          <span className="text-gray-200 font-medium">{formatPrice(shippingDisplayCents)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Tax</span>
          <span className="text-gray-200 font-medium">{formatPrice(taxDisplayCents)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Total</span>
          <span className="text-white font-semibold">{formatPrice(totalCents)}</span>
        </div>
      </div>

      <div className="pt-2">
        <Button
          className="bg-red-600 text-white"
          disabled={!canContinue}
          onClick={() => {
            onContinueToCheckout()
          }}
        >
          Continue to Checkout
        </Button>
      </div>
    </div>
    </div>
  )
}










