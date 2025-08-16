import { createClient } from '@libsql/client/web'
import { drizzle } from 'drizzle-orm/libsql'

const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN

if (!TURSO_DATABASE_URL) {
    throw new Error('Missing TURSO_DATABASE_URL env var')
}

export const client = createClient({
    url: TURSO_DATABASE_URL,
    authToken: TURSO_AUTH_TOKEN,
})

export const db = drizzle(client)


