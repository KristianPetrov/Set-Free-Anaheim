import Image from "next/image"

export default function News() {
  return (
    <section id="news" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-red-500 neon-text">IN THE NEWS</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-black/70 border border-red-900/30 rounded-lg shadow-lg p-6 flex flex-col">
            <div className="relative w-full h-48 mb-4">
              <Image
                src="/news-homeboy-setfree.jpg"
                alt="Historic Meeting: Homeboy Industries & Set Free Ministries"
                fill
                className="rounded-md object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Historic Meeting: Homeboy Industries & Set Free Ministries
            </h3>
            <p className="text-gray-300 mb-4 text-sm">
              Father Gregory Boyle and Pastor Phil Aguilar unite for a new chapter in faith-based outreach, combining hope, healing, and practical care for those in need.
            </p>
            <a
              href="https://fandfnews.com/historic-meeting-between-homeboy-industries-and-set-free-ministries-marks-a-new-chapter-in-faith-based-outreach/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
            >
              Read Article
            </a>
          </div>

          <div className="bg-black/70 border border-red-900/30 rounded-lg shadow-lg p-6 flex flex-col">
            <div className="relative w-full h-48 mb-4">
              <Image
                src="/soft-white-underbelly.png"
                alt="Soft White Underbelly Phil Aguilar Interview"
                fill
                className="rounded-md object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Soft White Underbelly Phil Aguilar Interview
            </h3>
            <p className="text-gray-300 mb-4 text-sm">
              Watch the in-depth interview with Pastor Phil Aguilar on the Soft White Underbelly channel, exploring his journey and the impact of Set Free Ministries.
            </p>
            <a
              href="https://g.co/kgs/QNocXqx"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
            >
              Watch Interview
            </a>
          </div>

          <div className="bg-black/70 border border-red-900/30 rounded-lg shadow-lg p-6 flex flex-col">
            <div className="relative w-full h-48 mb-4">
              <Image
                src="/setfree-anaheim-ministry.jpg"
                alt="Set Free Anaheim Ministry Video"
                fill
                className="rounded-md object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Set Free Anaheim Ministry Video
            </h3>
            <p className="text-gray-300 mb-4 text-sm">
              Watch this powerful video showcasing the heart and mission of Set Free Anaheim ministry, featuring real stories and testimonies from our community.
            </p>
            <a
              href="https://youtu.be/KYbuUC6tGUY"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
            >
              Watch Video
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}


