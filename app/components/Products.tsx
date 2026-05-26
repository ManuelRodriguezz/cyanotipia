"use client";
import { useState } from "react";
import { products } from "../data/products";
import { useCart } from "../store/cart";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

const filters = ["Todos", "Ropa", "Maquillaje", "Accesorios"];

export default function Products() {
  const [active, setActive] = useState("Todos");
  const [addedId, setAddedId] = useState<number | null>(null);
  const add = useCart((s) => s.add);

  const filtered =
    active === "Todos" ? products : products.filter((p) => p.category === active);

  const handleAdd = (p: (typeof products)[0]) => {
    add(p);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1600);
  };

  return (
    <section id="archivo" className="py-28 bg-[#fafafa] px-6 md:px-12 lg:px-20">
      <div className="max-w-[1500px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 pb-8 border-b border-[#0a0a0a]/6">
          <div>
            <span className="text-[9px] uppercase tracking-[0.55em] text-[#0a0a0a]/30 block mb-3 font-semibold">
              Catálogo
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light italic tracking-tight">
              el archivo
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-8">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`text-[9px] uppercase tracking-[0.4em] font-semibold transition-all relative pb-2 ${
                  active === f ? "text-[#0a0a0a]" : "text-[#0a0a0a]/30 hover:text-[#0a0a0a]/70"
                }`}
              >
                {f}
                {active === f && (
                  <motion.div
                    layoutId="filterLine"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#0a0a0a]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, index) => {
              const isLarge = index === 0 || index === 5;
              const isTall = index === 1;

              return (
                <motion.article
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.6, delay: index * 0.07 }}
                  className={`group relative bg-[#f2f2f0] flex flex-col overflow-hidden border border-[#0a0a0a]/5 hover:border-[#0a0a0a]/15 transition-colors duration-500 ${
                    isLarge ? "md:col-span-2" : "md:col-span-1"
                  } ${isTall ? "md:row-span-2" : ""}`}
                >
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[8px] uppercase tracking-[0.3em] font-semibold bg-[#0a0a0a] text-[#fafafa] px-2.5 py-1">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Image */}
                  <Link href={`/producto/${product.id}`} className="block overflow-hidden flex-1">
                    <div
                      className={`relative w-full overflow-hidden ${
                        isLarge ? "h-[280px] md:h-[380px]" : isTall ? "h-[380px] md:h-[580px]" : "h-[240px]"
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="p-5 flex items-end justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[8px] uppercase tracking-[0.3em] text-[#0a0a0a]/35 font-semibold mb-1 truncate">
                        {product.brand}
                      </p>
                      <Link href={`/producto/${product.id}`}>
                        <h3 className="font-display text-base tracking-tight leading-tight mb-1.5 hover:opacity-60 transition-opacity truncate">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          ${product.price.toLocaleString("es-AR")}
                        </span>
                        {product.original && (
                          <span className="text-xs text-[#0a0a0a]/30 line-through">
                            ${product.original.toLocaleString("es-AR")}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAdd(product)}
                      className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-400 ${
                        addedId === product.id
                          ? "bg-[#0a0a0a] text-[#fafafa] border-[#0a0a0a] scale-95"
                          : "border-[#0a0a0a]/15 hover:bg-[#0a0a0a] hover:text-[#fafafa] hover:border-[#0a0a0a]"
                      }`}
                      aria-label={`Agregar ${product.name} al carrito`}
                    >
                      <AnimatePresence mode="wait">
                        {addedId === product.id ? (
                          <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <ShoppingBag size={14} />
                          </motion.div>
                        ) : (
                          <motion.div key="plus" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Plus size={15} strokeWidth={1.5} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* View all */}
        <div className="mt-16 flex justify-center">
          <button className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] font-semibold border border-[#0a0a0a]/15 px-10 py-4 hover:bg-[#0a0a0a] hover:text-[#fafafa] hover:border-[#0a0a0a] transition-all duration-400">
            Explorar Archivo Completo
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
