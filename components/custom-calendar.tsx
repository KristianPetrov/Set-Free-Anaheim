
import { format, startOfWeek, addDays, isSameDay } from "date-fns"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

import Image from "next/image"

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
const addresses = {
 "Main Sanctuary" :"1171 N West St, Anaheim, CA 92801, USA" ,
  "Lift Off Recovery":"1567 W Embassy St, Anaheim, CA 92802, USA" ,
"The Magic House":"301 S Archer St, Anaheim, CA  92804, USA"
}
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
    id: "sunday-night-recovery",
    address: addresses["Lift Off Recovery"],
    title: "SUNDAY NIGHT RECOVERY",
    time: "7:00 PM",
    description: "One of the biggest and best recovery meetings in Southern California, where we get to share stories, talents and encourage one another with love and hope.",
    image: "/phil-sunday-setfree-hat.jpg",
    dayOfWeek: 0, // Sunday
    location: "Main Sanctuary",
    recurring: true
  },
  {
    id: "wellbreity",
    title: "WELLBREITY",
    address: addresses["Lift Off Recovery"],
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
    dayOfWeek: 3, // Tuesday
    location: "Fellowship Hall",
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
    const today = new Date()
    const next7Days: EventWithDate[] = []

    // Generate the next 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dayOfWeek = date.getDay()

      // Find events for this day
      const eventsForDay = weeklyEvents.filter(event => event.dayOfWeek === dayOfWeek)

      eventsForDay.forEach(event => {
        next7Days.push({
          ...event,
          date: date,
          dateLabel: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : format(date, 'EEEE, MMM d')
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
            <Card key={event.id} className="bg-black/50 border-red-900/30 hover:border-red-500/50 transition-all duration-300 group">
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
                    <h5 className="font-bold text-red-400 text-lg mb-2 group-hover:text-red-300 transition-colors">
                      {event.title}
                    </h5>
                    <div className="flex items-center gap-2 text-base text-gray-400 mb-2">
                      <Calendar className="w-5 h-5" />
                      <span>{event.dateLabel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-base text-gray-400 mb-3">
                      <Clock className="w-5 h-5" />
                      <span className="font-medium">{event.time}</span>
                    </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-red-400 transition-colors underline"
                      >
                        {event.address}
                      </a>
                    </div>
                    <p className="text-base text-gray-300 leading-relaxed">
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