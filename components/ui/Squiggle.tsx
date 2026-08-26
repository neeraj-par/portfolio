"use client";

import { motion } from "framer-motion";

const PATH_D = "M2 6 Q 20 1 38 6 T 74 6 T 110 6 T 146 6 T 182 6 T 218 6";
const WAYPOINTS_X = [2, 20, 38, 74, 110, 146, 182, 218];
const WAYPOINTS_Y = [6, 1, 6, 6, 6, 6, 6, 6];
const TIMES = [0, 0.1, 0.22, 0.4, 0.58, 0.76, 0.9, 1];

export default function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`block h-4 w-full max-w-[220px] overflow-visible ${className}`}
      viewBox="0 0 220 12"
      preserveAspectRatio="none"
      fill="none"
    >
      <motion.path
        d={PATH_D}
        stroke="#C15E3D"
        strokeWidth={3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />
      <motion.g
        initial={{ opacity: 0, x: WAYPOINTS_X[0], y: WAYPOINTS_Y[0] }}
        whileInView={{
          opacity: [0, 1, 1, 1, 1, 1, 1, 0],
          x: WAYPOINTS_X,
          y: WAYPOINTS_Y,
        }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.9, ease: "easeInOut", times: TIMES }}
      >
        <g transform="rotate(45) scale(0.34) translate(-12, -22)">
          <path
            d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"
            stroke="#221F1A"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </motion.g>
    </svg>
  );
}
