"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { AddToCart } from "@/actions/actions";
import Swal from "sweetalert2";

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

const Hero = () => (
  <section
    className="relative w-full h-[400px] bg-cover bg-center"
    style={{ backgroundImage: "url('/images/rectangle.png')" }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
    <div className="relative z-10 flex items-center justify-center h-full text-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Shop</h1>
        <p className="text-sm md:text-base text-gray-200">
          <Link href="/" className="hover:underline">Home</Link> / Shop
        </p>
      </div>
    </div>
  </section>
);

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"]{
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

        const data: Product[] = await client.fetch(query);
        setProducts(data);
        setFilteredProducts(data);

        const allCategories = Array.from(
          new Set(data.flatMap((product) => product.category ? [product.category] : product.tags || []))
        );
        setCategories(allCategories);
      } catch {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      let filtered = products;

      if (searchQuery) {
        filtered = filtered.filter(
          (product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (selectedCategory) {
        filtered = filtered.filter(
          (product) =>
            product.category === selectedCategory || (product.tags && product.tags.includes(selectedCategory))
        );
      }

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [searchQuery, selectedCategory, products]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();

    // Creating a new object that matches AddToCart's expected structure
    const cartProduct = {
      id: product.id,
      name: product.title, // Ensure correct property mapping
      image: product.productImage?.asset?.url || "/images/placeholder.png", // Ensure a fallback
      price: parseFloat(product.price), // Convert price to number
      quantity: 1, // Ensure initial quantity
    };

    Swal.fire({
      position: "center",
      icon: "success",
      title: `${product.title} added to cart`,
      showConfirmButton: false,
      timer: 1000,
    });

    AddToCart(cartProduct); // Now passes the correct object structure
  };

  if (loading) return <p className="text-center text-gray-500 py-10">Loading products...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="min-h-screen">
      <Hero />
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8 px-4">
        <div className="flex items-center border p-2 rounded w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none outline-none p-2 w-full"
          />
        </div>

        <div className="w-full md:w-1/3">
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded"
            value={selectedCategory}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold mb-8 text-center">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="relative border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition">
              <Link href={`/product/${product.id}`}>
                <Image
                  width={500}
                  height={500}
                  src={product.productImage?.asset?.url || "/images/placeholder.png"}
                  alt={product.title || "Product Image"}
                  className="w-full h-48 object-cover"
                />
              </Link>
              {product.isNew && (
                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded-full shadow-md">
                  New Arrival
                </span>
              )}
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-2">${product.price}</p>

                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
