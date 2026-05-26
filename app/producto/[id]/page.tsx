"use client";
import { useParams, useRouter } from "next/navigation";
import { products } from "../../data/products";
import { useCart } from "../../store/cart";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Truck, RefreshCw, Shield } from "lucide-react";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const product = products.find((p) => p.id === Number(id));
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="text-center space-y-6">
          <p className="font-display text-3xl font-light italic">Pieza no encontrada</p>
          <button
            onClick={() => router.push("/")}
            className="text-[10px] uppercase tracking-[0.4em] font-semibold border-b border-[#0a0a0a] pb-0.5 hover:opacity-40 transition-opacity"
          >
            Volver al archivo
          </button>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

          {/* Back */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[9px] uppercase tracking-[0.35em] text-[#0a0a0a]/40 hover:text-[#0a0a0a] transition-colors mb-12 font-semibold"
          >
            <ArrowLeft size={13} />
            Volver al archivo
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="sticky top-28"
            >
              <div className="relative aspect-[4/5] bg-[#f2f2f0] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="text-[8px] uppercase tracking-[0.3em] font-semibold bg-[#0a0a0a] text-[#fafafa] px-2.5 py-1">
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-8 pt-4"
            >
              <div>
                <p className="text-[9px] uppercase tracking-[0.5em] text-[#0a0a0a]/35 font-semibold mb-3">
                  {product.brand} — {product.category}
                </p>
                <h1 className="font-display text-4xl md:text-5xl font-light tracking-tight leading-tight mb-5">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-semibold tracking-tight">
                    ${product.price.toLocaleString("es-AR")}
                  </span>
                  {product.original && (
                    <span className="text-base text-[#0a0a0a]/30 line-through">
                      ${product.original.toLocaleString("es-AR")}
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-[#0a0a0a]/6 pt-8">
                <p className="text-sm text-[#0a0a0a]/60 leading-relaxed font-light">
                  {product.description}
                </p>
              </div>

              {/* Stock indicator */}
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 5 ? "bg-green-500" : "bg-amber-500"}`} />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/40 font-semibold">
                  {product.stock > 5 ? "Disponible" : `Últimas ${product.stock} unidades`}
                </span>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAdd}
                className={`w-full py-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.45em] font-semibold transition-all duration-300 ${
                  added
                    ? "bg-green-600 text-white"
                    : "bg-[#0a0a0a] text-[#fafafa] hover:bg-[#2a2a2a]"
                }`}
              >
                <ShoppingBag size={15} strokeWidth={1.5} />
                {added ? "¡Agregado al carrito!" : "Agregar al carrito"}
              </button>

              {/* Perks */}
              <div className="border-t border-[#0a0a0a]/6 pt-6 space-y-3">
                {[
                  { icon: Truck, text: "Envío gratis en pedidos desde $30.000" },
                  { icon: RefreshCw, text: "Cambios y devoluciones dentro de los 30 días" },
                  { icon: Shield, text: "Pago seguro con Mercado Pago" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon size={14} strokeWidth={1.3} className="text-[#0a0a0a]/35 flex-shrink-0" />
                    <span className="text-[11px] text-[#0a0a0a]/45 font-light">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="mt-24 pt-16 border-t border-[#0a0a0a]/6">
              <h2 className="font-display text-2xl font-light italic tracking-tight mb-10">
                También te puede interesar
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                    onClick={() => router.push(`/producto/${p.id}`)}
                  >
                    <div className="aspect-[3/4] bg-[#f2f2f0] overflow-hidden mb-4">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                    </div>
                    <p className="text-[8px] uppercase tracking-[0.3em] text-[#0a0a0a]/35 font-semibold mb-1">
                      {p.brand}
                    </p>
                    <h3 className="font-display text-base tracking-tight group-hover:opacity-60 transition-opacity">
                      {p.name}
                    </h3>
                    <p className="text-sm mt-1 font-medium">
                      ${p.price.toLocaleString("es-AR")}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
