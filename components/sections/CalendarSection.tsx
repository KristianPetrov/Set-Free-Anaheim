import CustomCalendar from "@/components/custom-calendar"

export default function CalendarSection() {
  return (
    <section id="calendar" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-red-500 neon-text">EVENTS CALENDAR</h2>
        <div className="flex justify-center">
          <CustomCalendar />
        </div>
      </div>
    </section>
  )
}


