"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Product } from "../types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, rotate: 0.5 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Link href={`/product/${product.id}`}>
        <div className="rounded-xl bg-[#111111]/70 backdrop-blur border border-cyan-400/40 hover:border-pink-400/60 shadow-[0_0_20px_#00ffe066] hover:shadow-[0_0_30px_#ff00f566] transition-all p-4 overflow-hidden h-full flex flex-col justify-between">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-lg mb-3 transition-transform group-hover:scale-105"
          />
          <h2 className="text-cyan-300 text-lg font-semibold truncate">{product.title}</h2>
          <p className="text-pink-400 font-bold text-xl">${product.price}</p>
        </div>
      </Link>
    </motion.div>
  );
}