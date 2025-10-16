import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { products } from "@/lib/store/products"

export async function POST (req: NextRequest)
{
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })
    }

    const stripe = new Stripe(secretKey)

    const body = await req.json()
    const items = Array.isArray(body?.items) ? body.items : []
    const promoCode: string | undefined = typeof body?.promoCode === 'string' ? body.promoCode : undefined
    if (items.length === 0) {
      return NextResponse.json({ error: "No items to checkout" }, { status: 400 })
    }

    const origin = req.headers.get("origin") ?? req.nextUrl.origin

    const line_items = items.map((i: any) =>
    {
      const product = products.find((p) => p.id === i.productId)
      if (!product) throw new Error(`Unknown product: ${i.productId}`)
      const quantity = Math.max(1, Number(i.quantity) || 1)
      const size = i.size ? String(i.size) : undefined
      const name = size ? `${product.name} (Size ${size})` : product.name
      const imageUrl = new URL(product.image, origin).toString()
      const salePercent = typeof product.salePercent === 'number' ? product.salePercent : 0
      const baseUnit = product.priceCents
      const afterSale = salePercent > 0 ? Math.round(baseUnit * (1 - salePercent / 100)) : baseUnit
      const afterPromo = promoCode ? Math.round(afterSale * 0.9) : afterSale
      return {
        price_data: {
          currency: "usd",
          unit_amount: afterPromo,
          product_data: {
            name,
            images: [imageUrl],
          },
        },
        quantity,
      } as Stripe.Checkout.SessionCreateParams.LineItem
    })

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/store?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/store?canceled=true`,
      shipping_address_collection: { allowed_countries: ["US"] },
      shipping_options: [
        // Flat-rate shipping options; replace with real amounts or live rates as needed
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 899, currency: "usd" },
            display_name: "USPS Ground Advantage (3-5 biz days)",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 1599, currency: "usd" },
            display_name: "UPS Ground (1-3 biz days)",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 1 },
              maximum: { unit: "business_day", value: 3 },
            },
          },
        },
      ],
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },
      automatic_tax: { enabled: false },
    })

    return NextResponse.json({ url: session.url })
  } catch (e) {
    return NextResponse.json({ error: "Checkout error" }, { status: 500 })
  }
}


