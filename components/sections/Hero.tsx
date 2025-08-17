import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20 overflow-hidden">
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

      <div className="absolute top-24 right-6 z-20">
        <Link
          href="/donate"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 neon-box"
        >
          DONATE NOW
        </Link>
      </div>

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
  )
}


