"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCartItems, updateCartItem, removeCartItem } from "../../actions/actions";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCartItems());
  }, []);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItem(id, newQuantity);
    setCart(getCartItems());
  };

  const handleRemoveItem = (id: string) => {
    removeCartItem(id);
    setCart(getCartItems());
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Product</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Price</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Quantity</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Subtotal</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 flex items-center">
                    <span className="text-gray-800 text-xl font-bold">{item.name}</span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-800">₹{item.price}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-300 rounded-l"
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-300 rounded-r"
                    >
                      +
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-800">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 font-semibold border border-red-600 px-3 py-1 rounded-md hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      ✖ Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-end">
          <div className="w-full max-w-sm rounded-lg shadow-lg bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Cart Totals</h2>
            <div className="flex justify-between text-sm text-gray-600">
              <p>Subtotal</p>
              <p>₹{total.toFixed(2)}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-lg font-semibold text-gray-800">
              <p>Total</p>
              <p>₹{total.toFixed(2)}</p>
            </div>
            <Link href="/checkout" className="block w-full">
              <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                Go to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
