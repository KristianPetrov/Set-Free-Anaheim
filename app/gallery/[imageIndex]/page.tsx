"use client"

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { galleryImages as carouselImages } from '@/lib/gallery-images'

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