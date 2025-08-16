import { NextRequest, NextResponse } from 'next/server'
import { desc, eq } from 'drizzle-orm'
import { client, db } from '@/lib/db'
import { prayers } from '@/lib/schema'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

type Prayer = {
  id: string
  name?: string
  email?: string
  text: string
  isPublic: boolean
  donationAmount?: number
  createdAt: string
}

const MAX_TEXT_LENGTH = 2000
const MAX_NAME_LENGTH = 100
const MAX_EMAIL_LENGTH = 200

async function ensurePrayersTable ()
{
  await client.execute(`
    CREATE TABLE IF NOT EXISTS prayers (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT,
      text TEXT NOT NULL,
      is_public INTEGER NOT NULL DEFAULT 1,
      donation_amount INTEGER,
      created_at TEXT NOT NULL
    );
  `)
}

export async function GET ()
{
  try {
    await ensurePrayersTable()
    const rows = await db
      .select()
      .from(prayers)
      .where(eq(prayers.isPublic, true))
      .orderBy(desc(prayers.donationAmount), desc(prayers.createdAt))
      .limit(200)

    const publicPrayers: Prayer[] = rows.map((r) => ({
      id: r.id,
      name: r.name || undefined,
      email: r.email || undefined,
      text: r.text,
      isPublic: Boolean(r.isPublic),
      donationAmount: r.donationAmount ?? undefined,
      createdAt: r.createdAt,
    }))

    return NextResponse.json({ prayers: publicPrayers })
  } catch (err) {
    return NextResponse.json({ prayers: [] })
  }
}

export async function POST (req: NextRequest)
{
  try {
    await ensurePrayersTable()
    const body = await req.json()
    let name = typeof body?.name === 'string' ? body.name.trim() : ''
    let email = typeof body?.email === 'string' ? body.email.trim() : ''
    let text = typeof body?.text === 'string' ? body.text.trim() : ''
    const isPublic = body?.isPublic !== false
    const donationAmount = Number.isFinite(body?.donationAmount) ? Number(body.donationAmount) : undefined

    if (!text) {
      return NextResponse.json({ error: 'Prayer text is required' }, { status: 400 })
    }

    if (text.length > MAX_TEXT_LENGTH) text = text.slice(0, MAX_TEXT_LENGTH)
    if (name.length > MAX_NAME_LENGTH) name = name.slice(0, MAX_NAME_LENGTH)
    if (email.length > MAX_EMAIL_LENGTH) email = email.slice(0, MAX_EMAIL_LENGTH)

    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const createdAt = new Date().toISOString()

    await db.insert(prayers).values({
      id,
      name: name || null,
      email: email || null,
      text,
      isPublic: Boolean(isPublic),
      donationAmount: donationAmount ?? null,
      createdAt,
    })

    const prayer: Prayer = {
      id,
      name: name || undefined,
      email: email || undefined,
      text,
      isPublic: Boolean(isPublic),
      donationAmount,
      createdAt,
    }

    return NextResponse.json({ ok: true, prayer }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

