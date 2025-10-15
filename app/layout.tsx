import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "MRC Careers – International Job Recruitment Agency",
  description:
    "Leading international job recruitment agency connecting talented professionals with overseas career opportunities. Find your dream job abroad with comprehensive placement and support services.",
  keywords: [
    "MRC Careers",
    "international jobs",
    "overseas employment",
    "job recruitment",
    "career opportunities",
    "work abroad",
    "job placement",
    "recruitment agency",
    "international careers",
    "job search",
    "employment services",
    "visa assistance",
    "work permits",
  ],
  authors: [{ name: "MRC Careers Team" }],
  creator: "v0.dev",
  publisher: "Vercel",
  openGraph: {
    title: "MRC Careers – International Job Recruitment Agency",
    description:
      "Leading international job recruitment agency connecting talented professionals with overseas career opportunities. Find your dream job abroad with comprehensive placement and support services.",
    url: "https://www.mrccareers.org", // Replace with your actual domain
    siteName: "MRC Careers",
    images: [
      {
        url: "/placeholder-logo.png", // Use your actual logo/image path
        width: 800,
        height: 600,
        alt: "MRC Careers - International Job Recruitment Agency Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MRC Careers – International Job Recruitment Agency",
    description:
      "Leading international job recruitment agency connecting talented professionals with overseas career opportunities. Find your dream job abroad with comprehensive placement and support services.",
    images: ["/placeholder-logo.png"], // Use your actual logo/image path
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
