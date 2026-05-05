import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

export default function PromotionPopup({ onBookClick }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-sm z-40 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-2xl p-6 text-white"
      >
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 text-white/70 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3">
          <div className="bg-yellow-400 rounded-full p-2 flex-shrink-0">
            <Sparkles className="w-5 h-5 text-blue-900" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">Limited Time Offer!</h3>
            <p className="text-sm text-blue-100 mb-3">
              Book your free consultation today and we will help you save on your monthly bills!
            </p>
            <button
              onClick={() => {
                setIsVisible(false);
                onBookClick();
              }}
              className="bg-yellow-400 text-blue-900 font-bold px-4 py-2 rounded-lg text-sm hover:bg-yellow-300 transition-all"
            >
              Book Now →
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
