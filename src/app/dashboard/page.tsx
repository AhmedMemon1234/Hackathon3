"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import { FaTimes, FaBell, FaStar } from "react-icons/fa";
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const Dashboard = () => {
  const [range, setRange] = useState<"weekly" | "monthly" | "yearly">("weekly");
  const [dataSetTimeRange, setDataSetTimeRange] = useState<number[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [currentNotification, setCurrentNotification] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [recentOrders, setRecentOrders] = useState([
    { id: "#001", customer: "John Doe", total: "$99.99", status: "Completed" },
    { id: "#002", customer: "Jane Smith", total: "$55.50", status: "Pending" },
    { id: "#003", customer: "Michael Johnson", total: "$120.00", status: "Completed" },
  ]);
  const [topProducts, setTopProducts] = useState([
    { name: "Product A", sales: "5,000", rating: "4.5" },
    { name: "Product B", sales: "3,200", rating: "4.8" },
    { name: "Product C", sales: "1,800", rating: "4.2" },
  ]);

  useEffect(() => {
    const actions = [
      "placed an order",
      "signed up",
      "left a review",
      "completed checkout",
      "subscribed to our newsletter",
    ];
    const randomNotifications = Array.from({ length: 20 }, () => {
      const action = actions[Math.floor(Math.random() * actions.length)];
      return `A customer has ${action}`;
    });
    setNotifications(randomNotifications);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (notifications.length > 0) {
        setCurrentNotification(notifications[0]);
        setNotifications((prev) => prev.slice(1)); // Remove first notification
      }
    }, 15000); // 15 seconds interval for each notification

    return () => clearInterval(interval);
  }, [notifications]);

  useEffect(() => {
    switch (range) {
      case "weekly":
        setDataSetTimeRange([200, 300, 500, 700, 800, 1000, 1200]);
        break;
      case "monthly":
        setDataSetTimeRange([4000, 5500, 6000, 7000, 8000, 10000, 12000]);
        break;
      case "yearly":
        setDataSetTimeRange([50000, 55000, 60000, 70000, 80000, 100000, 120000]);
        break;
    }
  }, [range]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        ticks: { stepSize: 2000 },
        grid: { color: "#f0f0f0" },
      },
    },
  };

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Revenue",
        data: dataSetTimeRange,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.4,
      },
    ],
  };

  const toggleNotificationPanel = () => {
    setShowNotifications(!showNotifications);
  };

  const notificationCount = notifications.length > 9 ? "9+" : notifications.length;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main Content */}
      <div className="container mx-auto py-10 px-4 md:px-8">
        {/* Notification Icon */}
        <motion.div
          className="fixed bottom-5 right-5 bg-blue-600 p-3 rounded-full text-white cursor-pointer shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={toggleNotificationPanel}
        >
          <FaBell size={24} />
          {notifications.length > 0 && (
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {notificationCount}
            </div>
          )}
        </motion.div>

        {/* Notification Panel */}
        {showNotifications && (
          <motion.div
            className="fixed top-10 right-0 w-80 p-4 bg-white text-gray-800 shadow-md rounded-lg z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-semibold text-lg z-50 mb-4">Notifications</h3>
            <button
              onClick={toggleNotificationPanel}
              className="absolute top-2 right-2 text-gray-800 text-lg"
            >
              <FaTimes />
            </button>
            <div>
              {notifications.length === 0 ? (
                <p>No new notifications</p>
              ) : (
                notifications.map((notification, index) => (
                  <div key={index} className="mb-2 text-sm">
                    {notification}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* Dashboard Header */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-semibold text-gray-800">Ahmedfabs Dashboard</h1>
          <div className="flex gap-4 mt-4 sm:mt-0">
            {["weekly", "monthly", "yearly"].map((type) => (
              <button
                key={type}
                onClick={() => setRange(type as "weekly" | "monthly" | "yearly")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  range === type ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                } hover:bg-blue-600 hover:text-white transition duration-200`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Widgets Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[{ title: "Total Sales", value: "10,432", growth: "+12%" },
            { title: "Revenue", value: "$123,432", growth: "+8%" },
            { title: "New Customers", value: "2,032", growth: "+5%" },
            { title: "Products Sold", value: "4,215", growth: "+9%" }].map((widget, index) => (
            <div
              key={index}
              className="bg-blue-500 text-white rounded-lg p-6 shadow-lg cursor-pointer hover:scale-105 transition-transform"
            >
              <h3 className="text-lg font-medium">{widget.title}</h3>
              <p className="text-2xl font-semibold mt-2">{widget.value}</p>
              <p className="text-sm mt-1">Growth: {widget.growth}</p>
            </div>
          ))}
        </motion.div>

        {/* Revenue Chart */}
        <motion.div
          className="mt-8 bg-white rounded-lg p-6 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
          <div className="h-72">
            <Line options={options} data={data} />
          </div>
        </motion.div>

        {/* Recent Orders Table */}
        <motion.div
          className="bg-white rounded-lg p-6 shadow-lg mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead>
                <tr className="text-gray-700 border-b">
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">{order.customer}</td>
                    <td className="px-4 py-2">{order.total}</td>
                    <td className="px-4 py-2">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Product Performance */}
        <motion.div
          className="bg-white rounded-lg p-6 shadow-lg mt-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Top Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topProducts.map((product, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg p-4 shadow-md"
              >
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm mt-1">Sales: {product.sales}</p>
                <p className="text-sm">Rating: {product.rating} <FaStar className="inline text-yellow-500" /></p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
