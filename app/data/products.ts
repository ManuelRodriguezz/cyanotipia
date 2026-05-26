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

export const products: Product[] = [
  {
    id: 1,
    name: "Labial Matte Noir",
    brand: "cyanotipia Beauty",
    price: 9500,
    original: 13000,
    category: "Maquillaje",
    badge: "−27%",
    image: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&q=80&w=800",
    color: "#000000",
    description: "Acabado aterciopelado de larga duración. Fórmula hidratante con pigmentos ultrafinos.",
    stock: 15,
  },
  {
    id: 2,
    name: "Vestido Gala Satin",
    brand: "cyanotipia Couture",
    price: 45000,
    original: null,
    category: "Ropa",
    badge: "Edición Limitada",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800",
    color: "#FFFFFF",
    description: "Seda pura con caída natural. Corte sesgado que abraza la silueta.",
    stock: 5,
  },
  {
    id: 3,
    name: "Fragancia L'Essence",
    brand: "cyanotipia Fragrance",
    price: 32000,
    original: 40000,
    category: "Accesorios",
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
    color: "#F5F5F5",
    description: "Notas de apertura de bergamota, corazón de jazmín y fondo de sándalo.",
    stock: 10,
  },
  {
    id: 4,
    name: "Blazer Estructurado",
    brand: "cyanotipia Couture",
    price: 58000,
    original: null,
    category: "Ropa",
    badge: "Nuevo",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
    color: "#000000",
    description: "Corte entallado con hombreras definidas. Lana merino italiana.",
    stock: 8,
  },
  {
    id: 5,
    name: "Paleta Sombras Onyx",
    brand: "cyanotipia Beauty",
    price: 18000,
    original: 22000,
    category: "Maquillaje",
    badge: "−20%",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800",
    color: "#333333",
    description: "12 tonos de alta pigmentación. De los nudes más cálidos al negro absoluto.",
    stock: 20,
  },
  {
    id: 6,
    name: "Bolso Piel Minimal",
    brand: "cyanotipia Leather",
    price: 85000,
    original: 110000,
    category: "Accesorios",
    badge: "Luxury",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
    color: "#000000",
    description: "Cuero genuino italiano curtido al vegetal. Herrajes en latón envejecido.",
    stock: 3,
  },
];
