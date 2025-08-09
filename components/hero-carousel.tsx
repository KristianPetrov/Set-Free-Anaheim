"use client"

import { useRef } from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import Link from "next/link"
import { galleryImages as carouselImages } from "@/lib/gallery-images"

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