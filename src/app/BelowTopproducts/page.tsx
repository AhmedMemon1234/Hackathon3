"use client"
import { motion } from "framer-motion";
import { FaDollarSign, FaStar, FaUsers, FaShippingFast } from "react-icons/fa";

const VipStatsSection = () => {
  const stats = [
    {
      title: "Total Sales",
      value: "₨ 2,540,000",
      icon: <FaDollarSign size={40} />,
      description: "Total sales generated from VIP exclusive items.",
    },
    {
      title: "Customer Reviews",
      value: "4.8 / 5",
      icon: <FaStar size={40} />,
      description: "Average customer rating for our VIP products.",
    },
    {
      title: "Active VIP Members",
      value: "1,540",
      icon: <FaUsers size={40} />,
      description: "Number of active VIP members enjoying exclusive benefits.",
    },
    {
      title: "Fast Shipping",
      value: "Rs 1,000",
      icon: <FaShippingFast size={40} />,
      description: "VIP members get free and faster shipping on all orders.",
    },
  ];

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-screen-xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-semibold text-gray-900 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          VIP Member Stats and Benefits
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: index * 0.3, duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-600 text-white p-4 rounded-full">{stat.icon}</div>
              </div>

              <motion.h3
                className="text-2xl font-semibold text-gray-900 mb-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {stat.title}
              </motion.h3>
              <p className="text-xl font-bold text-gray-800 mb-2">{stat.value}</p>
              <p className="text-md text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VipStatsSection;
