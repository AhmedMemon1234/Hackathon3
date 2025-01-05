"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [inquiryType, setInquiryType] = useState("General Inquiry");

  const handleSubmit = () => {
    const messageText = `Name: ${name}%0AEmail: ${email}%0AInquiry Type: ${inquiryType}%0AMessage: ${message}`;
    const whatsappURL = `https://wa.me/03368952826?text=${messageText}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="bg-white py-16">
      {/* Contact Section */}
      <motion.div
        className="container mx-auto px-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-5xl font-bold text-blue-600 mb-8">Get in Touch</h2>
        <p className="text-lg text-gray-700 mb-12">
          We would love to hear from you! Fill out the form below, and we will get back to you as soon as possible.
        </p>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-gray-100 p-8 rounded-xl shadow-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-6"
          >
            <div>
              <label className="text-lg font-semibold text-gray-800">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="text-lg font-semibold text-gray-800">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="text-lg font-semibold text-gray-800">Inquiry Type</label>
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Product Support">Product Support</option>
                <option value="Order Status">Order Status</option>
              </select>
            </div>

            <div>
              <label className="text-lg font-semibold text-gray-800">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows={6}
                placeholder="Enter your message"
                required
              ></textarea>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Submit
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Google Map Section */}
      <motion.div
        className="container mx-auto py-16 px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-semibold text-center mb-8">Our Location</h2>
        <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
          {/* Google Maps Embed */}
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.337978477365!2d-77.0368703!3d38.9071719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b06b10df1c5f%3A0x95b1c918b0fd35d2!2sWhite%20House!5e0!3m2!1sen!2sus!4v1670172916372!5m2!1sen!2sus"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>

      {/* Additional Contact Info */}
      <motion.div
        className="container mx-auto py-16 px-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-semibold text-center mb-8">Contact Information</h2>
        <div className="space-y-4 text-lg text-gray-700">
          <p><strong>Phone:</strong> <a href="tel:+923368952826" className="text-blue-600">0336-895-2826</a></p>
          <p><strong>Email:</strong> <a href="mailto:ahmedpubgking3388@gmail.com" className="text-blue-600">ahmedpubgking3388@gmail.com</a></p>
          <p className="text-gray-600">Follow us on our social media for updates and offers:</p>
          <div className="flex justify-center space-x-6">
            {/* Social Icons */}
            <a href="https://facebook.com" className="text-blue-600 text-2xl">Facebook</a>
            <a href="https://instagram.com" className="text-pink-600 text-2xl">Instagram</a>
            <a href="https://twitter.com" className="text-blue-500 text-2xl">Twitter</a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
