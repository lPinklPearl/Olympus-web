"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getPublicHosts, PublicHost } from "@/lib/host.service";

export default function HostsPage() {
  const [hosts, setHosts] = useState<PublicHost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getPublicHosts();
      setHosts(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white px-6 py-32">
      <Navbar />

      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-24"
      >
        <h1 className="text-4xl md:text-5xl font-serif tracking-[0.35em] text-[#e6c36a] mb-6">
          THE HOSTS OF OLYMPUS
        </h1>
        <p className="opacity-75 max-w-2xl mx-auto leading-relaxed">
          เหล่าโฮสต์ผู้สวมบทเทพ  
          ผู้เฝ้าขอบเขต สนทนา และพิธีกรรมแห่งรัตติกาล
        </p>
      </motion.div>

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="text-center tracking-[0.35em] text-sm opacity-60">
          INVOKING THE GODS…
        </div>
      )}

      {/* ================= GRID ================= */}
      {!loading && (
        <section
          className="
            max-w-7xl mx-auto
            grid
            gap-14
            justify-center
            [grid-template-columns:repeat(auto-fit,minmax(320px,360px))]
          "
        >
          {hosts.map((host, i) => {
            const aura =
              host.aura ??
              "from-red-800/30 via-transparent to-transparent";

            return (
              <motion.div
                key={host.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                whileHover={{ y: -12 }}
                className="relative group mx-auto"
              >
                {/* Aura */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${aura}
                  opacity-0 group-hover:opacity-100 transition duration-700 blur-3xl`}
                />

                {/* Card */}
                <div
                  className="
                    w-[360px]
                    bg-black/70
                    border border-[#e6c36a]/20
                    rounded-3xl
                    overflow-hidden
                    backdrop-blur-md
                    shadow-[0_0_40px_rgba(230,195,106,0.08)]
                    group-hover:shadow-[0_0_80px_rgba(180,30,30,0.35)]
                    transition-all duration-700
                  "
                >
                  {/* Image */}
                  <div className="h-72 overflow-hidden">
                    <img
                      src={host.image}
                      alt={host.name}
                      className="w-full h-full object-cover scale-105
                      group-hover:scale-110 transition duration-700 object-top"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 text-center">
                    <h2 className="font-serif text-2xl tracking-widest text-[#e6c36a] mb-2">
                      {host.name}
                    </h2>

                    <p className="text-xs uppercase tracking-[0.3em] text-red-300/80 mb-4">
                      {host.goddessName}
                    </p>

                    <p className="italic opacity-80 mb-6 text-sm leading-relaxed">
                      “{host.description}”
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </section>
      )}
    </main>
  );
}
