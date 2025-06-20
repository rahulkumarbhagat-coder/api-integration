"use client";
import ProductList from "./components/ProductList";

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <ProductList />
    </main>
  );
}