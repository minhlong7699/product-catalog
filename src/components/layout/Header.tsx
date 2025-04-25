'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Menu } from 'lucide-react';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav className="container mx-auto flex flex-wrap justify-between items-center py-4 px-4">
        {/* Logo + menu toggle */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" className="text-xl font-bold">
            Ecommerce
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden block text-black"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Main nav links */}
        <div
          className={`w-full md:flex md:items-center md:gap-8 md:w-auto ${
            menuOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mt-4 md:mt-0">
            <Link href="/shop" className="hover:text-gray-600">
              Shop
            </Link>
            <Link href="/stories" className="hover:text-gray-600">
              Stories
            </Link>
            <Link href="/about" className="hover:text-gray-600">
              About
            </Link>
            <div className="relative">
              <input
                type="search"
                placeholder="Search"
                className="pl-7 pr-3 py-1 bg-transparent border-b border-gray-300 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right section: cart + login */}
        <div className="flex gap-6 items-center mt-4 md:mt-0">
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </Link>
          <Link href="/login" className="hover:text-gray-600">
            Login
          </Link>
        </div>
      </nav>
      <div className="border-b border-black" />
    </header>
  );
};
