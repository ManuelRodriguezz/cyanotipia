"use client";
import { useState, useEffect } from "react";
import { useCart } from "../store/cart";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Archivo", href: "#archivo" },
  { label: "Concepto", href: "#concepto" },
  { label: "Tienda", href: "#archivo" },
];

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
        {/* Announcement bar */}
        <div
          className={`bg-[#0a0a0a] text-[#fafafa] overflow-hidden transition-all duration-500 ${
            scrolled ? "h-0 opacity-0" : "h-auto opacity-100"
          }`}
        >
          <p className="text-[9px] uppercase tracking-[0.55em] text-center py-2.5 font-medium">
            envíos gratuitos en pedidos desde $30.000 — argentina
          </p>
        </div>

        {/* Main nav */}
        <nav
          className={`transition-all duration-500 ${
            scrolled
              ? "glass-nav py-4 shadow-[0_1px_0_rgba(0,0,0,0.05)]"
              : "bg-transparent py-8"
          }`}
        >
          <div className="max-w-[1500px] mx-auto px-8 md:px-16 grid grid-cols-3 items-center">

            {/* Left */}
            <div className="flex items-center gap-10 justify-start">
              <button
                className="lg:hidden text-[#0a0a0a]"
                onClick={() => setMenuOpen(true)}
                aria-label="Abrir menú"
              >
                <Menu size={20} strokeWidth={1.2} />
              </button>
              <div className="hidden lg:flex items-center gap-10">
                <button
                  aria-label="Buscar"
                  className="hover:opacity-40 transition-opacity"
                >
                  <Search size={17} strokeWidth={1.3} />
                </button>
                {navLinks.slice(0, 2).map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-[10px] uppercase tracking-[0.42em] font-semibold hover:opacity-40 transition-opacity"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Center — logo */}
            <div className="flex justify-center">
              <a
                href="/"
                className="font-display text-[1.6rem] md:text-[2.4rem] tracking-[0.25em] font-light hover:opacity-50 transition-opacity duration-500"
              >
                cyanotipia
              </a>
            </div>

            {/* Right */}
            <div className="flex items-center gap-10 justify-end">
              <div className="hidden lg:flex items-center gap-10">
                {navLinks.slice(2).map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-[10px] uppercase tracking-[0.42em] font-semibold hover:opacity-40 transition-opacity"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
              <button
                onClick={() => setCartOpen(true)}
                className="relative group"
                aria-label="Carrito de compras"
              >
                <ShoppingBag
                  size={20}
                  strokeWidth={1.3}
                  className="group-hover:opacity-40 transition-opacity"
                />
                {mounted && count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 bg-[#0a0a0a] text-[#fafafa] text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                  >
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#fafafa] z-[200] flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 right-8"
              aria-label="Cerrar menú"
            >
              <X size={28} strokeWidth={1} />
            </button>
            <a
              href="/"
              className="font-display text-2xl tracking-[0.3em] font-light mb-16 opacity-30"
            >
              cyanotipia
            </a>
            <nav className="flex flex-col items-center gap-10">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[13px] uppercase tracking-[0.5em] font-semibold hover:opacity-40 transition-opacity"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
