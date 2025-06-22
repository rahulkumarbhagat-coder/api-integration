import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchProductById } from "@/app/lib/api";

export default async function ProductPage({ params }: {params: Promise<{id: string}>}) {
  const { id } = await params
  const product = await fetchProductById(Number(id));
  if (!product) return notFound();

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative w-full aspect-[4/3] md:aspect-square rounded-lg overflow-hidden border">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{product.title}</h1>
            <p className="text-sm text-gray-500">by {product.brand} | Category: {product.category}</p>
          </div>

          <p className="text-gray-700 text-base leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4 text-lg font-semibold">
            <span className="text-blue-600">₹{product.price}</span>
            <span className="text-sm text-gray-500">⭐ {product.rating} rating</span>
            <span className="text-sm text-green-600">In Stock: {product.stock}</span>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4">
            {product.images.map((img: string, i: number) => (
              <div key={i} className="relative aspect-square border rounded-md overflow-hidden">
                <Image
                  src={img}
                  alt={`image ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}