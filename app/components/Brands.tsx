"use client";
import { motion } from "framer-motion";

const stats = [
  { value: "+200", label: "Piezas curadas" },
  { value: "100%", label: "Materiales naturales" },
  { value: "24h", label: "Envío express CABA" },
  { value: "5★", label: "Valoración promedio" },
];

export default function Brands() {
  return (
    <section className="border-y border-[#0a0a0a]/6 bg-[#f5f5f3] py-10 px-6 overflow-hidden">
      <div className="max-w-[1500px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#0a0a0a]/6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center py-6 px-4 text-center"
            >
              <span className="font-display text-3xl md:text-4xl font-light tracking-tight mb-1">
                {s.value}
              </span>
              <span className="text-[9px] uppercase tracking-[0.4em] text-[#0a0a0a]/45 font-semibold">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
