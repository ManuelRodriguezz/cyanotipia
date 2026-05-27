import { Metadata } from 'next';
import Conjuntos from '../components/Conjuntos';

export const metadata: Metadata = {
  title: 'Conjuntos Premium | Cyanotipia',
  description: 'Explora nuestra colección exclusiva de conjuntos de lino y algodón orgánico diseñados para la elegancia moderna.',
};

export default function ConjuntosPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-12">
      <Conjuntos />
    </main>
  );
}
