"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useOrder } from "@/context/OrderContext";

export default function QuantitySelector() {
  const { quantity, incrementQty, decrementQty } = useOrder();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="mt-10">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="font-heading text-3xl sm:text-4xl text-chocolate-dark text-center mb-6 tracking-wider"
      >
        HOW <span className="text-redflag">MANY</span>?
      </motion.h3>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-center gap-6"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={decrementQty}
          disabled={quantity <= 1}
          className={`w-14 h-14 rounded-full font-heading text-3xl flex items-center justify-center transition-all cursor-pointer ${
            quantity <= 1
              ? "bg-chocolate/10 text-chocolate/30 cursor-not-allowed"
              : "bg-chocolate text-white hover:bg-chocolate-light shadow-md"
          }`}
        >
          -
        </motion.button>

        <motion.span
          key={quantity}
          initial={{ scale: 1.4 }}
          animate={{ scale: 1 }}
          className="font-heading text-6xl sm:text-7xl text-chocolate-dark w-20 text-center"
        >
          {quantity}
        </motion.span>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={incrementQty}
          disabled={quantity >= 10}
          className={`w-14 h-14 rounded-full font-heading text-3xl flex items-center justify-center transition-all cursor-pointer ${
            quantity >= 10
              ? "bg-chocolate/10 text-chocolate/30 cursor-not-allowed"
              : "bg-redflag text-white hover:bg-redflag-dark shadow-md"
          }`}
        >
          +
        </motion.button>
      </motion.div>
    </div>
  );
}
