import { AddToCart } from "@/actions/actions";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  title: string;
  inventory: number;
}

const ProductListing: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://template6-six.vercel.app/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.preventDefault();
    AddToCart({ ...product, price: Number(product.price) }); // Ensure price is a number
  };
  

  if (loading) return <p className="text-center text-gray-500">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center">
            <Image
              src={product.image}
              alt={product.name}
              width={128} // Adjust size as needed
              height={128}
              className="object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.price}</p>
            <button
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={(e) => handleAddToCart(e, product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
