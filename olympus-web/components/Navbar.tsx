"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
      ${scrolled
        ? "bg-[#0b1026]/90 backdrop-blur border-yellow-400/20"
        : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

        {/* LOGO */}
        <a
          href="#home"
          className="font-serif text-2xl tracking-[0.3em] text-yellow-300 drop-shadow-[0_0_10px_rgba(255,215,100,0.6)]"
        >
          OLYMPUS
        </a>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-10 text-sm tracking-widest uppercase">
          {[
            { label: "About", href: "#about" },
            { label: "Rules Of Olympus", href: "#rules" },
            { label: "Experiences", href: "#experiences" },
            
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-white/80 hover:text-yellow-300 transition"
            >
              {item.label}
              <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-300 to-transparent group-hover:w-full transition-all duration-500" />
            </a>
          ))}
        </div>

      </div>
    </nav>
  );
}
