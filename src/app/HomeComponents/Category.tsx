// components/CategorySection.tsx
import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTshirt, FaShoePrints, FaShoppingBag, FaGem, FaHatCowboy } from "react-icons/fa";

const categories = [
  { name: "Clothing", icon: <FaTshirt color="#f39c12" />, subcategories: ["Men's Clothing", "Women's Clothing"] },
  { name: "Footwear", icon: <FaShoePrints color="#e74c3c" />, subcategories: ["Sneakers", "Boots", "Sandals"] },
  { name: "Bags", icon: <FaShoppingBag color="#3498db" />, subcategories: ["Handbags", "Backpacks", "Tote Bags"] },
  { name: "Jewelry", icon: <FaGem color="#9b59b6" />, subcategories: ["Necklaces", "Bracelets", "Earrings"] },
  { name: "Accessories", icon: <FaHatCowboy color="#2ecc71" />, subcategories: ["Hats", "Belts", "Gloves"] },
];

const CategorySection: FC = () => {
  // State to store visibility of each category
  const [visibleCategories, setVisibleCategories] = useState<boolean[]>(new Array(categories.length).fill(false));

  const checkVisibility = () => {
    // Check visibility of categories as you scroll
    const categoryElements = document.querySelectorAll(".category-item");
    categoryElements.forEach((categoryElement, index) => {
      const rect = categoryElement.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight) {
        setVisibleCategories((prev) => {
          const newVisibility = [...prev];
          newVisibility[index] = true;
          return newVisibility;
        });
      } else {
        setVisibleCategories((prev) => {
          const newVisibility = [...prev];
          newVisibility[index] = false;
          return newVisibility;
        });
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); // Initial visibility check

    return () => {
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Our Categories</h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="category-item flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: visibleCategories[index] ? 1 : 0,
              y: visibleCategories[index] ? 0 : 50,
            }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <div className="text-4xl">{category.icon}</div>
            <h3 className="mt-4 text-lg font-medium">{category.name}</h3>
            {/* Display subcategories if available */}
            {category.subcategories.length > 0 && (
              <ul className="mt-4 text-sm text-gray-600">
                {category.subcategories.map((subcategory, subIndex) => (
                  <li key={subIndex}>{subcategory}</li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CategorySection;
