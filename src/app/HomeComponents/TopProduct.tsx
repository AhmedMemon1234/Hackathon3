"use client";

import { useState, useEffect } from "react";
import { Product as ProductType } from "../product";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { FaHeart } from "react-icons/fa"; // Heart Icon
import { useRouter } from "next/navigation"; // For routing
import { toast } from "react-toastify";
import { motion } from "framer-motion";

interface Props {
  product: ProductType; // Single product
}

const Products = ({ product }: Props) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null); // Color state
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [rating, setRating] = useState<number>(product.rating || 0); // Rating state
  const router = useRouter();

  // Load wishlist status
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const isProductInWishlist = savedWishlist.some((item: ProductType) => item._id === product._id);
    setIsInWishlist(isProductInWishlist);
  }, [product]);

  const handleWishlist = () => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (isInWishlist) {
      const updatedWishlist = savedWishlist.filter((item: ProductType) => item._id !== product._id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
      toast.info(`${product.name} removed from wishlist.`);
    } else {
      savedWishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(savedWishlist));
      setIsInWishlist(true);
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select both a size and a color before adding to cart.");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const productIndex = existingCart.findIndex((item: { product: ProductType }) => item.product._id === product._id);

    if (productIndex !== -1) {
      existingCart[productIndex].quantity += 1;
    } else {
      existingCart.push({ product, quantity: 1, size: selectedSize, color: selectedColor });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    toast.success(`${product.name} added to cart!`);
  };

  const handleRating = (newRating: number) => {
    setRating(newRating);
    // You can send the rating to your backend or save it locally if needed
    toast.success(`Rated ${newRating} stars!`);
  };

  const discountedPrice = product.price - product.price * 0.2; // Apply 20% discount

  return (
    <>
      {/* Fixed Heart Icon (Navigates to Wishlist) */}
      <div className="fixed left-4 top-[92.4%] transform -translate-y-1/2 z-50">
        <div
          className="bg-red-500 text-white p-4 rounded-full cursor-pointer hover:scale-110 transition-transform"
          onClick={() => router.push("/wishlist")} // Redirect to Wishlist Page
        >
          <FaHeart className="text-3xl" />
        </div>
      </div>

      {/* Product Card */}
      <motion.div
        className="product-card max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105 relative border border-gray-200"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        {/* Discount Badge */}
        <div className="absolute top-4 z-50 left-4 bg-red-600 text-white text-sm font-semibold py-1 px-3 rounded-lg">
          20% OFF
        </div>

        {/* Heart Icon for Wishlist */}
        <FaHeart
          onClick={handleWishlist}
          className={`absolute z-50 top-4 right-4 text-xl cursor-pointer ${isInWishlist ? "text-red-500" : "text-gray-500"}`}
        />

        {/* Product Image */}
        <div className="relative h-56 w-full mb-4 overflow-hidden group rounded-lg">
          <Image
            src={urlFor(product.image)}
            alt={product.name}
            width={250}
            height={250}
            className="w-[280px] object-cover rounded-md group-hover:scale-110 transition-transform duration-300 ease-in-out hover:cursor-pointer"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between gap-4 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-gray-500 text-sm line-clamp-3">{product.description}</p>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-medium text-black">{product.price} PKR</span>
            <span className="text-xl font-semibold text-gray-500 line-through">{discountedPrice.toFixed(2)} PKR</span>
          </div>

          {/* Size Selector */}
          <div className="mt-4 flex gap-2 justify-center">
            {["Small", "Medium", "Large"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 rounded-full border-2 border-gray-300 ${
                  selectedSize === size ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                } hover:bg-blue-700 hover:text-white transition-all`}
              >
                {size[0].toUpperCase()}
              </button>
            ))}
          </div>

          {/* Color Selector */}
          <div className="mt-4 flex gap-2 justify-center">
            {["Red", "Blue", "Green"].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 border-gray-300 transition-all ${
                  selectedColor === color
                    ? `bg-${color.toLowerCase()}-600 border-${color.toLowerCase()}-600`
                    : `bg-white border-gray-300`
                }`}
                style={{ backgroundColor: selectedColor === color ? color.toLowerCase() : "#fff" }}
              ></button>
            ))}
          </div>

          {/* Star Rating */}
          <div className="flex items-center mt-4 justify-center">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                onClick={() => handleRating(index + 1)} // Clickable stars
                className={`text-yellow-400 text-3xl cursor-pointer ${index < rating ? "text-yellow-500" : "text-gray-300"}`}
              >
                ★
              </span>
            ))}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Products;
