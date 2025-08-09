"use client"

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { galleryImages as carouselImages } from '@/lib/gallery-images'

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

    // Try multiple approaches to ensure modal closes and returns to about section
    try {
      // Method 1: Use window.location to force a full page refresh to about section
      window.location.href = '/#about'
    } catch (error) {
      // Method 2: Fallback to router navigation with refresh to about section
      router.push('/#about')
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