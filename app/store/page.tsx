"use client"

import Image from "next/image"
import Navbar from "@/components/navbar"
import FooterSection from "@/components/sections/FooterSection"
import { CartProvider } from "@/components/store/cart-context"
import { products } from "@/lib/store/products"
import ProductCard from "@/components/store/ProductCard"
import CartSummary from "@/components/store/CartSummary"

export default function StorePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {/* Store Logo above content, no frame */}
      <div className="container mx-auto px-4 pt-28 md:pt-32">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 mx-auto mb-4 animate-slow-glow">
          <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-red-600/25 blur-3xl opacity-70 animate-candle" />
          <Image
            src="/logos/set-free-shop-logo.png"
            alt="Set Free Store Logo"
            fill
            className="object-contain drop-shadow-[0_0_20px_rgba(239,68,68,0.55)]"
            priority={false}
          />
        </div>
      </div>
      <section className="container mx-auto px-4 pt-6 pb-12 md:pt-8 md:pb-16">
        <div className="relative max-w-5xl mx-auto rounded-2xl border border-red-900/40 ring-1 ring-red-500/30 bg-black/60 overflow-hidden">
          <div className="pointer-events-none absolute -inset-8 -z-10 rounded-3xl bg-red-600/25 blur-3xl opacity-70 animate-candle" />
          <div className="p-6 md:p-10">


            <CartProvider>
              <div className="grid gap-6 lg:grid-cols-4">
                <div className="lg:col-span-3">
                  <div className="relative">
                    {/* 25% OFF Badge inside product grid */}
                    <div className="pointer-events-none absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rotate-12 drop-shadow-[0_0_16px_rgba(239,68,68,0.5)]">
                      <Image
                        src="/store/25-off-sitewide.png"
                        alt="25% OFF Storewide"
                        fill
                        className="object-contain"
                        priority={false}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <CartSummary />
                </div>
              </div>
            </CartProvider>
          </div>
        </div>
      </section>
      <FooterSection />
    </div>
  )
}


