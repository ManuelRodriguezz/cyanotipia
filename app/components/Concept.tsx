"use client";
import { motion } from "framer-motion";

export default function Concept() {
  return (
    <section id="concepto" className="py-36 bg-[#fafafa] px-6 md:px-12 overflow-hidden border-t border-[#0a0a0a]/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200"
              alt="cyanotipia — proceso artesanal"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-[1.04] hover:scale-100"
            />
            {/* Frame detail */}
            <div className="absolute top-5 left-5 right-5 bottom-5 border border-white/20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
            <p className="absolute bottom-6 left-6 text-[8px] uppercase tracking-[0.5em] text-white/70 font-semibold">
              Archivo 01 — 2025
            </p>
          </motion.div>

          {/* Text side */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="text-[9px] uppercase tracking-[0.6em] text-[#0a0a0a]/30 font-semibold block mb-5">
                Nuestra Filosofía
              </span>
              <h2 className="font-display text-5xl md:text-6xl xl:text-7xl font-light leading-[1.05] tracking-tight">
                Elogio a la{" "}
                <span className="italic">imperfección.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="space-y-6"
            >
              <p className="text-[#0a0a0a]/55 text-sm md:text-[15px] leading-[1.85] font-light max-w-md">
                Inspirados en la técnica fotográfica que da nombre a nuestra casa,
                en <strong className="text-[#0a0a0a] font-medium">cyanotipia</strong> creemos
                que la verdadera elegancia reside en el rastro del tiempo y el error humano.
              </p>
              <p className="text-[#0a0a0a]/55 text-sm md:text-[15px] leading-[1.85] font-light max-w-md">
                Cada pieza de nuestro archivo es una captura de luz y sombra,
                diseñada para quienes no buscan moda, sino permanencia.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.8 }}
              className="pt-4 flex flex-col sm:flex-row gap-6 sm:items-center"
            >
              <a
                href="#archivo"
                className="text-[10px] uppercase tracking-[0.45em] font-semibold border-b border-[#0a0a0a] pb-1 hover:opacity-40 transition-opacity w-fit"
              >
                Ver el Archivo
              </a>
              <div className="flex items-center gap-4">
                <div className="w-10 h-[1px] bg-[#0a0a0a]/20" />
                <span className="text-[9px] uppercase tracking-[0.4em] font-semibold text-[#0a0a0a]/30">
                  Desde 2025
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
