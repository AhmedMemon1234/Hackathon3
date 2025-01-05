import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  const handleQuantityChange = (productId: string, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.product._id === productId
        ? { ...item, quantity: quantity }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
  };

  const handleRemoveItem = (productId: string) => {
    const updatedCart = cartItems.filter(
      (item) => item.product._id !== productId
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    // For now, just log the cart items. You can replace this with real checkout logic.
    alert("Proceeding to checkout");
  };

  if (cartItems.length === 0) {
    return <div>Your cart is empty!</div>;
  }

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.product._id} className="flex items-center justify-between">
            <div>
              <img
                src={item.product.image}
                alt={item.product.name}
                width={50}
                height={50}
              />
              <span>{item.product.name}</span>
            </div>
            <span>{item.product.price} PKR</span>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(item.product._id, +e.target.value)
              }
              min="1"
              className="w-16"
            />
            <button
              onClick={() => handleRemoveItem(item.product._id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div>
        <p>Total: {calculateTotal()} PKR</p>
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
