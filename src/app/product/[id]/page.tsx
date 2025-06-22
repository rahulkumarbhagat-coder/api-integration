import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchProductById } from "@/app/lib/api";

export default async function ProductPage({ params }: {params: Promise<{id: string}>}) {
  const { id } = await params
  const product = await fetchProductById(Number(id));
  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white p-6 font-audiowide">
      <h1 className="text-3xl font-semibold mb-6 text-cyan-400">{product.title}</h1>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/2">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={600}
            height={400}
            className="w-full h-auto rounded-xl shadow-[0_0_40px_#00ffe0aa]"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <p className="text-lg text-gray-300">{product.description}</p>
          <p><strong className="text-pink-500">Brand:</strong> {product.brand}</p>
          <p><strong className="text-pink-500">Category:</strong> {product.category}</p>
          <p><strong className="text-pink-500">Rating:</strong> {product.rating}</p>
          <p><strong className="text-pink-500">Stock:</strong> {product.stock}</p>
          <p className="text-2xl font-bold text-cyan-400">${product.price}</p>
        </div>
      </div>
    </div>
  );
}