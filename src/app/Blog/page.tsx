import React from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image from Next.js

const BlogPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      <section
        className="relative w-full h-[400px] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/rectangle.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center">
          <div>
            <div className="mb-4">
              <Image src="/images/Meubel House_Logos-05.png" alt="Logo" width={128} height={64} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog</h1>
            <p className="text-sm md:text-base text-gray-200">
              <Link href="/" className="hover:underline">
                Home
              </Link>{" "}
              / Blog
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-10 grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <article className="bg-white shadow rounded-lg overflow-hidden mb-6">
            <Image src="/images/Rectangle 68.png" alt="Blog Post 1: Millennial Design" width={600} height={240} className="w-full h-60 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">Going all in with millennial design</h3>
              <p className="text-gray-600">Explore the essence of millennial aesthetics in furniture design...</p>
              <a href="#" className="text-blue-500 hover:underline mt-3 inline-block">
                Read more
              </a>
            </div>
          </article>

          <article className="bg-white shadow rounded-lg overflow-hidden mb-6">
            <Image src="/images/r2.png" alt="Blog Post 2: Exploring New Ideas" width={600} height={240} className="w-full h-60 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">Exploring new ideas in furniture design</h3>
              <p className="text-gray-600">Creative and functional furniture designs for modern homes...</p>
              <a href="#" className="text-blue-500 hover:underline mt-3 inline-block">
                Read more
              </a>
            </div>
          </article>

          <article className="bg-white shadow rounded-lg overflow-hidden">
            <Image src="/images/r3.png" alt="Blog Post 3: Handmade Pieces" width={600} height={240} className="w-full h-60 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">Handmade pieces that took time to make</h3>
              <p className="text-gray-600">A glimpse into the world of handmade furniture...</p>
              <a href="#" className="text-blue-500 hover:underline mt-3 inline-block">
                Read more
              </a>
            </div>
          </article>
        </section>

        <aside>
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h4 className="text-xl font-bold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Modern Design</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Vintage Style</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Handmade</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Sustainable Furniture</a></li>
            </ul>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h4 className="text-xl font-bold mb-4">Recent Posts</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="flex items-center space-x-4">
                  <Image src="/images/rp2.png" alt="Recent Post 1: Sustainable Living" width={64} height={64} className="w-16 h-16 object-cover rounded" />
                  <span className="text-gray-600 hover:text-gray-800">Small steps to sustainable living</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-4">
                  <Image src="/images/rp.png" alt="Recent Post 2: Trends in 2024" width={64} height={64} className="w-16 h-16 object-cover rounded" />
                  <span className="text-gray-600 hover:text-gray-800">Trends in 2024 furniture design</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default BlogPage;
