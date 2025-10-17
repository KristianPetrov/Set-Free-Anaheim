import { NextRequest, NextResponse } from "next/server"

// Minimal USPS RateV4 API integration (DOMESTIC). Requires USPS_USERID env var.
// This uses a simplified single-package request suitable for t-shirts in a poly mailer.

function xmlEscape(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function POST(req: NextRequest) {
  try {
    const USPS_USERID = process.env.USPS_USERID
    if (!USPS_USERID) {
      return NextResponse.json({ error: "USPS_USERID not configured" }, { status: 500 })
    }

    const body = await req.json()
    const destPostal: string = String(body?.destination?.postalCode || "").trim()
    const originPostal: string = String(process.env.UPS_ORIGIN_POSTAL || "92801")
    if (!destPostal) {
      return NextResponse.json({ error: "Destination postalCode is required" }, { status: 400 })
    }

    // Estimate weight: 0.7 lb per item, minimum 1 lb
    const totalQty = Array.isArray(body?.items) ? body.items.reduce((s: number, i: any) => s + Math.max(1, Number(i?.quantity) || 1), 0) : 1
    const pounds = Math.max(1, Math.floor(totalQty * 0.7))
    const ounces = Math.round(((totalQty * 0.7) - pounds) * 16)

    const container = "VARIABLE"
    const size = "REGULAR"
    const machinable = "true"

    // Build RateV4Request XML (domestic)
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<RateV4Request USERID="${xmlEscape(USPS_USERID)}">
  <Revision>2</Revision>
  <Package ID="1ST">
    <Service>ALL</Service>
    <ZipOrigination>${xmlEscape(originPostal)}</ZipOrigination>
    <ZipDestination>${xmlEscape(destPostal)}</ZipDestination>
    <Pounds>${pounds}</Pounds>
    <Ounces>${ounces}</Ounces>
    <Container>${container}</Container>
    <Size>${size}</Size>
    <Machinable>${machinable}</Machinable>
  </Package>
</RateV4Request>`

    const url = `https://secure.shippingapis.com/ShippingAPI.dll?API=RateV4&XML=${encodeURIComponent(xml)}`
    const res = await fetch(url, { method: "GET" })
    const text = await res.text()

    if (!res.ok) {
      return NextResponse.json({ error: "USPS rate error", details: text }, { status: 500 })
    }

    // Very light XML parse via regex (good enough for few fields)
    const extractAll = (pattern: RegExp) => {
      const results: string[] = []
      let m: RegExpExecArray | null
      while ((m = pattern.exec(text)) !== null) results.push(m[1])
      return results
    }

    const services = extractAll(/<MailService>([\s\S]*?)<\/MailService>/g)
    const rates = extractAll(/<Rate>([\d.]+)<\/Rate>/g).map((v) => Number(v))

    const mapped = services.map((s, idx) => ({
      carrier: "USPS",
      serviceName: s.replace(/<sup>.*?<\/sup>/g, "").replace(/\s+/g, " ").trim(),
      amountCents: Math.round((rates[idx] || 0) * 100),
      currency: "USD",
    })).filter((r) => r.amountCents > 0)
      .sort((a, b) => a.amountCents - b.amountCents)

    return NextResponse.json({ success: true, rates: mapped })
  } catch (e) {
    return NextResponse.json({ error: "Error fetching USPS rates" }, { status: 500 })
  }
}
