"use client";
import { useState } from "react";
import { ArrowRight, Instagram } from "lucide-react";

const links = {
  Colecciones: ["Ropa", "Maquillaje", "Accesorios", "Lo más nuevo"],
  Ayuda: ["Envíos", "Cambios y Devoluciones", "Preguntas Frecuentes", "Contacto"],
  Legal: ["Términos y Condiciones", "Política de Privacidad", "Cookies"],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <footer className="bg-[#0a0a0a] text-[#fafafa] pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-[1500px] mx-auto">

        {/* Top: logo + newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16 pb-16 border-b border-white/8">
          <div className="max-w-xs">
            <a href="/" className="font-display text-3xl tracking-[0.25em] font-light block mb-4 hover:opacity-50 transition-opacity">
              cyanotipia
            </a>
            <p className="text-[11px] text-white/40 leading-relaxed font-light">
              Curaduría de piezas atemporales. Moda, belleza y accesorios de autor. Desde Buenos Aires.
            </p>
          </div>

          <div className="w-full lg:w-auto lg:min-w-[340px]">
            <p className="text-[9px] uppercase tracking-[0.5em] font-semibold text-white/30 mb-4">
              Únete al archivo
            </p>
            <h3 className="font-display text-2xl font-light italic mb-6 leading-tight">
              Acceso prioritario a nuevas colecciones.
            </h3>
            {!joined ? (
              <form
                onSubmit={(e) => { e.preventDefault(); if (email) setJoined(true); }}
                className="flex items-end border-b border-white/15 pb-2 gap-2"
              >
                <input
                  type="email"
                  placeholder="TU EMAIL"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-none outline-none text-[10px] tracking-[0.25em] w-full py-2 uppercase text-white placeholder:text-white/25 font-semibold"
                />
                <button
                  type="submit"
                  className="hover:translate-x-1 transition-transform p-1 flex-shrink-0"
                  aria-label="Suscribirse"
                >
                  <ArrowRight size={16} strokeWidth={1.3} />
                </button>
              </form>
            ) : (
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-semibold border-b border-white/15 pb-3">
                ¡Gracias! Ya sos parte del archivo.
              </p>
            )}
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="space-y-5 col-span-2 md:col-span-1">
            <h4 className="text-[9px] uppercase tracking-[0.4em] font-semibold text-white/30">
              cyanotipia
            </h4>
            <ul className="space-y-3 text-[11px] text-white/45 leading-relaxed font-light">
              <li>Archivo de Moda & Belleza</li>
              <li>Buenos Aires, Argentina</li>
              <li>
                <a href="mailto:hola@cyanotipia.com" className="hover:text-white transition-colors">
                  hola@cyanotipia.com
                </a>
              </li>
            </ul>
          </div>

          {Object.entries(links).map(([section, items]) => (
            <div key={section} className="space-y-5">
              <h4 className="text-[9px] uppercase tracking-[0.4em] font-semibold text-white/30">
                {section}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[11px] text-white/45 hover:text-white transition-colors font-light"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="flex gap-6 text-[9px] uppercase tracking-[0.3em] font-semibold text-white/35">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">TikTok</a>
            <a href="#" className="hover:text-white transition-colors">Pinterest</a>
          </div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-medium">
            © 2025 cyanotipia — todos los derechos reservados
          </p>
        </div>

      </div>
    </footer>
  );
}
