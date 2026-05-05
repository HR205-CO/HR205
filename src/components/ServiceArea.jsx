import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function ServiceArea() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <MapPin className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Proudly Serving
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6">
            Texas & Alabama
          </p>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Local experts who understand your area, your providers, and your needs. 
            We bring big-city telecom expertise right to your neighborhood.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
