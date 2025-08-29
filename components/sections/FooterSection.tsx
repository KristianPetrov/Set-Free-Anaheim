import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

export default function FooterSection() {
  return (
    <footer className="bg-black border-t border-red-900/30 py-8">
      <div className="container mx-auto px-4 text-center relative">
        <div className="flex justify-center mb-4">
          <Image
            src="/SETFREELOGOWHITE.png"
            alt="Set Free Anaheim Logo"
            width={200}
            height={100}
            className="object-contain"
          />
        </div>
        <p className="text-gray-400 mb-4">"So if the Son sets you free, you will be free indeed." - John 8:36</p>
        <p className="text-gray-500 text-sm">
          © 2025 Set Free Digital Disciples. All rights reserved. | Saving souls with some edge.
        </p>
        <div className="mt-2">
          <Link href="/thrift-shop" className="text-gray-300 hover:text-red-400 underline underline-offset-4">
            Visit the Thrift Shop
          </Link>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4">
          <Link
            href="https://www.facebook.com/profile.php?id=61579041676384"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Set Free Digital Disciples on Facebook"
            className="text-gray-400 hover:text-red-400 transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </Link>
          <Link
            href="https://www.instagram.com/kristianpetrov/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Kristian Petrov on Instagram"
            className="text-gray-400 hover:text-red-400 transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </Link>
        </div>
        <div className="w-full flex items-center gap-2 justify-between mt-6 md:mt-0 md:absolute md:left-4 md:bottom-4 md:justify-start">
          <Link
            href="https://www.setfreedigitaldisciples.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 text-xs underline-offset-2 hover:underline md:hidden"
          >
            Site by Set Free Digital Disciples
          </Link>
        </div>

        <div className="w-full flex items-center gap-2 justify-end mt-2 md:mt-0 md:absolute md:right-4 md:bottom-4">
          <span className="text-gray-500 text-xs">Site by</span>
          <Link
            href="https://www.setfreedigitaldisciples.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Set Free Digital Disciples — Web design and development"
            title="Set Free Digital Disciples"
            className="inline-flex"
          >
            <Image
              src="/SetFreeDigitalDisciplesCyber.png"
              alt="Set Free Digital Disciples"
              width={180}
              height={50}
              className="object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </Link>
        </div>
      </div>
    </footer>
  )
}


