"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"

interface NavbarProps {
  className?: string
}

export default function Navbar({ className }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < lastScrollY) {
        // Scrolling up
        setShowNavbar(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setShowNavbar(false)
        setMobileMenuOpen(false) // Close mobile menu when hiding navbar
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header className={`border-b border-red-900/30 bg-black/90 backdrop-blur-sm fixed w-full z-50 transition-transform duration-300 ease-in-out ${
      showNavbar ? 'translate-y-0' : '-translate-y-full'
    } ${className || ''}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-end">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/prayer" className="text-gray-300 hover:text-red-500 transition-colors">
            Prayer
          </Link>
          <Link href="#about" className="text-gray-300 hover:text-red-500 transition-colors">
            About
          </Link>
          <Link href="#events" className="text-gray-300 hover:text-red-500 transition-colors">
            Events
          </Link>
          <Link href="#testimonies" className="text-gray-300 hover:text-red-500 transition-colors">
            Stories
          </Link>
          <Link href="#contact" className="text-gray-300 hover:text-red-500 transition-colors">
            Connect
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
        mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <nav className="px-4 pb-4 space-y-4 bg-black/95 border-t border-red-900/30">
          <Link
            href="/prayer"
            className="block text-gray-300 hover:text-red-500 transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Prayer
          </Link>
          <Link
            href="#about"
            className="block text-gray-300 hover:text-red-500 transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="#events"
            className="block text-gray-300 hover:text-red-500 transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Events
          </Link>
          <Link
            href="#testimonies"
            className="block text-gray-300 hover:text-red-500 transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Stories
          </Link>
          <Link
            href="#contact"
            className="block text-gray-300 hover:text-red-500 transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Connect
          </Link>
        </nav>
      </div>
    </header>
  )
}