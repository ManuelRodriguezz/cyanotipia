export interface Conjunto {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: 'Lino' | 'Algodón';
  images: string[];
  description: string;
  sizes: string[];
  features: string[];
  color: string;
  badge: string;
  stock: number;
}

export const CONJUNTOS_DATA: Conjunto[] = [
  {
    id: 101,
    name: "Conjunto Riviera Lino",
    brand: "Cyanotipia Boutique",
    price: 185000,
    category: "Lino",
    images: [
      "https://images.unsplash.com/photo-1594932224010-75660626c995?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598533023411-7d2a5d45d840?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Un conjunto sofisticado de lino italiano, ideal para eventos de verano al aire libre. Transpirabilidad máxima y elegancia relajada.",
    sizes: ["S", "M", "L", "XL"],
    features: ["100% Lino Italiano", "Corte Tailored Fit", "Botones de Nácar", "Tejido pre-lavado"],
    color: "Arena",
    badge: "Premium",
    stock: 15
  },
  {
    id: 102,
    name: "Set Urbano Cotton-Soft",
    brand: "Cyanotipia Essence",
    price: 142000,
    category: "Algodón",
    images: [
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Comodidad suprema en algodón pima. Este conjunto redefine el loungewear de lujo para el día a día.",
    sizes: ["XS", "S", "M", "L"],
    features: ["Algodón Pima Orgánico", "Acabado Mercerizado", "Cintura elástica invisible", "Costuras reforzadas"],
    color: "Azul Medianoche",
    badge: "Nuevo",
    stock: 22
  },
  {
    id: 103,
    name: "Conjunto Brisa Lino Negro",
    brand: "Cyanotipia Boutique",
    price: 195000,
    category: "Lino",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "La versión nocturna del lino. Elegancia pura en negro profundo con texturas orgánicas.",
    sizes: ["M", "L", "XL"],
    features: ["Lino de alto gramaje", "Diseño minimalista", "Resistente a las arrugas", "Ajuste moderno"],
    color: "Negro Obsidiana",
    badge: "Edición Limitada",
    stock: 8
  }
];
