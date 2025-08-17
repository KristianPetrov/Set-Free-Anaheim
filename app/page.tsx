import Header from "@/components/sections/Header"
import Hero from "@/components/sections/Hero"
import HeroText from "@/components/sections/HeroText"
import About from "@/components/sections/About"
import Events from "@/components/sections/Events"
import CalendarSection from "@/components/sections/CalendarSection"
import VideoSection from "@/components/sections/VideoSection"
import News from "@/components/sections/News"
import Testimonies from "@/components/sections/Testimonies"
import Contact from "@/components/sections/Contact"
import FooterSection from "@/components/sections/FooterSection"

export default function SetFreeChurch() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <HeroText />
      <About />
      <Events />
      <CalendarSection />
      <VideoSection />
      <News />
      <Testimonies />
      <Contact />
      <FooterSection />
    </div>
  )
}


