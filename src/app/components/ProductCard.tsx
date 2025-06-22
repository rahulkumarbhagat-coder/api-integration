"use client";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="block group">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition hover:shadow-md h-full flex flex-col">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-between p-4 flex-grow">
          <div>
            <h3 className="text-base font-medium text-gray-900 line-clamp-2 mb-1">{product.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-1">{product.brand}</p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-semibold text-blue-600">₹{product.price}</span>
            <span className="text-xs text-gray-500">⭐ {product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}