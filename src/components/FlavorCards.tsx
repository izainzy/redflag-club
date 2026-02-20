"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useOrder, type Flavor } from "@/context/OrderContext";

const flavors: {
  id: Flavor;
  name: string;
  description: string;
  chocolateType: string;
  image: string;
  accent: string;
  accentHex: string;
  bgAccent: string;
}[] = [
  {
    id: "toxic-banana",
    name: "TOXIC BANANA",
    description: "Chopped banana + milk chocolate",
    chocolateType: "Milk",
    image: "/images/banana-choco.png",
    accent: "text-warning",
    accentHex: "#FFCC00",
    bgAccent: "from-warning/20 to-warning/5",
  },
  {
    id: "red-flag-classic",
    name: "RED FLAG CLASSIC",
    description: "Strawberries + dark chocolate",
    chocolateType: "Dark",
    image: "/images/strawberry-drip.png",
    accent: "text-redflag",
    accentHex: "#E60000",
    bgAccent: "from-redflag/20 to-redflag/5",
  },
  {
    id: "mixed-signals",
    name: "MIXED SIGNALS",
    description: "Banana & strawberry mix",
    chocolateType: "The Mix",
    image: "/images/mixed-splash.png",
    accent: "text-chocolate",
    accentHex: "#3C2218",
    bgAccent: "from-redflag/15 to-warning/15",
  },
];

export default function FlavorCards() {
  const { flavor: selectedFlavor, setFlavor } = useOrder();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="mb-10">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="font-heading text-3xl sm:text-4xl text-chocolate-dark text-center mb-6 tracking-wider"
      >
        PICK YOUR <span className="text-redflag">FLAVOR</span>
      </motion.h3>

      {/* Mobile: vertical stack | Desktop: horizontal row */}
      <div className="flex flex-col gap-3 px-3 sm:flex-row sm:gap-4 sm:justify-center sm:flex-wrap sm:px-2">
        {flavors.map((f, i) => {
          const isSelected = selectedFlavor === f.id;

          return (
            <motion.button
              key={f.id}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: isSelected ? -4 : 0,
                      rotateX: 0,
                      scale: isSelected ? 1.02 : 1,
                    }
                  : {}
              }
              transition={{ delay: i * 0.15, duration: 0.5, type: "spring", stiffness: 200 }}
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setFlavor(f.id)}
              className={`relative w-full sm:w-[240px] rounded-2xl cursor-pointer text-left bg-gradient-to-b ${f.bgAccent} border-2 transition-shadow duration-300 overflow-hidden ${
                isSelected
                  ? "border-redflag shadow-[0_0_25px_rgba(230,0,0,0.35)]"
                  : "border-chocolate/10 hover:border-chocolate/30"
              }`}
            >
              {/* Pulsing glow ring when selected */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.4, 0.15, 0.4] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ boxShadow: `inset 0 0 30px ${f.accentHex}40, 0 0 40px ${f.accentHex}25` }}
                  />
                )}
              </AnimatePresence>

              {/* Mobile: horizontal layout | Desktop: vertical card */}
              <div className="flex items-center gap-4 p-4 sm:flex-col sm:items-center sm:p-5">
                {/* Image */}
                <motion.div
                  animate={isSelected ? { rotate: [0, -5, 5, -3, 0], scale: [1, 1.1, 1.05] } : { rotate: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex-shrink-0 sm:mb-2"
                >
                  <Image
                    src={f.image}
                    alt={f.name}
                    width={120}
                    height={120}
                    className={`w-16 h-16 sm:w-24 sm:h-24 object-contain transition-all duration-300 ${
                      isSelected ? "drop-shadow-[0_0_12px_rgba(230,0,0,0.5)]" : "drop-shadow-lg"
                    }`}
                  />
                </motion.div>

                {/* Text content */}
                <div className="flex-1 min-w-0 sm:text-center">
                  <h4 className={`font-heading text-xl sm:text-2xl tracking-wider mb-0.5 sm:mb-1 ${f.accent}`}>
                    {f.name}
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-chocolate-light mb-1.5 sm:mb-3">
                    {f.description}
                  </p>
                  <span className="inline-block font-heading text-[10px] sm:text-xs px-2.5 py-0.5 sm:px-3 sm:py-1 bg-chocolate text-white rounded-full tracking-wider">
                    {f.chocolateType}
                  </span>
                </div>

                {/* Selection indicator */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="flex-shrink-0 w-8 h-8 sm:absolute sm:-top-2 sm:-right-2 sm:w-9 sm:h-9 bg-redflag rounded-full flex items-center justify-center shadow-lg"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom accent bar that fills on select */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isSelected ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-1 origin-left"
                style={{ background: `linear-gradient(90deg, ${f.accentHex}, ${f.accentHex}80)` }}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
