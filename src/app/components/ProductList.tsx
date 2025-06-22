"use client";
import { useEffect, useState } from "react";
import { fetchCategories, fetchProducts, fetchProductsByCategory } from "../lib/api";
import ProductCard from "./ProductCard";
import { Product } from "../types/product";
import { motion } from "framer-motion";

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
  const [clicked, setClicked] = useState(false);

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

  const handleCardClick = () => {
    setClicked(true);
  };

  return (
    <div>
      {error && <p className="text-red-500 text-center font-bold mb-4 animate-pulse">{error}</p>}

      <div className="flex flex-wrap justify-center gap-6 mb-10">
        <motion.select
          whileHover={{ scale: 1.03 }}
          whileFocus={{ scale: 1.04 }}
          onChange={e => setCategory(e.target.value)}
          className="px-5 py-2 bg-[#0f1117] text-cyan-300 font-semibold tracking-wide border border-cyan-500 rounded-lg backdrop-blur hover:border-pink-500 transition duration-300 shadow-[0_0_15px_#00ffe055] focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
          ))}
        </motion.select>

        <motion.select
          whileHover={{ scale: 1.03 }}
          whileFocus={{ scale: 1.04 }}
          onChange={e => setSort(e.target.value)}
          className="px-5 py-2 bg-[#0f1117] text-pink-300 font-semibold tracking-wide border border-pink-500 rounded-lg backdrop-blur hover:border-cyan-400 transition duration-300 shadow-[0_0_15px_#ff00f555] focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          <option value="">Sort</option>
          <option value="price-asc">Price Low-High</option>
          <option value="price-desc">Price High-Low</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
        </motion.select>
      </div>

      {loading ? (
        <p className="text-center text-cyan-300 text-lg animate-pulse tracking-wider">Loading...</p>
      ) : clicked ? (
        <div className="text-center text-pink-400 animate-pulse text-lg font-bold py-20">Loading Product...</div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} onClick={() => handleCardClick()} className="cursor-pointer">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-10 gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setPage(p => Math.max(1, p - 1))}
          className="px-6 py-2 bg-cyan-700 text-white font-bold rounded-xl hover:bg-pink-600 shadow-[0_0_20px_#00ffe088] hover:shadow-[0_0_25px_#ff00f5aa] transition duration-300 tracking-wide"
        >Prev</motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setPage(p => p + 1)}
          className="px-6 py-2 bg-cyan-700 text-white font-bold rounded-xl hover:bg-pink-600 shadow-[0_0_20px_#00ffe088] hover:shadow-[0_0_25px_#ff00f5aa] transition duration-300 tracking-wide"
        >Next</motion.button>
      </div>
    </div>
  );
}