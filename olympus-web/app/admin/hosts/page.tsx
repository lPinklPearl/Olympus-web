"use client";

import AdminGuard from "@/components/AdminGuard";
import { useEffect, useState } from "react";
import {
  getHosts,
  createHost,
  deleteHost,
  HostData,
} from "@/lib/host.service";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function AdminPage() {
  const [editing, setEditing] = useState<HostData | null>(null);
  const [hosts, setHosts] = useState<HostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [form, setForm] = useState<HostData>({
    name: "",
    goddessName: "",
    description: "",
    image: "",
    slug: "",
    active: true,
  });

  const loadHosts = async () => {
    const data = await getHosts();
    setHosts(data);
  };

  useEffect(() => {
    loadHosts();
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.slug) {
      setMessage("❗ กรุณากรอก Name และ Slug");
      return;
    }

    try {
      setLoading(true);
      await createHost(form);
      setForm({
        name: "",
        goddessName: "",
        description: "",
        image: "",
        slug: "",
        active: true,
      });
      setMessage("✨ สร้าง Host สำเร็จแล้ว");
      loadHosts();
    } catch {
      setMessage("❌ เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <AdminGuard>
      <main className="min-h-screen bg-black text-white px-10 py-24">
        <Navbar />

        <h1 className="font-serif text-4xl tracking-widest text-[#e6c36a] mb-12">
          HOST ADMIN
        </h1>

        {/* FEEDBACK */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-8 text-sm text-[#e6c36a]"
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= MAIN LAYOUT ================= */}
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
          {/* ================= LEFT : FORM ================= */}
          <aside className="sticky top-32">
            <h2 className="tracking-[0.35em] text-sm opacity-70 mb-6">
              CREATE HOST
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {["name", "goddessName", "slug", "image"].map((field) => (
                <input
                  key={field}
                  placeholder={field}
                  value={(form as any)[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                  className="px-4 py-3 rounded bg-black/60 border border-white/10 focus:border-[#e6c36a]/50 outline-none"
                />
              ))}

              <textarea
                placeholder="description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="col-span-2 px-4 py-3 rounded bg-black/60 border border-white/10 focus:border-[#e6c36a]/50 outline-none"
              />

              {/* ACTIVE TOGGLE */}
              <label className="col-span-2 flex items-center justify-between px-4 py-3 rounded border border-white/10 bg-black/40">
                <span className="tracking-widest text-sm">
                  STATUS
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setForm({ ...form, active: !form.active })
                  }
                  className={`
                    px-6 py-1 rounded-full text-xs tracking-widest transition
                    ${
                      form.active
                        ? "bg-green-400/20 text-green-300"
                        : "bg-red-400/20 text-red-300"
                    }
                  `}
                >
                  {form.active ? "ACTIVE" : "INACTIVE"}
                </button>
              </label>

              <button
                disabled={loading}
                onClick={handleSubmit}
                className={`
                  col-span-2 mt-2
                  py-3 rounded-full tracking-widest transition
                  ${
                    loading
                      ? "bg-zinc-700 cursor-not-allowed"
                      : "bg-[#e6c36a] text-black hover:brightness-110"
                  }
                `}
              >
                {loading ? "CREATING..." : "CREATE HOST"}
              </button>
            </div>
          </aside>

          {/* ================= RIGHT : CARDS ================= */}
          <section className="space-y-10">
            <h2 className="tracking-[0.35em] text-sm opacity-70">
              HOST LIST
            </h2>

            <div
              className="
                grid gap-12 justify-center
                [grid-template-columns:repeat(auto-fit,minmax(300px,340px))]
              "
            >
              {hosts.map((h) => (
                <motion.div
                  key={h.id}
                  whileHover={{ y: -6 }}
                  className="relative group mx-auto"
                >
                  <div className="w-[340px] bg-black/70 border border-[#e6c36a]/20 rounded-3xl overflow-hidden backdrop-blur-md transition">
                    {h.image && (
                      <div className="h-52 overflow-hidden">
                        <img
                          src={h.image}
                          alt={h.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-700 object-top"
                        />
                      </div>
                    )}

                    <div className="p-6 text-center">
                      {/* STATUS */}
                      <div className="mb-3">
                        <span
                          className={`text-xs tracking-widest px-3 py-1 rounded-full
                            ${
                              h.active
                                ? "bg-green-400/20 text-green-300"
                                : "bg-red-400/20 text-red-300"
                            }
                          `}
                        >
                          {h.active ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </div>

                      <h2 className="font-serif text-xl tracking-widest text-[#e6c36a] mb-1">
                        {h.name}
                      </h2>

                      <p className="text-xs uppercase tracking-[0.3em] text-red-300/80 mb-3">
                        {h.goddessName}
                      </p>

                      <p className="text-sm opacity-70 line-clamp-3 mb-6">
                        {h.description}
                      </p>

                      <div className="flex justify-center gap-8 text-xs tracking-widest">
                        <button
                          onClick={() => setEditing(h)}
                          className="text-[#e6c36a] hover:underline"
                        >
                          EDIT
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`ลบ ${h.name} ใช่ไหมคะ?`)) {
                              deleteHost(h.id!);
                              loadHosts();
                            }
                          }}
                          className="text-red-400 hover:underline"
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <AnimatePresence>
  {editing && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-6"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9 }}
        className="bg-black border border-[#e6c36a]/30 rounded-3xl p-8 w-full max-w-xl"
      >
        <h2 className="font-serif text-2xl tracking-widest text-[#e6c36a] mb-6">
          EDIT HOST
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {["name", "goddessName", "slug", "image"].map((field) => (
            <input
              key={field}
              value={(editing as any)[field] || ""}
              onChange={(e) =>
                setEditing({ ...editing, [field]: e.target.value })
              }
              className="px-4 py-3 rounded bg-black/60 border border-white/10"
            />
          ))}

          <textarea
            value={editing.description || ""}
            onChange={(e) =>
              setEditing({ ...editing, description: e.target.value })
            }
            className="col-span-2 px-4 py-3 rounded bg-black/60 border border-white/10"
          />

          {/* ACTIVE TOGGLE */}
          <label className="col-span-2 flex items-center justify-between px-4 py-3 rounded border border-white/10 bg-black/40">
            <span className="tracking-widest text-sm">STATUS</span>

            <button
              type="button"
              onClick={() =>
                setEditing({ ...editing, active: !editing.active })
              }
              className={`
                px-6 py-1 rounded-full text-xs tracking-widest transition
                ${
                  editing.active
                    ? "bg-green-400/20 text-green-300"
                    : "bg-red-400/20 text-red-300"
                }
              `}
            >
              {editing.active ? "ACTIVE" : "INACTIVE"}
            </button>
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setEditing(null)}
            className="text-sm opacity-60 hover:opacity-100"
          >
            CANCEL
          </button>

          <button
            onClick={async () => {
              await createHost(editing); // id มี → update
              setEditing(null);
              loadHosts();
            }}
            className="px-6 py-2 rounded-full bg-[#e6c36a] text-black text-sm tracking-widest"
          >
            SAVE
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </AdminGuard>
  );
}
