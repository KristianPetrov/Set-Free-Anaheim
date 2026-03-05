import { NextRequest, NextResponse } from "next/server"
import { db, client } from "@/lib/db"
import { universitySignups } from "@/lib/schema"

export const runtime = "edge"
export const dynamic = "force-dynamic"

const MAX_NAME_LENGTH = 100
const MAX_PHONE_LENGTH = 25
const MAX_REASON_LENGTH = 1200

async function ensureUniversitySignupsTable() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS university_signups (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      reason TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `)
}

export async function POST(request: NextRequest) {
  try {
    await ensureUniversitySignupsTable()
    const body = await request.json()

    let name = typeof body?.name === "string" ? body.name.trim() : ""
    let phone = typeof body?.phone === "string" ? body.phone.trim() : ""
    let reason = typeof body?.reason === "string" ? body.reason.trim() : ""

    if (!name || !phone || !reason) {
      return NextResponse.json({ error: "Name, phone number, and reason are required." }, { status: 400 })
    }

    if (name.length > MAX_NAME_LENGTH) name = name.slice(0, MAX_NAME_LENGTH)
    if (phone.length > MAX_PHONE_LENGTH) phone = phone.slice(0, MAX_PHONE_LENGTH)
    if (reason.length > MAX_REASON_LENGTH) reason = reason.slice(0, MAX_REASON_LENGTH)

    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const createdAt = new Date().toISOString()

    await db.insert(universitySignups).values({
      id,
      name,
      phone,
      reason,
      createdAt,
    })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (_) {
    return NextResponse.json({ error: "Server error creating sign up." }, { status: 500 })
  }
}
