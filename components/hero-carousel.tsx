"use client"

import { useRef } from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import Link from "next/link"

const carouselImages = [
  {
    src:"/phil-love-this-guy.JPG",
    alt: "Phil Love This Guy",
    width: 400,
    height: 500,
  },
  {
    src:"/i-am-redemption.jpg",
    alt: "I Am Redemption",
    width: 400,
    height: 500,
  },
  {src:"/phil-shoe-fits.jpg",
  alt: "Phil Shoe Fits",
  width: 400,
  height: 500,
  },
{
  src:"/phil-sunday-magic-side.jpg",
  alt: "Phil Sunday Magic House Side Shot",
  width: 400,
  height: 500,
},
{src:"/phil-love-one-with.jpg",
alt: "Phil Love One With",
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
    src:"/phil-hugging-black-guy.jpg",
    alt: "Phil Hugging Black Guy",
    width: 400,
    height: 500,
  },
  {
    src:"/phil-blessed-flexible.jpg",
    alt: "Phil Blessed Flexible",
    width: 400,
    height: 500,
  },
  {
    src:"/phil-black-jesus.jpg",
    alt: "Phil Black Jesus",
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
    src:"/chill-phil-finger.jpg",
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
  src:"/way-back-when.JPG",
  alt: "Way Back When",
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
  src:"/phil-sandra-magic.jpg",
  alt: "Phil Sandra Magic",
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
 {
  src:"/white-hat-phil.jpg",
  alt: "White Hat Phil",
  width: 400,
  height: 500,
 },
 {
  src:"/solo-setfree-bike.jpg",
  alt: "Solo Set Free Bike",
  width: 400,
  height: 500,
 },
 {
  src:"/sandra-fieldy-phil.jpg",
  alt: "Sandra Fieldy Phil",
  width: 400,
  height: 500,
 },
 {
  src:"/san-diego-set-free.jpg",
  alt: "San Diego Set Free",
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
  src:"/phil-palace-church.jpg",
  alt: "Phil Palace Church",
  width: 400,
  height: 500,
 },
 {
  src:"/phil-new-song-church.jpg",
  alt: "Phil New Song Church",
  width: 400,
  height: 500,
 },
 {
  src:"/phil-judo.jpg",
  alt: "Phil Judo",
  width: 400,
  height: 500,
 },
 {
  src:"/phil-house-fullerton-shirt.jpg",
  alt: "Phil House Fullerton Shirt",
  width: 400,
  height: 500,
 },
 {
  src:"/phil-holding-blocks.jpeg",
  alt: "Phil Holding Blocks",
  width: 400,
  height: 500,
 },
 {
  src:"/phil-christmas-family.jpg",
  alt: "Phil Christmas Family",
  width: 400,
  height: 500,
 },
 {
  src:"/phil-biker-salvation.jpg",
  alt: "Phil Biker Salvation",
  width: 400,
  height: 500,
 },
 {
  src:"/jesus-forever-set-free.JPG",
  alt: "Jesus Forever Set Free",
  width: 400,
  height: 500,
 },
 {
  src:"/fieldy-phil.jpg",
  alt: "Fieldy Phil",
  width: 400,
  height: 500,
 },
 {
  src:"/armed-dangerous-phil.jpg",
  alt: "Armed Dangerous Phil",
  width: 400,
  height: 500,
 },

]

export default function HeroCarousel() {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }))

  return (
    <div className="relative w-full max-w-md mx-auto mb-12">
      <div className="relative overflow-hidden">
        <Carousel plugins={[autoplay.current]} className="w-full">
          <CarouselContent className="-ml-1">
            {carouselImages.map((image, index) => (
              <CarouselItem key={index} className="pl-1">
                <Link href={`/gallery/${index}`} className="block">
                  <div className="relative aspect-[4/5] w-full cursor-pointer group">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="rounded-lg shadow-2xl object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 400px"
                      loading={index < 3 ? "eager" : "lazy"}
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                        <p className="text-sm font-medium">Click to view</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-3 sm:p-4 rounded-lg shadow-lg max-w-xs z-10">
        <p className="font-bold text-sm sm:text-lg">"He came to seek and save the lost"</p>
        <p className="text-xs sm:text-sm opacity-90">- Luke 19:10</p>
      </div>
    </div>
  )
}