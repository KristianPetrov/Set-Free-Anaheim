"use client"

import { format, startOfWeek, addDays, isSameDay, startOfDay } from "date-fns"
import { DateTime } from 'luxon'
import { Calendar, Clock, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { ClassValue } from "clsx"


interface Event {
  address: string
  id: string
  title: string
  time: string
  description: string
  image: string
  dayOfWeek: number // 0 = Sunday, 1 = Monday, etc.
  location?: string
  recurring: boolean
  // If true, event occurs every other week anchored to the given Friday date
  everyOtherWeek?: boolean
  // Anchor date (YYYY-MM-DD) representing a Friday on which the event occurs
  anchorDate?: string
  descriptionClass?: ClassValue
  className?: ClassValue
  titleClass?: ClassValue
  cardClass?: ClassValue
  timeClass?: ClassValue
  addressClass?: ClassValue
}

interface EventWithDate extends Event {
  date: Date
  dateLabel: string
}

interface GoogleEvent {
  id: string
  title: string
  description?: string
  start: Date
  end: Date
  location?: string
  isAllDay: boolean
  url?: string
  creator?: string
}
type Addresses = {
  "Main Sanctuary" :"1171 N West St, Anaheim, CA 92801, USA",
  "Lift Off Recovery":"1567 W Embassy St, Anaheim, CA 92802, USA",
  "The Magic House":"301 S Archer St, Anaheim, CA  92804, USA"
}
const addresses: Addresses = {
 "Main Sanctuary" :"1171 N West St, Anaheim, CA 92801, USA",
  "Lift Off Recovery":"1567 W Embassy St, Anaheim, CA 92802, USA",
"The Magic House":"301 S Archer St, Anaheim, CA  92804, USA"
} as const
const weeklyEvents: Event[] = [
  {
    id: "sunday-service",
    address: addresses["Main Sanctuary"],
    title: "SUNDAY SERVICE",
    time: "10:00 AM",
    description: "Time to do church! Set Free style! We'll be talking about Jesus in a way that you may have never heard before. Fully accepting and challenging. Join us for music, testimonies and learning!",
    image: "/phil-holding-blocks.jpeg",
    dayOfWeek: 0, // Sunday
    location: "Main Sanctuary",
    recurring: true
  },
  {
    id: "angela-kent-meditation",
    title: "Every Other Friday: Deep Guided Meditation with Angela & Kent",
    address: addresses["Main Sanctuary"],
    time: "7:00 PM",
    description: "Step out of the noise and into God’s peace. Angela & Kent—freshly married and filled with fire—guide a deep, Christ-centered meditation to realign your breath, your body, and your spirit. Pull up with a yoga mat, get comfy, and let the Presence do the heavy lifting.",
    image: "/Angela-Kent-Meditation-Event.jpg",
    dayOfWeek: 5, // Friday
    location: "Main Sanctuary",
    recurring: true,
    // Set an anchor Friday that is a real occurrence so biweekly parity is correct
    // Update this date as needed to match the real schedule
    everyOtherWeek: true,
    anchorDate: "2025-09-12",
    cardClass: "border-yellow-500/40 hover:border-yellow-400/60",

  },
  {
    id: "sunday-night-recovery",
    address: addresses["Lift Off Recovery"],
    title: "PAUSED -SUNDAY NIGHT RECOVERY",
    time: "7:00 PM",
    description: "🚨 Heads up Fam 🚨\nSet Free Sunday Night Recovery is on pause for now. 💔\nStay tuned — we’ll be back soon, stronger & freer than ever. 🙌💯",
    image: "/lift-off-on-fire.jpeg",
    dayOfWeek: 0, // Sunday
    location: "Main Sanctuary",
    recurring: true,
    descriptionClass: "font-bold text-yellow-300 leading-relaxed",
    titleClass: "text-yellow-300",
    cardClass: "border-yellow-500/40 hover:border-yellow-400/60"
  },
  {
    id: "wellbreity",
    title: "WELLBREITY",
    address: addresses["Main Sanctuary"],
    time: "7:00 PM",
    description: "Wellness meeting based in native tradition and using culture as a form of prevention.",
    image: "/sunday-toya-christmas.jpg",
    dayOfWeek: 1, // Monday
    location: "Youth Room",
    recurring: true
  },
  {
    id: "power-study",
    title: "POWER STUDY",
    address: addresses["Main Sanctuary"],
    time: "7:00 PM",
    description: "This is a Bible study that encourages interaction and everyone's thoughts and perspectives on Bible scripture to get a better understanding of God's word.",
    image: "/soldier-phil.jpg",
    dayOfWeek: 2, // Tuesday
    location: "Community",
    recurring: true
  },
  {
    id: "womens-bible-study",
    title: "WOMEN'S BIBLE STUDY",
    address:addresses["The Magic House"],
    time: "7:00 PM",
    description: "Are you a lady? GOOD! That's the only requirement to come on over to hear Saint Sandra teach the Bible to a big group of women! It's a great time to find friends and to be vulnerable.",
    image: "/womens-saints.jpg",
    dayOfWeek: 3, // Wednesday
    location: "Fellowship Hall",
    recurring: true
  },
  {
    id: "mens-bible-study-pastor-anthony",
    title: "MEN’S BIBLE STUDY WITH PASTOR ANTHONY",
    address: addresses["Main Sanctuary"],
    time: "7:00 PM",
    description: "Step into the holy-hood every Wednesday night as Pastor Anthony breaks down God’s Word with real-life truth, raw honesty, and brotherhood that sharpens iron. Come hungry for the Word, leave armed with wisdom, and roll with a crew that’s set free to live bold for Jesus.",
    image: "/bible-nerd-hood.png",
    dayOfWeek: 3, // Wednesday
    location: "Main Sanctuary",
    recurring: true
  },
  {
    id: "sfu-class",
    title: "SET FREE UNIVERSITY - SFU CLASS",
    time: "7:00 PM",
    address: addresses["Main Sanctuary"],
    description: "Want a classroom style bible study? Come on over to SFU Class where you will be taught something new as we navigate through subjects in the bible as a church. Bring your notebook and pencils. We're gunna dive deep!",
    image: "/bible-nerd.jpg",
    dayOfWeek: 4, // Thursday
    location: "Prayer Room",
    recurring: true
  },


]

export default function CustomCalendar() {
  // const [googleEvents, setGoogleEvents] = useState<GoogleEvent[]>([])
  // const [isLoadingEvents, setIsLoadingEvents] = useState(false)
  // const [eventError, setEventError] = useState<string | null>(null)

  const currentDate = new Date()
  const weekStart = startOfWeek(currentDate)
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  // // Fetch Google Calendar events
  // const fetchGoogleEvents = async () => {
  //   setIsLoadingEvents(true)
  //   setEventError(null)

  //   try {
  //     const response = await fetch(`/api/calendar/events?view=month&date=${currentDate.toISOString()}`)
  //     const data = await response.json()

  //     if (data.success) {
  //       // Convert string dates back to Date objects
  //       const events = data.events.map((event: any) => ({
  //         ...event,
  //         start: new Date(event.start),
  //         end: new Date(event.end)
  //       }))
  //       setGoogleEvents(events)
  //     } else {
  //       setEventError('Failed to load calendar events')
  //       setGoogleEvents([])
  //     }
  //   } catch (error) {
  //     console.error('Error fetching events:', error)
  //     setEventError('Unable to connect to calendar')
  //     setGoogleEvents([])
  //   } finally {
  //     setIsLoadingEvents(false)
  //   }
  // }

  // // Load events when component mounts
  // useEffect(() => {
  //   fetchGoogleEvents()
  // }, [])

      // Get events for the next 7 days
  const getNext7DaysEvents = (): EventWithDate[] => {
    const TZ = 'America/Los_Angeles'
    const next7Days: EventWithDate[] = []

    for (let i = 0; i < 7; i++) {
      const dt = DateTime.now().setZone(TZ).startOf('day').plus({ days: i })
      const dayOfWeek = dt.weekday % 7 // Sun=0 .. Sat=6
      const labelLong = dt.toFormat('EEEE, LLL d')

      const eventsForDay = weeklyEvents.filter((event) => {
        if (event.dayOfWeek !== dayOfWeek) return false

        if (event.everyOtherWeek) {
          if (!event.anchorDate) return false
          const candidate = dt
          const anchor = DateTime.fromISO(event.anchorDate, { zone: TZ }).startOf('day')
          const daysBetween = candidate.diff(anchor, 'days').as('days')
          const weeksBetween = Math.trunc(daysBetween / 7)
          return Math.abs(weeksBetween) % 2 === 0
        }

        return true
      })

      eventsForDay.forEach((event) => {
        next7Days.push({
          ...event,
          date: dt.toJSDate(),
          dateLabel: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : labelLong,
        })
      })
    }

    return next7Days
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12">

      {/* <div>
        <h4 className="text-xl font-bold text-red-500 mb-6">LIVE CALENDAR</h4>

        {isLoadingEvents && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-red-500 mr-2" />
            <span className="text-gray-300">Loading calendar events...</span>
          </div>
        )}

        {eventError && (
          <Alert className="mb-6 bg-red-900/20 border-red-500/50">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-300">
              {eventError} - Showing recurring events only.
            </AlertDescription>
          </Alert>
        )}



      </div>
      */}

      {/* This Week's Events Section - Limited */}
      <div>
        <h4 className="text-xl font-bold text-red-500 mb-4">UPCOMING THIS WEEK</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getNext7DaysEvents().map((event) => (
            <Card
              key={event.id}
              className={cn(
                "bg-black/50 border-red-900/30 hover:border-red-500/50 transition-all duration-300 group",
                event.cardClass
              )}
            >
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <h5 className={cn("font-bold text-red-400 text-lg mb-2 group-hover:text-red-300 transition-colors", event.titleClass)}>
                      {event.title}
                    </h5>
                    <div className="flex items-center gap-2 text-base text-gray-400 mb-2">
                      <Calendar className="w-5 h-5" />
                      <span>{event.dateLabel}</span>
                    </div>
                    <div className={cn("flex items-center gap-2 text-base text-gray-400 mb-3", event.timeClass)}>
                      <Clock className="w-5 h-5" />
                      <span className="font-medium">{event.time}</span>
                      <span className="ml-2 text-xs text-gray-500">(PST)</span>
                    </div>
                    <div className={cn("flex items-center gap-2 text-sm text-gray-400 mb-3", event.addressClass)}>
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <Link
                        href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-red-400 transition-colors underline"
                      >
                        {event.address}
                      </Link>
                    </div>
                    <p className={cn("text-base text-gray-300 leading-relaxed", event.descriptionClass)}>
                      {event.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}