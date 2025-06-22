import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="border rounded p-4 hover:shadow">
        <div className="w-auto relative aspect-[3/3]">
        <Image src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover mb-2" fill={true}/>
        </div>
        <h2 className="font-semibold">{product.title}</h2>
        <p className="text-gray-600">${product.price}</p>
      </div>
    </Link>
  );
}