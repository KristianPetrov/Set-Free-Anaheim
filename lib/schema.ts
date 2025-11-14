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


// Store orders
export const orders = sqliteTable('orders', {
    id: text('id').primaryKey(),
    createdAt: text('created_at').notNull(),
    // Payment/checkout
    stripeSessionId: text('stripe_session_id'),
    amountPaidCents: integer('amount_paid_cents').notNull(),
    currency: text('currency').notNull().default('USD'),
    // Customer info
    customerName: text('customer_name'),
    customerEmail: text('customer_email'),
    // Shipping
    isPickup: integer('is_pickup', { mode: 'boolean' }).notNull().default(false),
    shippingLabel: text('shipping_label'),
    shippingCostCents: integer('shipping_cost_cents').notNull().default(0),
    shipStreet: text('ship_street'),
    shipStreet2: text('ship_street2'),
    shipCity: text('ship_city'),
    shipState: text('ship_state'),
    shipPostal: text('ship_postal'),
    shipCountry: text('ship_country').default('US'),
})

export const orderItems = sqliteTable('order_items', {
    id: text('id').primaryKey(),
    orderId: text('order_id').notNull(),
    productId: text('product_id').notNull(),
    productName: text('product_name').notNull(),
    size: text('size'),
    unitPriceCents: integer('unit_price_cents').notNull(),
    quantity: integer('quantity').notNull(),
})

export type InsertOrder = typeof orders.$inferInsert
export type SelectOrder = typeof orders.$inferSelect
export type InsertOrderItem = typeof orderItems.$inferInsert
export type SelectOrderItem = typeof orderItems.$inferSelect


