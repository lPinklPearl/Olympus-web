"use client";

import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0b1026] to-[#1c1f3a] text-white">
      <Navbar />

      {/* HERO */}
      <section
        id="home"
        className="relative flex items-center justify-center h-screen text-center bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/10 via-black/60 to-black/80" />

        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-5xl md:text-6xl font-serif tracking-widest">
            OLYMPUS
          </h1>
          <p className="mt-4 text-lg opacity-90">
            A VRChat Social World of Gods & Boundaries
          </p>
          <p className="mt-2 text-sm opacity-75">
            Walk among the gods. With respect.
          </p>
          <button className="mt-8 px-10 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-200 text-[#1c1f3a] font-semibold hover:scale-105 transition">
            Book Your Journey
          </button>
        </div>
      </section>

      {/* ABOUT US */}
<section
  id="about"
  className="max-w-5xl mx-auto px-6 py-28 text-center"
>
  <h2 className="text-3xl md:text-4xl font-serif text-yellow-200 mb-12 tracking-widest">
    ABOUT OLYMPUS
  </h2>

  <div className="bg-white/5 rounded-3xl p-10 md:p-14 leading-relaxed">
    <p className="text-sm md:text-base opacity-90 mb-6">
      <span className="font-serif text-yellow-300 tracking-wide">
        OLYMPUS
      </span>{" "}
      คือดินแดนแห่งรัตติกาล  
      ที่ซึ่งเหล่าโฮสต์สวมบทเทพ  
      เพื่อมอบการสนทนา เสน่ห์ และประสบการณ์  
      ภายใต้กรอบของ{" "}
      <span className="text-yellow-200">ความเคารพและขอบเขต</span>
    </p>

    <p className="text-sm md:text-base opacity-85 mb-6">
      เราเชื่อว่า{" "}
      <span className="text-yellow-200">
        ความลุ่มลึก
      </span>{" "}
      เกิดจากบทสนทนา  
      <span className="text-yellow-200">เสน่ห์</span>{" "}
      เกิดจากการวางตัว  
      และ{" "}
      <span className="text-yellow-200">
        ความพิเศษ
      </span>{" "}
      เกิดจากการคู่ควร
    </p>

    <p className="text-sm md:text-base opacity-80 mb-10">
      <span className="font-serif text-yellow-300">
        OLYMPUS
      </span>{" "}
      ไม่ใช่พื้นที่ของความวุ่นวาย  
      ไม่ใช่สถานที่ไร้ขอบเขต  
      และไม่ใช่ที่สำหรับผู้ที่ไม่เคารพผู้อื่น
    </p>

    <div className="border-t border-yellow-400/20 pt-8 mt-8">
      <p className="text-xs uppercase tracking-widest text-yellow-300 mb-2">
        Open Hours
      </p>
      <p className="text-sm opacity-75">
        Every Friday <br />
        22:00 – 00:00 (GMT+7)
      </p>
    </div>
  </div>
</section>


      {/* OLYMPIAN LAW */}
      <section id="rules" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-serif text-center text-yellow-200 mb-6">
          OLYMPIAN LAW
        </h2>
        <p className="text-center text-sm opacity-75 mb-16">
          กฎแห่งสภาเทพ · World Rules of Olympus
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white/5 border border-yellow-400/20 rounded-2xl p-8">
            <h3 className="font-serif text-yellow-300 text-xl mb-3">
              I. เกียรติแห่งเทพ
            </h3>
            <p className="text-sm opacity-85 leading-relaxed">
              เคารพโฮสต์และผู้อื่น  
              ห้ามปั่น ดราม่า ดูหมิ่น หรือสร้างความวุ่นวาย
            </p>
          </div>

          <div className="bg-white/5 border border-yellow-400/20 rounded-2xl p-8">
            <h3 className="font-serif text-yellow-300 text-xl mb-3">
              II. ขอบเขตศักดิ์สิทธิ์
            </h3>
            <p className="text-sm opacity-85 leading-relaxed">
              โฮสต์คือผู้ให้บริการ มิใช่ทรัพย์สิน  
              หากโฮสต์ปฏิเสธ — ต้องหยุดทันที
            </p>
          </div>

          <div className="bg-white/5 border border-yellow-400/20 rounded-2xl p-8">
            <h3 className="font-serif text-yellow-300 text-xl mb-3">
              III. พันธสัญญาแห่งกาม
            </h3>
            <p className="text-sm opacity-85 leading-relaxed">
              Roleplay & Entertainment เท่านั้น  
              ❌ ห้าม ERP / ลวนลาม / คุกคาม  
              บริการพิเศษต้องจองและเข้าใช้ห้อง VIP
            </p>
          </div>

          <div className="bg-white/5 border border-yellow-400/20 rounded-2xl p-8">
            <h3 className="font-serif text-yellow-300 text-xl mb-3">
              IV. กฎอวตาร์แห่งโอลิมปัส
            </h3>
            <ul className="text-sm opacity-85 list-disc list-inside space-y-1">
              <li>Polygon ≤ 180,000</li>
              <li>ห้ามอวตาร์รบกวนผู้อื่น</li>
              <li>❌ ห้ามใช้ Effects แสงและเสียง</li>
            </ul>
          </div>

          <div className="bg-white/5 border border-yellow-400/20 rounded-2xl p-8">
            <h3 className="font-serif text-yellow-300 text-xl mb-3">
              V. ความลับแห่งเทพ
            </h3>
            <p className="text-sm opacity-85 leading-relaxed">
              ห้ามถ่ายภาพ อัดเสียง วิดีโอ หรือสตรีม  
              โดยไม่ได้รับอนุญาต
            </p>
          </div>

          <div className="bg-white/5 border border-red-400/20 rounded-2xl p-8">
            <h3 className="font-serif text-red-300 text-xl mb-3">
              VI. โทษทัณฑ์จากเหล่าทวยเทพ
            </h3>
            <p className="text-sm opacity-85 leading-relaxed">
              ⚠️ เตือน / 🚪 เตะ / ⛔ แบน ทันที  
              การตัดสินของเทพสูงสุดถือเป็นที่สิ้นสุด
            </p>
          </div>
        </div>

        <p className="text-center text-xs opacity-60 mt-16 italic">
          โอลิมปัสคือแดนศักดิ์สิทธิ์ มิใช่ที่แบกภาระของผู้ไร้การควบคุม  
          ผู้ใดทำให้โลกหน่วง — ผู้นั้นจะถูกขับออก
        </p>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-sm opacity-60">
        © 2026 Olympus VRChat World · All Gods Reserved
      </footer>
    </main>
  );
}
