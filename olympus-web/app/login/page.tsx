"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push("/admin/hosts");
    } catch (err: any) {
      setError("Access denied · Only gods may enter");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center
      bg-black text-white px-6">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-black/70
        border border-[#e6c36a]/30 rounded-3xl p-10
        backdrop-blur-md text-center"
      >
        <h1 className="font-serif text-3xl tracking-widest text-[#e6c36a] mb-8">
          OLYMPUS ADMIN
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded bg-black/60 border border-white/10"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 rounded bg-black/60 border border-white/10"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-full
          bg-gradient-to-r from-[#b18b2e] via-[#e6c36a] to-[#c8a14a]
          text-black font-semibold tracking-widest"
        >
          ENTER OLYMPUS
        </button>
      </motion.div>
    </main>
  );
}
