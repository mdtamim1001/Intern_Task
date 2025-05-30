// app/products/[id]/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';

export default function ProductDetailsPage() {
  const searchParams = useSearchParams();

  const name = searchParams.get('name');
  const price = searchParams.get('price');
  const description = searchParams.get('description');

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{name}</h1>
      <p className="text-gray-700 text-lg mb-2">৳{price}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
