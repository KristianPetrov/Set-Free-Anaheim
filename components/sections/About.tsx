import Image from "next/image"
import HeroCarousel from "@/components/hero-carousel"

export default function About() {
  return (
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
            <p className="text-lg text-gray-300 mb-8 leading-relaxed italic text-center border-l-4 border-red-500 pl-4">
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
  )
}


