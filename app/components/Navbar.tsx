"use client";
import { useState, useEffect } from "react";
import { useCart } from "../store/cart";
import { ShoppingBag, Menu, X, MessageCircle } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Archivo", href: "/#archivo" },
  { label: "Concepto", href: "/#concepto" },
  { label: "Conjuntos", href: "/conjuntos" },
  { label: "Tienda", href: "/#archivo" },
];

const INSTAGRAM_URL = "https://instagram.com/cyanotipia_ind";
const WHATSAPP_URL = "https://wa.me/5491132503050";

function InstagramIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useCart((s) => s.count());

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">

        {/* Top bar */}
        <div className={`bg-[#0a0a0a] text-[#fafafa] overflow-hidden transition-all duration-500 ${
          scrolled ? "h-0 opacity-0" : "h-auto opacity-100"
        }`}>
          <div className="max-w-[1500px] mx-auto px-8 md:px-16 flex items-center justify-between py-2.5">
            <div className="w-[80px]" />
            <p className="text-[9px] uppercase tracking-[0.45em] font-medium">
              envíos gratis desde $30.000
            </p>
            <div className="w-[80px]" />
          </div>
        </div>

        {/* Main nav */}
        <nav className={`transition-all duration-500 ${
          scrolled
            ? "glass-nav py-3 shadow-[0_1px_0_rgba(0,0,0,0.05)]"
            : "bg-transparent py-6"
        }`}>
          <div className="max-w-[1500px] mx-auto px-8 md:px-16 grid grid-cols-3 items-center">

            {/* Left */}
            <div className="flex items-center gap-8 justify-start">
              <button
                className="lg:hidden text-[#0a0a0a]"
                onClick={() => setMenuOpen(true)}
                aria-label="Abrir menú"
              >
                <Menu size={20} strokeWidth={1.2} />
              </button>
              <div className="hidden lg:flex items-center gap-8">
                {navLinks.slice(0, 2).map((l) => (
                  <a key={l.label} href={l.href}
                    className="text-[10px] uppercase tracking-[0.38em] font-semibold hover:opacity-40 transition-opacity">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Center — logo */}
            <div className="flex justify-center">
              <a href="/"
                className="font-display text-[1.5rem] md:text-[2.1rem] tracking-[0.25em] font-light hover:opacity-50 transition-opacity duration-500">
                cyanotipia
              </a>
            </div>

            {/* Right — links + redes + carrito */}
            <div className="flex items-center gap-6 justify-end">
              <div className="hidden lg:flex items-center gap-8">
                {navLinks.slice(2).map((l) => (
                  <a key={l.label} href={l.href}
                    className="text-[10px] uppercase tracking-[0.38em] font-semibold hover:opacity-40 transition-opacity">
                    {l.label}
                  </a>
                ))}
              </div>

              {/* Divisor */}
              <div className="hidden lg:block w-[1px] h-4 bg-[#0a0a0a]/15" />

              {/* Redes — solo íconos */}
              <div className="hidden lg:flex items-center gap-4">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                  aria-label="Instagram" className="hover:opacity-40 transition-opacity">
                  <InstagramIcon size={16} />
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  aria-label="WhatsApp" className="hover:opacity-40 transition-opacity">
                  <MessageCircle size={16} strokeWidth={1.3} />
                </a>
              </div>

              {/* Divisor */}
              <div className="hidden lg:block w-[1px] h-4 bg-[#0a0a0a]/15" />

              {/* Carrito */}
              <button onClick={() => setCartOpen(true)} className="relative group" aria-label="Carrito">
                <ShoppingBag size={20} strokeWidth={1.3}
                  className="group-hover:opacity-40 transition-opacity" />
                {mounted && count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 bg-[#0a0a0a] text-[#fafafa] text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {count}
                  </motion.span>
                )}
              </button>
            </div>

          </div>
        </nav>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#fafafa] z-[200] flex flex-col items-center justify-center">
            <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-8" aria-label="Cerrar">
              <X size={28} strokeWidth={1} />
            </button>
            <a href="/" className="font-display text-2xl tracking-[0.3em] font-light mb-16 opacity-30">
              cyanotipia
            </a>
            <nav className="flex flex-col items-center gap-10">
              {navLinks.map((l) => (
                <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                  className="text-[13px] uppercase tracking-[0.5em] font-semibold hover:opacity-40 transition-opacity">
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="absolute bottom-12 flex items-center gap-8">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-[9px] uppercase tracking-[0.4em] font-semibold opacity-40 hover:opacity-100 transition-opacity">
                <InstagramIcon size={15} /> Instagram
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-[9px] uppercase tracking-[0.4em] font-semibold opacity-40 hover:opacity-100 transition-opacity">
                <MessageCircle size={15} strokeWidth={1.3} /> WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
