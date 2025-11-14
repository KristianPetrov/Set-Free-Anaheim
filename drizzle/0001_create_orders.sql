-- drizzle-kit SQL migration for orders and order_items
CREATE TABLE IF NOT EXISTS `orders` (
  `id` text PRIMARY KEY NOT NULL,
  `created_at` text NOT NULL,
  `stripe_session_id` text,
  `amount_paid_cents` integer NOT NULL,
  `currency` text NOT NULL DEFAULT 'USD',
  `customer_name` text,
  `customer_email` text,
  `is_pickup` integer NOT NULL DEFAULT 0,
  `shipping_label` text,
  `shipping_cost_cents` integer NOT NULL DEFAULT 0,
  `ship_street` text,
  `ship_street2` text,
  `ship_city` text,
  `ship_state` text,
  `ship_postal` text,
  `ship_country` text DEFAULT 'US'
);

CREATE TABLE IF NOT EXISTS `order_items` (
  `id` text PRIMARY KEY NOT NULL,
  `order_id` text NOT NULL,
  `product_id` text NOT NULL,
  `product_name` text NOT NULL,
  `size` text,
  `unit_price_cents` integer NOT NULL,
  `quantity` integer NOT NULL
);



