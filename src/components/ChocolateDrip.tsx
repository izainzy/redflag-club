"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ChocolateDrip({
  direction = "down",
  className = "",
}: {
  direction?: "down" | "up";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const dripPath =
    direction === "down"
      ? "M0,0 L1440,0 L1440,25 Q1410,55 1390,25 L1390,25 Q1370,70 1340,25 Q1310,50 1280,25 Q1250,65 1220,25 Q1190,45 1160,25 Q1130,70 1100,25 Q1070,55 1040,25 Q1010,40 980,25 Q950,65 920,25 Q890,50 860,25 Q830,75 800,25 Q770,45 740,25 Q710,60 680,25 Q650,50 620,25 Q590,70 560,25 Q530,45 500,25 Q470,65 440,25 Q410,55 380,25 Q350,40 320,25 Q290,70 260,25 Q230,50 200,25 Q170,60 140,25 Q110,45 80,25 Q50,70 20,25 Q0,40 0,25 Z"
      : "M0,60 Q20,0 50,35 Q80,60 110,35 Q140,0 170,35 Q200,60 230,35 Q260,0 290,35 Q320,60 350,35 Q380,0 410,35 Q440,60 470,35 Q500,0 530,35 Q560,60 590,35 Q620,0 650,35 Q680,60 710,35 Q740,0 770,35 Q800,60 830,35 Q860,0 890,35 Q920,60 950,35 Q980,0 1010,35 Q1040,60 1070,35 Q1100,0 1130,35 Q1160,60 1190,35 Q1220,0 1250,35 Q1280,60 1310,35 Q1340,0 1370,35 Q1400,60 1440,60 L1440,60 L0,60 Z";

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: direction === "down" ? "50px" : "50px" }}
    >
      <motion.svg
        viewBox="0 0 1440 60"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ transformOrigin: direction === "down" ? "top" : "bottom" }}
      >
        <defs>
          <linearGradient
            id={`chocGrad-${direction}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#3C2218" />
            <stop offset="100%" stopColor="#2A1810" />
          </linearGradient>
        </defs>
        <path d={dripPath} fill={`url(#chocGrad-${direction})`} />
      </motion.svg>
    </div>
  );
}
