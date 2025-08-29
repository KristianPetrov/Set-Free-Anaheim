"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import FooterSection from "@/components/sections/FooterSection"
import ThriftGallery from "@/components/thrift-gallery"
import { UnifrakturCook } from "next/font/google"
import { Button } from "@/components/ui/button"
import DonationModal from "@/components/donation-modal"

const oldEnglish = UnifrakturCook({ subsets: ["latin"], weight: "700" })

export default function ThriftShopPage() {
  const [donateOpen, setDonateOpen] = useState(false)
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {/* Hero */}
      <section className="relative w-full min-h-[72vh] md:min-h-[75vh] pt-24 md:pt-28 lg:pt-32 pb-[calc(env(safe-area-inset-bottom)+24px)] sm:pb-8">
        <Image
          src="/thirft-shop-come-in.jpg"
          alt="Set Free Thrift Shop storefront"
          fill
          priority
          className="object-cover object-top opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-6">
            <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto mb-6 animate-slow-glow">
              <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-red-600/25 blur-3xl opacity-70 animate-candle" />
              <Image
                src="/thrift-shop-logo.png"
                alt="Set Free Thrift Shop Logo"
                fill
                className="object-contain drop-shadow-[0_0_24px_rgba(239,68,68,0.5)]"
              />
            </div>
            <h1 className={`${oldEnglish.className} text-4xl md:text-6xl tracking-tight neon-text`}></h1>
            <div className="relative inline-block">
              <div className="pointer-events-none absolute -inset-3 -z-10 rounded-lg bg-red-600/25 blur-2xl opacity-80 animate-candle" />
              <p className={`${oldEnglish.className} text-2xl md:text-3xl tracking-tight text-white px-4 py-2`}>Open to the public — all proceeds fuel the mission</p>
            </div>
            <div className="mt-4 md:mt-6 flex flex-row flex-wrap items-center justify-center gap-2">
              <Button
                onClick={() => setDonateOpen(true)}
                className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-400 text-black font-extrabold uppercase tracking-wide px-4 py-2 text-sm md:px-8 md:py-4 md:text-lg rounded-lg md:rounded-xl shadow-lg shadow-red-500/30 ring-1 ring-red-500/40 transition-transform hover:scale-105"
              >
                Donate Now
              </Button>
              <Link
                href="#about-thrift"
                className="inline-flex items-center justify-center px-4 py-2 text-sm md:px-6 md:py-3 md:text-base rounded-lg md:rounded-xl border border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
              >
                About the Shop
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About / Description */}
      <section id="about-thrift" className="container mx-auto px-4 py-12 md:py-16">
        <div className="relative max-w-5xl mx-auto rounded-2xl border border-red-900/40 ring-1 ring-red-500/30 bg-black/60 overflow-hidden">
          <div className="pointer-events-none absolute -inset-8 -z-10 rounded-3xl bg-red-600/25 blur-3xl opacity-70 animate-candle" />
          <div className="p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div>
                <div className="relative mb-4 pl-2">
                  <div className="pointer-events-none absolute -inset-8 z-0 rounded-2xl bg-red-600/35 blur-3xl opacity-95 animate-candle" />
                  <Image
                    src="/holy-hood.png"
                    alt="Holy But Hood"
                    width={360}
                    height={100}
                    className="mb-4 relative z-10"
                  />
                </div>
                <h2 className={`${oldEnglish.className} text-2xl font-bold text-red-500 mb-4`}>About the Thrift Shop</h2>
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-500 mb-3">Hours</h3>
                <div className="grid grid-cols-2 gap-y-2 text-gray-300">
                  <span>Monday</span><span className="text-right">10:00 AM – 8:00 PM</span>
                  <span>Tuesday</span><span className="text-right">10:00 AM – 8:00 PM</span>
                  <span>Wednesday</span><span className="text-right">10:00 AM – 8:00 PM</span>
                  <span>Thursday</span><span className="text-right">10:00 AM – 8:00 PM</span>
                  <span>Friday</span><span className="text-right">10:00 AM – 8:00 PM</span>
                  <span>Saturday</span><span className="text-right">10:00 AM – 8:00 PM</span>
                  <span>Sunday</span><span className="text-right">10:00 AM – 8:00 PM</span>
                </div>
                <p className="text-xs text-gray-500 mt-3">All times in PST</p>
              </div>
            </div>
            <div className="relative mt-6">
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-xl bg-red-500/35 blur-[48px] opacity-90 animate-candle" />
              <div className={`space-y-6 text-lg leading-relaxed text-gray-200 text-neon-strong`}>
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
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="container mx-auto px-4 py-10">
        <div className="relative max-w-5xl mx-auto rounded-2xl border border-red-900/40 ring-1 ring-red-500/30 bg-black/60 overflow-hidden">
          <div className="pointer-events-none absolute -inset-8 -z-10 rounded-3xl bg-red-600/25 blur-3xl opacity-70 animate-candle" />
          <div className="p-6 md:p-10">
            <div>
              <h3 className="text-xl font-bold text-red-500 mb-3">Location</h3>
              <p className="text-gray-300 mb-3">1171 N West St, Anaheim, CA 92801</p>
              <Link
                href={`https://maps.google.com/?q=${encodeURIComponent('1171 N West St, Anaheim, CA 92801')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 underline underline-offset-4 hover:text-red-400"
              >
                Open in Google Maps
              </Link>
              <div className="relative w-full h-64 mt-4 rounded-lg overflow-hidden border border-red-900/40">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent('1171 N West St, Anaheim, CA 92801')}&output=embed`}
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0"
                  allowFullScreen
                  title="Map of Set Free Thrift Shop, 1171 N West St, Anaheim, CA 92801"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container mx-auto px-4 pb-16">
        <ThriftGallery />
        <div className="text-center mt-8">
          <Link href="/" className="text-gray-400 hover:text-red-400 underline underline-offset-4">Back to Home</Link>
        </div>
      </section>
      <FooterSection />
      <DonationModal
        open={donateOpen}
        onClose={() => setDonateOpen(false)}
        title="Support the Thrift Shop"
        subtitle="Every dollar fuels the mission — thanks for standing with us"
        logoSrc="/thrift-shop-logo.png"
        venmoNote="Donation to Set Free Thrift Shop"
      />
    </div>
  )
}


