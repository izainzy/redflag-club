"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useOrder, type Size, PRICES } from "@/context/OrderContext";

const sizes: { id: Size; label: string; image: string }[] = [
  { id: "small", label: "Small", image: "/images/cup-small.png" },
  { id: "medium", label: "Medium", image: "/images/cup-medium.png" },
  { id: "large", label: "Large", image: "/images/cup-large.png" },
];

export default function SizeSelector() {
  const { size: selectedSize, setSize } = useOrder();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="mb-10">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="font-heading text-3xl sm:text-4xl text-chocolate-dark text-center mb-6 tracking-wider"
      >
        SELECT YOUR SIZE
      </motion.h3>

      <div className="flex justify-center items-end gap-4 sm:gap-8">
        {sizes.map((s, i) => (
          <motion.button
            key={s.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSize(s.id)}
            className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl transition-all duration-300 cursor-pointer ${
              selectedSize === s.id
                ? "bg-chocolate/10 ring-2 ring-redflag shadow-lg"
                : "hover:bg-chocolate/5"
            }`}
          >
            <motion.div
              animate={
                selectedSize === s.id ? { scale: 1.15, y: -5 } : { scale: 1, y: 0 }
              }
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={s.image}
                alt={`${s.label} cup`}
                width={120}
                height={160}
                className={`object-contain drop-shadow-lg transition-all duration-300 ${
                  s.id === "small" ? "w-16 h-20 sm:w-20 sm:h-24" :
                  s.id === "medium" ? "w-20 h-24 sm:w-24 sm:h-28" :
                  "w-24 h-28 sm:w-28 sm:h-32"
                } ${selectedSize === s.id ? "brightness-110" : "brightness-90 opacity-70"}`}
              />
            </motion.div>
            <span className="font-heading text-xl sm:text-2xl text-chocolate-dark tracking-wider">
              {s.label}
            </span>
            <span
              className={`font-heading text-lg sm:text-xl px-3 py-0.5 rounded-full transition-all ${
                selectedSize === s.id
                  ? "bg-redflag text-white animate-glow"
                  : "bg-chocolate/10 text-chocolate"
              }`}
            >
              {PRICES[s.id]} SAR
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
