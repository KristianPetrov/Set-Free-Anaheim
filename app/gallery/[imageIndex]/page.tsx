"use client"

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const carouselImages = [
  {
    src: "/phil-love-this-guy.JPG",
    alt: "Phil Love This Guy",
    title: "Phil - Love This Guy"
  },
  {
    src: "/i-am-redemption.jpg",
    alt: "I Am Redemption",
    title: "I Am Redemption"
  },
  {
    src: "/risky-speaking-truth.jpg",
    alt: "Risky Speaking Truth",
    title: "Risky Speaking Truth"
  },
  {
    src: "/phil-hugging-black-guy.jpg",
    alt: "Phil Hugging Black Guy",
    title: "Phil Hugging Friend"
  },
  {
    src: "/dj-anthony.jpg",
    alt: "DJ Anthony",
    title: "DJ Anthony"
  },
  {
    src: "/chill-phil-finger.jpg",
    alt: "Chill Phil Finger",
    title: "Chill Phil"
  },
  {
    src: "/anthony-rachel-fun.jpg",
    alt: "Anthony and Rachel Fun",
    title: "Anthony and Rachel Fun"
  },
  {
    src: "/phil-sunday-setfree-hat.jpg",
    alt: "Phil Sunday Set Free Hat",
    title: "Phil Sunday Set Free Hat"
  },
  {
    src: "/red-chill-handshake.jpg",
    alt: "Red Chill Handshake",
    title: "Red Chill Handshake"
  },
  {
    src: "/chief-preaching.jpg",
    alt: "Chief Preaching",
    title: "Chief Preaching"
  },
  {
    src: "/chill-phil.jpg",
    alt: "Chill Phil",
    title: "Chill Phil"
  },
  {
    src: "/sunday-soberiety-celebration.jpg",
    alt: "Sunday Soberiety Celebration",
    title: "Sunday Soberiety Celebration"
  },
  {
    src: "/bible-nerd.jpg",
    alt: "Bible Nerd",
    title: "Bible Nerd"
  },
  {
    src: "/happy-phil.jpg",
    alt: "Happy Phil",
    title: "Happy Phil"
  },
  {
    src: "/Set-Free-2.jpg",
    alt: "Set Free Church Crowd",
    title: "Set Free Church Crowd"
  },
  {
    src: "/BrianAngelaHands.jpg",
    alt: "Brian and Angela Hands",
    title: "Brian and Angela Hands"
  },
  {
    src: "/sunday-angela.jpg",
    alt: "Sunday Angela",
    title: "Sunday Angela"
  },
  {
    src: "/way-back-when.JPG",
    alt: "Way Back When",
    title: "Way Back When"
  },
  {
    src: "/set-free-soldiers-bike.jpeg",
    alt: "Set Free Soldiers Bike",
    title: "Set Free Soldiers Bike"
  },
  {
    src: "/phil-sandra-magic.jpg",
    alt: "Phil Sandra Magic",
    title: "Phil Sandra Magic"
  },
  {
    src: "/hooligan-phll-preaching.jpg",
    alt: "Hooligan Phil Preaching",
    title: "Hooligan Phil Preaching"
  },
  {
    src: "/PastorBrian.jpg",
    alt: "Pastor Brian",
    title: "Pastor Brian"
  },
  {
    src: "/PhilSandra.jpg",
    alt: "Phil Sandra",
    title: "Phil Sandra"
  },
  {
    src: "/white-hat-phil.jpg",
    alt: "White Hat Phil",
    title: "White Hat Phil"
  },
  {
    src: "/solo-setfree-bike.jpg",
    alt: "Solo Set Free Bike",
    title: "Solo Set Free Bike"
  },
  {
    src: "/sandra-fieldy-phil.jpg",
    alt: "Sandra Fieldy Phil",
    title: "Sandra Fieldy Phil"
  },
  {
    src: "/san-diego-set-free.jpg",
    alt: "San Diego Set Free",
    title: "San Diego Set Free"
  },
  {
    src: "/phil-sandra-wedding.jpg",
    alt: "Phil Sandra Wedding",
    title: "Phil Sandra Wedding"
  },
  {
    src: "/phil-palace-church.jpg",
    alt: "Phil Palace Church",
    title: "Phil Palace Church"
  },
  {
    src: "/phil-new-song-church.jpg",
    alt: "Phil New Song Church",
    title: "Phil New Song Church"
  },
  {
    src: "/phil-judo.jpg",
    alt: "Phil Judo",
    title: "Phil Judo"
  },
  {
    src: "/phil-house-fullerton-shirt.jpg",
    alt: "Phil House Fullerton Shirt",
    title: "Phil House Fullerton Shirt"
  },
  {
    src: "/phil-holding-blocks.jpeg",
    alt: "Phil Holding Blocks",
    title: "Phil Holding Blocks"
  },
  {
    src: "/phil-christmas-family.jpg",
    alt: "Phil Christmas Family",
    title: "Phil Christmas Family"
  },
  {
    src: "/phil-biker-salvation.jpg",
    alt: "Phil Biker Salvation",
    title: "Phil Biker Salvation"
  },
  {
    src: "/jesus-forever-set-free.JPG",
    alt: "Jesus Forever Set Free",
    title: "Jesus Forever Set Free"
  },
  {
    src: "/fieldy-phil.jpg",
    alt: "Fieldy Phil",
    title: "Fieldy Phil"
  },
  {
    src: "/armed-dangerous-phil.jpg",
    alt: "Armed Dangerous Phil",
    title: "Armed Dangerous Phil"
  }
]

interface GalleryPageProps {
  params: {
    imageIndex: string
  }
}

export default function GalleryPage({ params }: GalleryPageProps) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(parseInt(params.imageIndex))

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : carouselImages.length - 1
    setCurrentIndex(newIndex)
    router.push(`/gallery/${newIndex}`)
  }

  const handleNext = () => {
    const newIndex = currentIndex < carouselImages.length - 1 ? currentIndex + 1 : 0
    setCurrentIndex(newIndex)
    router.push(`/gallery/${newIndex}`)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious()
    if (e.key === 'ArrowRight') handleNext()
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])

  const currentImage = carouselImages[currentIndex]

  if (!currentImage) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Image not found</h1>
          <Link href="/" className="text-red-400 hover:text-red-300">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm border-b border-red-900/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>
          <h1 className="text-lg font-bold text-red-500">Set Free Gallery</h1>
        </div>
      </header>

      {/* Main content */}
      <div className="pt-20 min-h-screen flex items-center justify-center p-4">
        <div className="relative max-w-6xl w-full">
          {/* Navigation buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 text-white hover:text-red-400 transition-colors bg-black/50 rounded-full p-3"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 text-white hover:text-red-400 transition-colors bg-black/50 rounded-full p-3"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image container */}
          <div className="relative w-full h-[70vh] mb-6">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Image info */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">{currentImage.title}</h2>
            <p className="text-gray-300 mb-4">
              {currentIndex + 1} of {carouselImages.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}