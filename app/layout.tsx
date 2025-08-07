import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Set Free Anaheim | Urban Church & Outreach",
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
    "Soft White Underbelly",
    "Homeboy Industries"
  ],
  openGraph: {
    title: "Set Free Anaheim | Urban Church & Outreach",
    description:
      "Bold, Christ-centered outreach in Anaheim. Real talk, real love, real transformation. Join us for worship, street outreach, and community events.",
    url: "https://yourdomain.com",
    siteName: "Set Free Anaheim",
    images: [
      {
        url: "/Set-Free.jpg",
        width: 1200,
        height: 630,
        alt: "Set Free Anaheim Hero",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Set Free Anaheim | Urban Church & Outreach",
    description:
      "Bold, Christ-centered outreach in Anaheim. Real talk, real love, real transformation.",
    images: ["/Set-Free.jpg"],
  },
  icons: {
    icon: "/setfree_anaheim_favicon.ico",
  },
  metadataBase: new URL("https://yourdomain.com"),
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        {modal}
      </body>
    </html>
  )
}
