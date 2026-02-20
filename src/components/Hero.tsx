"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import RedFlagWaving from "./RedFlagWaving";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grunge"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-chocolate-dark/20 via-transparent to-chocolate/10" />

      {/* Floating red flags */}
      <div className="absolute top-20 left-4 md:left-12 opacity-30">
        <RedFlagWaving size={50} />
      </div>
      <div className="absolute top-32 right-6 md:right-16 opacity-20">
        <RedFlagWaving size={35} />
      </div>
      <div className="absolute bottom-40 left-8 md:left-24 opacity-25">
        <RedFlagWaving size={45} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="mb-6"
        >
          <Image
            src="/images/logo.png"
            alt="The Red Flag Club"
            width={200}
            height={200}
            className="mx-auto w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-chocolate-dark tracking-tight leading-none mb-2 glitch-text"
        >
          JOIN THE{" "}
          <span className="text-redflag">CLUB</span>
          <span className="text-warning">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="font-body text-lg sm:text-xl md:text-2xl text-chocolate-light max-w-md mx-auto mb-10"
        >
          Chocolate-dipped fruit. Zero regrets.
        </motion.p>

        {/* Floating fruit images */}
        <div className="flex justify-center items-end gap-4 sm:gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="animate-float"
            style={{ animationDelay: "0s" }}
          >
            <Image
              src="/images/strawberry-splash.png"
              alt="Chocolate dipped strawberry"
              width={180}
              height={180}
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain drop-shadow-xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="animate-float"
            style={{ animationDelay: "1.5s" }}
          >
            <Image
              src="/images/banana-splash.png"
              alt="Chocolate dipped banana"
              width={180}
              height={180}
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain drop-shadow-xl"
            />
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.a
          href="#menu"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.9, type: "spring" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block font-heading text-2xl sm:text-3xl px-10 py-4 bg-redflag text-white rounded-lg glow-btn hover:bg-redflag-dark transition-colors tracking-widest cursor-pointer"
        >
          ORDER NOW
        </motion.a>
      </div>

    </section>
  );
}
