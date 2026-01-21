"use client";

import { useState } from "react";
import {
  motion,
  easeOut,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Navbar from "@/components/Navbar";
import CursorGlow from "@/components/CursorGlow";
import router from "next/router";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: easeOut },
  },
};

export default function Home() {
  /* ======================
     HOOKS (ต้องอยู่ตรงนี้)
  ====================== */
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 140]);

  const [ritual, setRitual] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white overflow-x-hidden">
      <Navbar />
      <CursorGlow />

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="relative flex items-center justify-center h-screen overflow-hidden bg-black"
      >
        {/* BACKGROUND PARALLAX */}
        <motion.div
          style={{
            y: bgY,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitMaskImage: `
              linear-gradient(
                to bottom,
                rgba(0,0,0,1) 0%,
                rgba(0,0,0,1) 50%,
                rgba(0,0,0,0.6) 70%,
                rgba(0,0,0,0.15) 85%,
                rgba(0,0,0,0) 110%
              )
            `,
            maskImage: `
              linear-gradient(
                to bottom,
                rgba(0,0,0,1) 0%,
                rgba(0,0,0,1) 50%,
                rgba(0,0,0,0.6) 70%,
                rgba(0,0,0,0.15) 85%,
                rgba(0,0,0,0) 110%
              )
            `,
          }}
          className="absolute inset-0 scale-110"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/70" />

        {/* HERO CONTENT */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative z-20 max-w-3xl px-6 text-center"
        >
          <h1 className="font-title text-5xl md:text-6xl font-serif tracking-[0.35em] text-[#e6c36a]">
            OLYMPUS
          </h1>

          <p className="mt-6 text-lg opacity-90">
            A VRChat Social World of Gods & Boundaries
          </p>

          <p className="mt-2 text-sm opacity-70 italic">
            Walk among the gods. With respect.
          </p>

          {/* RITUAL BUTTON */}
          <motion.button
  onClick={() => {
    setRitual(true);
    setTimeout(() => {
      //  router.push("/hosts") //หรือเปิด modal
      window.location.href = "/hosts";
    }, 1600);
  }}
  initial={false}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.97 }}
  animate={{
    boxShadow: ritual
      ? "0 0 140px rgba(230,195,106,0.85)"
      : "0 0 60px rgba(200,161,74,0.35)",
  }}
  transition={{
    boxShadow: {
      type: "spring",
      stiffness: 120,
      damping: 22,
    },
    scale: {
      type: "spring",
      stiffness: 260,
      damping: 18,
    },
  }}
  className="relative mt-10 px-14 py-4 rounded-full
  bg-gradient-to-r from-[#b18b2e] via-[#e6c36a] to-[#c8a14a]
  text-black font-semibold tracking-widest overflow-hidden"
>
  <AnimatePresence mode="wait">
    {!ritual ? (
      <motion.span
        key="book"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        BOOK YOUR JOURNEY
      </motion.span>
    ) : (
      <motion.span
        key="ritual"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="tracking-widest"
      >
        THE GODS ARE WATCHING…
      </motion.span>
    )}
  </AnimatePresence>
</motion.button>

        </motion.div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-32">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-center text-3xl md:text-4xl font-serif tracking-widest text-yellow-300 mb-16">
            ABOUT OLYMPUS
          </h2>

          <motion.div
  whileHover={{
    y: -6,
    boxShadow: "0 0 45px rgba(230,195,106,0.25)",
  }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="bg-gradient-to-b from-black/70 to-black/40
  border border-yellow-400/20
  rounded-3xl p-12 backdrop-blur-md
  leading-relaxed text-center"
>
  <p className="opacity-90 mb-6">
    <span className="font-serif text-yellow-400 tracking-wider">
      OLYMPUS
    </span>{" "}
    คือดินแดนศักดิ์สิทธิ์แห่งรัตติกาล
    ที่ซึ่งเหล่าโฮสต์สวมบทเทพ เพื่อมอบการสนทนา เสน่ห์ และประสบการณ์
    ภายใต้กรอบของ{" "}
    <span className="text-yellow-300">
      ความเคารพและขอบเขต
    </span>
  </p>

  <p className="opacity-85 mb-6">
    เราเชื่อว่า{" "}
    <span className="text-yellow-300">ความลุ่มลึก</span>{" "}
    เกิดจากบทสนทนา{" "}
    <span className="text-yellow-300">เสน่ห์</span>{" "}
    เกิดจากการวางตัว และ{" "}
    <span className="text-yellow-300">ความพิเศษ</span>{" "}
    เกิดจากการคู่ควร
  </p>

  <p className="opacity-75">
    OLYMPUS ไม่ใช่พื้นที่ของความวุ่นวาย
    ไม่ใช่สถานที่ไร้ขอบเขต
    และไม่ใช่ที่สำหรับผู้ที่ไม่เคารพผู้อื่น
  </p>
</motion.div>

        </motion.div>
      </section>

      {/* ================= RULES ================= */}
      <section id="rules" className="max-w-6xl mx-auto px-6 py-28">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-center text-3xl md:text-4xl font-serif tracking-widest text-yellow-300 mb-4">
            OLYMPIAN LAW
          </h2>
          <p className="text-center text-sm opacity-70 mb-16">
            กฎแห่งสภาเทพ · World Rules of Olympus
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                title: "I. เกียรติแห่งเทพ",
                text: "เคารพโฮสต์และผู้อื่น ห้ามปั่น ดราม่า ดูหมิ่น หรือสร้างความวุ่นวาย",
                color: "yellow",
              },
              {
                title: "II. ขอบเขตศักดิ์สิทธิ์",
                text: "โฮสต์คือผู้ให้บริการ มิใช่ทรัพย์สิน หากโฮสต์ปฏิเสธ — ต้องหยุดทันที",
                color: "yellow",
              },
              {
                title: "III. พันธสัญญาแห่งกาม",
                text: "Roleplay & Entertainment เท่านั้น ❌ ห้าม ERP / ลวนลาม / คุกคาม",
                color: "yellow",
              },
              {
                title: "IV. กฎอวตาร์แห่งโอลิมปัส",
                text: "Polygon ≤ 180,000 · ห้าม Effects แสงและเสียง",
                color: "yellow",
              },
              {
                title: "V. ความลับแห่งเทพ",
                text: "ห้ามถ่ายภาพ อัดเสียง วิดีโอ หรือสตรีม โดยไม่ได้รับอนุญาต",
                color: "yellow",
              },
              {
                title: "VI. โทษทัณฑ์จากเหล่าทวยเทพ",
                text: "⚠️ เตือน / 🚪 เตะ / ⛔ แบน ทันที การตัดสินถือเป็นที่สิ้นสุด",
                color: "red",
              },
            ].map((rule, i) => (
              <motion.div
                key={i}
                whileHover={{
                  y: -8,
                  boxShadow:
                    rule.color === "red"
                      ? "0 0 40px rgba(220,38,38,0.4)"
                      : "0 0 50px rgba(230,195,106,0.35)",
                }}
                transition={{ duration: 0.6 }}
                className={`rounded-2xl p-8 bg-black/70 border
                ${
                  rule.color === "red"
                    ? "border-red-600/40 text-red-200"
                    : "border-yellow-400/20"
                }`}
              >
                <h3
                  className={`text-xl mb-3 ${
                    rule.color === "red"
                      ? "text-red-300"
                      : "text-yellow-300"
                  }`}
                >
                  {rule.title}
                </h3>
                <p className="text-sm opacity-85 leading-relaxed">
                  {rule.text}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs opacity-50 mt-16 italic">
            โอลิมปัสคือแดนศักดิ์สิทธิ์ มิใช่ที่แบกภาระของผู้ไร้การควบคุม
          </p>
        </motion.div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center py-12 text-xs opacity-50 tracking-widest">
        © 2026 OLYMPUS · ALL GODS RESERVED
      </footer>
    </main>
  );
}
