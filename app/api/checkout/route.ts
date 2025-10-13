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
      return {
        price_data: {
          currency: "usd",
          unit_amount: product.priceCents,
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
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },
      automatic_tax: { enabled: false },
    })

    return NextResponse.json({ url: session.url })
  } catch (e) {
    return NextResponse.json({ error: "Checkout error" }, { status: 500 })
  }
}


