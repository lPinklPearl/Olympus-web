"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CursorGlow() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const smoothX = useSpring(x, { damping: 40, stiffness: 300 });
  const smoothY = useSpring(y, { damping: 40, stiffness: 300 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 120);
      y.set(e.clientY - 120);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      style={{ x: smoothX, y: smoothY }}
      className="pointer-events-none fixed top-0 left-0 z-[9999]
      w-60 h-60 rounded-full
      bg-[radial-gradient(circle,rgba(230,195,106,0.18),transparent_65%)]"
    />
  );
}
