import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Phone, Instagram, Facebook, Youtube, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import dynamic from 'next/dynamic'
import Navbar from "@/components/navbar"
import HeroCarousel from "@/components/hero-carousel"

const CustomCalendar = dynamic(() => import('@/components/custom-calendar'), {
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      <span className="ml-2 text-gray-300">Loading calendar...</span>
    </div>
  ),
})

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
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            DONATE NOW
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-[50%] animate-bounce">
          <Link href="#about" className="block">
            <Image
              src="/cross-arrow.png"
              alt="Scroll down to about section"
              width={40}
              height={40}
              className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"
            />
          </Link>
        </div>
      </section>

      {/* Hero Text Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            We pull 'em in with that <span className="text-red-400 font-bold">gangsta grit</span>, then hit 'em with
            that <span className="text-yellow-400 font-bold">unconditional Christ love</span>
            {" "}when they least expect it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#contact">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 text-lg">
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
                  <div className="mx-auto mb-2 flex justify-center">
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
                  <div className="mx-auto mb-2 flex justify-center">
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
          <h2 className="text-4xl font-bold text-center mb-12 text-red-500">WHERE WE AT</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border-red-900/30">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/set-free-church.png"
                    alt="Set Free Church Sunday Service icon"
                    width={150}
                    height={150}
                    className="object-contain"
                    loading="lazy"
                    sizes="(max-width: 768px) 100px, 150px"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">SUNDAY SERVICE</h3>
                <p className="text-gray-300 mb-4">
                  Raw worship, real preaching, no BS. Come through and experience God's love in a whole new way.
                </p>
                <p className="text-red-400 font-bold">Every Sunday 10AM</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-red-900/30">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/holy-disciples.png"
                    alt="Holy Disciples Sunday Night Recovery icon"
                    width={150}
                    height={150}
                    className="object-contain"
                    loading="lazy"
                    sizes="(max-width: 768px) 100px, 150px"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">SUNDAY NIGHT RECOVERY</h3>
                <p className="text-gray-300 mb-4">
                Come as you are every Sunday night to Magic House for a powerful time of healing, hope, and real community. We’ve got good music, free hot dogs, and most importantly—unconditional love through Christ. No judgment, just Jesus. Let’s recover together.
                </p>
                <p className="text-red-400 font-bold">Saturdays 6PM</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-red-900/30">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/wellbreity.png"
                    alt="Wellbriety wellness meeting icon"
                    width={150}
                    height={150}
                    className="object-contain bg-gray-900 rounded-lg"
                    loading="lazy"
                    sizes="(max-width: 768px) 100px, 150px"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Wellbriety</h3>
                <p className="text-gray-300 mb-4">
                Wellness meeting based in native tradition and using culture as a form of prevention.
                </p>
                <p className="text-red-400 font-bold">Mondays 7PM</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Calendar Section */}
      <section id="calendar" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-red-500">EVENTS CALENDAR</h2>
          <div className="flex justify-center">
            <CustomCalendar />
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-red-500">WATCH OUR STORIES</h2>
          <VideoCarousel />
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-red-500">IN THE NEWS</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Article 1 */}
            <div className="bg-black/70 border border-red-900/30 rounded-lg shadow-lg p-6 flex flex-col">
              <div className="relative w-full h-48 mb-4">
                <Image
                  src="https://i0.wp.com/fandfnews.com/wp-content/uploads/2025/07/1w.jpg?w=1871&ssl=1"
                  alt="Historic Meeting: Homeboy Industries & Set Free Ministries"
                  fill
                  className="rounded-md object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/SoftWhiteUnderbelly.svg/1920px-SoftWhiteUnderbelly.svg.png"
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
                  src="https://img.youtube.com/vi/KYbuUC6tGUY/maxresdefault.jpg"
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
          <h2 className="text-4xl font-bold text-center mb-12 text-red-500">REAL STORIES</h2>
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
          <h2 className="text-4xl font-bold mb-8 text-red-500">READY TO GET SET FREE?</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Don't wait. Your breakthrough is one step away. Come as you are - Jesus is waiting with open arms and
            unconditional love.
          </p>

          <div className="grid md:grid-cols-5 gap-6 mb-12">
            <div className="flex flex-col items-center">
              <a
                href="tel:714-329-1003"
                className="group flex flex-col items-center"
              >
                <Phone className="h-12 w-12 text-red-500 mb-4 group-hover:text-red-400 transition-colors" />
                <h3 className="font-bold text-white mb-2 group-hover:text-red-400 transition-colors">CALL US</h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors text-center">
                  714-329-1003
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
        <div className="container mx-auto px-4 text-center">
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
        </div>
      </footer>
    </div>
  )
}
