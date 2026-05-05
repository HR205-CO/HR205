import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FloatingCTA() {
  return (
    <motion.div
      className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
    >
      <Link to="/schedule">
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 sm:gap-3 bg-gray-900 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-full shadow-2xl shadow-gray-900/30 hover:shadow-gray-900/50 transition-all border border-gray-800 group"
        >
          <div className="bg-blue-600 p-1.5 sm:p-2 rounded-full group-hover:bg-blue-500 transition-colors">
            <Calendar className="w-4 sm:w-5 h-4 sm:h-5" />
          </div>
          <span className="font-bold tracking-wide text-sm sm:text-base">Free Quote</span>
        </motion.div>
      </Link>
    </motion.div>
  );
}
