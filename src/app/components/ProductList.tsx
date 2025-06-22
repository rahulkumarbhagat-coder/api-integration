"use client";
import { useEffect, useState } from "react";
import { fetchCategories, fetchProducts, fetchProductsByCategory } from "../lib/api";
import ProductCard from "./ProductCard";
import { Product } from "../types/product";

type Categories = {
    "slug": string,
    "name": string,
    "url": string
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Categories[]>([]);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const skip = (page - 1) * 10;
        const data = category ?
          await fetchProductsByCategory(10, skip, category):
          await fetchProducts(10, skip);

        const sorted = [...data.products];
        if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
        if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
        if (sort === "title-asc") sorted.sort((a, b) => a.title.localeCompare(b.title));
        if (sort === "title-desc") sorted.sort((a, b) => b.title.localeCompare(a.title));

        setProducts(sorted);
        setError("");
      } catch (e) {
        setError("Failed to load products.");
        console.log(e);
      }
      setLoading(false);
    };
    load();
  }, [category, sort, page]);

  useEffect(() => {
    fetchCategories().then(res => {
        setCategories(res)
    });
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex gap-4 mb-4">
        <select onChange={e => setCategory(e.target.value)} className="border p-2">
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
          ))}
        </select>
        <select onChange={e => setSort(e.target.value)} className="border p-2">
          <option value="">Sort</option>
          <option value="price-asc">Price Low-High</option>
          <option value="price-desc">Price High-Low</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6 gap-2">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-4 py-2 bg-gray-200">Prev</button>
        <button onClick={() => setPage(p => p + 1)} className="px-4 py-2 bg-gray-200">Next</button>
      </div>
    </div>
  );
}