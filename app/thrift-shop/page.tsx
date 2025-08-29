"use client"

import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import FooterSection from "@/components/sections/FooterSection"

export default function ThriftShopPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {/* Hero */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/thirft-shop-come-in.jpg"
          alt="Set Free Thrift Shop storefront"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-6">
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-6">
              <Image
                src="/thrift-shop-logo.png"
                alt="Set Free Thrift Shop Logo"
                fill
                className="object-contain drop-shadow-[0_0_24px_rgba(239,68,68,0.5)]"
              />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight neon-text">Set Free Thrift Shop</h1>
            <p className="mt-2 text-gray-300">Open to the public — all proceeds fuel the mission</p>
          </div>
        </div>
      </section>

      {/* About / Description */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed text-gray-200">
          <p>
            The Set Free Thrift Shop ain’t just about clothes and furniture—it’s a kingdom outpost in the heart of the streets. Every rack, every shelf, every deal we give carries the same message: God takes what the world throws away and makes it brand new.
          </p>
          <p>
            It’s holy but hood—where faith meets hustle. You’ll find vintage treasures, street-style threads, church-ready fits, and home goods that’ll bless your crib without breaking your pockets. Every dollar goes back into the mission—feeding the hungry, clothing the broken, lifting up the lost, and building a community that refuses to let go of anybody.
          </p>
          <p>
            We’re not your average thrift store—we’re a living testimony that what’s rejected can be redeemed, what’s worn out can be restored, and what’s forgotten can be set free.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="relative w-full h-64 rounded-lg overflow-hidden border border-red-900/40">
            <Image src="/thirft-shop-come-in.jpg" alt="Thrift shop storefront" fill className="object-cover" />
          </div>
          <div className="relative w-full h-64 rounded-lg overflow-hidden border border-red-900/40">
            <Image src="/thrift-shop-inside.jpg" alt="Clothes rack inside thrift shop" fill className="object-cover" />
          </div>
          <div className="relative w-full h-64 rounded-lg overflow-hidden border border-red-900/40">
            <Image src="/thrift-shop-front-desk.jpg" alt="Front desk inside thrift shop" fill className="object-cover" />
          </div>
        </div>
        <div className="text-center mt-8">
          <Link href="/" className="text-gray-400 hover:text-red-400 underline underline-offset-4">Back to Home</Link>
        </div>
      </section>
      <FooterSection />
    </div>
  )
}


