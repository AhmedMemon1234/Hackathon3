import { motion } from "framer-motion";

const MeetOurTeam = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <motion.h2
          className="text-4xl font-semibold text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Meet Our Team
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <motion.div
            className="team-member bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src="/team1.webp"
              alt="Team Member 1"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-2">John Doe</h3>
            <p className="text-gray-600 text-center">CEO</p>
          </motion.div>

          {/* Team Member 2 */}
          <motion.div
            className="team-member bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src="/team2.webp"
              alt="Team Member 2"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-2">Jane Smith</h3>
            <p className="text-gray-600 text-center">Marketing Head</p>
          </motion.div>

          {/* Team Member 3 */}
          <motion.div
            className="team-member bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src="/team3.webp"
              alt="Team Member 3"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-2">Alice Brown</h3>
            <p className="text-gray-600 text-center">Product Manager</p>
          </motion.div>

          {/* Team Member 4 */}
          <motion.div
            className="team-member bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src="/team4.jpg"
              alt="Team Member 4"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-2">Chris Johnson</h3>
            <p className="text-gray-600 text-center">Lead Developer</p>
          </motion.div>

          {/* Team Member 5 */}
          <motion.div
            className="team-member bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src="/team5.jpg"
              alt="Team Member 5"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-2">Sarah Lee</h3>
            <p className="text-gray-600 text-center">UX/UI Designer</p>
          </motion.div>

          {/* Team Member 6 */}
          <motion.div
            className="team-member bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src="/team6.jpg"
              alt="Team Member 6"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-2">Michael Scott</h3>
            <p className="text-gray-600 text-center">Operations Manager</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam;
