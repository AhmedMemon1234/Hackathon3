"use client";

import { useState, useEffect } from "react";
import { Product as ProductType } from "../product";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<ProductType[]>([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(savedWishlist);
  }, []);

  // Add product to cart
  const handleAddToCart = (product: ProductType) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const productIndex = existingCart.findIndex((item: { product: ProductType }) => item.product._id === product._id);

    if (productIndex !== -1) {
      existingCart[productIndex].quantity += 1;
    } else {
      existingCart.push({ product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    customNotification(`${product.name} has been successfully added to your cart!`, "success");
  };

  // Remove product from wishlist
  const handleRemoveFromWishlist = (productId: string) => {
    const updatedWishlist = wishlist.filter((product) => product._id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    customNotification("Product removed from wishlist.", "info");
  };

  // Custom Notification Function
  const customNotification = (message: string, type: "success" | "info") => {
    const notification = document.createElement("div");
    notification.classList.add("fixed", "bottom-4", "left-1/2", "transform", "-translate-x-1/2", "bg-gray-800", "text-white", "p-4", "rounded-lg", "shadow-lg", "w-72");
    notification.style.zIndex = "9999";

    if (type === "success") {
      notification.style.backgroundColor = "#4CAF50"; // Green for success
    } else if (type === "info") {
      notification.style.backgroundColor = "#2196F3"; // Blue for info
    }

    notification.innerHTML = message;
    document.body.appendChild(notification);

    // Auto-remove the notification after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col sm:flex-row sm:max-w-full items-center sm:items-start overflow-hidden"
            >
              {/* Product Image */}
              <div className="w-20 h-20 flex-shrink-0 mr-4 mb-4 sm:mb-0 sm:mr-6">
                <Image
                  src={urlFor(product.image)}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              {/* Product Info */}
              <div className="flex-grow mb-4 sm:mb-0">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.price} PKR</p>
                <p className="text-xs text-gray-400 line-clamp-2">{product.description}</p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:ml-auto mt-4 sm:mt-0">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all text-sm w-full sm:w-auto"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemoveFromWishlist(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all text-sm w-full sm:w-auto mt-2 sm:mt-0"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
