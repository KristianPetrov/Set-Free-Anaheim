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
        const { streetAddress, addressLine2, city, state, postalCode } = body || {}
        if (!streetAddress || !postalCode) {
            return NextResponse.json({ error: "streetAddress and postalCode are required" }, { status: 400 })
        }

        const client = new UspsClient({
            oauthTokenUrl: process.env.USPS_OAUTH_TOKEN_URL || "https://api.usps.com/oauth2/v3/token",
            uspsLabelsUrl: process.env.USPS_LABELS_URL || "https://api.usps.com/labels/v3/domestic",
            domesticPricesUrl: process.env.USPS_PRICES_URL || "https://api.usps.com/prices/v3/total-rates/search",
            clientId,
            clientSecret,
        })

        // For now, echo back entered address as "verified" since USPS address API may differ per tenant.
        // If your USPS account provides an addresses endpoint, wire it here via client.lookupAddress.
        const verified = {
            streetAddress,
            addressLine2: addressLine2 || "",
            city: city || "",
            state: state || "",
            postalCode,
        }

        return NextResponse.json({ success: true, address: verified })
    } catch (_e) {
        return NextResponse.json({ error: "Address verification error" }, { status: 500 })
    }
}























