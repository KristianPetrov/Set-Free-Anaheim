import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Phone, Instagram, Facebook, Youtube, Mail } from "lucide-react"
import Image from "next/image"
import dynamic from 'next/dynamic'
import Navbar from "@/components/navbar"
import HeroCarousel from "@/components/hero-carousel"

import CustomCalendar from "@/components/custom-calendar"
import Link from "next/link"

const VideoCarousel = dynamic(() => import('@/components/video-carousel'), {
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      <span className="ml-2 text-gray-300">Loading videos...</span>
    </div>
  ),
})

export default function SetFreeChurch() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20 overflow-hidden">
        {/* Mobile background */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/godfather.JPG"
            alt="Set Free Anaheim Hero Background"
            fill
            className="object-contain"
            priority
            sizes="100vw"
          />
        </div>

        {/* Desktop background */}
        <div className="absolute inset-0 hidden md:block">
          <Image
            src="/gods-father.png"
            alt="Set Free Anaheim Hero Background"
            fill
            className="object-contain"
            priority
            sizes="100vw"
          />
        </div>

        <div className="absolute inset-0 bg-black/30 z-10"></div>

        {/* Logo in top left */}
        <div className="absolute top-24 left-6 z-20">
          <Image
            src="/SETFREELOGOWHITE.png"
            alt="Set Free Anaheim Logo"
            width={180}
            height={90}
            className="drop-shadow-[0_4px_4px_rgba(0,0,0,0.7)] transform -rotate-12"
            priority
            sizes="(max-width: 768px) 150px, 180px"
          />
        </div>

        {/* Donation Button in top right */}
        <div className="absolute top-24 right-6 z-20">
          <Link
            href="/donate"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 neon-box"
          >
            DONATE NOW
          </Link>
        </div>

        {/* Scroll indicator */}
        <Link
          href="#about"
          className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 animate-bounce block hover:scale-110 transition-transform duration-3000"
          aria-label="Scroll down to about section"
        >
          <Image
            src="/cross-arrow.png"
            alt="Scroll down to about section"
            width={40}
            height={40}
            className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"
          />
        </Link>
      </section>

      {/* Hero Text Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            We pull 'em in with that <span className="text-red-400 font-bold">gangsta grit</span>, then hit 'em with
            that <span className="text-yellow-400 font-bold">unconditional Christ love</span>
            {" "}when they least expect it.
          </p>
          {/* Prayer Box CTA removed */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#contact">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 text-lg neon-box">
                GET SET FREE
              </Button>
            </Link>
            <Link href="#events">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black font-bold py-4 px-8 text-lg bg-transparent"
              >
                SUNDAY 10AM
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6 pl-6">
                <Image
                  src="/holy-hood.png"
                  alt="Holy But Hood"
                  width={400}
                  height={100}
                  className="mb-6"
                />
              </div>
              <h2 className="text-2xl font-bold text-red-500 mb-4">The Magic House — Set Free Anaheim</h2>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                This is straight Jesus with a switchblade—where the holy meets the hood. We're out here in Anaheim pullin' souls outta the gutter with that raw love of Christ. No suits. No judgment. Just real ones gettin' set free by the blood of Jesus.
              </p>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                Started in '82 right here in the streets of Anaheim, Set Free blew up from one church to a worldwide movement: churches, ranches, recovery homes, even a seminary called Set Free University. But it all started with a handful of broken people who said "Yes" to Jesus and never looked back.
              </p>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                At the Magic House, we don't ask where you came from—we ask if you're ready to change. Addicts, convicts, gangsters, single moms, lost kids—we take 'em all in. We house you, feed you, pray over you, and walk with you. Not because we're saints, but because we were you.
              </p>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                We pull you in with that gangsta grit—raw, unfiltered, and real—and hit you with that <span className="text-yellow-400 font-bold">unconditional Christ love</span> when you least expect it. You come for the safety, but you stay 'cause the Holy Spirit wrecks you—in the best way.
              </p>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed italic text-center border-l-4 border-red-500 pl-4">
                "If anyone is in Christ, he is a new creation. The old is gone, the new has come." – 2 Corinthians 5:17
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                We don't always got room, but we always make room. 'Cause Jesus never turned people away—and neither do we.
                <span className="text-red-400 font-bold"> Freely we give, 'cause freely we received.</span>
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-44 flex items-center justify-center">
                    <Image
                      src="/holy-disciples.png"
                      alt="Holy Disciples representing real community at Set Free Anaheim"
                      width={175}
                      height={175}
                      className="object-contain"
                      loading="lazy"
                      sizes="(max-width: 768px) 120px, 175px"
                    />
                  </div>
                  <h3 className="font-bold text-white">Real Community</h3>
                  <p className="text-gray-400 text-sm">No fake, just family</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-2 h-44 flex items-center justify-center">
                    <Image
                      src="/unconditional-love.png"
                      alt="Unconditional Love symbol at Set Free Anaheim"
                      width={175}
                      height={175}
                      className="object-contain"
                      loading="lazy"
                      sizes="(max-width: 768px) 120px, 175px"
                    />
                  </div>
                  <h3 className="font-bold text-white">Unconditional Love</h3>
                  <p className="text-gray-400 text-sm">Come as you are</p>
                </div>
              </div>
            </div>
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-red-500 neon-text">WHERE WE AT</h2>
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            <Card className="bg-gray-900 border-red-900/30 h-full hover:shadow-[0_0_30px_rgba(239,68,68,0.35)] hover:border-red-500/60 transition">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/phil-holding-blocks.jpeg"
                    alt="Set Free Church Sunday Service icon"
                    width={150}
                    height={150}
                    className="object-contain"
                    loading="lazy"
                    sizes="(max-width: 768px) 100px, 150px"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 neon-text">SUNDAY SERVICE</h3>
                <p className="text-gray-300 mb-4">
                  Roll through for raw worship and real talk—no polish, no pretense, just Jesus changing lives. Bring your fam, your questions, and your mess—there’s room for you. We pray hard, praise loud, and keep it 100 with real testimonies and breakthrough. Holy but hood—come as you are and leave different.
                </p>
                <div className="mt-auto pt-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-yellow-400 text-black font-extrabold tracking-wide uppercase shadow-lg shadow-red-500/30 ring-1 ring-red-500/40 drop-shadow-[0_0_12px_rgba(239,68,68,0.6)] neon-box">
                    <Calendar className="w-4 h-4" />
                    Every Sunday 10AM
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-red-900/30 h-full hover:shadow-[0_0_30px_rgba(239,68,68,0.35)] hover:border-red-500/60 transition">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/phil-sunday-setfree-hat.jpg"
                    alt="Holy Disciples Sunday Night Recovery icon"
                    width={150}
                    height={150}
                    className="object-contain"
                    loading="lazy"
                    sizes="(max-width: 768px) 100px, 150px"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 neon-text">SUNDAY NIGHT RECOVERY</h3>
                <p className="text-gray-300 mb-4">
                  Come as you are every Sunday night to Magic House for a powerful time of healing, hope, and real community. We’ve got good music, free hot dogs, and most importantly—unconditional love through Christ. No judgment, just Jesus. Let’s recover together.
                </p>
                <div className="mt-auto pt-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-yellow-400 text-black font-extrabold tracking-wide uppercase shadow-lg shadow-red-500/30 ring-1 ring-red-500/40 drop-shadow-[0_0_12px_rgba(239,68,68,0.6)] neon-box">
                    <Calendar className="w-4 h-4" />
                    Every Sunday 7PM
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-red-900/30 h-full hover:shadow-[0_0_30px_rgba(239,68,68,0.35)] hover:border-red-500/60 transition">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/sunday-toya-oklahoma.jpg"
                    alt="Wellbriety wellness meeting icon"
                    width={150}
                    height={150}
                    className="object-contain bg-gray-900 rounded-lg"
                    loading="lazy"
                    sizes="(max-width: 768px) 100px, 150px"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 neon-text">Wellbriety</h3>
                <p className="text-gray-300 mb-4">
                  Step into a healing circle rooted in Native tradition—honoring story, culture, and sobriety with love and respect. We build from the inside out with tools that work, community that holds you down, and space to speak your truth. No shame here—just growth, strength, and hope for the week. Come as you are and walk out steadier.
                </p>
                <div className="mt-auto pt-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 text-black font-extrabold tracking-wide uppercase shadow-lg shadow-red-500/30 ring-1 ring-red-500/40 drop-shadow-[0_0_12px_rgba(239,68,68,0.6)] neon-box">
                    <Calendar className="w-4 h-4" />
                    Every Monday 7PM
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Calendar Section */}
      <section id="calendar" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-red-500 neon-text">EVENTS CALENDAR</h2>
          <div className="flex justify-center">
            <CustomCalendar />
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-red-500 neon-text">WATCH OUR STORIES</h2>
          <VideoCarousel />
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-red-500 neon-text">IN THE NEWS</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Article 1 */}
            <div className="bg-black/70 border border-red-900/30 rounded-lg shadow-lg p-6 flex flex-col">
              <div className="relative w-full h-48 mb-4">
                <Image
                  src="/news-homeboy-setfree.jpg"
                  alt="Historic Meeting: Homeboy Industries & Set Free Ministries"
                  fill
                  className="rounded-md object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Historic Meeting: Homeboy Industries & Set Free Ministries
              </h3>
              <p className="text-gray-300 mb-4 text-sm">
                Father Gregory Boyle and Pastor Phil Aguilar unite for a new chapter in faith-based outreach, combining hope, healing, and practical care for those in need.
              </p>
              <a
                href="https://fandfnews.com/historic-meeting-between-homeboy-industries-and-set-free-ministries-marks-a-new-chapter-in-faith-based-outreach/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
              >
                Read Article
              </a>
            </div>
            {/* Article 2 */}
            <div className="bg-black/70 border border-red-900/30 rounded-lg shadow-lg p-6 flex flex-col">
              <div className="relative w-full h-48 mb-4">
                <Image
                  src="/soft-white-underbelly.png"
                  alt="Soft White Underbelly Phil Aguilar Interview"
                  fill
                  className="rounded-md object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Soft White Underbelly Phil Aguilar Interview
              </h3>
              <p className="text-gray-300 mb-4 text-sm">
                Watch the in-depth interview with Pastor Phil Aguilar on the Soft White Underbelly channel, exploring his journey and the impact of Set Free Ministries.
              </p>
              <a
                href="https://g.co/kgs/QNocXqx"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
              >
                Watch Interview
              </a>
            </div>
            {/* Article 3 */}
            <div className="bg-black/70 border border-red-900/30 rounded-lg shadow-lg p-6 flex flex-col">
              <div className="relative w-full h-48 mb-4">
                <Image
                  src="/setfree-anaheim-ministry.jpg"
                  alt="Set Free Anaheim Ministry Video"
                  fill
                  className="rounded-md object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Set Free Anaheim Ministry Video
              </h3>
              <p className="text-gray-300 mb-4 text-sm">
                Watch this powerful video showcasing the heart and mission of Set Free Anaheim ministry, featuring real stories and testimonies from our community.
              </p>
              <a
                href="https://youtu.be/KYbuUC6tGUY"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
              >
                Watch Video
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonies Section */}
      <section id="testimonies" className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-red-500 neon-text">REAL STORIES</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-black/50 border-red-900/30">
              <CardContent className="p-8">
                <p className="text-lg text-gray-300 mb-6 italic">
                  "I was running the streets, thought I was too far gone. But Pastor showed me Jesus loves gangsters
                  too. Now I'm set free and helping other young cats find their way."
                </p>
                <p className="text-red-400 font-bold">- Marcus, 19</p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-red-900/30">
              <CardContent className="p-8">
                <p className="text-lg text-gray-300 mb-6 italic">
                  "This church don't judge. They met me in my mess and showed me God's grace. Real family, real love,
                  real transformation."
                </p>
                <p className="text-red-400 font-bold">- Sofia, 22</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-red-900/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-red-500 neon-text">READY TO GET SET FREE?</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Don't wait. Your breakthrough is one step away. Come as you are - Jesus is waiting with open arms and
            unconditional love.
          </p>

          {/* Prayer CTA */}
          <div className="mx-auto mb-12 flex flex-col items-center gap-6">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 animate-slow-glow">
              <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-red-600/25 blur-3xl opacity-70 animate-candle" />
              <Image
                src="/tristin-upper-room-logo.png"
                alt="Tristin's Upper Room"
                fill
                className="object-contain drop-shadow-[0_0_20px_rgba(239,68,68,0.55)]"
                priority={false}
              />
            </div>
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Tristin's Upper Room — Prayer Wall</h3>
              <p className="text-gray-300 max-w-xl mx-auto">Send your prayer now. Well lift it up together. Add a love offering if youd like.</p>
            </div>
            <Link href="/prayer">
              <Button className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-400 text-black font-extrabold uppercase tracking-wide px-8 py-4 text-lg rounded-xl shadow-lg shadow-red-500/30 ring-1 ring-red-500/40 transition-all hover:scale-105">
                Submit a Prayer
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-5 gap-6 mb-12">
            <div className="flex flex-col items-center">
              <a
                href="tel:714-400-4573"
                className="group flex flex-col items-center"
              >
                <Phone className="h-12 w-12 text-red-500 mb-4 group-hover:text-red-400 transition-colors" />
                <h3 className="font-bold text-white mb-2 group-hover:text-red-400 transition-colors">CALL US</h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors text-center">
                  714-400-4573
                  <br />
                  Ready to help
                </p>
              </a>
            </div>

            <div className="flex flex-col items-center">
              <a
                href="mailto:setfreephil@aol.com"
                className="group flex flex-col items-center"
              >
                <Mail className="h-12 w-12 text-red-500 mb-4 group-hover:text-red-400 transition-colors" />
                <h3 className="font-bold text-white mb-2 group-hover:text-red-400 transition-colors">EMAIL US</h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors text-center">
                  setfreephil@aol.com
                  <br />
                  Direct contact
                </p>
              </a>
            </div>

            <div className="flex flex-col items-center">
              <a
                href="https://www.instagram.com/setfreeanaheim"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center"
              >
                <Instagram className="h-12 w-12 text-red-500 mb-4 group-hover:text-red-400 transition-colors" />
                <h3 className="font-bold text-white mb-2 group-hover:text-red-400 transition-colors">INSTAGRAM</h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors text-center">
                  Follow our daily
                  <br />
                  ministry updates
                </p>
              </a>
            </div>

            <div className="flex flex-col items-center">
              <a
                href="https://www.facebook.com/setfreeanaheim"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center"
              >
                <Facebook className="h-12 w-12 text-red-500 mb-4 group-hover:text-red-400 transition-colors" />
                <h3 className="font-bold text-white mb-2 group-hover:text-red-400 transition-colors">FACEBOOK</h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors text-center">
                  Connect with our
                  <br />
                  community online
                </p>
              </a>
            </div>

            <div className="flex flex-col items-center">
              <a
                href="https://www.youtube.com/@setfreeanaheim"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center"
              >
                <Youtube className="h-12 w-12 text-red-500 mb-4 group-hover:text-red-400 transition-colors" />
                <h3 className="font-bold text-white mb-2 group-hover:text-red-400 transition-colors">YOUTUBE</h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors text-center">
                  Watch sermons &
                  <br />
                  ministry content
                </p>
              </a>
            </div>
          </div>

          {/* <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 text-xl">
            COME THROUGH THIS SUNDAY
          </Button> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-red-900/30 py-8">
        <div className="container mx-auto px-4 text-center relative">
          <div className="flex justify-center mb-4">
            <Image
              src="/SETFREELOGOWHITE.png"
              alt="Set Free Anaheim Logo"
              width={200}
              height={100}
              className="object-contain"
            />
          </div>
          <p className="text-gray-400 mb-4">"So if the Son sets you free, you will be free indeed." - John 8:36</p>
          <p className="text-gray-500 text-sm">
            © 2025 Set Free Digital Disciples. All rights reserved. | Saving souls with some edge.
          </p>
          <div className="w-full flex items-center gap-2 justify-between mt-6 md:mt-0 md:absolute md:left-4 md:bottom-4 md:justify-start">
            <a
              href="https://www.setfreedigitaldisciples.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-xs underline-offset-2 hover:underline md:hidden"
            >
              Site by Set Free Digital Disciples
            </a>
          </div>

          <div className="w-full flex items-center gap-2 justify-end mt-2 md:mt-0 md:absolute md:right-4 md:bottom-4">
            <span className="text-gray-500 text-xs">Site by</span>
            <a
              href="https://www.setfreedigitaldisciples.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Set Free Digital Disciples — Web design and development"
              title="Set Free Digital Disciples"
              className="inline-flex"
            >
              <Image
                src="/SetFreeDigitalDisciplesCyber.png"
                alt="Set Free Digital Disciples"
                width={180}
                height={50}
                className="object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
