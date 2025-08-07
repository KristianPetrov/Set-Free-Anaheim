"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoStory {
  id: string
  title: string
  description: string
  embedId: string
}

const videoStories: VideoStory[] = [
  {
    id: "set-free-special",
    title: "Set Free Special",
    description: "Experience the raw power of Set Free ministry in action",
    embedId: "gzhQkKofO4o"
  },
  {
    id: "dangerous-pastor",
    title: "America's Most Dangerous Pastor",
    description: "The story behind the man who changed everything",
    embedId: "cm4yLL6BXMo"
  },
  {
    id: "set-free-posse",
    title: "Set Free Posse",
    description: "Meet the crew that's changing lives on the streets",
    embedId: "qTP6m_KcLdw"
  },
  {
    id: "dirty-dozen",
    title: "The Dirty Dozen",
    description: "The original story that started it all",
    embedId: "K-7A42wgFoU"
  }
]

export default function VideoCarousel() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const currentVideo = videoStories[currentVideoIndex]

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videoStories.length)
  }

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videoStories.length) % videoStories.length)
  }

  const goToVideo = (index: number) => {
    setCurrentVideoIndex(index)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Main Video Player */}
      <div className="relative">
        <div className="aspect-video rounded-lg overflow-hidden shadow-2xl border-4 border-red-900/30 bg-black">
          <iframe
            key={currentVideo.embedId} // Force re-render when video changes
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${currentVideo.embedId}?autoplay=0&rel=0`}
            title={currentVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          onClick={prevVideo}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/80 border-red-500/50 text-white hover:bg-red-600 hover:border-red-600 z-10"
          aria-label="Previous video"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={nextVideo}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/80 border-red-500/50 text-white hover:bg-red-600 hover:border-red-600 z-10"
          aria-label="Next video"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Video Info */}
      <div className="mt-6 text-center">
        <h3 className="text-2xl font-bold text-white mb-2">{currentVideo.title}</h3>
        <p className="text-gray-300 text-lg mb-6">{currentVideo.description}</p>

        {/* Video Selector Dots */}
        <div className="flex justify-center space-x-3">
          {videoStories.map((_, index) => (
            <button
              key={index}
              onClick={() => goToVideo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentVideoIndex
                  ? 'bg-red-500 scale-125'
                  : 'bg-gray-600 hover:bg-gray-400'
              }`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>

        {/* Video Counter */}
        <p className="text-gray-400 text-sm mt-4">
          {currentVideoIndex + 1} of {videoStories.length}
        </p>
      </div>
    </div>
  )
}