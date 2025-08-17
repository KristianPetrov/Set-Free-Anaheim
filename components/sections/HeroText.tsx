import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroText() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          We pull 'em in with that <span className="text-red-400 font-bold">gangsta grit</span>, then hit 'em with
          that <span className="text-yellow-400 font-bold">unconditional Christ love</span>
          {" "}when they least expect it.
        </p>
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
  )
}


