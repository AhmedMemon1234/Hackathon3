"use client";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-white text-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 flex flex-col lg:flex-row items-center justify-between">
        {/* Text Content */}
        <motion.div
          className="text-center lg:text-left lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">
            Elevate Your <span className="text-blue-600">Wardrobe</span>
          </h1>
          <p className="text-lg lg:text-xl mb-8 text-gray-600">
            Step into the future of fashion with handpicked, trendy designs for every style and occasion.
          </p>
          <div className="flex justify-center lg:justify-start space-x-4 mb-6">
            <motion.a
              href="#shop"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-lg transition text-lg"
              whileHover={{ scale: 1.1 }}
            >
              Shop Now
            </motion.a>
            <motion.a
              href="#collections"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white shadow-lg transition text-lg"
              whileHover={{ scale: 1.1 }}
            >
              Explore Collections
            </motion.a>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shadow-md">
                <i className="fas fa-tshirt"></i>
              </div>
              <p className="text-gray-700 font-medium">Quality Materials</p>
            </motion.div>
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center shadow-md">
                <i className="fas fa-star"></i>
              </div>
              <p className="text-gray-700 font-medium">Premium Designs</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Image Content */}
        <motion.div
          className="lg:w-1/2 relative flex items-center justify-center mt-12 lg:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="relative w-full max-w-md transform rotate-3">
            <img
              src="/menhero.jpg"
              alt="Men in Shalwar Kurta"
              className="w-full rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
            />
            <motion.div
              className="absolute top-6 left-6 bg-blue-600 text-white px-4 py-1 rounded-md text-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Men's Collection
            </motion.div>
          </div>
          <div className="relative w-full max-w-sm mt-12 lg:mt-0 lg:ml-12 transform -rotate-3">
            <img
              src="/womenhero.jpg"
              alt="Women in Traditional Dress"
              className="w-full rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
            />
            <motion.div
              className="absolute top-6 left-6 bg-pink-600 text-white px-4 py-1 rounded-md text-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Women's Collection
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Unique Decorative Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="w-[300px] h-[300px] bg-gradient-to-br from-blue-200 to-blue-400 rounded-full absolute top-20 -left-16 blur-2xl opacity-40"></div>
        <div className="w-[250px] h-[250px] bg-gradient-to-br from-pink-200 to-pink-400 rounded-full absolute bottom-10 -right-12 blur-2xl opacity-40"></div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
