"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const conjuntos = [
  {
    id: 1,
    nombre: "The All Black Edit",
    descripcion: "Minimalismo en su expresión más pura.",
    piezas: 3,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    nombre: "Buenos Aires After Dark",
    descripcion: "Para la noche porteña.",
    piezas: 4,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 3,
    nombre: "Minimal Sunday",
    descripcion: "El descanso también tiene estética.",
    piezas: 3,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200",
  },
];

export default function Conjuntos() {
  const router = useRouter();

  return (
    <section id="conjuntos" className="py-28 bg-[#f5f5f3] px-6 md:px-12 lg:px-20 border-t border-[#0a0a0a]/5">
      <div className="max-w-[1500px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-[#0a0a0a]/8">
          <div>
            <span className="text-[9px] uppercase tracking-[0.55em] text-[#0a0a0a]/30 block mb-3 font-semibold">
              Selecciones editoriales
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light italic tracking-tight">
              conjuntos curados
            </h2>
          </div>
          <button
            onClick={() => router.push("/conjuntos")}
            className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-semibold text-[#0a0a0a]/50 hover:text-[#0a0a0a] transition-colors"
          >
            Ver todos
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Grid preview — 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {conjuntos.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              onClick={() => router.push("/conjuntos")}
              className="group relative overflow-hidden cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#e8e8e6]">
                <img
                  src={c.image}
                  alt={c.nombre}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/65 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[8px] uppercase tracking-[0.35em] text-white/50 font-semibold mb-1.5">
                    {c.piezas} piezas
                  </p>
                  <h3 className="font-display text-xl text-white font-light tracking-tight mb-1">
                    {c.nombre}
                  </h3>
                  <p className="text-[11px] text-white/55 font-light">{c.descripcion}</p>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between bg-[#0a0a0a] group-hover:bg-[#1a1a1a] transition-colors">
                <span className="text-[9px] uppercase tracking-[0.4em] font-semibold text-white/55">
                  Ver conjunto
                </span>
                <ArrowRight size={13} className="text-white/40 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
