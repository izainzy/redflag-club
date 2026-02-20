"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const socials = [
  {
    label: "Instagram",
    handle: "@RedFlagClub_SA",
    url: "https://instagram.com/RedFlagClub_SA",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    color: "hover:text-pink-500",
  },
  {
    label: "TikTok",
    handle: "@RedFlagClub_SA",
    url: "https://tiktok.com/@RedFlagClub_SA",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.16v-3.44a4.85 4.85 0 01-1.99-.43V6.69h1.99z" />
      </svg>
    ),
    color: "hover:text-white",
  },
  {
    label: "X",
    handle: "@RedFlagClub_SA",
    url: "https://x.com/RedFlagClub_SA",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: "hover:text-gray-300",
  },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="about" className="bg-grunge py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative floating fruit */}
      <img
        src="/images/strawberry-dipped.png"
        alt=""
        className="absolute -right-6 top-16 w-32 opacity-10 animate-float pointer-events-none hidden md:block"
        style={{ animationDelay: "0.8s" }}
      />
      <img
        src="/images/banana-slices.png"
        alt=""
        className="absolute -left-6 bottom-20 w-28 opacity-10 animate-float pointer-events-none hidden md:block"
        style={{ animationDelay: "1.5s" }}
      />
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="font-heading text-5xl sm:text-6xl text-center text-chocolate-dark tracking-tight mb-12"
        >
          FIND <span className="text-redflag">US</span>
          <span className="text-warning">.</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {/* Stall Locator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-white/60 rounded-2xl p-6 border-2 border-chocolate/10"
          >
            <h3 className="font-heading text-2xl text-chocolate-dark tracking-wider mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-redflag" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              STALL LOCATION
            </h3>
            <div className="bg-chocolate/5 rounded-xl p-4 mb-4 min-h-[120px] flex items-center justify-center">
              <p className="font-body text-chocolate-light text-center">
                Location details coming soon!
                <br />
                <span className="text-sm opacity-60">Follow us on socials for updates</span>
              </p>
            </div>
          </motion.div>

          {/* Opening Times */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="bg-white/60 rounded-2xl p-6 border-2 border-chocolate/10"
          >
            <h3 className="font-heading text-2xl text-chocolate-dark tracking-wider mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              OPENING TIMES
            </h3>
            <div className="space-y-2">
              {[
                { day: "Sunday - Thursday", time: "4:00 PM - 12:00 AM" },
                { day: "Friday - Saturday", time: "2:00 PM - 1:00 AM" },
              ].map((slot) => (
                <div
                  key={slot.day}
                  className="flex justify-between items-center py-2 border-b border-chocolate/10 last:border-0"
                >
                  <span className="font-body text-chocolate-light text-sm">{slot.day}</span>
                  <span className="font-heading text-lg text-chocolate-dark tracking-wider">
                    {slot.time}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <h3 className="font-heading text-2xl text-chocolate-dark tracking-wider mb-6">
            FOLLOW THE <span className="text-redflag">DRAMA</span>
          </h3>
          <div className="flex justify-center gap-6">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -4 }}
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center gap-2 text-chocolate-light transition-colors ${s.color}`}
              >
                <div className="w-12 h-12 rounded-full bg-chocolate flex items-center justify-center text-grunge">
                  {s.icon}
                </div>
                <span className="font-heading text-sm tracking-wider">{s.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
