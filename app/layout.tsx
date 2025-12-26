import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Black & Gold New Year's Eve Gala 2026 | Luxury Celebration",
  description:
    "Join the ultimate Black & Gold New Year's Eve Gala 2026. Luxury 5-star dining, live orchestra, world-class Arab artists, and midnight countdown celebration. Limited seating available.",
  keywords: "New Year's Eve, Gala, Luxury Event, Dinner, Los Angeles, Black Tie",
  authors: [{ name: "California Nights Entertainment" }],
  openGraph: {
    title: "Black & Gold New Year's Eve Gala 2026",
    description: "A luxury celebration with fine dining, live orchestra, and world-class entertainment",
    type: "website",
    url: "https://gala-event.com",
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
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
