import { NextRequest, NextResponse } from "next/server"
import { UspsClient } from "@/lib/shipping/usps"

export async function POST (req: NextRequest)
{
    try {
        const clientId = process.env.USPS_CLIENT_ID
        const clientSecret = process.env.USPS_CLIENT_SECRET
        if (!clientId || !clientSecret) {
            return NextResponse.json({ error: "USPS OAuth credentials not configured" }, { status: 500 })
        }

        const body = await req.json()
        const destPostal: string = String(body?.destination?.postalCode || "").trim()
        const originPostal: string = String(process.env.USPS_ORIGIN_POSTAL || "92801")
        if (!destPostal) {
            return NextResponse.json({ error: "Destination postalCode is required" }, { status: 400 })
        }

        // Simple weight heuristic (t‑shirts): 0.7 lb per item
        const totalQty = Array.isArray(body?.items) ? body.items.reduce((s: number, i: any) => s + Math.max(1, Number(i?.quantity) || 1), 0) : 1
        const estWeightOz = Math.max(1, Math.round(totalQty * 0.7 * 16))

        const client = new UspsClient({
            uspsLabelsUrl: process.env.USPS_LABELS_URL || "https://api.usps.com",
            oauthTokenUrl: process.env.USPS_OAUTH_TOKEN_URL || "https://api.usps.com/oauth2/v1/token",
            domesticPricesUrl: process.env.USPS_PRICES_URL || "https://api.usps.com",
            clientId,
            clientSecret,
        })

        const prices = await client.getRates({
            fromZip: originPostal,
            toZip: destPostal,
            weightOz: estWeightOz,
            lengthIn: 12,
            widthIn: 9,
            heightIn: 2,
            processingCategory: "Parcel",
            priceType: "Retail",
        })
        console.log(["USPS raw prices:", JSON.stringify(prices)])
        const rates = prices.map((p) => ({
            carrier: "USPS",
            serviceName: p.productName,
            amountCents: Math.round(p.rate * 100),
            currency: p.currency || "USD",
        }))
        // Server-side filter: prefer common services, then take top 3 by existing order
        const WANT_ORDER = [
            'GROUND ADVANTAGE',
            'PRIORITY MAIL EXPRESS',
            'PRIORITY MAIL',
        ]
        const normalized = rates.map((r) => ({ ...r, _name: String(r.serviceName || '').toUpperCase() }))
        const picked: typeof normalized = []
        for (const key of WANT_ORDER) {
            const found = normalized.find((r) => r._name.includes(key))
            if (found && !picked.includes(found)) picked.push(found)
        }
        const top3src = (picked.length ? picked : normalized)
        const top3 = top3src.slice(0, 3).map(({ _name, ...rest }) => rest)
        console.log(["USPS filtered top3:", JSON.stringify(top3)])

        return NextResponse.json({ success: true, rates: top3 })
    } catch (e) {
        return NextResponse.json({ error: "Error fetching USPS rates" }, { status: 500 })
    }
}
