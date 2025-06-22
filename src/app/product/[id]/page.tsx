import { fetchProductById } from "@/app/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: {params: Promise<{id: string}>}) {
  const { id } = await params
  const product = await fetchProductById(Number(id));
  if (!product) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">{product.title}</h1>
      <div className="flex gap-4">
        <div className="w-100 relative aspect-[3/3]">
        <Image src={product.thumbnail} alt={product.title} className="" fill={true}/>
        </div>
        <div>
          <p className="mb-2">{product.description}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Rating:</strong> {product.rating}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Price:</strong> ${product.price}</p>
        </div>
      </div>
    </div>
  );
}