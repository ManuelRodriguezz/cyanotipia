"use client";
import { ShieldCheck } from "lucide-react";

export default function CheckoutNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa] border-b border-[#0a0a0a]/6">
      <div className="max-w-[1300px] mx-auto px-8 md:px-16 py-5 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="font-display text-xl md:text-2xl tracking-[0.25em] font-light hover:opacity-50 transition-opacity"
        >
          cyanotipia
        </a>

        {/* Pago seguro */}
        <div className="flex items-center gap-2 text-[#0a0a0a]/30">
          <ShieldCheck size={14} strokeWidth={1.3} />
          <span className="text-[9px] uppercase tracking-[0.35em] font-semibold hidden sm:block">
            Pago Seguro
          </span>
        </div>
      </div>
    </header>
  );
}
