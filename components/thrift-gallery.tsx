"use client"

import { useRef } from "react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const images = [
  { src: "/thirft-shop-come-in.jpg", alt: "Thrift shop storefront" },
  { src: "/thrift-shop-inside.jpg", alt: "Clothes rack inside thrift shop" },
  { src: "/thrift-shop-front-desk.jpg", alt: "Front desk inside thrift shop" },
  { src: "/thrift-store-tree.jpg", alt: "Thrift store decorated tree" },
  { src: "/thrift-store-couch.jpg", alt: "Thrift store couch display" },
  { src: "/thrift-store-couch-side.jpg", alt: "Side view of thrift store couch" },
]

export default function ThriftGallery() {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }))
  return (
    <div className="relative w-full">
      <Carousel plugins={[autoplay.current]} className="w-full">
        <CarouselContent>
          {images.map((image, idx) => (
            <CarouselItem key={idx} className="basis-full md:basis-1/2 lg:basis-1/3">
              <div className="relative w-full h-72 rounded-lg border border-red-900/40 p-3">
                <div className="pointer-events-none absolute inset-0 z-0 rounded-xl bg-red-600/30 blur-3xl opacity-90 animate-candle" />
                <div className="relative z-10 w-full h-full rounded-md overflow-hidden">
                  <Image src={image.src} alt={image.alt} fill className="object-cover" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}


