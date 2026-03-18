"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

const promoVideoId = "_M2lMqeiScU"
const youtubeUrl = `https://www.youtube.com/watch?v=${promoVideoId}`
const embedUrl = `https://www.youtube-nocookie.com/embed/${promoVideoId}?autoplay=1&rel=0&modestbranding=1`
const maxResThumbnail = `https://img.youtube.com/vi/${promoVideoId}/maxresdefault.jpg`
const fallbackThumbnail = `https://img.youtube.com/vi/${promoVideoId}/hqdefault.jpg`

export default function PromoVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [thumbnailSrc, setThumbnailSrc] = useState(maxResThumbnail)

  return (
    <section id="promo-video" className="bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-yellow-400">
              Featured Video
            </p>
            <h2 className="text-4xl font-bold text-red-500 neon-text md:text-5xl">
              Set Free Anaheim Promo
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base text-gray-300 md:text-lg">
              Get a front-row look at the heart of Set Free Anaheim: real people, real stories, and real
              transformation through Jesus.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-red-900/40 bg-gradient-to-br from-red-950/30 via-black to-black shadow-[0_0_60px_rgba(127,29,29,0.35)]">
            <div className="aspect-video bg-black">
              {isPlaying ? (
                <iframe
                  className="h-full w-full"
                  src={embedUrl}
                  title="Set Free Anaheim promo video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="group relative block h-full w-full cursor-pointer overflow-hidden text-left"
                  aria-label="Play Set Free Anaheim promo video"
                >
                  <Image
                    src={thumbnailSrc}
                    alt="Set Free Anaheim promo video thumbnail"
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                    onError={() => {
                      if (thumbnailSrc !== fallbackThumbnail) {
                        setThumbnailSrc(fallbackThumbnail)
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
                  <div className="absolute left-4 top-4 rounded-full border border-yellow-400/40 bg-black/65 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300 md:hidden">
                    Tap to play
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-red-600/90 text-white shadow-[0_0_30px_rgba(220,38,38,0.5)] transition duration-300 group-hover:scale-110 group-hover:bg-red-500">
                      <Play className="ml-1 h-9 w-9 fill-current" />
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 hidden p-6 md:block md:p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300">
                      Watch Now
                    </p>
                    <p className="mt-2 text-2xl font-bold text-white md:text-3xl">
                      Experience the message and movement behind Set Free Anaheim.
                    </p>
                  </div>
                </button>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-red-900/40 px-6 py-5 md:flex-col md:items-center md:justify-between md:px-8">

              <p className="text-sm uppercase text-center tracking-[0.25em] text-red-300">Real talk. Real love. Real transformation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
