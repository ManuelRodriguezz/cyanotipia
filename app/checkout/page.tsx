"use client";
import { useState } from "react";
import { useCart } from "../store/cart";
import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function CheckoutPage() {
  const { items, total } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: "", email: "", telefono: "", direccion: "", ciudad: "", cp: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [payMethod, setPayMethod] = useState<"mp" | "wa">("mp");

  const envio = total() >= 30000 ? 0 : 1500;
  const totalFinal = total() + envio;

  const fields = [
    { key: "nombre", label: "Nombre Completo", placeholder: "Ej. Ana García", span: true },
    { key: "email", label: "Correo Electrónico", placeholder: "ana@ejemplo.com", span: false },
    { key: "telefono", label: "WhatsApp", placeholder: "+54 9 11 0000 0000", span: false },
    { key: "direccion", label: "Dirección y Altura", placeholder: "Av. Santa Fe 1234, 4B", span: true },
    { key: "ciudad", label: "Localidad", placeholder: "Palermo, CABA", span: false },
    { key: "cp", label: "Código Postal", placeholder: "C1414", span: false },
  ];

  const handleMP = async () => {
    if (!form.nombre || !form.email || !form.telefono || !form.direccion) {
      setError("Por favor completá todos los campos obligatorios.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, total: totalFinal, buyer: form }),
      });
      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        setError("Error al conectar con Mercado Pago. Verificá la configuración.");
      }
    } catch {
      setError("Error de conexión. Intentalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const lineas = items
      .map((i) => `• ${i.name} x${i.qty} = $${(i.price * i.qty).toLocaleString("es-AR")}`)
      .join("\n");
    const msg = `¡Hola cyanotipia! Quiero realizar el siguiente pedido:\n\n${lineas}\n\nEnvío: ${envio === 0 ? "Gratis" : "$" + envio.toLocaleString("es-AR")}\n*Total: $${totalFinal.toLocaleString("es-AR")}*\n\nDatos de entrega:\nNombre: ${form.nombre}\nDirección: ${form.direccion}, ${form.ciudad}`;
    window.open(`https://wa.me/5491100000000?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center space-y-8">
            <p className="font-display text-4xl font-light italic tracking-tight">
              el archivo está vacío
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-[#0a0a0a] text-[#fafafa] px-10 py-4 text-[10px] uppercase tracking-[0.4em] font-semibold hover:bg-[#2a2a2a] transition-colors"
            >
              Volver a la Tienda
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#0a0a0a]">
      <Navbar />

      <main className="pt-28 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1300px] mx-auto">

          <header className="mb-14">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-[#0a0a0a]/40 hover:text-[#0a0a0a] transition-colors mb-8 font-semibold"
            >
              <ArrowLeft size={13} /> Volver
            </button>
            <h1 className="font-display text-4xl md:text-5xl tracking-tight font-light">
              Finalizar{" "}
              <span className="italic text-[#0a0a0a]/30">archivo</span>
            </h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">

            {/* Form */}
            <div className="lg:col-span-7 space-y-12">

              {/* Step 1 */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-7 h-7 rounded-full border border-[#0a0a0a] flex items-center justify-center text-[9px] font-bold">
                    1
                  </div>
                  <h3 className="text-[10px] uppercase tracking-[0.35em] font-semibold">
                    Información de Entrega
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {fields.map(({ key, label, placeholder, span }) => (
                    <div key={key} className={span ? "md:col-span-2" : ""}>
                      <label className="text-[8px] uppercase tracking-[0.3em] text-[#0a0a0a]/35 block mb-2 font-semibold">
                        {label}
                      </label>
                      <input
                        type="text"
                        placeholder={placeholder}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                        className="w-full bg-[#fafafa] border-b border-[#0a0a0a]/10 py-3 text-sm focus:border-[#0a0a0a] outline-none transition-colors placeholder:text-[#0a0a0a]/20"
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Step 2 */}
              <section className="pt-8 border-t border-[#0a0a0a]/6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-7 h-7 rounded-full border border-[#0a0a0a] flex items-center justify-center text-[9px] font-bold">
                    2
                  </div>
                  <h3 className="text-[10px] uppercase tracking-[0.35em] font-semibold">
                    Método de Pago
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setPayMethod("mp")}
                    className={`flex flex-col items-start p-5 border text-left transition-all ${
                      payMethod === "mp" ? "border-[#0a0a0a] bg-[#f2f2f0]" : "border-[#0a0a0a]/10 hover:border-[#0a0a0a]/30"
                    }`}
                  >
                    <CreditCard size={18} className="mb-3" strokeWidth={1.3} />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-0.5">
                      Mercado Pago
                    </span>
                    <span className="text-[10px] text-[#0a0a0a]/40">
                      Tarjetas, débito o dinero en cuenta
                    </span>
                  </button>
                  <button
                    onClick={() => setPayMethod("wa")}
                    className={`flex flex-col items-start p-5 border text-left transition-all ${
                      payMethod === "wa" ? "border-[#0a0a0a] bg-[#f2f2f0]" : "border-[#0a0a0a]/10 hover:border-[#0a0a0a]/30"
                    }`}
                  >
                    <MessageCircle size={18} className="mb-3" strokeWidth={1.3} />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-0.5">
                      WhatsApp
                    </span>
                    <span className="text-[10px] text-[#0a0a0a]/40">
                      Consultar y coordinar el pedido
                    </span>
                  </button>
                </div>
              </section>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-100 text-red-500 text-[10px] uppercase tracking-widest font-semibold"
                >
                  {error}
                </motion.div>
              )}
            </div>

            {/* Order summary */}
            <div className="lg:col-span-5">
              <div className="bg-[#f2f2f0] p-8 lg:p-10 sticky top-28">
                <h3 className="text-[9px] uppercase tracking-[0.4em] font-semibold mb-8 pb-4 border-b border-[#0a0a0a]/6">
                  Tu Selección
                </h3>

                <div className="space-y-5 mb-10 max-h-[35vh] overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-start">
                      <div className="w-14 h-18 bg-[#e8e8e6] flex-shrink-0 overflow-hidden" style={{ height: "72px" }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[10px] font-semibold uppercase tracking-tight leading-tight truncate">
                          {item.name}
                        </h4>
                        <p className="text-[9px] text-[#0a0a0a]/40 mt-0.5 uppercase tracking-widest">
                          Cant: {item.qty}
                        </p>
                      </div>
                      <span className="text-xs font-semibold flex-shrink-0">
                        ${(item.price * item.qty).toLocaleString("es-AR")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-[#0a0a0a]/6 pt-6 mb-8">
                  <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-[#0a0a0a]/40 font-semibold">
                    <span>Subtotal</span>
                    <span>${total().toLocaleString("es-AR")}</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-[#0a0a0a]/40 font-semibold">
                    <div className="flex items-center gap-2">
                      <Truck size={12} strokeWidth={1.5} />
                      <span>Envío</span>
                    </div>
                    <span>{envio === 0 ? "Bonificado" : `$${envio.toLocaleString("es-AR")}`}</span>
                  </div>
                  <div className="flex justify-between items-end pt-2">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-semibold">Total</span>
                    <span className="font-display text-3xl font-light tracking-tight">
                      ${totalFinal.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={payMethod === "mp" ? handleMP : handleWhatsApp}
                  disabled={loading}
                  className="w-full bg-[#0a0a0a] text-[#fafafa] py-5 text-[10px] uppercase tracking-[0.45em] font-semibold hover:bg-[#2a2a2a] transition-colors disabled:opacity-40 flex items-center justify-center gap-3"
                >
                  {loading ? "Procesando..." : payMethod === "mp" ? "Proceder al Pago" : "Enviar por WhatsApp"}
                </button>

                <div className="mt-5 flex items-center justify-center gap-2 opacity-30">
                  <ShieldCheck size={13} strokeWidth={1.3} />
                  <span className="text-[8px] uppercase tracking-[0.3em] font-medium">
                    Pago seguro encriptado
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
