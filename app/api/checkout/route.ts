import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { products } from "@/lib/store/products"
import { CartItem } from "@/components/store/cart-context"

const STORE_FULFILLMENT_ADDRESS = {
  line1: "1171 N West St",
  city: "Anaheim",
  state: "CA",
  postal_code: "92801",
  country: "US",
} as const

export async function POST (req: NextRequest)
{
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })
    }

    const stripe = new Stripe(secretKey)

    const body = await req.json()
    const items = (Array.isArray(body?.items) ? body.items : []) as CartItem[]
    const promoCode: string | undefined = typeof body?.promoCode === 'string' ? body.promoCode : undefined
    const shippingCentsBody: number | undefined = typeof body?.shippingCents === 'number' ? body.shippingCents : undefined
    const shippingLabel: string | undefined = typeof body?.shippingLabel === 'string' ? body.shippingLabel : undefined
    const shippingAddress = body?.shippingAddress && typeof body.shippingAddress === 'object' ? body.shippingAddress : undefined

    const coerceString = (value: unknown): string | undefined =>
    {
      if (typeof value !== 'string') return undefined
      const trimmed = value.trim()
      return trimmed.length ? trimmed : undefined
    }

    const coerceName = (value: unknown): string | undefined =>
    {
      if (typeof value === 'string') return coerceString(value)
      if (value && typeof value === 'object') {
        const first = coerceString((value as Record<string, unknown>).first)
        const last = coerceString((value as Record<string, unknown>).last)
        const combined = [first, last].filter(Boolean).join(' ')
        return combined.trim().length ? combined.trim() : undefined
      }
      return undefined
    }

    const customerCandidate = body?.customer && typeof body.customer === 'object' ? body.customer : undefined
    const customerDetailsCandidate = body?.customerDetails && typeof body.customerDetails === 'object' ? body.customerDetails : undefined

    const customerEmail = coerceString(body?.customerEmail)
      || coerceString(customerCandidate?.email)
      || coerceString(customerDetailsCandidate?.email)

    const customerPhone = coerceString(body?.customerPhone)
      || coerceString(customerCandidate?.phone)
      || coerceString(customerDetailsCandidate?.phone)

    const customerName = coerceName(body?.customerName)
      || coerceName(customerCandidate?.name)
      || coerceName(customerDetailsCandidate?.name)
    if (items.length === 0) {
      return NextResponse.json({ error: "No items to checkout" }, { status: 400 })
    }

    // Compute total

    const itemTotal = items.reduce((sum, i) =>
    {
      const product = products.find((p) => p.id === i.productId)
      if (!product) throw new Error(`Unknown product: ${i.productId}`)
      const quantity = Math.max(1, Number(i.quantity) || 1)
      const salePercent = typeof product.salePercent === 'number' ? product.salePercent : 0
      const baseUnit = product.priceCents
      const afterSale = salePercent > 0 ? Math.round(baseUnit * (1 - salePercent / 100)) : baseUnit
      const unit = promoCode ? Math.round(afterSale * 0.9) : afterSale
      return sum + unit * quantity
    }, 0)
    const shippingTotal = typeof shippingCentsBody === 'number' ? Math.max(0, Math.floor(shippingCentsBody)) : 0

    const shippingAddressRecord = shippingAddress && typeof shippingAddress === 'object' ? shippingAddress as Record<string, unknown> : undefined
    const normalizedShippingAddress = shippingAddressRecord ? {
      line1: coerceString(shippingAddressRecord.streetAddress),
      line2: coerceString(shippingAddressRecord.addressLine2),
      city: coerceString(shippingAddressRecord.city),
      state: coerceString(shippingAddressRecord.state),
      postal_code: coerceString(shippingAddressRecord.postalCode),
    } : undefined

    const taxAddress: Stripe.Tax.CalculationCreateParams.CustomerDetails.Address = {
      country: STORE_FULFILLMENT_ADDRESS.country,
      line1: normalizedShippingAddress?.line1 ?? STORE_FULFILLMENT_ADDRESS.line1,
      city: normalizedShippingAddress?.city ?? STORE_FULFILLMENT_ADDRESS.city,
      state: normalizedShippingAddress?.state ?? STORE_FULFILLMENT_ADDRESS.state,
      postal_code: normalizedShippingAddress?.postal_code ?? STORE_FULFILLMENT_ADDRESS.postal_code,
    }
    if (normalizedShippingAddress?.line2) {
      taxAddress.line2 = normalizedShippingAddress.line2
    }

    const taxLineItems: Stripe.Tax.CalculationCreateParams.LineItem[] = items.map((i) =>
    {
      const product = products.find((p) => p.id === i.productId)
      if (!product) throw new Error(`Unknown product: ${i.productId}`)
      const quantity = Math.max(1, Number(i.quantity) || 1)
      const salePercent = typeof product.salePercent === 'number' ? product.salePercent : 0
      const baseUnit = product.priceCents
      const afterSale = salePercent > 0 ? Math.round(baseUnit * (1 - salePercent / 100)) : baseUnit
      const unit = promoCode ? Math.round(afterSale * 0.9) : afterSale
      return {
        amount: unit,
        quantity,
        reference: product.id,
      }
    })

    const fallbackAmount = Math.max(50, itemTotal + shippingTotal)

    let taxCalculation: Stripe.Tax.Calculation | undefined
    let taxAmount = 0
    let amount = fallbackAmount

    if (taxLineItems.length > 0) {
      try {
        const taxCustomerDetails: Stripe.Tax.CalculationCreateParams.CustomerDetails = {
          address: taxAddress,
          address_source: 'shipping',
        }

        taxCalculation = await stripe.tax.calculations.create({
          currency: 'usd',
          line_items: taxLineItems,
          ...(shippingTotal > 0 ? { shipping_cost: { amount: shippingTotal } } : {}),
          customer_details: taxCustomerDetails,
          // ship_from_details:{
          //   address:{
          //     country: STORE_FULFILLMENT_ADDRESS.country,
          //     line1: STORE_FULFILLMENT_ADDRESS.line1,
          //     city: STORE_FULFILLMENT_ADDRESS.city,
          //     state: STORE_FULFILLMENT_ADDRESS.state,
          //     postal_code: STORE_FULFILLMENT_ADDRESS.postal_code,
          //   }
          // }
        })
        console.log(JSON.stringify(taxCalculation))
        const calculationTotal = taxCalculation.amount_total
        amount = Math.max(50, calculationTotal)
        taxAmount = taxCalculation.tax_amount_exclusive
      } catch (err) {
        console.error('Stripe tax calculation failed', err)
        taxCalculation = undefined
        taxAmount = 0
        amount = fallbackAmount
      }
    }

    const metadata: Stripe.MetadataParam = {
      shippingLabel: shippingLabel || (shippingTotal ? 'USPS (calculated)' : ''),
      items: JSON.stringify(items),
      promoCode: promoCode || '',
      preTaxAmount: String(itemTotal + shippingTotal),
      taxAmount: String(taxAmount),
    }
    if (customerEmail) metadata.customerEmail = customerEmail
    if (customerPhone) metadata.customerPhone = customerPhone
    if (customerName) metadata.customerName = customerName
    if (taxCalculation) metadata.taxCalculationId = taxCalculation.id



    const paymentIntent = await stripe.paymentIntents.create({

      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true, allow_redirects: "always" },
      receipt_email: customerEmail,
      metadata,
      ...(shippingAddress ? {
        shipping: {
          name: customerName || 'Customer',
          ...(customerPhone ? { phone: customerPhone } : {}),
          address: {
            line1: String(shippingAddress.streetAddress || ''),
            line2: String(shippingAddress.addressLine2 || ''),
            city: String(shippingAddress.city || ''),
            state: String(shippingAddress.state || ''),
            postal_code: String(shippingAddress.postalCode || ''),
            country: 'US',
          },
        }
      } : {}),
    })
    console.log(JSON.stringify(paymentIntent))
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount,
      taxAmount,
      taxCalculationId: taxCalculation?.id ?? null,
    })
  } catch (e) {
    console.log(e)
    return NextResponse.json({ error: "Checkout error" }, { status: 500 })
  }
}


