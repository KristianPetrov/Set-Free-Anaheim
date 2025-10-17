import { NextRequest, NextResponse } from "next/server"

async function getUspsAccessToken (clientId: string, clientSecret: string): Promise<string>
{
    const tokenUrl = process.env.USPS_OAUTH_TOKEN_URL || "https://api.usps.com/oauth2/v1/token"
    const res = await fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: clientId,
            client_secret: clientSecret,
            scope: "prices.read",
        }),
    })
    const data = await res.json()
    if (!res.ok || !data?.access_token) throw new Error("USPS OAuth failed")
    return String(data.access_token)
}

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

        // Estimate weight: 0.7 lb per item, minimum 1 lb
        const totalQty = Array.isArray(body?.items) ? body.items.reduce((s: number, i: any) => s + Math.max(1, Number(i?.quantity) || 1), 0) : 1
        const pounds = Math.max(1, Math.floor(totalQty * 0.7))
        const ounces = Math.round(((totalQty * 0.7) - pounds) * 16)

        const token = await getUspsAccessToken(clientId, clientSecret)

        const pricesEndpoint = process.env.USPS_PRICES_URL || "https://api.usps.com/prices/v1/domestic"
        const payload = {
            mailClass: "ALL",
            originZIPCode: originPostal,
            destinationZIPCode: destPostal,
            weight: { unitOfMeasurement: "OZ", value: Math.max(1, pounds * 16 + ounces) },
            dimensions: { length: 12, width: 9, height: 2, unitOfMeasurement: "IN" },
            machinable: true,
            shape: "PARCEL",
        }

        const resPrices = await fetch(pricesEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(payload),
        })
        const data = await resPrices.json()
        if (!resPrices.ok) {
            return NextResponse.json({ error: "USPS prices error", details: data }, { status: 500 })
        }

        const options = Array.isArray(data?.prices) ? data.prices : []
        const rates = options.map((o: any) => ({
            carrier: "USPS",
            serviceName: String(o?.serviceName || "USPS Service"),
            amountCents: Math.round(Number(o?.price || 0) * 100),
            currency: String(o?.currency || "USD"),
        })).filter((r: any) => r.amountCents > 0)
            .sort((a: any, b: any) => a.amountCents - b.amountCents)

        return NextResponse.json({ success: true, rates })
    } catch (e) {
        return NextResponse.json({ error: "Error fetching USPS rates" }, { status: 500 })
    }
}
