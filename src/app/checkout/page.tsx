"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { createClient } from "@sanity/client";
import Link from "next/link"; // Import Link from Next.js

const sanityClient = createClient({
  projectId: "s7gdmyvx", // Replace with your Sanity project ID
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-01-01",
  token: "skC7BZe9gl7QGT2O8RVrp6VAaTNhlo9ZGT8TjEjkdC4nzSdOyfR8O7XdjPWuTTT3aUKm6nDr55tuOLKLEs4Zuw1zFpUQzaiCJQLsi2Jm26FJfBAX8Qwn9zlxiI7yvT7FEw2uQUWcleajSD1g23lnq5szk1WKDAe9HUS5tPQTkwiX1j5zW0lK",
});

// Define types
type Product = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
};

type ErrorsType = Partial<Record<keyof FormDataType, string>>;

export default function CheckoutPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [errors, setErrors] = useState<ErrorsType>({});

  useEffect(() => {
    const storedCart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
    setTotal(storedCart.reduce((sum, item) => sum + item.price * item.quantity, 0));
  }, []);

  const validateForm = () => {
    const newErrors: ErrorsType = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zipCode || !/^\d{5,6}$/.test(formData.zipCode)) {
      newErrors.zipCode = "Invalid ZIP Code (5-6 digits required)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const orderData = {
      _type: "order",
      customer: { ...formData },
      products: cart.map(({ title, price, quantity }) => ({
        _type: "product",
        title,
        price,
        quantity,
      })),
      total,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      await sanityClient.create(orderData);
      localStorage.removeItem("cart");
      setCart([]);
      setTotal(0);
      Swal.fire({
        title: "Order Placed!",
        text: "Your order has been placed successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an issue placing your order. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Sanity Order Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="py-6 bg-white shadow">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link> / Checkout
          </p>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Billing details</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handlePlaceOrder}>
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className={key === "zipCode" ? "col-span-2" : ""}>
                <label className="block text-gray-700 mb-2">{key.replace(/([A-Z])/g, " $1").trim()}</label>
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={key.replace(/([A-Z])/g, " $1").trim()}
                  className="w-full p-3 border rounded-lg"
                />
                {errors[key as keyof ErrorsType] && <p className="text-red-500 text-sm">{errors[key as keyof ErrorsType]}</p>}
              </div>
            ))}

            <div className="col-span-2">
              <button type="submit" className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800">
                Place Order
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Your Order</h2>
          {cart.map((item) => (
            <div key={item.id} className="border-b pb-4 mb-4">
              <p className="flex justify-between">
                <span className="font-semibold">{item.title} (x{item.quantity})</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </p>
            </div>
          ))}
          <p className="flex justify-between font-semibold text-lg mb-4">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </p>
        </div>
      </section>
    </div>
  );
}
