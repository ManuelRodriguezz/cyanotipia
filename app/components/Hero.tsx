"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#fafafa] overflow-hidden">

      {/* Background editorial image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=2400"
          alt="cyanotipia editorial"
          className="w-full h-full object-cover opacity-[0.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa] via-transparent to-[#fafafa]" />
      </div>

      {/* Decorative lines */}
      <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-[#0a0a0a]/5 hidden lg:block" />
      <div className="absolute right-8 top-0 bottom-0 w-[1px] bg-[#0a0a0a]/5 hidden lg:block" />

      <div className="relative z-10 text-center px-6 w-full max-w-6xl mx-auto">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-10 flex items-center justify-center gap-4"
        >
          <div className="w-8 h-[1px] bg-[#0a0a0a]/30" />
          <span className="text-[9px] uppercase tracking-[0.6em] text-[#0a0a0a]/40 font-semibold">
            Archivo 01 — 2025
          </span>
          <div className="w-8 h-[1px] bg-[#0a0a0a]/30" />
        </motion.div>

        {/* Main title */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(4rem,14vw,13rem)] font-light leading-[0.9] tracking-[-0.03em] text-[#0a0a0a]"
          >
            cyanotipia
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1 }}
          className="text-[10px] md:text-[12px] uppercase tracking-[0.45em] text-[#0a0a0a]/40 font-medium max-w-md mx-auto leading-loose mb-16"
        >
          La imperfección como forma de arte.
          <br />
          Curaduría de piezas que desafían el tiempo.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#archivo"
            className="bg-[#0a0a0a] text-[#fafafa] text-[10px] uppercase tracking-[0.45em] font-semibold px-10 py-4 hover:bg-[#2a2a2a] transition-colors"
          >
            Entrar al Archivo
          </a>
          <a
            href="#concepto"
            className="text-[10px] uppercase tracking-[0.45em] font-semibold text-[#0a0a0a]/50 hover:text-[#0a0a0a] transition-colors border-b border-[#0a0a0a]/20 pb-0.5"
          >
            Nuestra Filosofía
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[8px] uppercase tracking-[0.5em] text-[#0a0a0a]/25">Scroll</span>
        <div className="w-[1px] h-10 bg-[#0a0a0a]/10 overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-1/2 bg-[#0a0a0a]/50"
          />
        </div>
      </div>
    </section>
  );
}
