import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { CurrencyProvider } from "@/components/CurrencyProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const carFontBoth = localFont({
  src: "../../public/fonts/BOTH CAR BRANDS FONT.otf",
  variable: "--font-car-both",
});

const carFontJapanese = localFont({
  src: "../../public/fonts/JAPANESE CAR BRAND FONT.otf",
  variable: "--font-car-japanese",
});

export const metadata: Metadata = {
  title: "Khalifa Auto | Premium Luxury Car Dealership",
  description: "Experience the pinnacle of automotive excellence at Khalifa Auto. Discover our curated collection of premium and luxury vehicles for those who demand more.",
  keywords: ["luxury cars", "premium vehicles", "car dealership", "buy luxury car", "test drive", "khalifa auto", "exotic cars", "used luxury cars"],
  authors: [{ name: "Khalifa Auto" }],
  openGraph: {
    title: "Khalifa Auto | Premium Luxury Car Dealership",
    description: "Discover our curated collection of premium and luxury vehicles for those who demand more.",
    url: "https://khalifaauto.com",
    siteName: "Khalifa Auto",
    images: [
      {
        url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Khalifa Auto Premium Dealership",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khalifa Auto | Premium Luxury Car Dealership",
    description: "Experience the pinnacle of automotive excellence at Khalifa Auto.",
    images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${carFontBoth.variable} ${carFontJapanese.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </body>
    </html>
  );
}
