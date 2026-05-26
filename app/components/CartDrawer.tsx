"use client";
import { useCart } from "../store/cart";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, remove, increment, decrement, total } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0a0a0a]/25 backdrop-blur-[3px] z-[100]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[420px] bg-[#fafafa] z-[101] flex flex-col shadow-[-30px_0_60px_rgba(0,0,0,0.08)]"
          >
            {/* Header */}
            <div className="px-8 py-7 border-b border-[#0a0a0a]/5 flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl tracking-tight">Tu Carrito</h2>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#0a0a0a]/35 font-semibold mt-1">
                  {items.length} {items.length === 1 ? "artículo" : "artículos"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#f2f2f0] rounded-full transition-colors"
                aria-label="Cerrar carrito"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-5">
                  <div className="w-14 h-14 bg-[#f2f2f0] rounded-full flex items-center justify-center">
                    <ShoppingBag size={20} className="text-[#0a0a0a]/25" strokeWidth={1.3} />
                  </div>
                  <div>
                    <p className="font-medium text-sm tracking-tight mb-1">Carrito vacío</p>
                    <p className="text-xs text-[#0a0a0a]/40 max-w-[180px] mx-auto leading-relaxed">
                      Todavía no agregaste ninguna pieza a tu selección.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-[9px] uppercase tracking-[0.35em] font-semibold border-b border-[#0a0a0a] pb-0.5 hover:opacity-40 transition-opacity"
                  >
                    Explorar el archivo
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      {/* Image */}
                      <div className="w-20 h-26 bg-[#f2f2f0] flex-shrink-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          style={{ height: "104px" }}
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0">
                            <p className="text-[8px] uppercase tracking-[0.3em] text-[#0a0a0a]/35 font-semibold mb-0.5">
                              {item.category}
                            </p>
                            <h3 className="text-sm font-medium leading-tight truncate">{item.name}</h3>
                          </div>
                          <button
                            onClick={() => remove(item.id)}
                            className="text-[#0a0a0a]/20 hover:text-[#0a0a0a] transition-colors flex-shrink-0"
                            aria-label="Eliminar"
                          >
                            <Trash2 size={13} strokeWidth={1.5} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[#0a0a0a]/10 rounded-sm overflow-hidden">
                            <button
                              onClick={() => decrement(item.id)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#f2f2f0] transition-colors"
                            >
                              <Minus size={10} strokeWidth={2} />
                            </button>
                            <span className="text-xs px-2.5 font-medium">{item.qty}</span>
                            <button
                              onClick={() => increment(item.id)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#f2f2f0] transition-colors"
                            >
                              <Plus size={10} strokeWidth={2} />
                            </button>
                          </div>
                          <span className="text-sm font-semibold">
                            ${(item.price * item.qty).toLocaleString("es-AR")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-8 py-7 border-t border-[#0a0a0a]/5 space-y-5 bg-[#fafafa]">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#0a0a0a]/35 font-semibold">
                    <span>Subtotal</span>
                    <span>${total().toLocaleString("es-AR")}</span>
                  </div>
                  <div className="flex justify-between items-end pt-1">
                    <span className="font-display text-lg">Total estimado</span>
                    <span className="text-2xl font-semibold tracking-tight">
                      ${total().toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#0a0a0a] text-[#fafafa] py-4 text-[10px] uppercase tracking-[0.4em] font-semibold flex items-center justify-center gap-3 hover:bg-[#2a2a2a] transition-colors group"
                >
                  Finalizar Compra
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[9px] text-center text-[#0a0a0a]/30 leading-relaxed">
                  Impuestos y envíos calculados al finalizar.
                  <br />
                  Pago seguro con Mercado Pago.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
