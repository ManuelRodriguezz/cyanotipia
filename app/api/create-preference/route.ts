import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { items, total, buyer } = await req.json();

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json({ error: "MP_ACCESS_TOKEN no configurado en .env" }, { status: 500 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://tu-tienda.vercel.app";

  const preference = {
    items: items.map((item: { name: string; price: number; qty: number; brand: string }) => ({
      title: `${item.name} — ${item.brand}`,
      unit_price: item.price,
      quantity: item.qty,
      currency_id: "ARS",
    })),
    payer: {
      name: buyer.nombre,
      email: buyer.email,
      phone: { number: buyer.telefono },
    },
    back_urls: {
      success: `${baseUrl}/success`,
      failure: `${baseUrl}/checkout`,
      pending: `${baseUrl}/checkout`,
    },
    auto_return: "approved",
    statement_descriptor: "LUMIÈRE TIENDA",
    external_reference: `ORDER-${Date.now()}`,
  };

  const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(preference),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data.message || "Error MercadoPago" }, { status: 500 });
  }

  return NextResponse.json({ init_point: data.init_point, sandbox_init_point: data.sandbox_init_point });
}
