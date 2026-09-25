"use client";

import { motion } from "framer-motion";

export const StarDoodle = ({ className = "" }: { className?: string }) => {
  return (
    <motion.svg
      className={`pointer-events-none opacity-30 ${className}`}
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      stroke="#96907D"
      strokeWidth="1.4"
      animate={{ rotate: [0, 8, -6, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M23 3 L27 18 L42 23 L27 28 L23 43 L19 28 L4 23 L19 18 Z" strokeLinejoin="round" />
    </motion.svg>
  );
};

export const TargetDoodle = ({ className = "" }: { className?: string }) => {
  return (
    <motion.svg
      className={`pointer-events-none opacity-30 ${className}`}
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      stroke="#C15E3D"
      strokeWidth="1.2"
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <circle cx="21" cy="21" r="18" />
      <circle cx="21" cy="21" r="11" />
      <circle cx="21" cy="21" r="2.4" fill="#C15E3D" stroke="none" />
      <line x1="21" y1="0" x2="21" y2="7" />
      <line x1="21" y1="35" x2="21" y2="42" />
    </motion.svg>
  );
};

export const ScribbleDoodle = ({ className = "" }: { className?: string }) => {
  return (
    <motion.svg
      className={`pointer-events-none opacity-25 ${className}`}
      width="60"
      height="34"
      viewBox="0 0 60 34"
      fill="none"
      stroke="#EAC7BC"
      strokeWidth="2"
      animate={{ x: [0, 4, 0], y: [0, -3, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M4 20 C4 8, 20 6, 20 16 C20 26, 6 26, 8 16 C10 4, 30 2, 34 14 C38 26, 54 24, 56 12"
        strokeLinecap="round"
      />
    </motion.svg>
  );
};
