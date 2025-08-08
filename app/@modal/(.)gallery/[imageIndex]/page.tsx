"use client"

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

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

interface ImageModalProps {
  params: {
    imageIndex: string
  }
}

export default function ImageModal({ params }: ImageModalProps) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(parseInt(params.imageIndex))
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    if (isClosing) return
    setIsClosing(true)

    // Try multiple approaches to ensure modal closes
    try {
      // Method 1: Use window.location to force a full page refresh
      window.location.href = '/'
    } catch (error) {
      // Method 2: Fallback to router navigation with refresh
      router.push('/')
      router.refresh()
    }
  }

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : carouselImages.length - 1
    setCurrentIndex(newIndex)
    router.replace(`/gallery/${newIndex}`)
  }

  const handleNext = () => {
    const newIndex = currentIndex < carouselImages.length - 1 ? currentIndex + 1 : 0
    setCurrentIndex(newIndex)
    router.replace(`/gallery/${newIndex}`)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') handleClose()
    if (e.key === 'ArrowLeft') handlePrevious()
    if (e.key === 'ArrowRight') handleNext()
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])

  const currentImage = carouselImages[currentIndex]

  if (!currentImage) {
    return null
  }

  if (isClosing) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-2"></div>
          <p>Closing...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-60 text-white hover:text-red-400 transition-colors"
        aria-label="Close gallery"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Previous button */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-60 text-white hover:text-red-400 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-12 h-12" />
      </button>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-60 text-white hover:text-red-400 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-12 h-12" />
      </button>

      {/* Main image container */}
      <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center p-4">
        <div className="relative w-full h-full max-h-[80vh]">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        {/* Image title and counter */}
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">{currentImage.title}</h2>
          <p className="text-gray-300">
            {currentIndex + 1} of {carouselImages.length}
          </p>
        </div>
      </div>

      {/* Click overlay to close */}
      <div
        className="absolute inset-0 -z-10"
        onClick={handleClose}
        aria-label="Close gallery"
      />
    </div>
  )
}