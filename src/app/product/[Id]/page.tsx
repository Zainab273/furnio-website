"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

interface Product {
  id: string;
  title: string;
  description: string;
  productImage: { asset: { url: string } };
  price: string;
  tags?: string[];
  category?: string;
  discountpercentage?: number;
  isNew?: boolean;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const query = `*[_type == "product" && _id == "${id}"][0]{
          "id": _id,
          title,
          description,
          productImage { asset->{_id, url} },
          price,
          tags,
          category,
          discountpercentage,
          isNew
        }`;

        const data: Product = await client.fetch(query);
        setProduct(data);
      } catch {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      console.log("Added to cart:", product);
      alert(`${product.title} added to cart!`);
    }
  };

  if (loading) return <p className="text-center text-gray-500 py-10">Loading product...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;
  if (!product) return <p className="text-center text-gray-500 py-10">Product not found.</p>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            width={500}
            height={500}
            src={product.productImage?.asset?.url || "/images/placeholder.png"}
            alt={product.title}
            className="w-full h-auto object-cover rounded-lg"
          />
          {product.isNew && (
            <span className="mt-2 inline-block bg-green-500 text-white text-xs font-bold py-1 px-2 rounded-full">
              New Arrival
            </span>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl font-bold text-black mt-4">${product.price}</p>
          {product.discountpercentage && (
            <p className="text-sm text-red-500 mt-1">
              Discount: {product.discountpercentage}%
            </p>
          )}

          <button
            onClick={handleAddToCart}
            className="mt-6 bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Add to Cart
          </button>

          <div className="mt-4">
            <p className="text-sm text-gray-500">Category: {product.category || "N/A"}</p>
            {product.tags && (
              <p className="text-sm text-gray-500">Tags: {product.tags.join(", ")}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
