"use client"

import Navbar from "@/components/navbar"
import FooterSection from "@/components/sections/FooterSection"
import { products } from "@/lib/store/products"
import ProductCard from "@/components/store/ProductCard"
import { CartProvider } from "@/components/store/cart-context"

export default function ThriftStorePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold neon-text">Set Free Online Store</h1>
          <p className="text-gray-300 mt-2">Shirts, hoodies, and sweaters with custom Set Free designs</p>
        </div>
        <CartProvider>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </CartProvider>
      </main>
      <FooterSection />
    </div>
  )
}


