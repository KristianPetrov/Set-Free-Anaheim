import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest)
{
  try {
    // Placeholder endpoint: echo request for now. Stripe integration will be added later.
    const body = await req.json()
    return NextResponse.json({ ok: true, received: body })
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 })
  }
}


