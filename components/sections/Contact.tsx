import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Phone, Instagram, Facebook, Youtube, Mail } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-red-900/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8 text-red-500 neon-text">READY TO GET SET FREE?</h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Don't wait. Your breakthrough is one step away. Come as you are - Jesus is waiting with open arms and
          unconditional love.
        </p>

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
            <p className="text-gray-300 max-w-xl mx-auto">Send your prayer now. We'll lift it up together. Add a love offering if you'd like.</p>
          </div>
          <Link href="/prayer">
            <Button className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-400 text-black font-extrabold uppercase tracking-wide px-8 py-4 text-lg rounded-xl shadow-lg shadow-red-500/30 ring-1 ring-red-500/40 transition-all hover:scale-105">
              Submit a Prayer
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-5 gap-6 mb-12">
          <div className="flex flex-col items-center">
            <Link
              href="https://cal.com/setfreeanaheim"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
            >
              <Phone className="h-12 w-12 text-red-500 mb-4 group-hover:text-red-400 transition-colors" />
              <h3 className="font-bold text-white mb-2 group-hover:text-red-400 transition-colors">CALL US</h3>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors text-center">
                Book a call on our calendar
              </p>
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <Link
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
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <Link
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
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <Link
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
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <Link
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
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}


