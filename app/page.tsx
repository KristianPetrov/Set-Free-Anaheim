import Header from "@/components/sections/Header"
import Hero from "@/components/sections/Hero"
import DogDaycare from "@/components/sections/DogDaycare"
import PromoVideoSection from "@/components/sections/PromoVideoSection"
import About from "@/components/sections/About"
import CalendarSection from "@/components/sections/CalendarSection"
import VideoSection from "@/components/sections/VideoSection"
import News from "@/components/sections/News"
import Testimonies from "@/components/sections/Testimonies"
import SetFreeUniversitySignUp from "@/components/sections/SetFreeUniversitySignUp"
import Contact from "@/components/sections/Contact"
import FooterSection from "@/components/sections/FooterSection"

export default function SetFreeChurch() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <DogDaycare />
      <PromoVideoSection />
      <About />
      <CalendarSection />
      <VideoSection />
      <News />
      <Testimonies />
      <SetFreeUniversitySignUp />
      <Contact />
      <FooterSection />
    </div>
  )
}


