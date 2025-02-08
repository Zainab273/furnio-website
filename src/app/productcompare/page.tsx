import React from "react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  material: string;
  dimensions: {
    height: string;
    width: string;
    depth: string;
  };
  warranty: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Aspen Sofa",
    image: "/images/Group 160.png",
    price: "$799",
    material: "Fabric & Wood",
    dimensions: {
      height: "38 inches",
      width: "72 inches",
      depth: "35 inches",
    },
    warranty: "1-year manufacturing warranty",
  },
  {
    id: 2,
    name: "Outdoor Sofa Set",
    image: "/images/Outdoor sofa set 1.png",
    price: "$899",
    material: "Metal & Cushion",
    dimensions: {
      height: "36 inches",
      width: "75 inches",
      depth: "32 inches",
    },
    warranty: "6-month warranty",
  },
];

export default function ProductComparisonPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Product Comparison</h1>
        </div>
      </header>

      
      <main className="container mx-auto px-6 py-8">
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-600 border-b">Feature</th>
                {products.map((product) => (
                  <th
                    key={product.id}
                    className="px-4 py-2 text-center text-gray-800 font-semibold border-b"
                  >
                    {product.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
           
              <tr>
                <td className="px-4 py-2 text-gray-600 border-b">Image</td>
                {products.map((product) => (
                  <td key={product.id} className="px-4 py-2 text-center border-b">
                    <Image
  src={product.image}
  alt={product.name}
  width={96} // Adjust width (24 * 4 pixels)
  height={96} // Adjust height (24 * 4 pixels)
  className="h-24 w-auto mx-auto object-cover"
/>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="px-4 py-2 text-gray-600 border-b">Price</td>
                {products.map((product) => (
                  <td key={product.id} className="px-4 py-2 text-center border-b">
                    {product.price}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="px-4 py-2 text-gray-600 border-b">Material</td>
                {products.map((product) => (
                  <td key={product.id} className="px-4 py-2 text-center border-b">
                    {product.material}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="px-4 py-2 text-gray-600 border-b">Dimensions</td>
                {products.map((product) => (
                  <td key={product.id} className="px-4 py-2 text-center border-b">
                    {`${product.dimensions.height} x ${product.dimensions.width} x ${product.dimensions.depth}`}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="px-4 py-2 text-gray-600 border-b">Warranty</td>
                {products.map((product) => (
                  <td key={product.id} className="px-4 py-2 text-center border-b">
                    {product.warranty}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
