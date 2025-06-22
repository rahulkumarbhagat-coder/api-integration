import ProductList from "./components/ProductList";

export default function HomePage() {
  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-[#0a0f1a] to-black text-white font-audiowide">
      <h1 className="text-4xl font-bold mb-8 text-cyan-400 text-center">CyberFlux Marketplace</h1>
      <ProductList />
    </main>
  );
}