
import ProductVideoModal from './cartView';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  category?: { name: string };
  images: { optimizeUrl?: string; secure_url?: string }[];
  video?: { secure_url: string };
}

// Server component
export default async function ProductsPage() {
  const res = await fetch('https://glore-bd-backend-node-mongo.vercel.app/api/product', {
    cache: 'no-store', // ensures SSR
  });
  const { data: products }: { data: Product[] } = await res.json();

  return (
    <div className="p-6 max-w-7xl mx-auto relative">
      <h2 className="text-3xl font-bold mb-8 text-center">All Products</h2>
      <ProductVideoModal products={products} />
    </div>
  );
}
