"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getPublicHosts, PublicHost } from "@/lib/host.service";

type HostProfileExtras = {
  title: string; // HOST (The Radiant)
  status: {
    conversation: number;
    funVibe: number;
    seductiveCharm: number;
  };
  speakingStyle: Array<{ label: string; checked: boolean }>;
  clientFit: Array<{ label: string; checked: boolean }>;
  messageToClient: string;
  boundaries: string;
  notes: string;
};

const DEFAULT_STYLE = [
  { label: "สุภาพ นุ่มนวล", checked: true },
  { label: "ขี้เล่น เป็นกันเอง", checked: false },
  { label: "ลึกลับ เงียบขรึม", checked: false },
  { label: "อ่อนหวาน ใจดี", checked: true },
];

const DEFAULT_CLIENT = [
  { label: "ชอบคุยสบาย ๆ", checked: true },
  { label: "ชอบบทสนทนา deep talk", checked: true },
  { label: "ลูกค้าใหม่ / ขี้อาย", checked: false },
  { label: "ลูกค้าสายดื่ม ชอบความเย้ายวน", checked: true },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function CheckBox({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-5 h-5 rounded-[6px] border",
        checked
          ? "bg-emerald-500/15 border-emerald-400/60"
          : "bg-black/40 border-[#e6c36a]/25"
      )}
      aria-hidden="true"
    >
      {checked ? (
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          className="text-emerald-300"
        >
          <path
            d="M16.5 5.5L8.3 14.2L3.5 9.4"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </span>
  );
}

function StatBar({ label, value }: { label: string; value: number }) {
  const v = clamp(value);

  return (
    <div className="flex items-center gap-4">
      <div className="w-44 text-sm tracking-wide text-[#e6c36a]/90">
        • {label}
      </div>

      <div className="flex-1">
        <div className="h-3 rounded-full bg-black/50 border border-[#e6c36a]/15 overflow-hidden shadow-[inset_0_0_16px_rgba(0,0,0,0.65)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#b18b2e] via-[#e6c36a] to-[#c8a14a]"
            style={{ width: `${v}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function HostProfilePage() {
  const params = useParams();
  const slug = (params?.slug as string) ?? "";

  const [host, setHost] = useState<PublicHost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    const load = async () => {
      setLoading(true);
      try {
        const hosts = await getPublicHosts();
        const found = hosts.find((h: any) => String(h.slug) === String(slug));
        if (!alive) return;
        setHost(found ?? null);
      } finally {
        if (alive) setLoading(false);
      }
    };

    if (slug) load();

    return () => {
      alive = false;
    };
  }, [slug]);

  const extras: HostProfileExtras = useMemo(() => {
    const h: any = host ?? {};

    // ✅ title: เก็บใน DB เป็น "The Radiant" แล้วโชว์เป็น HOST (The Radiant)
    const typeText =
      (typeof h.title === "string" && h.title.trim()) || "The Radiant";

    // ✅ status
    const status = {
      conversation: clamp(Number(h.status?.conversation ?? 0)),
      funVibe: clamp(Number(h.status?.funVibe ?? 0)),
      seductiveCharm: clamp(Number(h.status?.seductiveCharm ?? 0)),
    };

    // ถ้า status ทั้งหมดเป็น 0 และไม่มีใน DB → ใส่ default ให้ “ดูไม่ว่างเปล่า”
    const hasStatus =
      h.status &&
      (h.status.conversation != null ||
        h.status.funVibe != null ||
        h.status.seductiveCharm != null);

    const finalStatus = hasStatus
      ? status
      : { conversation: 78, funVibe: 62, seductiveCharm: 88 };

    // ✅ fixed 4 items (จาก DB ถ้ามี)
    const speaking =
      Array.isArray(h.speakingStyle) && h.speakingStyle.length > 0
        ? h.speakingStyle.slice(0, 4).map((x: any, i: number) => ({
            label: String(x?.label ?? DEFAULT_STYLE[i]?.label ?? `Item ${i + 1}`),
            checked: Boolean(x?.checked),
          }))
        : DEFAULT_STYLE;

    const clientFit =
      Array.isArray(h.clientFit) && h.clientFit.length > 0
        ? h.clientFit.slice(0, 4).map((x: any, i: number) => ({
            label: String(
              x?.label ?? DEFAULT_CLIENT[i]?.label ?? `Item ${i + 1}`
            ),
            checked: Boolean(x?.checked),
          }))
        : DEFAULT_CLIENT;

    const messageToClient =
      (typeof h.messageToClient === "string" && h.messageToClient.trim()) ||
      "หวังว่าในบทสนทนาของเราจะทำให้คุณรู้สึกดีไม่มากก็น้อย";

    const boundaries =
      (typeof h.boundaries === "string" && h.boundaries.trim()) || "ไม่มีค่ะ";

    const notes = (typeof h.notes === "string" && h.notes.trim()) || "-";

    return {
      title: `HOST (${typeText})`,
      status: finalStatus,
      speakingStyle: speaking,
      clientFit,
      messageToClient,
      boundaries,
      notes,
    };
  }, [host]);

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

  const aura = host.aura ?? "from-red-800/35 via-transparent to-transparent";

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Navbar />

      {/* ================= BACKDROP ================= */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: `url(${host.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(14px) saturate(1.1)",
            transform: "scale(1.15)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/75 to-black" />
        <div
          className={cn("absolute inset-0 blur-3xl opacity-35", "bg-gradient-to-b", aura)}
        />

        {/* ================= CONTENT WRAP ================= */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="grid gap-10 lg:grid-cols-[420px_1fr] items-start"
          >
            {/* ================= LEFT PANEL ================= */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-b from-[#e6c36a]/25 via-transparent to-transparent blur-2xl opacity-60" />

              <div
                className="
                  relative
                  rounded-[28px]
                  border border-[#e6c36a]/20
                  bg-gradient-to-b from-[#2a0b0c]/70 via-black/55 to-black/70
                  backdrop-blur-md
                  shadow-[0_30px_80px_rgba(0,0,0,0.65)]
                  overflow-hidden
                "
              >
                {/* Image */}
                <div className="p-6">
                  <div className="relative rounded-2xl overflow-hidden border border-[#e6c36a]/15 bg-black/50">
                    <img
                      src={host.image}
                      alt={host.name}
                      className="w-full h-[320px] object-cover object-top scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-[#e6c36a]/10" />
                  </div>
                </div>

                {/* Name block */}
                <div className="px-7 pb-6">
                  <div className="text-[#e6c36a] font-serif text-4xl tracking-[0.24em]">
                    {host.name}
                  </div>
                  <div className="mt-2 text-[#e6c36a]/70 tracking-widest uppercase">
                    {extras.title}
                  </div>

                  <div className="mt-8">
                    <div className="text-[#e6c36a] font-serif text-3xl tracking-[0.22em]">
                      HOST STATUS
                    </div>

                    <div className="mt-6 space-y-4">
                      <StatBar label="Conversation" value={extras.status.conversation} />
                      <StatBar label="Fun Vibe" value={extras.status.funVibe} />
                      <StatBar label="Seductive Charm" value={extras.status.seductiveCharm} />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.25 }}
                    className="
                      mt-10 w-full
                      px-6 py-4 rounded-full
                      bg-gradient-to-r from-[#b18b2e] via-[#e6c36a] to-[#c8a14a]
                      text-black font-semibold tracking-[0.28em]
                      shadow-[0_0_60px_rgba(200,161,74,0.35)]
                      hover:shadow-[0_0_90px_rgba(200,161,74,0.55)]
                    "
                  >
                    REQUEST AUDIENCE
                  </motion.button>
                </div>
              </div>
            </div>

            {/* ================= RIGHT PANEL ================= */}
            <div className="relative">
              <div
                className="
                  relative
                  rounded-[28px]
                  border border-[#e6c36a]/18
                  bg-gradient-to-b from-[#2a0b0c]/70 via-black/60 to-black/75
                  backdrop-blur-md
                  shadow-[0_30px_90px_rgba(0,0,0,0.7)]
                  overflow-hidden
                "
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e6c36a]/[0.05] to-transparent" />

                <div className="relative p-8 md:p-10">
                  <div className="absolute left-6 top-10 bottom-10 w-[2px] bg-gradient-to-b from-[#e6c36a] via-[#e6c36a]/40 to-[#e6c36a]/10" />
                  <div className="absolute left-[17px] top-10 w-5 h-5 rounded-full bg-[#e6c36a] shadow-[0_0_25px_rgba(230,195,106,0.55)]" />
                  <div className="absolute left-[17px] top-[40%] w-5 h-5 rounded-full bg-[#e6c36a]/90 shadow-[0_0_25px_rgba(230,195,106,0.45)]" />
                  <div className="absolute left-[17px] top-[70%] w-5 h-5 rounded-full bg-[#e6c36a]/80 shadow-[0_0_25px_rgba(230,195,106,0.35)]" />

                  <div className="pl-10 space-y-10">
                    <div>
                      <div className="text-[#e6c36a] font-serif text-4xl tracking-[0.12em]">
                        สไตล์การพูดคุยของคุณ
                      </div>

                      <div className="mt-6 space-y-3">
                        {extras.speakingStyle.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-lg">
                            <CheckBox checked={item.checked} />
                            <span className="text-[#f2d892]">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-[#e6c36a] font-serif text-4xl tracking-[0.12em]">
                        เหมาะกับลูกค้าสไตล์ใด
                      </div>

                      <div className="mt-6 space-y-3">
                        {extras.clientFit.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-lg">
                            <CheckBox checked={item.checked} />
                            <span className="text-[#f2d892]">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <div className="text-[#e6c36a] font-serif text-4xl tracking-[0.12em]">
                          ข้อความถึงลูกค้า
                        </div>
                        <div className="mt-4 text-lg text-[#f2d892]/90 leading-relaxed">
                          : {extras.messageToClient}
                        </div>
                      </div>

                      <div>
                        <div className="text-[#e6c36a] font-serif text-4xl tracking-[0.12em]">
                          ขอบเขตที่ไม่สะดวกให้บริการ
                        </div>
                        <div className="mt-4 text-lg text-[#f2d892]/90 leading-relaxed">
                          : {extras.boundaries}
                        </div>
                      </div>

                      <div>
                        <div className="text-[#e6c36a] font-serif text-4xl tracking-[0.12em]">
                          หมายเหตุเพิ่มเติม
                        </div>
                        <div className="mt-4 text-lg text-[#f2d892]/90 leading-relaxed">
                          : {extras.notes}
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="text-[#e6c36a]/70 tracking-[0.28em] uppercase text-sm">
                          {host.goddessName}
                        </div>
                        <div className="mt-3 text-[#f2d892]/75 italic leading-relaxed">
                          “{host.description}”
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute -inset-6 rounded-[34px] bg-gradient-to-b from-[#e6c36a]/20 via-transparent to-transparent blur-3xl opacity-40" />
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
