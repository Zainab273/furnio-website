import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";
import { MdDeliveryDining, MdAssignmentReturn, MdPayment } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

const ContactPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
    
      <header
        className="relative w-full h-[400px] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/rectangle.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <Image
  src="/images/Meubel House_Logos-05.png"
  alt="Meubel House Logo"
  width={150} // Set an appropriate width
  height={64} // Set an appropriate height
  className="mb-4"
/>


          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-sm md:text-base text-gray-200">
            <Link href="/" className="hover:underline">
              Home
            </Link>{" "}
            / Contact
          </p>
        </div>
      </header>

    
      <section className="container mx-auto px-6 md:px-16 lg:px-32 py-16">
        <h2 className="text-center text-2xl font-bold mb-4">Get In Touch With Us</h2>
        <p className="text-center text-gray-600 mb-12">
          For more information about our products and services, please feel free
          to drop us a line. Our staff is always here to help you out. Do not hesitate!
        </p>
        <div className="flex flex-col md:flex-row gap-12">
        
          <div className="md:w-1/2 space-y-8">
            <div className="flex items-start space-x-4">
              <FaMapMarkerAlt className="text-black text-xl mt-1" />
              <div>
                <h3 className="font-bold text-lg">Address</h3>
                <p>1234 Street Name, New York, USA</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaPhoneAlt className="text-black text-xl mt-1" />
              <div>
                <h3 className="font-bold text-lg">Phone</h3>
                <p>+1 234 567 890</p>
                <p>+1 987 654 321</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaClock className="text-black text-xl mt-1" />
              <div>
                <h3 className="font-bold text-lg">Working Time</h3>
                <p>Monday–Friday: 9:00–20:00</p>
                <p>Saturday–Sunday: 9:00–17:00</p>
              </div>
            </div>
          </div>

         
          <div className="md:w-1/2">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="w-full border px-4 py-3 rounded-lg mt-1"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  className="w-full border px-4 py-3 rounded-lg mt-1"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject (optional)
                </label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Subject (optional)"
                  className="w-full border px-4 py-3 rounded-lg mt-1"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Message"
                  rows={5}
                  className="w-full border px-4 py-3 rounded-lg mt-1"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>


      <section className="bg-gray-100 py-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-around text-center gap-8">
          <div className="flex flex-col items-center">
            <MdDeliveryDining className="text-black text-5xl mb-4" />
            <h3 className="font-bold text-lg">Free Delivery</h3>
            <p>On all orders over ₹500</p>
          </div>
          <div className="flex flex-col items-center">
            <MdAssignmentReturn className="text-black text-5xl mb-4" />
            <h3 className="font-bold text-lg">90 Days Return</h3>
            <p>If goods have problems</p>
          </div>
          <div className="flex flex-col items-center">
            <MdPayment className="text-black text-5xl mb-4" />
            <h3 className="font-bold text-lg">Secure Payment</h3>
            <p>100% secure payment</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
