import Image from "next/image"
import Link from "next/link"
import {
  CalendarDays,
  Heart,
  House,
  MapPin,
  MessageCircle,
  PawPrint,
} from "lucide-react"

const phoneNumber = "+17473585195"
const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=1171+N+West+Street+Anaheim+CA+92801"

const daycareFeatures = [
  { icon: Heart, label: "Safe & loving environment" },
  { icon: PawPrint, label: "Playtime, exercise & fun" },
  { icon: House, label: "Supervised care" },
  { icon: PawPrint, label: "All breeds welcome" },
]

export default function DogDaycare() {
  return (
    <section
      id="dog-daycare"
      aria-labelledby="dog-daycare-heading"
      className="relative overflow-hidden border-y border-red-950 bg-zinc-950 py-16 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-red-700/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-red-700/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,transparent_48%,rgba(127,29,29,0.08)_48%,rgba(127,29,29,0.08)_52%,transparent_52%,transparent_100%)]" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.35em] text-red-500">
            Set Free Palace
          </p>
          <h2
            id="dog-daycare-heading"
            className="text-4xl font-black uppercase leading-none text-white sm:text-5xl lg:text-6xl"
          >
            Dog <span className="text-red-600 neon-text">Daycare</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            Loving weekday care for your dog—and every donation helps Set Free Anaheim
            provide shelter, food, and clothing to people in need.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div className="relative mx-auto w-full max-w-md">
            <div
              className="absolute -inset-3 -rotate-1 border-2 border-red-700/60 bg-red-950/30"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden border border-zinc-700 bg-black shadow-[0_24px_70px_rgba(0,0,0,0.6)]">
              <Image
                src="/set-free-dog-daycare.jpg"
                alt="Set Free Palace Dog Daycare flyer"
                width={682}
                height={1024}
                className="h-auto w-full"
                sizes="(max-width: 1024px) 90vw, 420px"
              />
            </div>
          </div>

          <div>
            <div className="border-l-4 border-red-600 pl-5">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-zinc-400">
                Monday—Friday
              </p>
              <h3 className="mt-2 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
                A good day for your dog.
                <span className="block text-red-500">A better day for someone in need.</span>
              </h3>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="border border-zinc-800 bg-black/60 p-5">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-6 w-6 text-red-500" aria-hidden="true" />
                  <p className="font-black uppercase tracking-wide text-white">Weekday care</p>
                </div>
                <p className="mt-2 text-sm text-zinc-400">Available Monday through Friday</p>
              </div>

              <div className="border border-red-900/70 bg-red-950/20 p-5">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-300">
                  Donation
                </p>
                <p className="mt-1 text-4xl font-black text-white">
                  $50 <span className="text-base font-bold uppercase text-zinc-400">per day</span>
                </p>
              </div>
            </div>

            <Link
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="group mt-4 flex items-start gap-4 border border-zinc-800 bg-black/60 p-5 transition hover:border-red-700"
            >
              <MapPin
                className="mt-0.5 h-6 w-6 shrink-0 text-red-500 transition group-hover:scale-110"
                aria-hidden="true"
              />
              <span>
                <span className="block font-black uppercase tracking-wide text-white">
                  Set Free Palace
                </span>
                <span className="mt-1 block text-sm text-zinc-400">
                  1171 N West Street, Anaheim, CA 92801
                </span>
              </span>
            </Link>

            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3">
              {daycareFeatures.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-zinc-300">
                  <Icon className="h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <a
              href={`sms:${phoneNumber}`}
              className="mt-8 flex w-full items-center justify-center gap-3 bg-red-600 px-6 py-4 text-center text-lg font-black uppercase tracking-wide text-white shadow-[0_0_30px_rgba(220,38,38,0.25)] transition hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto"
            >
              <MessageCircle className="h-6 w-6" aria-hidden="true" />
              Text (747) 358-5195 to schedule
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
