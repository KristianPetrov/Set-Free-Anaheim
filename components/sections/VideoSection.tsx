import dynamic from 'next/dynamic'

const VideoCarousel = dynamic(() => import('@/components/video-carousel'), {
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      <span className="ml-2 text-gray-300">Loading videos...</span>
    </div>
  ),
})

export default function VideoSection() {
  return (
    <section id="video" className="py-20 bg-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12 text-red-500 neon-text">WATCH OUR STORIES</h2>
        <VideoCarousel />
      </div>
    </section>
  )
}


