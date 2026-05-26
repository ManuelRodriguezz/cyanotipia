"use client";
import { useEffect } from "react";
import { useCart } from "../store/cart";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import CheckoutNavbar from "../components/CheckoutNavbar";

export default function SuccessPage() {
  const { clear } = useCart();
  const router = useRouter();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <CheckoutNavbar />
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 max-w-md"
        >
          <div className="w-16 h-16 rounded-full border border-[#0a0a0a]/10 flex items-center justify-center mx-auto">
            <span className="text-2xl">✓</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-[0.55em] text-[#0a0a0a]/35 font-semibold block mb-4">
              Pedido confirmado
            </span>
            <h1 className="font-display text-4xl font-light italic tracking-tight mb-4">
              Gracias por tu compra.
            </h1>
            <p className="text-sm text-[#0a0a0a]/50 leading-relaxed font-light">
              Recibirás un email con los detalles de tu pedido.
              Nos pondremos en contacto a la brevedad para coordinar el envío.
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="bg-[#0a0a0a] text-[#fafafa] px-10 py-4 text-[10px] uppercase tracking-[0.45em] font-semibold hover:bg-[#2a2a2a] transition-colors"
          >
            Volver al Archivo
          </button>
        </motion.div>
      </div>
    </div>
  );
}
