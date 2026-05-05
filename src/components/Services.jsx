import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Tv, Smartphone, Shield } from 'lucide-react';
import { SERVICES } from '../constants/data';

const ICON_MAP = {
  Wifi: Wifi,
  Tv: Tv,
  Smartphone: Smartphone,
  Shield: Shield
};

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We help you find the best telecom solutions to save money and improve your service
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = ICON_MAP[service.icon] || Wifi;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-6 hover:shadow-xl transition-all"
              >
                <div className="bg-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
