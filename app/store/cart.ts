import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  original?: number | null;
  category: string;
  badge: string;
  image: string;
  color: string;
  description: string;
  stock: number;
};

type CartItem = Product & { qty: number };

type CartStore = {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (p) => {
        const existing = get().items.find((i) => i.id === p.id);
        if (existing) {
          set({ items: get().items.map((i) => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) });
        } else {
          set({ items: [...get().items, { ...p, qty: 1 }] });
        }
      },
      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      increment: (id) => set({ items: get().items.map((i) => i.id === id ? { ...i, qty: i.qty + 1 } : i) }),
      decrement: (id) => {
        const item = get().items.find((i) => i.id === id);
        if (item && item.qty <= 1) {
          set({ items: get().items.filter((i) => i.id !== id) });
        } else {
          set({ items: get().items.map((i) => i.id === id ? { ...i, qty: i.qty - 1 } : i) });
        }
      },
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((acc, i) => acc + i.price * i.qty, 0),
      count: () => get().items.reduce((acc, i) => acc + i.qty, 0),
    }),
    { name: "cyanotipia-cart" }
  )
);
