"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPublicHosts, PublicHost } from "@/lib/host.service";

export default function HostProfilePage() {
  const { slug } = useParams();
  const [host, setHost] = useState<PublicHost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const hosts = await getPublicHosts();
      const found = hosts.find((h) => h.slug === slug);
      setHost(found ?? null);
      setLoading(false);
    };

    load();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center tracking-[0.35em] text-sm opacity-60">
        INVOKING THE GOD…
      </main>
    );
  }

  if (!host) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="opacity-60">HOST NOT FOUND</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Navbar />

      {/* ================= HERO PROFILE ================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: `url(${host.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 100%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Aura */}
        <div
          className={`absolute inset-0 blur-3xl opacity-30 ${
            host.aura ??
            "bg-gradient-to-b from-red-800/40 via-transparent to-transparent"
          }`}
        />

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
            {host.goddessName}
          </p>

          <p className="mt-10 text-base opacity-85 leading-relaxed">
            {host.description}
          </p>

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
