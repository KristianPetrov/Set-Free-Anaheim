/** @type {import('drizzle-kit').Config} */
export default {
  schema: './lib/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'libsql',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
}


