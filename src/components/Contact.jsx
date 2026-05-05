import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../constants/data';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-blue-100">
            Have questions? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center"
          >
            <div className="bg-yellow-400 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-7 h-7 text-blue-900" />
            </div>
            <h3 className="font-bold text-lg mb-2">Call Us</h3>
            <a href={`tel:${COMPANY_INFO.phone}`} className="text-yellow-400 hover:underline">
              {COMPANY_INFO.phone}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center"
          >
            <div className="bg-yellow-400 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 text-blue-900" />
            </div>
            <h3 className="font-bold text-lg mb-2">Email Us</h3>
            <a href={`mailto:${COMPANY_INFO.email}`} className="text-yellow-400 hover:underline break-all">
              {COMPANY_INFO.email}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center"
          >
            <div className="bg-yellow-400 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-7 h-7 text-blue-900" />
            </div>
            <h3 className="font-bold text-lg mb-2">Visit Us</h3>
            <p className="text-blue-100 text-sm">{COMPANY_INFO.address}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
