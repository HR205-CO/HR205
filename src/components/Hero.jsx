import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { LOGO_URL, COMPANY_INFO } from '../constants/data';

export default function Hero({ onBookClick }) {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Logo */}
          <img 
            src={LOGO_URL}
            alt={COMPANY_INFO.name}
            className="h-32 sm:h-40 mx-auto mb-8"
          />

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Schedule Your Free<br />
            <span className="text-blue-600">Consultation</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {COMPANY_INFO.tagline}
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 font-medium">Personalized Savings</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 font-medium">Top Providers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 font-medium">Free Setup</span>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBookClick}
            className="inline-flex items-center gap-2 bg-blue-600 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-all"
          >
            Book Free Consultation
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <p className="text-sm text-gray-500 mt-4">
            Serving {COMPANY_INFO.serviceAreas} • No obligation • 100% Free
          </p>
        </motion.div>
      </div>
    </section>
  );
}
