// Apply SQL file(s) to Turso using @libsql/client
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createClient } from '@libsql/client'

const url = process.env.TURSO_DATABASE_URL || ""
const authToken = process.env.TURSO_AUTH_TOKEN || ""

if (!url) {
  console.error('TURSO_DATABASE_URL is not set')
  process.exit(1)
}

const client = createClient({ url, authToken })

async function applySql(filePath) {
  const full = resolve(process.cwd(), filePath)
  const raw = readFileSync(full, 'utf8')
  // naive split on semicolons not inside strings (OK for our simple DDL)
  const statements = raw
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)

  for (const stmt of statements) {
    // ignore SQL comments
    const cleaned = stmt.replace(/^--.*$/gm, '').trim()
    if (!cleaned) continue
    // Turso/libsql requires single statements per execute
    await client.execute(cleaned)
    console.log('Applied:', cleaned.split('\n')[0].slice(0, 120))
  }
}

;(async () => {
  try {
    await applySql('drizzle/0001_create_orders.sql')
    console.log('All done.')
    process.exit(0)
  } catch (err) {
    console.error('Failed applying SQL:', err)
    process.exit(1)
  }
})()




























