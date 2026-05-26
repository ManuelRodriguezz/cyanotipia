import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Brands from "./components/Brands";
import Concept from "./components/Concept";
import Products from "./components/Products";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-[#0a0a0a] selection:text-[#fafafa]">
      <Navbar />
      <main className="w-full overflow-hidden">
        <Hero />
        <Brands />
        <Concept />
        <Products />
      </main>
      <Footer />
    </div>
  );
}
