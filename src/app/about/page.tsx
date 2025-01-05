"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Data for customer reviews (changeable)
const reviews = [
  {
    id: 1,
    review: "I absolutely love the quality of the products! Fast delivery and excellent customer service.",
    name: "John Doe",
  },
  {
    id: 2,
    review: "The best shopping experience ever! Great products and fast shipping. Highly recommend!",
    name: "Jane Smith",
  },
  {
    id: 3,
    review: "Quality is top-notch. I'm definitely coming back for more. Thank you for the great experience!",
    name: "Emily Brown",
  },
];

// List of hero images that will change dynamically
const heroImages = [
  "menhero.jpg",
  "womenhero.jpg",
  "men1.jpg",
  "men2.jpg",
  "women1.jpg",
  "women2.jpg"
];

const AboutUs = () => {
  const [currentHeroImage, setCurrentHeroImage] = useState(heroImages[0]);
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentHeroImage((prevImage) => {
        const currentIndex = heroImages.indexOf(prevImage);
        return heroImages[(currentIndex + 1) % heroImages.length];
      });
    }, 5000); // Change hero image every 5 seconds

    return () => clearInterval(imageInterval); // Cleanup interval on component unmount
  }, []);

  const handleNextReview = () => {
    setCurrentReview((prevReview) => (prevReview + 1) % reviews.length);
  };

  const handlePrevReview = () => {
    setCurrentReview(
      (prevReview) => (prevReview - 1 + reviews.length) % reviews.length
    );
  };

  return (
    <div className="bg-white">

      {/* Hero Section with Dynamic Gradient and Enhanced Animations */}
      <motion.div
        className="relative w-full h-[650px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${currentHeroImage})`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>
        <motion.div
          className="text-center text-white z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-extrabold tracking-wide mb-6">Experience the Luxury of Premium Quality</h1>
          <p className="text-xl mb-6 max-w-3xl mx-auto">Shop our exclusive collection of premium products, designed for luxury and comfort. Transform your shopping experience with top-quality selections and fast, reliable service.</p>
          <div className="flex justify-center space-x-6">
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-full shadow-xl hover:scale-110 transition-all duration-300 ease-in-out"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Start Shopping
            </motion.button>
            <motion.button
              className="bg-transparent border-2 border-white text-white py-3 px-6 rounded-full shadow-xl hover:scale-110 transition-all duration-300 ease-in-out"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Our Story Section with Background Overlay */}
      <motion.div
        className="container mx-auto py-16 px-8 bg-gradient-to-r from-gray-100 via-transparent to-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-semibold text-center mb-12 text-gray-800">Our Story</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          We started with a simple vision: to provide customers with premium products that blend style and durability. Every product in our collection reflects our commitment to quality, luxury, and customer satisfaction. Our journey has been one of passion and hard work, and we're excited to continue growing with our loyal customers.
        </p>
      </motion.div>

      {/* Our Vision Section with Enhanced Cards */}
      <motion.div
        className="bg-gray-100 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-8 text-gray-800">Our Vision</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-8 rounded-lg shadow-xl hover:scale-105 transform transition-all"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">Quality</h3>
              <p className="text-lg text-gray-600">We select only the finest materials, ensuring every product is of exceptional quality.</p>
            </motion.div>
            <motion.div
              className="bg-white p-8 rounded-lg shadow-xl hover:scale-105 transform transition-all"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-green-600">Sustainability</h3>
              <p className="text-lg text-gray-600">We are committed to reducing our environmental footprint by offering sustainable products and practices.</p>
            </motion.div>
            <motion.div
              className="bg-white p-8 rounded-lg shadow-xl hover:scale-105 transform transition-all"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-purple-600">Customer Satisfaction</h3>
              <p className="text-lg text-gray-600">Our goal is to provide the best shopping experience, ensuring our customers' needs are met at every step.</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Customer Reviews Section with Sliding Carousel */}
      <motion.div
        className="container mx-auto py-16 px-8 bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-semibold text-center mb-12 text-gray-800">What Our Customers Say</h2>
        <div className="flex justify-center items-center space-x-8">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md transition-all transform"
            key={reviews[currentReview].id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-lg text-gray-700 mb-4">"{reviews[currentReview].review}"</p>
            <p className="text-xl font-semibold text-gray-800">{reviews[currentReview].name}</p>
          </motion.div>
        </div>

        {/* Review Navigation Arrows with Hover Animations */}
        <div className="flex justify-center mt-6">
          <motion.button
            className="bg-gray-200 p-3 rounded-full mx-4 hover:bg-gray-300 transition-all"
            onClick={handlePrevReview}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowLeft className="text-2xl" />
          </motion.button>
          <motion.button
            className="bg-gray-200 p-3 rounded-full mx-4 hover:bg-gray-300 transition-all"
            onClick={handleNextReview}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowRight className="text-2xl" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
