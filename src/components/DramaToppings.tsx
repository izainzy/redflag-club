"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useOrder, type Topping, TOPPING_PRICE } from "@/context/OrderContext";

const toppings: { id: Topping; label: string; emoji: string }[] = [
  { id: "oreo", label: "Crushed Oreo", emoji: "🍪" },
  { id: "lotus", label: "Lotus Crumbs", emoji: "🧇" },
  { id: "coconut", label: "Coconut Flakes", emoji: "🥥" },
  { id: "nuts", label: "Nuts", emoji: "🥜" },
];

export default function DramaToppings() {
  const { toppings: selected, toggleTopping } = useOrder();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="flex items-center justify-center gap-3 mb-6"
      >
        <h3 className="font-heading text-3xl sm:text-4xl text-chocolate-dark tracking-wider">
          ADD SOME <span className="text-redflag">DRAMA</span>
        </h3>
        <span className="font-heading text-lg px-3 py-1 bg-warning text-chocolate-dark rounded-full tracking-wider">
          +{TOPPING_PRICE} SAR
        </span>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-xl mx-auto">
        {toppings.map((t, i) => {
          const isSelected = selected.includes(t.id);
          return (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{
                scale: 1.05,
                rotate: [0, -3, 3, -3, 0],
                transition: { rotate: { duration: 0.4 } },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleTopping(t.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                isSelected
                  ? "bg-chocolate/10 border-redflag shadow-md"
                  : "bg-white/50 border-chocolate/10 hover:border-chocolate/30"
              }`}
            >
              <motion.span
                className="text-3xl"
                animate={isSelected ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {t.emoji}
              </motion.span>
              <span className="font-heading text-sm sm:text-base text-chocolate-dark tracking-wider">
                {t.label}
              </span>
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? "bg-redflag border-redflag"
                    : "border-chocolate/30"
                }`}
              >
                {isSelected && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
