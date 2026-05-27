"use client";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../store/cart";
import { products } from "../data/products";

const conjuntos = [
  {
    id: 1,
    nombre: "The All Black Edit",
    descripcion: "Minimalismo en su expresión más pura. Tres piezas que se complementan en negro absoluto para construir una silueta sin concesiones.",
    tag: "Más vendido",
    cover: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1400",
    productoIds: [2, 4, 6],
    precio: 178000,
    ahorro: 10000,
  },
  {
    id: 2,
    nombre: "Buenos Aires After Dark",
    descripcion: "Para la noche porteña. Texturas que hablan solas, siluetas que no necesitan explicación. Un conjunto pensado para durar hasta el amanecer.",
    tag: "Edición Limitada",
    cover: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1400",
    productoIds: [1, 2, 3],
    precio: 86500,
    ahorro: 5000,
  },
  {
    id: 3,
    nombre: "Minimal Sunday",
    descripcion: "El descanso también tiene estética. Piezas de alto confort con carácter propio para los días que merecen ser vividos despacio.",
    tag: "Nuevo",
    cover: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1400",
    productoIds: [3, 5, 4],
    precio: 108000,
    ahorro: 8000,
  },
  {
    id: 4,
    nombre: "Beauty Ritual",
    descripcion: "La belleza como práctica diaria. Tres piezas de maquillaje seleccionadas para construir un look que va del día a la noche sin esfuerzo.",
    tag: "Best Seller",
    cover: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1400",
    productoIds: [1, 5, 3],
    precio: 59500,
    ahorro: 6500,
  },
];

export default function ConjuntosPage() {
  const router = useRouter();
  const add = useCart((s) => s.add);
  const [addedId, setAddedId] = useState<number | null>(null);

  const handleAddAll = (conjunto: typeof conjuntos[0]) => {
    conjunto.productoIds.forEach((pid) => {
      const p = products.find((p) => p.id === pid);
      if (p) add(p);
    });
    setAddedId(conjunto.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

          {/* Back */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-[9px] uppercase tracking-[0.35em] text-[#0a0a0a]/40 hover:text-[#0a0a0a] transition-colors mb-12 font-semibold"
          >
            <ArrowLeft size={13} /> Volver
          </button>

          {/* Header */}
          <div className="mb-16 pb-10 border-b border-[#0a0a0a]/6">
            <span className="text-[9px] uppercase tracking-[0.55em] text-[#0a0a0a]/30 block mb-4 font-semibold">
              Selecciones editoriales
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-light italic tracking-tight mb-5">
              conjuntos curados
            </h1>
            <p className="text-sm text-[#0a0a0a]/45 max-w-lg leading-relaxed font-light">
              Cada conjunto es una propuesta completa. Piezas pensadas juntas, con ahorro incluido al llevar el conjunto completo.
            </p>
          </div>

          {/* Conjuntos */}
          <div className="space-y-24">
            {conjuntos.map((c, i) => {
              const piezas = c.productoIds.map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products;
              const isReversed = i % 2 !== 0;

              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isReversed ? "lg:grid-flow-dense" : ""}`}
                >
                  {/* Imagen cover */}
                  <div className={`relative aspect-[4/5] overflow-hidden group ${isReversed ? "lg:col-start-2" : ""}`}>
                    <img
                      src={c.cover}
                      alt={c.nombre}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-[1.03]"
                    />
                    <div className="absolute top-5 left-5">
                      <span className="text-[8px] uppercase tracking-[0.3em] font-semibold bg-[#0a0a0a] text-[#fafafa] px-3 py-1.5">
                        {c.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Info */}
                  <div className={`space-y-8 ${isReversed ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.45em] text-[#0a0a0a]/30 block mb-3 font-semibold">
                        Conjunto 0{c.id} — {piezas.length} piezas
                      </span>
                      <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight leading-tight mb-5">
                        {c.nombre}
                      </h2>
                      <p className="text-sm text-[#0a0a0a]/55 leading-relaxed font-light max-w-sm">
                        {c.descripcion}
                      </p>
                    </div>

                    {/* Piezas del conjunto */}
                    <div className="space-y-3 border-t border-[#0a0a0a]/6 pt-6">
                      <p className="text-[9px] uppercase tracking-[0.4em] text-[#0a0a0a]/30 font-semibold mb-4">
                        Incluye
                      </p>
                      {piezas.map((p) => (
                        <div key={p.id} className="flex items-center gap-4 group/item cursor-pointer"
                          onClick={() => router.push(`/producto/${p.id}`)}>
                          <div className="w-12 h-14 bg-[#f2f2f0] flex-shrink-0 overflow-hidden">
                            <img src={p.image} alt={p.name}
                              className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all duration-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-semibold uppercase tracking-tight truncate group-hover/item:opacity-50 transition-opacity">
                              {p.name}
                            </p>
                            <p className="text-[9px] text-[#0a0a0a]/35 uppercase tracking-widest">{p.category}</p>
                          </div>
                          <span className="text-xs font-medium text-[#0a0a0a]/50">
                            ${p.price.toLocaleString("es-AR")}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Precio + CTA */}
                    <div className="border-t border-[#0a0a0a]/6 pt-6 space-y-4">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.3em] text-[#0a0a0a]/30 font-semibold mb-1">
                            Precio del conjunto
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-semibold tracking-tight">
                              ${c.precio.toLocaleString("es-AR")}
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-green-600 font-semibold bg-green-50 px-2 py-1">
                              Ahorrás ${c.ahorro.toLocaleString("es-AR")}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddAll(c)}
                        className={`w-full py-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.45em] font-semibold transition-all duration-300 ${
                          addedId === c.id
                            ? "bg-green-600 text-white"
                            : "bg-[#0a0a0a] text-[#fafafa] hover:bg-[#2a2a2a]"
                        }`}
                      >
                        {addedId === c.id ? (
                          <>
                            <ShoppingBag size={14} strokeWidth={1.5} />
                            ¡Conjunto agregado!
                          </>
                        ) : (
                          <>
                            <Plus size={14} strokeWidth={2} />
                            Agregar conjunto al carrito
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </main>
    </div>
  );
}
