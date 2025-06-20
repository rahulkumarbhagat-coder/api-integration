import { fetchProductById } from "@/app/lib/api";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetchProductById(Number(params.id));
  if (!product) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">{product.title}</h1>
      <div className="flex gap-4">
        <img src={product.thumbnail} alt={product.title} className="w-64 h-64 object-cover" />
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