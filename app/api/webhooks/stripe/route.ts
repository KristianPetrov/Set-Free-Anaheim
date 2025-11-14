//import { NextRequest, NextResponse } from "next/server"
//import Stripe from "stripe"
import { db } from "@/lib/db"
import { orders, orderItems } from "@/lib/schema"
import { NextResponse, NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { products } from "@/lib/store/products"

import { stripe } from '@/lib/stripe/stripe'
import type Stripe from "stripe"
type StripeEventArray = Stripe.Event.Type[]

async function uploadOrderFromPaymentIntent (paymentIntent: Stripe.PaymentIntent)
{
    try {
        const paymentIntentId = paymentIntent.id
        const amountPaidCents = Number(paymentIntent.amount || 0)
        const currency = (paymentIntent.currency || 'usd').toUpperCase()
        const customerEmail = paymentIntent.receipt_email || undefined
        const shipping = paymentIntent.shipping
        const shippingLabel = (paymentIntent.metadata?.shippingLabel as string | undefined) || undefined
        const promoCode = (paymentIntent.metadata?.promoCode as string | undefined) || undefined

        // Parse items from metadata
        type MetaItem = { productId: string; size?: string; quantity?: number }
        let metaItems: MetaItem[] = []
        try {
            const raw = String(paymentIntent.metadata?.items || '[]')
            const parsed = JSON.parse(raw)
            if (Array.isArray(parsed)) metaItems = parsed as MetaItem[]
        } catch { }

        // Recompute item totals consistent with checkout route
        const itemTotal = metaItems.reduce((sum, mi) =>
        {
            const product = products.find((p) => p.id === mi.productId)
            if (!product) return sum
            const quantity = Math.max(1, Number(mi.quantity || 1))
            const salePercent = typeof product.salePercent === 'number' ? product.salePercent : 0
            const baseUnit = product.priceCents
            const afterSale = salePercent > 0 ? Math.round(baseUnit * (1 - salePercent / 100)) : baseUnit
            const unit = promoCode ? Math.round(afterSale * 0.9) : afterSale
            return sum + unit * quantity
        }, 0)

        const shippingCostCents = Math.max(0, amountPaidCents - itemTotal)
        const isPickup = Boolean(shippingLabel && shippingLabel.toLowerCase().includes('pickup'))
        const orderId = paymentIntentId

        await db.insert(orders).values({
            id: orderId,
            createdAt: new Date((paymentIntent.created || 0) * 1000).toISOString(),
            stripeSessionId: paymentIntentId,
            amountPaidCents: amountPaidCents,
            currency,
            customerEmail,
            customerName: paymentIntent.shipping?.name || undefined,
            isPickup,
            shippingLabel: shippingLabel || undefined,
            shippingCostCents,
            shipStreet: shipping?.address?.line1 || undefined,
            shipStreet2: shipping?.address?.line2 || undefined,
            shipCity: shipping?.address?.city || undefined,
            shipState: shipping?.address?.state || undefined,
            shipPostal: shipping?.address?.postal_code || undefined,
            shipCountry: shipping?.address?.country || 'US',
        })

        // Insert order items from metadata
        let idx = 0
        for (const mi of metaItems) {
            const product = products.find((p) => p.id === mi.productId)
            if (!product) continue
            const quantity = Math.max(1, Number(mi.quantity || 1))
            const salePercent = typeof product.salePercent === 'number' ? product.salePercent : 0
            const baseUnit = product.priceCents
            const afterSale = salePercent > 0 ? Math.round(baseUnit * (1 - salePercent / 100)) : baseUnit
            const unitPriceCents = promoCode ? Math.round(afterSale * 0.9) : afterSale

            await db.insert(orderItems).values({
                id: `${orderId}-${++idx}`,
                orderId,
                productId: product.id,
                productName: product.name,
                size: mi.size || undefined,
                unitPriceCents,
                quantity,
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: 'Failed to upload order to database' },
            { status: 500 }
        )
    }
}

export async function POST (req: NextRequest)
{
    let event

    try {
        event = stripe.webhooks.constructEvent(
            await req.text(),
            (await headers()).get('stripe-signature') || '',
            process.env.STRIPE_WEBHOOK_SECRET_LOCAL || process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        // On error, log and return the error message.
        if (err) console.log(err)
        console.log(`Error message: ${errorMessage}`)
        return NextResponse.json(
            { message: `Webhook Error: ${errorMessage}` },
            { status: 400 }
        )
    }

    const permittedEvents: StripeEventArray = ['payment_intent.succeeded', "payment_intent.payment_failed", "payment_intent.canceled"]

    if (permittedEvents.includes(event.type)) {
        let data

        try {
            switch (event.type) {
                case 'payment_intent.succeeded': {
                    const pi = event.data.object as Stripe.PaymentIntent
                    console.log(`PaymentIntent succeeded: ${pi.id}, ${JSON.stringify(pi)}`)
                    await uploadOrderFromPaymentIntent(pi)
                    break
                }
                case 'payment_intent.canceled': {
                    const pi = event.data.object as Stripe.PaymentIntent
                    console.log(`PaymentIntent canceled: ${pi.id}`)
                    break
                }
                case 'payment_intent.payment_failed': {
                    const pi = event.data.object as Stripe.PaymentIntent
                    console.log(`PaymentIntent failed: ${pi.id}`)
                    break
                }
                default:
                    throw new Error(`Unhandled event: ${event.type}`)
            }
        } catch (error) {
            console.log(error)
            return NextResponse.json(
                { message: 'Webhook handler failed' },
                { status: 500 }
            )
        }
    } else {
        console.log(JSON.stringify(event))
        return NextResponse.json({ message: 'Unhandled event' }, { status: 400 })
    }
    // Return a response to acknowledge receipt of the event.
    return NextResponse.json({ message: 'Received' }, { status: 200 })
}
export const runtime = 'nodejs'
/*
export async function POST (req: NextRequest)
{
    const secret = process.env.STRIPE_WEBHOOK_SECRET
    const key = process.env.STRIPE_SECRET_KEY
    if (!secret || !key) return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })

    const stripe = new Stripe(key)
    const sig = req.headers.get('stripe-signature')
    const raw = await req.text()
    let event: Stripe.Event
    try {
        event = stripe.webhooks.constructEvent(raw, sig as string, secret)
    } catch (_e) {
        return new NextResponse('Invalid signature', { status: 400 })
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session
        try {
            const sessionId = session.id
            const amountPaidCents = session.amount_total ?? 0
            const currency = session.currency?.toUpperCase() ?? 'USD'
            const customerEmail = (session.customer_details?.email as string | null) || null
            const shipping = session.collected_information?.shipping_details
            const shippingLabel = (session.metadata?.shippingLabel as string | undefined) || undefined
            const isPickup = shippingLabel?.toLowerCase().includes('pickup') || false

            const orderId = sessionId
            await db.insert(orders).values({
                id: orderId,
                createdAt: new Date().toISOString(),
                stripeSessionId: sessionId,
                amountPaidCents: Number(amountPaidCents),
                currency,
                customerEmail: customerEmail || undefined,
                customerName: session.customer_details?.name || undefined,
                isPickup,
                shippingLabel: shippingLabel || undefined,
                shippingCostCents: Number(session.total_details?.amount_shipping || 0),
                shipStreet: shipping?.address?.line1 || undefined,
                shipStreet2: shipping?.address?.line2 || undefined,
                shipCity: shipping?.address?.city || undefined,
                shipState: shipping?.address?.state || undefined,
                shipPostal: shipping?.address?.postal_code || undefined,
                shipCountry: shipping?.address?.country || 'US',
            })

            if (session.line_items == null) {
                // Expand line_items if not present
                const ses = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['line_items', 'line_items.data.price.product'] })
                // @ts-ignore
                session.line_items = ses.line_items
            }
            // @ts-ignore
            const lines: Stripe.LineItem[] = session.line_items?.data || []
            for (const li of lines) {
                const meta = (li.price?.product as Stripe.Product)?.metadata || {}
                await db.insert(orderItems).values({
                    id: `${orderId}-${li.id}`,
                    orderId,
                    productId: String(meta.productId || ''),
                    productName: String(li.description || (li.price?.product as Stripe.Product)?.name || 'Item'),
                    size: String(meta.size || ''),
                    unitPriceCents: Number(li.amount_subtotal || 0) / Math.max(1, Number(li.quantity || 1)),
                    quantity: Number(li.quantity || 1),
                })
            }
        } catch (_e) {
            // swallow
        }
    }

    return NextResponse.json({ received: true })
}


*/
