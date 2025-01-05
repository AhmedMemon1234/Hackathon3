"use client"
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface User {
  email: string;
  password: string;
}

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  size: string;
  color: string;
  quantity: number;
}

const CartIcon = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // Get the user from localStorage (if available)
  useEffect(() => {
    fetchCart();
    const handleCartUpdate = () => fetchCart();
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const fetchCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  };

  const toggleCart = () => {
    setIsOpen(!isOpen);
    if (!isOpen) fetchCart();
  };

  const handleRemove = (productId: string) => {
    if (!user) {
      toast.error("Please log in to modify the cart.");
      return;
    }
    const updatedCart = cartItems.filter((item) => item.product._id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    toast.info("Product removed from cart.");
  };

  const handleQuantityChange = (productId: string, operation: string) => {
    if (!user) {
      toast.error("Please log in to modify the cart.");
      return;
    }
    const updatedCart = cartItems.map((item) => {
      if (item.product._id === productId) {
        let updatedQuantity = item.quantity;
        if (operation === "increase") {
          updatedQuantity += 1;
          toast.success(`Increased quantity of ${item.product.name}`);
        } else if (operation === "decrease" && item.quantity > 1) {
          updatedQuantity -= 1;
          toast.success(`Decreased quantity of ${item.product.name}`);
        } else if (operation === "decrease" && item.quantity === 1) {
          toast.error("Quantity cannot be less than 1.");
        }
        item.quantity = updatedQuantity;
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0);
  };

  const handleAuth = () => {
    if (authMode === "login") {
      if (email && password) {
        setUser({ email, password });
        toast.success("Logged in successfully.");
      } else {
        toast.error("Please enter valid email and password.");
      }
    } else {
      setUser({ email, password });
      toast.success("Signed up successfully.");
    }
    setEmail("");
    setPassword("");
  };

  const handleLogout = () => {
    setUser(null);
    toast.success("Logged out successfully.");
  };

  const shippingCharge = 1000;
  const deliveryCharge = 500;
  const totalAmount = calculateTotal() + shippingCharge + deliveryCharge;

  // Handle the add to cart with color and size
  const handleAddToCart = (product: any, selectedSize: string, selectedColor: string) => {
    const newItem = {
      product: product,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    };

    // Check if the item already exists with the same size and color
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const itemIndex = existingCart.findIndex(
      (item: any) => item.product._id === product._id && item.size === selectedSize && item.color === selectedColor
    );

    if (itemIndex !== -1) {
      // If exists, increase quantity
      existingCart[itemIndex].quantity += 1;
    } else {
      // If not, add as a new item
      existingCart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setCartItems(existingCart);
    toast.success("Product added to cart!");
  };

  return (
    <>
      <div
        className="cart-icon z-50 fixed top-[86.4%] right-4 bg-blue-500 text-white p-4 rounded-full cursor-pointer"
        onClick={toggleCart}
      >
        <FaShoppingCart size={30}/>
        {cartItems.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </div>

      {isOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-4 z-50 overflow-auto">
          <h2 className="text-lg font-bold mb-4">Your Cart</h2>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-1 px-3 rounded mb-4"
            >
              Logout
            </button>
          ) : (
            <div className="mb-4">
              <h3 className="text-md font-semibold mb-2">{authMode === "login" ? "Login" : "Sign Up"}</h3>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border mb-2 px-2 py-1 rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border mb-2 px-2 py-1 rounded"
              />
              <button
                onClick={handleAuth}
                className="w-full bg-green-500 text-white py-1 rounded"
              >
                {authMode === "login" ? "Login" : "Sign Up"}
              </button>
              <p
                className="text-sm text-center mt-2 cursor-pointer text-blue-500"
                onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
              >
                {authMode === "login" ? "Don't have an account? Sign Up" : "Already have an account? Login"}
              </p>
            </div>
          )}

          {cartItems.length === 0 ? (
            <div className="text-center text-gray-600">
              <p>Your cart is empty! Start shopping to add items.</p>
            </div>
          ) : (
            <div className="overflow-y-auto max-h-[50vh]">
              <ul className="space-y-4">
                {cartItems.map((item, index) => (
                  <li key={index} className="flex flex-col items-center">
                    <img
                      src={urlFor(item.product.image)}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover mb-3"
                    />
                    <div className="text-center">
                      <p className="font-bold">{item.product.name}</p>
                      <p>Size: {item.size}</p>
                      <p>Color: {item.color}</p>
                      <p>{item.quantity} x {item.product.price} PKR</p>
                      <p className="font-semibold">
                        Total: {item.quantity * item.product.price} PKR
                      </p>

                      <div className="flex justify-center space-x-2 mt-2">
                        <button
                          onClick={() => handleQuantityChange(item.product._id, "increase")}
                          className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleQuantityChange(item.product._id, "decrease")}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          -
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemove(item.product._id)}
                        className="mt-2 text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {user && cartItems.length > 0 && (
            <div className="mt-4">
              <p className="font-bold mb-2">Total: {totalAmount} PKR</p>
              <Link href="/Checkoutpage">
                <button
                  className="w-full bg-green-500 text-white py-2 rounded-md"
                  onClick={() => {
                    localStorage.setItem("checkoutCart", JSON.stringify(cartItems));
                    localStorage.setItem("checkoutTotal", JSON.stringify(totalAmount));
                  }}
                >
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          )}

          {!user && (
            <div className="text-center mt-4">
              <p className="text-red-500">Please log in to proceed with checkout.</p>
            </div>
          )}

          <button
            onClick={toggleCart}
            className="w-full bg-gray-500 text-white py-2 rounded-md mt-2"
          >
            Close Cart
          </button>
        </div>
      )}
    </>
  );
};

export default CartIcon;
