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
  title: "Somaliland Elections 2024 | Live Results & News",
  description: "Stay updated with the latest news and live results of the Somaliland elections 2024. Trusted by over 500,000 readers for comprehensive coverage.",
  keywords: [
    'Somaliland', 
    'Somaliland elections', 
    'Somaliland news', 
    'Somaliland 2024', 
    'Somaliland election results', 
    'Somaliland political news', 
    'Somaliland democracy', 
    'Somaliland candidates'
  ],
  openGraph: {
    title: "Somaliland Elections 2024 | Live Results & News",
    description: "Get real-time updates and news on the Somaliland elections 2024. Join over 500,000 readers for the most trusted coverage.",
    url: 'https://somaliland.so',
    siteName: 'Somaliland Elections',
    type: 'website',
    images: [
      {
        url: '/images/flag.png',
        width: 1200,
        height: 630,
        alt: 'Somaliland Elections 2024',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Somaliland Elections 2024 | Live Results & News",
    description: "Real-time updates and news on the Somaliland elections 2024.",
    images: ['/images/flag.png'],
  },
  verification: {
    google: 'LtLwGu6uGK4Krkp6YXYkKRQgV03XXzKAepYPMA7td5o', // Add your Google Search Console verification code
  },
  alternates: {
    canonical: 'https://somaliland.so',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
