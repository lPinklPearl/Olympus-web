"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menu = [
    { label: "About", href: "/#about" },
    { label: "Olympian Law", href: "/#rules" },
    { label: "Hosts", href: "/hosts" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700
      ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* LOGO */}
        <a
          href="/"
          className="font-serif text-xl md:text-2xl tracking-[0.35em]
          text-[#e6c36a]
          drop-shadow-[0_0_12px_rgba(200,161,74,0.45)]
          hover:drop-shadow-[0_0_22px_rgba(200,161,74,0.75)]
          transition duration-500"
        >
          OLYMPUS
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-12 text-xs tracking-[0.25em] uppercase">
          {menu.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative text-white/70 hover:text-[#e6c36a] transition duration-500"
            >
              {item.label}
              <span
                className="pointer-events-none absolute left-1/2 -bottom-3 h-[1px] w-0
                -translate-x-1/2
                bg-gradient-to-r from-transparent via-[#e6c36a] to-transparent
                group-hover:w-full transition-all duration-700"
              />
            </a>
          ))}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#e6c36a] text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500
        ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 pb-6 flex flex-col gap-4 text-sm tracking-widest uppercase">
          {menu.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-[#e6c36a] transition"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
