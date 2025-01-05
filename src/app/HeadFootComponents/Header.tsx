// components/Header.tsx
"use client"
import { useState } from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Brand Name and Icons */}
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">
            <Link href="/">AhmedFabs</Link>
          </div>
          <div className="flex space-x-2 text-xl">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8 text-lg">
          <Link href="/" className="hover:text-blue-300">Home</Link>
          <Link href="/dashboard" className="hover:text-blue-300">Dashboard</Link>
          <Link href="/about" className="hover:text-blue-300">About</Link>
          <Link href="/contact" className="hover:text-blue-300">Contact</Link>
        </nav>

        {/* Icons and Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <a href="/SignUp"><button className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700">Sign Up</button></a>
          <a href="/SignIn"><button className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700">Sign In</button></a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex items-center justify-center p-2 text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-black text-white space-y-4 p-4">
          <Link href="/" className="block hover:text-blue-300">Home</Link>
          <Link href="/dashboard" className="block hover:text-blue-300">Dashboard</Link>
          <Link href="/about" className="block hover:text-blue-300">About</Link>
          <Link href="/contact" className="block hover:text-blue-300">Contact</Link>
          <div className="flex space-x-4 text-xl">
          </div>
          <div className="space-y-2">
          <a href="/SignUp"><button className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700">Sign Up</button></a>
          <a href="/SignIn"><button className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700">Sign In</button></a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
