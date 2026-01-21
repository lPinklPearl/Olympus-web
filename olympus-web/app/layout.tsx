import type { Metadata } from "next";
import { Geist, Geist_Mono, Kanit } from "next/font/google";
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

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oympus VRChat World",
  description: "OLYMPUS คือดินแดนแห่งรัตติกาลที่ซึ่งเหล่าโฮสต์สวมบทเทพ เพื่อมอบการสนทนา เสน่ห์ และประสบการณ์ภายใต้กรอบของ ความเคารพและขอบเขตเราเชื่อว่า ความลุ่มลึกเกิดจากบทสนทนาเสน่ห์เกิดจากการวางตัว และความพิเศษเกิดจากการคู่ควร 𝙊𝙇𝙔𝙈𝙋𝙐𝙎 ไม่ใช่พื้นที่ของความวุ่นวาย ไม่ใช่สถานที่ไร้ขอบเขตและไม่ใช่ที่สำหรับผู้ที่ไม่เคารพผู้อื่น",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Pridi:wght@400;600;700&family=Sarabun:wght@300;400;600;700&display=swap" rel="stylesheet"/>

      </head>
      {/* <body
        className={`${geistSans.variable} ${cinzel.className} ${geistMono.variable} antialiased`}
      > */}
      <body className={kanit.className}>
        {children}
      </body>
    </html>
  );
}
