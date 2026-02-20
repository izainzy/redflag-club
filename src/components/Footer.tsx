"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-chocolate-dark py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <Image
          src="/images/logo.png"
          alt="The Red Flag Club"
          width={80}
          height={80}
          className="mx-auto w-16 h-16 object-contain mb-4 opacity-80"
        />

        <div className="flex justify-center gap-5 mb-4">
          {[
            { url: "https://instagram.com/RedFlagClub_SA", label: "Instagram" },
            { url: "https://tiktok.com/@RedFlagClub_SA", label: "TikTok" },
            { url: "https://x.com/RedFlagClub_SA", label: "X" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-sm text-grunge/50 hover:text-warning transition-colors tracking-wider"
            >
              {s.label}
            </a>
          ))}
        </div>

        <p className="font-heading text-lg text-grunge/30 tracking-widest mb-1">
          MADE WITH <span className="text-redflag">DRAMA</span>
        </p>
        <p className="font-body text-xs text-grunge/20">
          &copy; {new Date().getFullYear()} The Red Flag Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
