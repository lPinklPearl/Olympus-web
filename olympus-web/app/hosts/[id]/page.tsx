"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const host = {
  name: "APHRODITE",
  title: "Goddess of Desire",
  image:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200",
  bio: "เทพีแห่งเสน่ห์และความปรารถนา ผู้มอบบทสนทนาที่อ่อนโยน ลึกซึ้ง และเต็มไปด้วยความเคารพ ทุกการพบกันคือช่วงเวลาแห่งการเชื่อมโยงอย่างมีคุณค่า",
  traits: ["Soft Spoken", "Warm Presence", "Respectful", "Deep Conversation"],
};

export default function HostProfile() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Navbar />

      {/* HERO PROFILE */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: `url(${host.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitMaskImage: `linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 100%)`,
            maskImage: `linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 100%)`,
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="relative z-10 max-w-3xl px-6 text-center"
        >
          <h1 className="font-serif text-5xl md:text-6xl tracking-[0.35em] text-[#e6c36a]">
            {host.name}
          </h1>
          <p className="mt-4 text-sm tracking-widest text-yellow-200 uppercase">
            {host.title}
          </p>

          <p className="mt-10 text-base opacity-85 leading-relaxed">
            {host.bio}
          </p>

          {/* Traits */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {host.traits.map((trait) => (
              <span
                key={trait}
                className="px-5 py-2 text-xs tracking-widest rounded-full
                border border-yellow-400/30 text-yellow-200 bg-black/40 backdrop-blur"
              >
                {trait}
              </span>
            ))}
          </div>

          {/* Action */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="mt-16 px-14 py-4 rounded-full
            bg-gradient-to-r from-[#b18b2e] via-[#e6c36a] to-[#c8a14a]
            text-black font-semibold tracking-widest
            shadow-[0_0_60px_rgba(200,161,74,0.45)]
            hover:shadow-[0_0_90px_rgba(200,161,74,0.65)]"
          >
            REQUEST AUDIENCE
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
}
