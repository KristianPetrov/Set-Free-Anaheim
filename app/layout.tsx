import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#DC2626',
  interactiveWidget: 'resizes-content',
}

export const metadata: Metadata = {
  title: {
    default: "Set Free Anaheim | Urban Church & Outreach",
    template: "%s | Set Free Anaheim"
  },
  description:
    "Set Free Anaheim is a bold, Christ-centered church and outreach in Orange County, meeting people where they are with real talk, real love, and real transformation. Join us for worship, street outreach, and community events.",
  keywords: [
    "Set Free Anaheim",
    "Set Free Church",
    "Urban Ministry",
    "Faith-based Outreach",
    "Pastor Phil Aguilar",
    "Anaheim Church",
    "Street Ministry",
    "Christian Community",
    "Gang Outreach",
    "Recovery Ministry",
    "Magic House",
    "Wellbriety",
    "Orange County Church",
    "California Ministry",
    "Set Free Digital Disciples",
    "SetFreeDigitalDisciples"
  ],
  authors: [
    { name: "Set Free Anaheim" },
    { name: "Set Free Digital Disciples", url: "https://www.setfreedigitaldisciples.com" },
  ],
  creator: "Set Free Digital Disciples",
  publisher: "Set Free Anaheim",
  generator: "Set Free Digital Disciples",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://setfreeanaheim.com",
    siteName: "Set Free Anaheim",
    title: "Set Free Anaheim | Urban Church & Outreach",
    description:
      "Bold, Christ-centered outreach in Anaheim. Real talk, real love, real transformation. Join us for worship, street outreach, and community events.",
    images: [
      {
        url: "https://setfreeanaheim.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Set Free Anaheim - Urban Church and Outreach",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@setfreeanaheim",
    creator: "@setfreeanaheim",
    title: "Set Free Anaheim | Urban Church & Outreach",
    description:
      "Bold, Christ-centered outreach in Anaheim. Real talk, real love, real transformation.",
    images: [
      {
        url: "https://setfreeanaheim.com/opengraph-image",
        alt: "Set Free Anaheim",
      }
    ],
  },
  icons: {
    icon: [
      { url: "/setfree_anaheim_favicon.ico", sizes: "any" },
      { url: "/setfree_anaheim_favicon.ico", sizes: "16x16", type: "image/x-icon" },
      { url: "/setfree_anaheim_favicon.ico", sizes: "32x32", type: "image/x-icon" },
    ],
    apple: [
      { url: "/setfree_anaheim_favicon.ico", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
  metadataBase: new URL("https://setfreeanaheim.com"),
  alternates: {
    canonical: "https://setfreeanaheim.com",
  },
  category: "religion",
  classification: "Church and Religious Organization",
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="dns-prefetch" href="https://calendar.google.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <link rel="dns-prefetch" href="https://i0.wp.com" />
        <link rel="dns-prefetch" href="https://upload.wikimedia.org" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="author" href="https://www.setfreedigitaldisciples.com" />
        <meta name="author" content="Set Free Digital Disciples" />
        <meta property="og:see_also" content="https://www.setfreedigitaldisciples.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Church",
              "name": "Set Free Anaheim",
              "alternateName": "Magic House",
              "description": "Bold, Christ-centered church and outreach in Anaheim, California. Real talk, real love, real transformation.",
              "url": "https://setfreeanaheim.com",
              "logo": "https://setfreeanaheim.com/SETFREELOGOWHITE.png",
              "image": "https://setfreeanaheim.com/opengraph-image",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Anaheim",
                "addressRegion": "CA",
                "addressCountry": "US"
              },
              "telephone": "714-400-4573",
              "email": "setfreephil@aol.com",
              "founder": {
                "@type": "Person",
                "name": "Pastor Phil Aguilar"
              },
              "sameAs": [
                "https://www.instagram.com/setfreeanaheim",
                "https://www.facebook.com/setfreeanaheim",
                "https://www.youtube.com/@setfreeanaheim"
              ],
              "creator": {
                "@type": "Organization",
                "name": "Set Free Digital Disciples",
                "url": "https://www.setfreedigitaldisciples.com"
              },
              "event": [
                {
                  "@type": "Event",
                  "name": "Sunday Service",
                  "description": "Raw worship, real preaching, no BS. Come through and experience God's love in a whole new way.",
                  "startDate": "2025-01-01T10:00:00-08:00",
                  "eventSchedule": {
                    "@type": "Schedule",
                    "repeatFrequency": "P1W",
                    "byDay": "Sunday"
                  }
                },
                {
                  "@type": "Event",
                  "name": "Sunday Night Recovery",
                  "description": "Come as you are every Sunday night to Magic House for a powerful time of healing, hope, and real community.",
                  "startDate": "2025-01-01T19:00:00-08:00",
                  "eventSchedule": {
                    "@type": "Schedule",
                    "repeatFrequency": "P1W",
                    "byDay": "Sunday"
                  }
                },
                {
                  "@type": "Event",
                  "name": "Wellbriety",
                  "description": "Wellness meeting based in native tradition and using culture as a form of prevention.",
                  "startDate": "2025-01-01T19:00:00-08:00",
                  "eventSchedule": {
                    "@type": "Schedule",
                    "repeatFrequency": "P1W",
                    "byDay": "Monday"
                  }
                }
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Set Free Digital Disciples",
              "url": "https://www.setfreedigitaldisciples.com",
              "logo": "https://setfreeanaheim.com/SetFreeDigitalDisciplesCyber.png"
            })
          }}
        />
      </head>
      <body className="antialiased">
        <main role="main">
          {children}
        </main>
        {modal}
      </body>
    </html>
  )
}
