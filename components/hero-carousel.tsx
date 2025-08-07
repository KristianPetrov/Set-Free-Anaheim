"use client"

import { useRef } from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

const carouselImages = [
  {
    src: "/chief-sunglasses.jpg",
    alt: "Chief Sunglasses",
    width: 400,
    height: 500,
  },
  {
    src: "/chief-preaching.jpg",
    alt: "Chief Preaching",
    width: 400,
    height: 500,
  },
  {
    src: "/chill-phil.jpg",
    alt: "Chill Phil",
    width: 400,
    height: 500,
  },
  {
    src: "/sunday-soberiety-celebration.jpg",
    alt: "Sunday Soberiety Celebration",
    width: 400,
    height: 500,
  },
  {
    src: "/bible-nerd.jpg",
    alt: "Bible Nerd",
    width: 400,
    height: 500,
  },
  {
    src:"/risky-wife.jpg",
    alt: "Risky Wife",
    width: 400,
    height: 500,
  },
  {
    src:"/happy-phil.jpg",
    alt: "Happy Phil",
    width: 400,
    height: 500,
  },
  {
    src:"/set-free-2.jpg",
    alt: "Set Free Church Crowd",
    width: 400,
    height: 500,
  },
  {
    src:"/BrianAngelaHands.jpg",
    alt: "Brian and Angela Hands",
    width: 400,
    height: 500,
  },
 {
  src:"/sunday-angela.jpg",
  alt: "Sunday Angela",
  width: 400,
  height: 500,
 },

]

export default function HeroCarousel() {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }))

  return (
    <div className="relative">
      <Carousel plugins={[autoplay.current]}>
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="rounded-lg shadow-2xl w-full h-auto object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-4 rounded-lg shadow-lg">
        <p className="font-bold text-lg">"He came to seek and save the lost"</p>
        <p className="text-sm opacity-90">- Luke 19:10</p>
      </div>
    </div>
  )
}