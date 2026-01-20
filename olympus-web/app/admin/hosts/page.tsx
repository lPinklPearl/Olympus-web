"use client";

import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  HostData,
  getHosts,
  getHostById,
  createHost,
  updateHost,
  deleteHost,
  ensureHostDefaults,
} from "@/lib/host.service";

type HostType =
  | "The Fallen"
  | "The Radiant"
  | "The Cupid"
  | "Chalice Master"
  | "Guardians";

const HOST_TYPES: Array<{
  value: HostType;
  ring: string;
  aura: string;
}> = [
  {
    value: "The Fallen",
    ring: "ring-red-500/70",
    aura: "from-red-900/35 via-black/20 to-transparent",
  },
  {
    value: "The Radiant",
    ring: "ring-yellow-400/70",
    aura: "from-yellow-700/25 via-transparent to-transparent",
  },
  {
    value: "The Cupid",
    ring: "ring-pink-500/70",
    aura: "from-pink-700/25 via-transparent to-transparent",
  },
  {
    value: "Chalice Master",
    ring: "ring-blue-500/70",
    aura: "from-blue-700/25 via-transparent to-transparent",
  },
  {
    value: "Guardians",
    ring: "ring-blue-500/70",
    aura: "from-blue-800/25 via-transparent to-transparent",
  },
];

const AURA_PRESETS = [
  { label: "Blood Eclipse", value: "from-red-900/35 via-black/20 to-transparent" },
  { label: "Crimson Veil", value: "from-red-800/30 via-transparent to-transparent" },
  { label: "Radiant Gold", value: "from-yellow-700/25 via-transparent to-transparent" },
  { label: "Cupid Rose", value: "from-pink-700/25 via-transparent to-transparent" },
  { label: "Azure Oath", value: "from-blue-800/25 via-transparent to-transparent" },
  { label: "Deep Azure", value: "from-blue-700/25 via-black/15 to-transparent" },
];

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

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9ก-๙\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[#e6c36a] font-serif text-2xl md:text-3xl tracking-[0.12em]">
      {children}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-2xl px-5 py-4 bg-black/55 border border-[#e6c36a]/15",
        "text-[#f2d892] placeholder:text-[#f2d892]/30",
        "outline-none focus:border-[#e6c36a]/40 focus:ring-2 focus:ring-[#e6c36a]/10",
        props.className
      )}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full min-h-[120px] rounded-2xl px-5 py-4 bg-black/55 border border-[#e6c36a]/15",
        "text-[#f2d892] placeholder:text-[#f2d892]/30",
        "outline-none focus:border-[#e6c36a]/40 focus:ring-2 focus:ring-[#e6c36a]/10",
        props.className
      )}
    />
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "flex items-center justify-between w-full rounded-2xl px-5 py-4",
        "bg-black/55 border border-[#e6c36a]/15",
        "hover:border-[#e6c36a]/30 transition"
      )}
    >
      <span className="text-[#f2d892]/90 tracking-wide">{label}</span>
      <span
        className={cn(
          "relative w-12 h-7 rounded-full border transition",
          checked
            ? "bg-emerald-500/15 border-emerald-300/40"
            : "bg-black/40 border-[#e6c36a]/15"
        )}
      >
        <span
          className={cn(
            "absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full transition",
            checked ? "left-6 bg-emerald-300" : "left-1 bg-[#e6c36a]/60"
          )}
        />
      </span>
    </button>
  );
}

function Range({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-[#e6c36a]/15 bg-black/55 p-5">
      <div className="flex items-center justify-between">
        <div className="text-[#f2d892]/90 tracking-wide">{label}</div>
        <div className="text-[#e6c36a] tracking-widest">{clamp(value)}</div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={clamp(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-4 w-full"
      />
    </div>
  );
}

function ListEditor({
  title,
  items,
  onChange,
}: {
  title: string;
  items: Array<{ label: string; checked: boolean }>;
  onChange: (next: Array<{ label: string; checked: boolean }>) => void;
}) {
  const addItem = () => onChange([...items, { label: "ข้อความใหม่", checked: false }]);

  return (
    <div className="rounded-[26px] border border-[#e6c36a]/15 bg-black/55 p-6">
      <div className="flex items-center justify-between">
        <div className="text-[#e6c36a] font-serif text-xl md:text-2xl tracking-[0.1em]">
          {title}
        </div>
        <button
          type="button"
          onClick={addItem}
          className="px-4 py-2 rounded-full border border-[#e6c36a]/25 text-[#e6c36a] tracking-widest text-xs hover:bg-[#e6c36a]/10 transition"
        >
          ADD
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {items.map((it, idx) => (
          <div
            key={idx}
            className="flex gap-3 items-center rounded-2xl border border-[#e6c36a]/10 bg-black/40 p-3"
          >
            <button
              type="button"
              onClick={() => {
                const next = [...items];
                next[idx] = { ...it, checked: !it.checked };
                onChange(next);
              }}
              className={cn(
                "w-5 h-5 rounded-[6px] border flex items-center justify-center",
                it.checked
                  ? "bg-emerald-500/15 border-emerald-300/50"
                  : "bg-black/40 border-[#e6c36a]/20"
              )}
              aria-label="toggle"
            >
              {it.checked ? (
                <span className="w-2.5 h-2.5 rounded-[4px] bg-emerald-300" />
              ) : null}
            </button>

            <input
              value={it.label}
              onChange={(e) => {
                const next = [...items];
                next[idx] = { ...it, label: e.target.value };
                onChange(next);
              }}
              className="flex-1 bg-transparent outline-none text-[#f2d892] placeholder:text-[#f2d892]/30"
            />

            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== idx))}
              className="px-3 py-1 rounded-full border border-red-500/25 text-red-300 text-xs tracking-widest hover:bg-red-500/10 transition"
            >
              DEL
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModalShell({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="
              relative w-full max-w-5xl
              rounded-[30px]
              border border-[#e6c36a]/18
              bg-gradient-to-b from-[#2a0b0c]/70 via-black/60 to-black/75
              shadow-[0_30px_110px_rgba(0,0,0,0.8)]
              overflow-hidden
            "
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e6c36a]/[0.05] to-transparent" />
            <div className="relative p-6 md:p-8 flex items-center justify-between gap-3 border-b border-[#e6c36a]/10">
              <div className="text-[#e6c36a] font-serif text-2xl md:text-3xl tracking-[0.14em]">
                {title}
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-[#e6c36a]/20 text-[#e6c36a] tracking-widest text-xs hover:bg-[#e6c36a]/10 transition"
              >
                CLOSE
              </button>
            </div>

            <div className="relative p-6 md:p-8 max-h-[78vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function emptyForm(): HostData {
  const picked = HOST_TYPES.find((x) => x.value === "The Radiant");
  return {
    name: "",
    slug: "",
    active: true,
    goddessName: "",
    description: "",
    image: "",
    title: "The Radiant",
    aura: picked?.aura ?? "from-red-800/30 via-transparent to-transparent",
    order: 999,
    status: { conversation: 78, funVibe: 62, seductiveCharm: 88 },
    speakingStyle: DEFAULT_STYLE,
    clientFit: DEFAULT_CLIENT,
    messageToClient: "หวังว่าในบทสนทนาของเราจะทำให้คุณรู้สึกดีไม่มากก็น้อย",
    boundaries: "ไม่มีค่ะ",
    notes: "-",
  };
}

function FixedChecklist({
  title,
  items,
  onToggle,
}: {
  title: string;
  items: Array<{ label: string; checked: boolean }>; // ต้องมี 4 อันพอดี
  onToggle: (index: number) => void;
}) {
  return (
    <div className="rounded-[26px] border border-[#e6c36a]/15 bg-black/55 p-6">
      <div className="text-[#e6c36a] font-serif text-xl md:text-2xl tracking-[0.1em]">
        {title}
      </div>

      <div className="mt-5 space-y-3">
        {items.map((it, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onToggle(idx)}
            className="
              w-full flex items-center gap-3
              rounded-2xl border border-[#e6c36a]/10 bg-black/40
              px-4 py-3 text-left
              hover:border-[#e6c36a]/25 transition
            "
          >
            <span
              className={cn(
                "w-5 h-5 rounded-[6px] border flex items-center justify-center",
                it.checked
                  ? "bg-emerald-500/15 border-emerald-300/50"
                  : "bg-black/40 border-[#e6c36a]/20"
              )}
              aria-hidden="true"
            >
              {it.checked ? (
                <span className="w-2.5 h-2.5 rounded-[4px] bg-emerald-300" />
              ) : null}
            </span>

            <span className="text-[#f2d892] text-base">{it.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 text-xs tracking-widest text-[#e6c36a]/60">
        (Fixed list • toggle only)
      </div>
    </div>
  );
}

export default function AdminHostsPage() {
  const [hosts, setHosts] = useState<HostData[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [form, setForm] = useState<HostData>(emptyForm());
  const [saving, setSaving] = useState(false);

  const ringClass = useMemo(() => {
    const found = HOST_TYPES.find((t) => t.value === (form.title as HostType));
    return found?.ring ?? "ring-yellow-400/70";
  }, [form.title]);

  const reload = async () => {
    setLoading(true);
    try {
      const data = await getHosts();
      setHosts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  const openCreate = () => {
    setMode("create");
    setCurrentId(null);
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEdit = async (id: string) => {
    setMode("edit");
    setCurrentId(id);
    setModalOpen(true);
    setSaving(true);
    try {
      // ✅ เติม defaults ให้โฮสต์เก่าก่อนเปิดแก้
      await ensureHostDefaults(id);

      const existing: any = await getHostById(id);
      if (!existing) return;

      setForm((prev) => ({
        ...prev,
        ...(existing as any),
        status: {
          conversation: existing.status?.conversation ?? prev.status?.conversation ?? 0,
          funVibe: existing.status?.funVibe ?? prev.status?.funVibe ?? 0,
          seductiveCharm: existing.status?.seductiveCharm ?? prev.status?.seductiveCharm ?? 0,
        },
        speakingStyle: existing.speakingStyle ?? prev.speakingStyle ?? DEFAULT_STYLE,
        clientFit: existing.clientFit ?? prev.clientFit ?? DEFAULT_CLIENT,
      }));
    } finally {
      setSaving(false);
    }
  };

  const onChangeType = (t: HostType) => {
    const picked = HOST_TYPES.find((x) => x.value === t);
    setForm((p) => ({
      ...p,
      title: t,
      // ✅ ให้ aura ตาม type เป็นค่าเริ่มต้น
      aura: picked?.aura ?? p.aura,
    }));
  };

  const autoSlug = () => {
    setForm((p) => ({ ...p, slug: slugify(p.slug || p.name || "") }));
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload: HostData = {
        ...form,
        slug: slugify(form.slug || form.name || ""),
        name: form.name.trim(),
        goddessName: form.goddessName?.trim(),
        description: form.description?.trim(),
        image: form.image?.trim(),
        aura: form.aura?.trim(),
        order: Number(form.order ?? 999),
        status: {
          conversation: clamp(form.status?.conversation ?? 0),
          funVibe: clamp(form.status?.funVibe ?? 0),
          seductiveCharm: clamp(form.status?.seductiveCharm ?? 0),
        },
      };

      if (mode === "edit" && currentId) {
        await updateHost(currentId, payload);
      } else {
        await createHost(payload);
      }

      setModalOpen(false);
      await reload();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    const ok = confirm("Delete this host?");
    if (!ok) return;
    await deleteHost(id);
    await reload();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="text-[#e6c36a] font-serif text-5xl tracking-[0.22em]">
              HOSTS
            </div>
            <div className="mt-3 text-[#f2d892]/60 tracking-widest">
              Admin • Edit via Modal • Create top-right
            </div>
          </motion.div>

          <div className="flex gap-3">
            <button
              onClick={reload}
              className="px-6 py-4 rounded-full border border-[#e6c36a]/20 text-[#e6c36a] tracking-[0.28em] hover:bg-[#e6c36a]/10 transition"
            >
              REFRESH
            </button>
            <button
              onClick={openCreate}
              className="
                px-7 py-4 rounded-full
                bg-gradient-to-r from-[#b18b2e] via-[#e6c36a] to-[#c8a14a]
                text-black font-semibold tracking-[0.28em]
                shadow-[0_0_60px_rgba(200,161,74,0.35)]
                hover:shadow-[0_0_90px_rgba(200,161,74,0.55)]
              "
            >
              CREATE
            </button>
          </div>
        </div>

        {loading ? (
          <div className="mt-16 text-center tracking-[0.35em] text-sm opacity-60">
            INVOKING HOSTS…
          </div>
        ) : (
          <div className="mt-12 grid gap-8 justify-center [grid-template-columns:repeat(auto-fit,minmax(280px,340px))]">
            {hosts.map((h: any, i) => {
              const type = (h.title as HostType) || "The Radiant";
              const ring =
                HOST_TYPES.find((x) => x.value === type)?.ring ?? "ring-yellow-400/70";
              const aura =
                h.aura ?? "from-red-800/30 via-transparent to-transparent";

              return (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                  className="relative group"
                >
                  <div
                    className={cn(
                      "absolute -inset-6 rounded-[28px] blur-3xl opacity-0 group-hover:opacity-70 transition",
                      "bg-gradient-to-b",
                      aura
                    )}
                  />
                  <div className="relative rounded-[28px] border border-[#e6c36a]/18 bg-black/55 overflow-hidden backdrop-blur-md shadow-[0_25px_80px_rgba(0,0,0,0.65)]">
                    <div className="h-56 overflow-hidden">
                      <img
                        src={h.image || "/placeholder.png"}
                        alt={h.name}
                        className="w-full h-full object-cover object-top scale-[1.03] group-hover:scale-[1.07] transition duration-700"
                      />
                      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/80 to-transparent" />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-[#e6c36a] font-serif text-2xl tracking-[0.14em]">
                          {h.name}
                        </div>
                        <span className={cn("w-3.5 h-3.5 rounded-full ring-4 bg-black/30", ring)} />
                      </div>

                      <div className="mt-2 text-[#f2d892]/70 tracking-widest text-xs uppercase">
                        {type} • slug: {h.slug}
                      </div>

                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() => openEdit(h.id)}
                          className="flex-1 px-5 py-3 rounded-full border border-[#e6c36a]/20 text-[#e6c36a] tracking-widest text-xs hover:bg-[#e6c36a]/10 transition"
                        >
                          EDIT
                        </button>
                        <button
                          onClick={() => remove(h.id)}
                          className="px-5 py-3 rounded-full border border-red-500/25 text-red-300 tracking-widest text-xs hover:bg-red-500/10 transition"
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* ================= MODAL ================= */}
      <ModalShell
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={mode === "edit" ? "EDIT HOST" : "CREATE HOST"}
      >
        {/* Loading overlay when fetching existing */}
        {saving ? (
          <div className="text-center tracking-[0.35em] text-sm opacity-60 py-12">
            INVOKING DATA…
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[420px_1fr] items-start">
            {/* LEFT PREVIEW */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-[30px] bg-gradient-to-b from-[#e6c36a]/16 via-transparent to-transparent blur-3xl opacity-60" />
              <div className="relative rounded-[30px] border border-[#e6c36a]/18 bg-black/55 overflow-hidden">
                <div className="p-6">
                  <div
                    className={cn(
                      "relative mx-auto overflow-hidden rounded-2xl border border-[#e6c36a]/15 bg-black/50",
                      "w-[320px] h-[814px] max-w-full",
                      "sm:w-[340px] sm:h-[780px]",
                      "md:w-[360px] md:h-[740px]",
                      "lg:w-[320px] lg:h-[814px]"
                    )}
                  >
                    <img
                      src={form.image || "/placeholder.png"}
                      alt={form.name || "preview"}
                      className="w-full h-full object-cover object-top scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-[#e6c36a]/10" />
                  </div>
                </div>

                {/* QUICK CHECK + AURA GLOW */}
                <div className="px-7 pb-7">
                  <div className="text-[#e6c36a] font-serif text-3xl tracking-[0.18em]">
                    {form.name || "HOST NAME"}
                  </div>
                  <div className="mt-2 text-[#e6c36a]/70 tracking-widest uppercase">
                    HOST ({form.title || "TYPE"})
                  </div>

                  <div className="mt-6 relative">
                    <div
                      className={cn(
                        "pointer-events-none absolute -inset-6 rounded-[28px] blur-3xl opacity-70",
                        "bg-gradient-to-b",
                        form.aura || "from-red-800/30 via-transparent to-transparent"
                      )}
                    />
                    <div className="relative rounded-2xl border border-[#e6c36a]/15 bg-black/55 p-5 overflow-hidden">
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#e6c36a]/[0.06] to-transparent" />
                      <div
                        className={cn(
                          "pointer-events-none absolute -right-10 -top-10 w-40 h-40 rounded-full blur-2xl opacity-70",
                          "bg-gradient-to-b",
                          form.aura || "from-red-800/30 via-transparent to-transparent"
                        )}
                      />

                      <div className="relative">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-[#e6c36a] font-serif text-2xl tracking-[0.12em]">
                            QUICK CHECK
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={cn("w-4 h-4 rounded-full ring-4 bg-black/30", ringClass)} />
                            <span className="text-xs tracking-widest text-[#e6c36a]/70">
                              {form.title || "TYPE"}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 space-y-2 text-[#f2d892]/75 text-sm leading-relaxed">
                          <div>
                            Slug:{" "}
                            <span className="text-[#e6c36a]/85">
                              {form.slug || slugify(form.name || "")}
                            </span>
                          </div>
                          <div className="truncate">
                            Aura:{" "}
                            <span className="text-[#e6c36a]/85">{form.aura}</span>
                          </div>
                          <div>
                            Order:{" "}
                            <span className="text-[#e6c36a]/85">{form.order ?? 999}</span>
                          </div>
                          <div>
                            Active:{" "}
                            <span className="text-[#e6c36a]/85">{String(form.active)}</span>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={save}
                          className="
                            mt-6 w-full px-6 py-4 rounded-full
                            bg-gradient-to-r from-[#b18b2e] via-[#e6c36a] to-[#c8a14a]
                            text-black font-semibold tracking-[0.28em]
                            shadow-[0_0_60px_rgba(200,161,74,0.35)]
                            hover:shadow-[0_0_90px_rgba(200,161,74,0.55)]
                          "
                        >
                          SAVE
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="space-y-10">
              <div className="rounded-[30px] border border-[#e6c36a]/18 bg-black/55 p-6 md:p-8">
                <SectionTitle>TYPE HOST</SectionTitle>

                <div className="mt-6 grid gap-3">
                  <div className="rounded-[26px] border border-[#e6c36a]/15 bg-black/50 p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-[#f2d892]/75 tracking-widest text-sm">
                        Select a divine archetype
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={cn("w-4 h-4 rounded-full ring-4 bg-black/30", ringClass)} />
                        <select
                          value={(form.title as string) || "The Radiant"}
                          onChange={(e) => onChangeType(e.target.value as HostType)}
                          className="
                            rounded-2xl px-4 py-3 bg-black/55 border border-[#e6c36a]/15
                            text-[#f2d892] outline-none
                            focus:border-[#e6c36a]/40 focus:ring-2 focus:ring-[#e6c36a]/10
                          "
                        >
                          {HOST_TYPES.map((t) => (
                            <option key={t.value} value={t.value}>
                              {t.value}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-2 text-[#f2d892]/70">
                      {HOST_TYPES.map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => onChangeType(t.value)}
                          className={cn(
                            "flex items-center gap-4 px-4 py-3 rounded-2xl border transition text-left",
                            (form.title as string) === t.value
                              ? "border-[#e6c36a]/35 bg-[#e6c36a]/[0.06]"
                              : "border-[#e6c36a]/10 bg-black/40 hover:border-[#e6c36a]/25"
                          )}
                        >
                          <span className={cn("w-4 h-4 rounded-full ring-4 bg-black/25", t.ring)} />
                          <span className="text-lg text-[#f2d892]">{t.value}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <SectionTitle>AURA (Preset)</SectionTitle>
                  <div className="mt-4">
                    <select
                      value={form.aura ?? AURA_PRESETS[0].value}
                      onChange={(e) => setForm((p) => ({ ...p, aura: e.target.value }))}
                      className="
                        w-full rounded-2xl px-5 py-4 bg-black/55 border border-[#e6c36a]/15
                        text-[#f2d892] outline-none
                        focus:border-[#e6c36a]/40 focus:ring-2 focus:ring-[#e6c36a]/10
                      "
                    >
                      {AURA_PRESETS.map((a) => (
                        <option key={a.value} value={a.value}>
                          {a.label}
                        </option>
                      ))}
                    </select>
                    <div className="mt-2 text-xs tracking-widest text-[#e6c36a]/60">
                      (เลือกได้เท่านั้น ไม่ต้องพิมพ์เอง)
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[30px] border border-[#e6c36a]/18 bg-black/55 p-6 md:p-8 space-y-6">
                <SectionTitle>Basics</SectionTitle>

                <div className="grid gap-4">
                  <div>
                    <div className="text-[#f2d892]/75 tracking-widest text-sm mb-2">
                      Name
                    </div>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="LUMINE"
                    />
                  </div>

                  <div>
                    <div className="text-[#f2d892]/75 tracking-widest text-sm mb-2">
                      Goddess Name
                    </div>
                    <Input
                      value={form.goddessName ?? ""}
                      onChange={(e) => setForm((p) => ({ ...p, goddessName: e.target.value }))}
                      placeholder="The Radiant"
                    />
                  </div>

                  <div>
                    <div className="text-[#f2d892]/75 tracking-widest text-sm mb-2">
                      Slug
                    </div>
                    <div className="flex gap-3">
                      <Input
                        value={form.slug}
                        onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                        placeholder="lumine"
                      />
                      <button
                        type="button"
                        onClick={autoSlug}
                        className="px-5 rounded-2xl border border-[#e6c36a]/20 text-[#e6c36a] tracking-widest text-xs hover:bg-[#e6c36a]/10 transition"
                      >
                        AUTO
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="text-[#f2d892]/75 tracking-widest text-sm mb-2">
                      Image URL
                    </div>
                    <Input
                      value={form.image ?? ""}
                      onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <div className="text-[#f2d892]/75 tracking-widest text-sm mb-2">
                        Order
                      </div>
                      <Input
                        type="number"
                        value={String(form.order ?? 999)}
                        onChange={(e) => setForm((p) => ({ ...p, order: Number(e.target.value) }))}
                      />
                    </div>
                    <div className="flex items-end">
                      <Toggle
                        checked={Boolean(form.active)}
                        onChange={(v) => setForm((p) => ({ ...p, active: v }))}
                        label="Active (public)"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="text-[#f2d892]/75 tracking-widest text-sm mb-2">
                      Description
                    </div>
                    <Textarea
                      value={form.description ?? ""}
                      onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                      placeholder="คำอธิบาย/คำคม…"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-[30px] border border-[#e6c36a]/18 bg-black/55 p-6 md:p-8 space-y-6">
                <SectionTitle>HOST STATUS</SectionTitle>
                <div className="grid md:grid-cols-3 gap-4">
                  <Range
                    label="Conversation"
                    value={form.status?.conversation ?? 0}
                    onChange={(v) =>
                      setForm((p) => ({ ...p, status: { ...(p.status ?? {}), conversation: v } }))
                    }
                  />
                  <Range
                    label="Fun Vibe"
                    value={form.status?.funVibe ?? 0}
                    onChange={(v) =>
                      setForm((p) => ({ ...p, status: { ...(p.status ?? {}), funVibe: v } }))
                    }
                  />
                  <Range
                    label="Seductive Charm"
                    value={form.status?.seductiveCharm ?? 0}
                    onChange={(v) =>
                      setForm((p) => ({
                        ...p,
                        status: { ...(p.status ?? {}), seductiveCharm: v },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
  <FixedChecklist
    title="สไตล์การพูดคุยของคุณ"
    items={form.speakingStyle ?? DEFAULT_STYLE}
    onToggle={(index) =>
      setForm((p) => {
        const base = (p.speakingStyle ?? DEFAULT_STYLE).slice(0, 4);
        const next = base.map((x, i) =>
          i === index ? { ...x, checked: !x.checked } : x
        );
        return { ...p, speakingStyle: next };
      })
    }
  />

  <FixedChecklist
    title="เหมาะกับลูกค้าสไตล์ใด"
    items={form.clientFit ?? DEFAULT_CLIENT}
    onToggle={(index) =>
      setForm((p) => {
        const base = (p.clientFit ?? DEFAULT_CLIENT).slice(0, 4);
        const next = base.map((x, i) =>
          i === index ? { ...x, checked: !x.checked } : x
        );
        return { ...p, clientFit: next };
      })
    }
  />
</div>


              <div className="rounded-[30px] border border-[#e6c36a]/18 bg-black/55 p-6 md:p-8 space-y-5">
                <SectionTitle>Texts</SectionTitle>

                <div>
                  <div className="text-[#f2d892]/75 tracking-widest text-sm mb-2">
                    ข้อความถึงลูกค้า
                  </div>
                  <Textarea
                    value={form.messageToClient ?? ""}
                    onChange={(e) => setForm((p) => ({ ...p, messageToClient: e.target.value }))}
                  />
                </div>

                <div>
                  <div className="text-[#f2d892]/75 tracking-widest text-sm mb-2">
                    ขอบเขตที่ไม่สะดวกให้บริการ
                  </div>
                  <Textarea
                    value={form.boundaries ?? ""}
                    onChange={(e) => setForm((p) => ({ ...p, boundaries: e.target.value }))}
                  />
                </div>

                <div>
                  <div className="text-[#f2d892]/75 tracking-widest text-sm mb-2">
                    หมายเหตุเพิ่มเติม
                  </div>
                  <Textarea
                    value={form.notes ?? ""}
                    onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 px-6 py-4 rounded-full border border-[#e6c36a]/20 text-[#e6c36a] tracking-[0.28em] hover:bg-[#e6c36a]/10 transition"
                  >
                    CANCEL
                  </button>
                  <button
                    type="button"
                    onClick={save}
                    className="
                      flex-1 px-6 py-4 rounded-full
                      bg-gradient-to-r from-[#b18b2e] via-[#e6c36a] to-[#c8a14a]
                      text-black font-semibold tracking-[0.28em]
                      shadow-[0_0_60px_rgba(200,161,74,0.35)]
                      hover:shadow-[0_0_90px_rgba(200,161,74,0.55)]
                    "
                  >
                    SAVE
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </ModalShell>
    </main>
  );
}
