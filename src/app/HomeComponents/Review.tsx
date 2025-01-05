import { FC, useState } from "react";
import { motion } from "framer-motion";

const initialReviews = [
  { name: "John Doe", review: "Great selection and amazing quality!" },
  { name: "Jane Smith", review: "Loved the fast delivery and support!" },
  { name: "Alex Johnson", review: "Fantastic experience shopping here." },
];

const CustomerReviews: FC = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [isNewCommentVisible, setIsNewCommentVisible] = useState<boolean>(false);

  const handleAddReview = () => {
    if (name.trim() === "" || comment.trim() === "") return;

    const newReview = { name, review: comment };
    setReviews((prev) => [...prev, newReview]);
    setName("");
    setComment("");

    // Trigger immediate visibility for the new comment
    setIsNewCommentVisible(true);
    setTimeout(() => setIsNewCommentVisible(false), 100); // Reset the trigger
  };

  const reviewVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      {/* Customer Reviews Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-6">Customer Reviews</h2>
        <motion.ul
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} // Trigger animation when 20% of the element is in view
        >
          {reviews.map((review, index) => (
            <motion.li
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500"
              variants={reviewVariants}
              initial={isNewCommentVisible && index === reviews.length - 1 ? "visible" : "hidden"}
              animate="visible"
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <p className="font-medium text-gray-800">{review.name}</p>
              <p className="text-gray-600 mt-2">{review.review}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Comment Section */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-6">Leave a Comment</h2>
        <div className="space-y-4">
          {/* Name Input */}
          <input
            type="text"
            className="w-full p-4 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Comment Input */}
          <textarea
            className="w-full p-4 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          {/* Submit Button */}
          <motion.button
            onClick={handleAddReview}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Comment
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
