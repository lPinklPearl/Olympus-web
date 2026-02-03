"use client";

import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getPublicHosts, PublicHost } from "@/lib/host.service";

type HostType =
  | "All"
  | "The Fallen"
  | "The Radiant"
  | "The Cupid"
  | "Chalice Master"
  | "Guardians";

const TYPE_OPTIONS: Array<{
  value: HostType;
  label: string;
  ring: string; // tailwind ring color class
  aura: string; // tailwind gradient class
}> = [
  {
    value: "All",
    label: "All Hosts",
    ring: "ring-[#e6c36a]/60",
    aura: "from-[#e6c36a]/25 via-transparent to-transparent",
  },
  {
    value: "The Fallen",
    label: "The Fallen",
    ring: "ring-red-500/70",
    aura: "from-red-900/35 via-black/20 to-transparent",
  },
  {
    value: "The Radiant",
    label: "The Radiant",
    ring: "ring-yellow-400/70",
    aura: "from-yellow-700/25 via-transparent to-transparent",
  },
  {
    value: "The Cupid",
    label: "The Cupid",
    ring: "ring-pink-500/70",
    aura: "from-pink-700/25 via-transparent to-transparent",
  },
  {
    value: "Chalice Master",
    label: "Chalice Master",
    ring: "ring-blue-500/70",
    aura: "from-blue-700/25 via-black/15 to-transparent",
  },
  {
    value: "Guardians",
    label: "Guardians",
    ring: "ring-purple-500/70",
    aura: "from-purple-700/25 via-transparent to-transparent",
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function HostsPage() {
  const [hosts, setHosts] = useState<PublicHost[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedType, setSelectedType] = useState<HostType>("All");

  useEffect(() => {
    const load = async () => {
      const data = await getPublicHosts();
      setHosts(data);
      setLoading(false);
    };
    load();
  }, []);

  const filteredHosts = useMemo(() => {
    if (selectedType === "All") return hosts;

    // ใน DB เราเก็บ host.title เป็น HostType เช่น "The Radiant"
    return hosts.filter((h: any) => String(h?.title ?? "") === selectedType);
  }, [hosts, selectedType]);

  const selectedMeta =
    TYPE_OPTIONS.find((t) => t.value === selectedType) ?? TYPE_OPTIONS[0];

    const getTypeMetaByHost = (host: PublicHost) => {
  const t = String((host as any)?.title ?? ""); // ใน DB เก็บ title = HostType
  return (
    TYPE_OPTIONS.find((x) => x.value === (t as HostType)) ??
    TYPE_OPTIONS[0] // fallback = All
  );
};
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white px-6 py-32">
      <Navbar />

      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-serif tracking-[0.35em] text-[#e6c36a] mb-6">
          THE HOSTS OF OLYMPUS
        </h1>
        <p className="opacity-75 max-w-2xl mx-auto leading-relaxed">
          เหล่าโฮสต์ผู้สวมบทเทพ ผู้เฝ้าขอบเขต สนทนา และพิธีกรรมแห่งรัตติกาล
        </p>
      </motion.div>

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="text-center tracking-[0.35em] text-sm opacity-60">
          INVOKING THE GODS…
        </div>
      )}

      {/* ================= FILTER + GRID WRAP ================= */}
      {!loading && (
        <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[340px_1fr] items-start">
          {/* ================= FILTER PANEL ================= */}
          <div className="relative">
            {/* gold glow */}
            <div className="pointer-events-none absolute -inset-6 rounded-[30px] bg-gradient-to-b from-[#e6c36a]/18 via-transparent to-transparent blur-3xl opacity-55" />

            <div
              className="
                relative
                rounded-[30px]
                border border-[#e6c36a]/18
                bg-gradient-to-b from-[#2a0b0c]/55 via-black/55 to-black/70
                backdrop-blur-md
                shadow-[0_30px_90px_rgba(0,0,0,0.75)]
                overflow-hidden
              "
            >
              {/* subtle inner shine */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e6c36a]/[0.05] to-transparent" />

              <div className="relative p-6">
                <div className="text-[#e6c36a] font-serif text-2xl tracking-[0.22em] text-center">
                  TYPE HOST
                </div>

                {/* Mobile: dropdown */}
                <div className="mt-6 lg:hidden">
                  <div className="text-xs tracking-[0.35em] text-[#e6c36a]/70 mb-2">
                    SELECT TYPE
                  </div>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as HostType)}
                    className="
                      w-full rounded-2xl px-5 py-4
                      bg-black/55 border border-[#e6c36a]/15
                      text-[#f2d892] outline-none
                      focus:border-[#e6c36a]/40 focus:ring-2 focus:ring-[#e6c36a]/10
                    "
                  >
                    {TYPE_OPTIONS.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Desktop: list like the reference */}
                <div className="mt-6 hidden lg:block">
                  <div className="divide-y divide-white/10 border border-white/10 rounded-[22px] overflow-hidden">
                    {TYPE_OPTIONS.filter((t) => t.value !== "All").map((t) => {
                      const active = selectedType === t.value;
                      return (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => setSelectedType(t.value)}
                          className={cn(
                            "w-full flex items-center gap-5 px-6 py-6 text-left relative",
                            "bg-black/40 hover:bg-black/55 transition",
                            active && "bg-black/65"
                          )}
                        >
                          {/* aura glow behind when active */}
                          {active ? (
                            <span
                              className={cn(
                                "pointer-events-none absolute -inset-10 blur-3xl opacity-70",
                                "bg-gradient-to-b",
                                t.aura
                              )}
                            />
                          ) : null}

                          {/* ring */}
                          <span
                            className={cn(
                              "relative w-6 h-6 rounded-full ring-4 bg-black/30",
                              t.ring,
                              active && "shadow-[0_0_30px_rgba(230,195,106,0.18)]"
                            )}
                          />

                          <span className="relative text-2xl text-white/90">
                            {t.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* All button */}
                  <button
                    type="button"
                    onClick={() => setSelectedType("All")}
                    className={cn(
                      "mt-5 w-full px-6 py-4 rounded-full border",
                      selectedType === "All"
                        ? "border-[#e6c36a]/45 text-black bg-gradient-to-r from-[#b18b2e] via-[#e6c36a] to-[#c8a14a]"
                        : "border-[#e6c36a]/20 text-[#e6c36a] hover:bg-[#e6c36a]/10"
                    )}
                  >
                    <span className="tracking-[0.35em] text-xs uppercase">
                      {selectedType === "All" ? "SHOWING ALL" : "SHOW ALL"}
                    </span>
                  </button>
                </div>

                {/* Selected badge */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-xs tracking-[0.35em] text-[#e6c36a]/70 uppercase">
                    Selected
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "w-4 h-4 rounded-full ring-4 bg-black/30",
                        selectedMeta.ring
                      )}
                    />
                    <span className="text-[#f2d892]/90 tracking-widest">
                      {selectedType === "All" ? "All Hosts" : selectedType}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= GRID ================= */}
          <div>
            <div className="mb-8 flex items-center justify-between">
              <div className="text-[#e6c36a]/70 tracking-[0.28em] uppercase text-sm">
                Results: {filteredHosts.length}
              </div>
              <div className="text-xs tracking-[0.35em] text-[#e6c36a]/60 uppercase">
                Filter: {selectedType === "All" ? "None" : selectedType}
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              <motion.section
                layout
                className="
                  grid
                  gap-14
                  justify-center
                  [grid-template-columns:repeat(auto-fit,minmax(320px,360px))]
                "
              >
                {filteredHosts.map((host, i) => {
                  const aura =
                    host.aura ?? "from-red-800/30 via-transparent to-transparent";

                  const slug =
                    (host as any).slug ??
                    (host as any).id; // fallback กันพัง

                  return (
                    <motion.div
                      layout
                      key={(host as any).id ?? slug}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.45, delay: i * 0.03 }}
                      whileHover={{ y: -12 }}
                      className="relative group mx-auto"
                    >
                      {/* Aura */}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-3xl blur-3xl transition duration-700",
                          "bg-gradient-to-b",
                          aura,
                          "opacity-0 group-hover:opacity-100"
                        )}
                      />
                      {(() => {
  const meta = getTypeMetaByHost(host);
  const show = meta.value !== "All";

  return show ? (
    <div className="absolute left-5 top-5 z-30 pointer-events-none">
      {/* ===== OUTER AURA (ฟุ้งใหญ่) ===== */}
      <div
        className={cn(
          "absolute -inset-6 rounded-full blur-2xl opacity-70 transition duration-700",
          "bg-gradient-to-b",
          meta.aura,
          "group-hover:opacity-100"
        )}
      />

      {/* ===== INNER GLOW ===== */}
      <div
        className={cn(
          "absolute -inset-2 rounded-full blur-md opacity-80",
          "bg-gradient-to-b",
          meta.aura
        )}
      />

      {/* ===== CORE RING ===== */}
      <div
        className={cn(
          "relative w-6 h-6 rounded-full ring-4 bg-black/40",
          meta.ring,
          "shadow-[0_0_22px_rgba(230,195,106,0.35)]",
          "transition duration-500 group-hover:scale-110"
        )}
        title={meta.label}
        aria-label={meta.label}
      />
    </div>
  ) : null;
})()}

                      {/* Card */}
                      <Link href={`/hosts/${slug}`} className="block">
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
                            cursor-pointer
                          "
                        >
                          <div className="h-72 overflow-hidden">
                            <img
                              src={host.image}
                              alt={host.name}
                              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-700 object-top"
                            />
                          </div>

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

                            <div className="flex justify-center">
                              <span
                                className="
                                  inline-block
                                  px-6 py-2
                                  text-xs
                                  tracking-[0.35em]
                                  uppercase
                                  border border-[#e6c36a]/40
                                  text-[#e6c36a]
                                  rounded-full
                                  transition-all
                                  duration-500
                                  group-hover:bg-[#e6c36a]
                                  group-hover:text-black
                                "
                              >
                                View Profile
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.section>
            </AnimatePresence>
          </div>
        </div>
      )}
    </main>
  );
}
