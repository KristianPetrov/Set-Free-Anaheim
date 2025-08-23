import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Calendar } from "lucide-react"

export default function Events() {
  return (
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
                  src="/lift-off-on-fire.jpeg"
                  alt="Holy Disciples Sunday Night Recovery icon"
                  width={250}
                  height={250}
                  className="object-contain"
                  loading="lazy"
                  sizes="(max-width: 768px) 150px, 250px"
                />
              </div>
              <h3 className="text-xl font-bold text-yellow-300 mb-2 neon-text">SUNDAY NIGHT RECOVERY - ON HOLD</h3>
              <p className="text-yellow-300 text-lg font-bold mb-4 text-start">
                🚨 Heads up Fam 🚨<br />
                Set Free Sunday Night Recovery is on pause for now. 💔<br />
                Stay tuned — we’ll be back soon, stronger &amp; freer than ever. 🙌💯
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
  )
}


