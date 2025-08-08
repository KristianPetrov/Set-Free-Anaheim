"use client"

import { useRef } from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

const carouselImages = [
  {
    src:"/i-am-redemption.jpg",
    alt: "I Am Redemption",
    width: 400,
    height: 500,
  },

  {
src:"/risky-speaking-truth.jpg",
alt: "Risky Speaking Truth",
width: 400,
height: 500,
  },
  {
    src:"phil-hugging-black-guy.jpg",
    alt: "Phil Hugging Black Guy",
    width: 400,
    height: 500,
  },
  {
    src:"/dj-anthony.jpg",
    alt: "DJ Anthony",
    width: 400,
    height: 500,
  },
  {
    src:"chill-phil-finger.jpg",
    alt: "Chill Phil Finger",
    width: 400,
    height: 500,
  },
  {
src:"/anthony-rachel-fun.jpg",
alt: "Anthony and Rachel Fun",
width: 400,
height: 500,
  },
  {
src:"/phil-sunday-setfree-hat.jpg",
alt: "Phil Sunday Set Free Hat",
width: 400,
height: 500,
  },
  {
    src:"/red-chill-handshake.jpg",
    alt: "Red Chill Handshake",
    width: 400,
    height: 500,
  },
  {
    src:"/chill-phil-finger.jpg",
    alt: "Chill Phil Finger",
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
    src:"/happy-phil.jpg",
    alt: "Happy Phil",
    width: 400,
    height: 500,
  },
  {
    src:"/Set-Free-2.jpg",
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
 {
  src:"/phil-dojo.jpg",
  alt: "Phil Dojo",
  width: 400,
  height: 500,
 },
 {
  src:"/solo-bike-setfree.jpg",
  alt: "Solo Bike Set Free",
  width: 400,
  height: 500,
 },
 {
  src:"/phil-sandra-around-friend.jpg",
  alt: "Phil Sandra Around Friend",
  width: 400,
  height: 500,
 },
 {
  src:"/phil-white-hat.jpg",
  alt: "Phil White Hat",
  width: 400,
  height: 500,
 },
 {
  src:"/phil-two-friends-church.jpg",
  alt: "Phil Two Friends Church",
  width: 400,
  height: 500,
 },
 {
  src:"/way-back-when.JPG",
  alt: "Way Back When",
  width: 400,
  height: 500,
 },
 {
  src:"/phil-two-rockers.jpg",
  alt: "Phil Two Rockers",
  width: 400,
  height: 500,
 },
 {
  src:"/phil-sandra-wedding.jpg",
  alt: "Phil Sandra Wedding",
  width: 400,
  height: 500,
 },
 {
  src:"/set-free-soldiers-bike.jpeg",
  alt: "Set Free Soldiers Bike",
  width: 400,
  height: 500,
 },
 {
  src:"/liftoff-group.jpg",
  alt: "Liftoff Group",
  width: 400,
  height: 500,
 },
 {
  src:"/armed-dangerous-phil.jpg",
  alt: "Armed Dangerous Phil",
  width: 400,
  height: 500,
 },
 {
  src:"/magic-house-phil.jpg",
  alt: "Magic House Phil",
  width: 400,
  height: 500,
 },
 {
  src:"/phil-sandra-magic.jpg",
  alt: "Phil Sandra Magic",
  width: 400,
  height: 500,
 },
 {
  src:"/phil-palace-church.jpg",
  alt: "Phil Palace Church",
  width: 400,
  height: 500,
 },
 {
  src:"/phil-biker.jpg",
  alt: "Phil Biker",
  width: 400,
  height: 500,
 },
 {
  src:"/hooligan-phll-preaching.jpg",
  alt: "Hooligan Phil Preaching",
  width: 400,
  height: 500,
 },
 {
  src:"/PastorBrian.jpg",
  alt: "Pastor Brian",
  width: 400,
  height: 500,
 },

 {
  src:"/PhilSandra.jpg",
  alt: "Phil Sandra",
  width: 400,
  height: 500,
 },

]

export default function HeroCarousel() {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }))

  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden">
      <Carousel plugins={[autoplay.current]} className="w-full">
        <CarouselContent className="-ml-1">
          {carouselImages.map((image, index) => (
            <CarouselItem key={index} className="pl-1">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="rounded-lg shadow-2xl object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-4 rounded-lg shadow-lg max-w-xs">
        <p className="font-bold text-sm sm:text-lg">"He came to seek and save the lost"</p>
        <p className="text-xs sm:text-sm opacity-90">- Luke 19:10</p>
      </div>
    </div>
  )
}