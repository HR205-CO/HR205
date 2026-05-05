import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, Clock, Users } from 'lucide-react';
import { COMPANY_INFO } from '../constants/data';

export default function Hiring() {
  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-yellow-400 text-blue-900 font-bold px-4 py-2 rounded-full mb-4">
            WE ARE HIRING
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Join the HR 205 Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Become a telecom consultant and help families and businesses save money while building your career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 text-center shadow-md">
            <DollarSign className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold mb-2">Great Pay</h3>
            <p className="text-sm text-gray-600">Competitive commission structure</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-md">
            <Clock className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold mb-2">Flexible Hours</h3>
            <p className="text-sm text-gray-600">Work on your own schedule</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-md">
            <Briefcase className="w-10 h-10 text-purple-600 mx-auto mb-3" />
            <h3 className="font-bold mb-2">Full Training</h3>
            <p className="text-sm text-gray-600">We teach you everything</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-md">
            <Users className="w-10 h-10 text-orange-600 mx-auto mb-3" />
            <h3 className="font-bold mb-2">Great Team</h3>
            <p className="text-sm text-gray-600">Supportive culture</p>
          </div>
        </div>

        <div className="text-center">
          <a
            href={`mailto:${COMPANY_INFO.email}?subject=I want to join HR 205!`}
            className="inline-block bg-blue-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-all"
          >
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
}
