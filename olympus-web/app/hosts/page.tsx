"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const hosts = [
  {
    id: 1,
    slug: "athena",
    name: "ATHENA",
    title: "Goddess of Wisdom",
    quote: "บทสนทนาคือศิลปะ ไม่ใช่เสียงดัง",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800",
    aura: "from-red-700/30 via-transparent to-transparent",
  },
  {
    id: 2,
    slug: "aphrodite",
    name: "APHRODITE",
    title: "Goddess of Desire",
    quote: "เสน่ห์ที่แท้จริง ไม่ต้องเร่งรีบ",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800",
    aura: "from-rose-600/30 via-transparent to-transparent",
  },
  {
    id: 3,
    slug: "hades",
    name: "HADES",
    title: "Lord of Depth",
    quote: "ความลึก เกิดจากความเงียบ",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800",
    aura: "from-red-900/40 via-transparent to-transparent",
  },
];

export default function HostsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white px-6 py-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-24"
      >
        <h1 className="text-4xl md:text-5xl font-serif tracking-[0.35em] text-[#e6c36a] mb-6">
          THE HOSTS OF OLYMPUS
        </h1>
        <p className="opacity-75 max-w-2xl mx-auto">
          เหล่าโฮสต์ผู้สวมบทเทพ  
          ผู้เฝ้าขอบเขต สนทนา และพิธีกรรมแห่งรัตติกาล
        </p>
      </motion.div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-14">
        {hosts.map((host, i) => (
          <motion.div
            key={host.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            whileHover={{ y: -12 }}
            className="relative group"
          >
            {/* Aura */}
            <div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${host.aura}
              opacity-0 group-hover:opacity-100 transition duration-700 blur-3xl`}
            />

            {/* Card */}
            <Link href={`/hosts/${host.slug}`} className="relative block">
              <div
                className="bg-black/70 border border-[#e6c36a]/20 rounded-3xl
                overflow-hidden backdrop-blur-md
                shadow-[0_0_40px_rgba(230,195,106,0.08)]
                group-hover:shadow-[0_0_80px_rgba(180,30,30,0.35)]
                transition-all duration-700"
              >
                {/* Image */}
                <div className="h-72 overflow-hidden">
                  <img
                    src={host.image}
                    alt={host.name}
                    className="w-full h-full object-cover scale-105
                    group-hover:scale-110 transition duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-8 text-center">
                  <h2 className="font-serif text-2xl tracking-widest text-[#e6c36a] mb-2">
                    {host.name}
                  </h2>

                  <p className="text-xs uppercase tracking-[0.3em] text-red-300/80 mb-4">
                    {host.title}
                  </p>

                  <p className="italic opacity-80 mb-6 text-sm">
                    “{host.quote}”
                  </p>

                  {/* CTA */}
                  <span
                    className="inline-block px-8 py-2 rounded-full
                    border border-[#e6c36a]/40
                    text-xs tracking-[0.35em]
                    text-[#e6c36a]
                    group-hover:bg-[#e6c36a]/10
                    transition duration-500"
                  >
                    VIEW PROFILE
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
