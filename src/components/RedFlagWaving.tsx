"use client";

import { motion } from "framer-motion";

export default function RedFlagWaving({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <motion.div
      animate={{ rotate: [0, 14, 0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className={`inline-block origin-bottom-left ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="8" y="8" width="3" height="52" rx="1.5" fill="#2A1810" />
        <path
          d="M11 8C11 8 30 5 40 12C50 19 55 14 55 14V36C55 36 50 41 40 34C30 27 11 30 11 30V8Z"
          fill="#E60000"
        />
        <path
          d="M11 8C11 8 25 6 35 11C40 13.5 45 14 50 13"
          stroke="#B30000"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}
