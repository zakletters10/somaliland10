import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import Script from 'next/script';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://somaliland.so'),
  title: "SOMALILAND.SO | Live Election Results & Analysis 2024",
  description: "Live Somaliland presidential election results and real-time vote counting. Track leading candidates and election progress. Trusted by 500,000+ viewers for accurate, instant updates.",
  keywords: [
    'Somaliland election results', 
    'Somaliland 2024 election',
    'Somaliland president',
    'Somaliland live results',
    'Somaliland vote count',
    'Somaliland presidential election',
    'Somaliland election tracker',
    'Horn of Africa elections'
  ],
  openGraph: {
    title: "SOMALILAND.SO | Live Election Results 2024",
    description: "Track Somaliland's presidential election results in real-time. See live vote counting and leading candidates. Join 500,000+ viewers following the election.",
    url: 'https://somaliland.so',
    siteName: 'SOMALILAND.SO',
    type: 'website',
    images: [
      {
        url: '/images/flag.png',
        width: 1200,
        height: 630,
        alt: 'Somaliland Presidential Election Results 2024',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Live: Somaliland Presidential Election Results 2024",
    description: "Real-time election results and vote counting. See who's leading Somaliland's presidential race.",
    images: ['/images/flag.png'],
    site: '@YourTwitterHandle', // Add if you have one
  },
  verification: {
    google: 'LtLwGu6uGK4Krkp6YXYkKRQgV03XXzKAepYPMA7td5o',
  },
  alternates: {
    canonical: 'https://somaliland.so',
  },
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
  authors: [
    { name: 'SOMALILAND.SO' }
  ],
  category: 'Elections',
  classification: 'Election Results',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Somaliland Presidential Election Results 2024",
              "description": "Live election results and real-time vote counting for Somaliland's presidential election",
              "publisher": {
                "@type": "Organization",
                "name": "SOMALILAND.SO",
                "url": "https://somaliland.so"
              },
              "isPartOf": {
                "@type": "WebSite",
                "name": "SOMALILAND.SO",
                "url": "https://somaliland.so"
              },
              "primaryImageOfPage": {
                "@type": "ImageObject",
                "url": "https://somaliland.so/images/flag.png"
              },
              "datePublished": "2024-01-01T00:00:00+00:00",
              "dateModified": new Date().toISOString(),
              "about": {
                "@type": "Event",
                "name": "Somaliland Presidential Election 2024",
                "startDate": "2024-01-01",
                "location": {
                  "@type": "Country",
                  "name": "Somaliland"
                }
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <Script
          src="https://cdn.counter.dev/script.js"
          data-id="0224d9d4-058c-4bc0-82ce-99c4c977385d"
          data-utcoffset="2"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
