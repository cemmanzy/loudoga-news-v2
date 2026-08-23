import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { siteConfig } from "@/config/site";

import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  keywords: [
    "Nigeria News",
    "Politics",
    "Business",
    "Sports",
    "Technology",
    "Entertainment",
    "Breaking News",
    "Loudoga News",
  ],

  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,

    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: siteConfig.name,

    description: siteConfig.description,

    creator: siteConfig.twitter,

    images: [siteConfig.ogImage],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const measurementId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        h-full
        antialiased
      `}
    >
      <body
        className="
          min-h-screen
          bg-gray-50
          text-gray-900
          dark:bg-[#0F172A]
          dark:text-white
        "
      >
        <TopBar />

        <Header />

        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

        {/* Google Analytics */}

        {measurementId && (
          <GoogleAnalytics
            measurementId={measurementId}
          />
        )}
      </body>
    </html>
  );
}