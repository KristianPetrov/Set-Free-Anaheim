import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const prayers = sqliteTable('prayers', {
    id: text('id').primaryKey(),
    name: text('name'),
    email: text('email'),
    text: text('text').notNull(),
    isPublic: integer('is_public', { mode: 'boolean' }).notNull().default(true),
    donationAmount: integer('donation_amount'),
    createdAt: text('created_at').notNull(),
})

export type InsertPrayer = typeof prayers.$inferInsert
export type SelectPrayer = typeof prayers.$inferSelect


