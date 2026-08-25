"use client";

import { motion } from "framer-motion";

export default function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`block h-2.5 w-full max-w-[220px] ${className}`}
      viewBox="0 0 220 10"
      fill="none"
    >
      <motion.path
        d="M2 6 Q 20 1 38 6 T 74 6 T 110 6 T 146 6 T 182 6 T 218 6"
        stroke="#C15E3D"
        strokeWidth={3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </svg>
  );
}
