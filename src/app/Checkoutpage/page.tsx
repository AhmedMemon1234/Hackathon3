"use client";
import { useEffect, useState } from "react";
import { FaCcVisa, FaCcMastercard, FaCreditCard } from "react-icons/fa";
import axios from "axios";
import { urlFor } from "@/sanity/lib/image";
import { FaMapMarkerAlt } from "react-icons/fa";

interface FormData {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  paymentMethod: string;
  bankAccountNumber: string;
  bankName: string;
  ifscCode: string;
}

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    paymentMethod: "",
    bankAccountNumber: "",
    bankName: "",
    ifscCode: "",
  });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string>("");

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("checkoutCart") || "[]");
    const savedTotal = JSON.parse(localStorage.getItem("checkoutTotal") || "0");
    setCartItems(savedCartItems);
    setTotalAmount(savedTotal);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePaymentMethodSelect = (method: string) => {
    setFormData((prevState) => ({
      ...prevState,
      paymentMethod: method,
    }));
    setPaymentError(""); // Clear error when user selects a payment method
  };

  const handleQuantityChange = (itemId: string, operation: string) => {
    const updatedCart = cartItems.map((item) => {
      if (item.product._id === itemId) {
        let updatedQuantity = item.quantity;
        if (operation === "increase") {
          updatedQuantity += 1;
        } else if (operation === "decrease" && item.quantity > 1) {
          updatedQuantity -= 1;
        }
        item.quantity = updatedQuantity;
      }
      return item;
    });

    setCartItems(updatedCart);
    const updatedTotal = updatedCart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setTotalAmount(updatedTotal);
    localStorage.setItem("checkoutCart", JSON.stringify(updatedCart));
    localStorage.setItem("checkoutTotal", JSON.stringify(updatedTotal));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.paymentMethod) {
      setPaymentError("Please select a payment method.");
      return;
    }

    if (formData.paymentMethod === "bank" && !/^\d+$/.test(formData.bankAccountNumber)) {
      setPaymentError("Bank Account Number must contain only numbers.");
      return;
    }

    if (formData.paymentMethod === "creditCard") {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvc) {
        setPaymentError("Please fill in all credit card details.");
        return;
      }
    }

    setIsLoading(true);
    setIsOrderPlaced(false); // Reset order placement state
    setTrackingNumber(""); // Reset tracking number

    // Simulate a delay for loading
    setTimeout(() => {
      setIsLoading(false);
      setIsOrderPlaced(true);
      setTrackingNumber("SHIP123456789");
      getTrackingInfo("SHIP123456789");
    }, 2000);  // 2-second delay to simulate processing
  };

  const getTrackingInfo = async (trackingNumber: string) => {
    try {
      const response = await axios.get(`https://api.goshippo.com/shipments/${trackingNumber}`, {
        headers: {
          Authorization: `ShippoAuthToken ${process.env.SHIPPO_API_KEY}`,
        },
      });
      setTrackingInfo(response.data);
    } catch (error) {
      console.error("Error fetching tracking info:", error);
      setTrackingInfo(null); // Reset tracking info on failure
    }
  };

  const shippingCharge = 1000;
  const deliveryCharge = 500;
  const grandTotal = totalAmount + shippingCharge + deliveryCharge;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Checkout</h2>

      <div className="mb-6 bg-white shadow-lg p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h3>
        <ul className="space-y-4">
          {cartItems.map((item, index) => (
            <li key={index} className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 pb-4">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <img src={urlFor(item.product.image)} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <span className="text-gray-800">{item.product.name} (x{item.quantity})</span>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end space-x-4">
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(item.product._id, "increase")}
                    className="bg-blue-500 text-white text-xl w-8 h-8 rounded-full flex justify-center items-center"
                  >
                    +
                  </button>
                  <p className="text-lg text-gray-800 mx-2">{item.quantity}</p>
                  <button
                    onClick={() => handleQuantityChange(item.product._id, "decrease")}
                    className="bg-red-500 text-white text-xl w-8 h-8 rounded-full flex justify-center items-center"
                  >
                    -
                  </button>
                </div>
                <span className="font-semibold text-gray-800">{item.quantity * item.product.price} PKR</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold mt-4 text-xl text-gray-800">
          <span>Subtotal:</span>
          <span>{totalAmount} PKR</span>
        </div>
        <div className="flex justify-between mt-2 text-lg text-gray-600">
          <span>Shipping:</span>
          <span>{shippingCharge} PKR</span>
        </div>
        <div className="flex justify-between mt-2 text-lg text-gray-600">
          <span>Delivery Charge:</span>
          <span>{deliveryCharge} PKR</span>
        </div>
        <div className="flex justify-between font-bold mt-4 text-xl text-gray-800 border-t pt-4">
          <span>Total:</span>
          <span className="text-2xl font-semibold text-green-600">{grandTotal} PKR</span>
        </div>
      </div>

      {!isOrderPlaced ? (
        <form onSubmit={handleSubmit} className="space-y-6 mt-6 bg-white shadow-lg p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Shipping Information</h3>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-700">Payment Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              className="cursor-pointer text-center hover:bg-gray-200 p-4 rounded-lg transition"
              onClick={() => handlePaymentMethodSelect("visa")}
            >
              <FaCcVisa size={40} />
              <span className="mt-2 block">Visa</span>
            </div>
            <div
              className="cursor-pointer text-center hover:bg-gray-200 p-4 rounded-lg transition"
              onClick={() => handlePaymentMethodSelect("mastercard")}
            >
              <FaCcMastercard size={40} />
              <span className="mt-2 block">Mastercard</span>
            </div>
            <div
              className="cursor-pointer text-center hover:bg-gray-200 p-4 rounded-lg transition"
              onClick={() => handlePaymentMethodSelect("bank")}
            >
              <FaCreditCard size={40} />
              <span className="mt-2 block">Bank Transfer</span>
            </div>
          </div>

          {paymentError && (
            <div className="text-red-600 text-sm mt-2">{paymentError}</div>
          )}

          {formData.paymentMethod === "visa" || formData.paymentMethod === "mastercard" ? (
            <div>
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input
                    type="text"
                    id="cardExpiry"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700">CVC</label>
                  <input
                    type="text"
                    id="cardCvc"
                    name="cardCvc"
                    value={formData.cardCvc}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          ) : formData.paymentMethod === "bank" ? (
            <div className="mt-4">
              <div>
                <label htmlFor="bankAccountNumber" className="block text-sm font-medium text-gray-700">Bank Account Number</label>
                <input
                  type="text"
                  id="bankAccountNumber"
                  name="bankAccountNumber"
                  value={formData.bankAccountNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">Bank Name</label>
                <input
                  type="text"
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700">IFSC Code</label>
                <input
                  type="text"
                  id="ifscCode"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          ) : null}

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Place Order"}
          </button>
        </form>
      ) : (
        <div className="bg-white shadow-lg p-6 rounded-xl mt-6">
          <h3 className="text-xl font-semibold text-green-600 mb-4">Thank You for Your Order!</h3>
          <p className="text-gray-800 mb-4">Your order has been placed. Your tracking number is <strong>{trackingNumber}</strong>.</p>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Tracking Info</h4>
          {trackingInfo ? (
            <div className="space-y-2">
              <p>Status: {trackingInfo.status}</p>
              <p>Estimated Delivery: {trackingInfo.estimated_delivery}</p>
              <p>Last Location: {trackingInfo.last_location}</p>
            </div>
          ) : (
            <p>Tracking information is being processed.</p>
          )}
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Live Tracking</h4>
          <div className="border-2 border-gray-300 p-4 mb-4 rounded-md">
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-blue-500" />
              <a
                href={`https://goshippo.com/${trackingNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Track Your Shipment
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
