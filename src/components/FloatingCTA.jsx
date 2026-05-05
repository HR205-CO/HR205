import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export default function FloatingCTA({ onClick }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-30 bg-blue-600 text-white rounded-full shadow-2xl p-4 hover:bg-blue-700 transition-all hidden md:flex items-center gap-2"
    >
      <Calendar className="w-6 h-6" />
      <span className="font-bold pr-2">Book Now</span>
    </motion.button>
  );
}
