'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { CONJUNTOS_DATA, Conjunto } from '@/data/productos';
import { useCart } from '../store/cart';

const Conjuntos = () => {
  const [filter, setFilter] = useState<'Todos' | 'Lino' | 'Algodón'>('Todos');
  const add = useCart((s) => s.add);

  const filteredProducts = filter === 'Todos' 
    ? CONJUNTOS_DATA 
    : CONJUNTOS_DATA.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-black transition-colors">Inicio</Link>
        <ChevronRight size={14} />
        <span className="text-black font-medium">Conjuntos</span>
      </nav>

      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-2 uppercase">Nuestros Conjuntos</h1>
          <p className="text-gray-500 max-w-md">Curaduría de piezas premium diseñadas para armonizar entre sí.</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-full w-fit">
          {['Todos', 'Lino', 'Algodón'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-6 py-2 rounded-full text-sm transition-all duration-300 ${
                filter === cat ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        <AnimatePresence mode='popLayout'>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={add} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const ProductCard = ({ product, onAdd }: { product: Conjunto, onAdd: (p: any) => void }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor, selecciona un talle para continuar.");
      return;
    }

    // Adaptamos al store actual integrando el talle
    onAdd({
      ...product,
      id: Number(`${product.id}${product.sizes.indexOf(selectedSize)}`), // ID único por talle
      name: `${product.name} (${selectedSize})`,
      image: product.images[0], // Primera imagen para el store
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group"
    >
      {/* Image Gallery */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-2xl mb-4">
        <Link href={`/producto/${product.id}`}>
          <Image
            src={product.images[currentImg]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
          {product.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImg(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                currentImg === idx ? 'bg-white w-4' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
          {product.badge}
        </div>
      </div>

      {/* Info */}
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
          <p className="text-lg font-semibold">${product.price.toLocaleString('es-AR')}</p>
        </div>

        {/* Sizes */}
        <div className="space-y-2">
          <p className="text-xs uppercase text-gray-400 font-bold tracking-tight">Seleccionar Talle</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 rounded-lg text-xs font-medium border transition-all flex items-center justify-center ${
                  selectedSize === size 
                    ? 'border-black bg-black text-white shadow-lg shadow-black/10' 
                    : 'border-gray-200 hover:border-black text-gray-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-neutral-800 transition-all active:scale-[0.98] group/btn"
        >
          <ShoppingBag size={18} className="group-hover/btn:-translate-y-0.5 transition-transform" />
          <span className="font-medium">Agregar al Carrito</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Conjuntos;
