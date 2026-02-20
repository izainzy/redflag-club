"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SizeSelector from "./SizeSelector";
import FlavorCards from "./FlavorCards";
import DramaToppings from "./DramaToppings";
import QuantitySelector from "./QuantitySelector";

export default function MenuSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="menu" className="relative bg-grunge py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl text-center text-chocolate-dark tracking-tight mb-12"
        >
          SELECT YOUR{" "}
          <span className="text-redflag">POISON</span>
          <span className="text-warning">.</span>
        </motion.h2>

        <SizeSelector />
        <FlavorCards />
        <DramaToppings />
        <QuantitySelector />
      </div>
    </section>
  );
}
