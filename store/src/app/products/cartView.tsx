
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from './page';

export default function ProductVideoModal({ products }: { products: Product[] }) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => {
          const hasVideo = Boolean(product.video?.secure_url);

          return (
            <button
              key={product._id}
              onClick={() => hasVideo && setSelectedVideo(product.video?.secure_url || null)}
              className="text-left relative group"
              disabled={!hasVideo}
            >
              <div className={`bg-white rounded-2xl shadow-lg transition overflow-hidden border border-gray-200 ${hasVideo ? 'group-hover:shadow-2xl' : ''}`}>
                <div className="relative">
                  <img
                    src={product.images[0]?.optimizeUrl || product.images[0]?.secure_url}
                    alt={product.name}
                    className={`w-full h-56 object-cover transition ${hasVideo ? 'group-hover:blur-sm' : ''}`}
                  />
                  {hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition">
                      Click to watch video
                    </div>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-primary font-bold text-lg">৳{product.price}</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {product.category?.name}
                    </span>
                  </div>
                  <Link
                    href={{
                      pathname: `/products/${product._id}`,
                      query: {
                        name: product.name,
                        price: product.price,
                        description: product.description,
                      },
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="btn btn-outline btn-sm w-full mt-2 text-center"
                  >
                    Add to Cart
                  </Link>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
            >
              &times;
            </button>
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full h-[400px] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
