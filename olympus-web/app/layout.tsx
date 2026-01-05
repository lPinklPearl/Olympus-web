import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Cinzel } from "next/font/google";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oympus VRChat World",
  description: "Experience the divine in Olympus VRChat World – a breathtaking virtual realm inspired by Greek mythology. Explore majestic landscapes, interact with gods, and embark on epic adventures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${cinzel.className} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
