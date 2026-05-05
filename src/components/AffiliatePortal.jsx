import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, DollarSign } from 'lucide-react';
import { COMPANY_INFO } from '../constants/data';

export default function AffiliatePortal() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 sm:p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Become an Affiliate
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Refer friends and family. Earn money for every successful sign-up. It is that simple.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <div className="bg-yellow-400 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-7 h-7 text-blue-900" />
              </div>
              <h3 className="font-bold text-xl mb-2">Earn Cash</h3>
              <p className="text-blue-100 text-sm">Get paid for every referral that signs up</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <div className="bg-yellow-400 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-7 h-7 text-blue-900" />
              </div>
              <h3 className="font-bold text-xl mb-2">No Limit</h3>
              <p className="text-blue-100 text-sm">Refer as many people as you want</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <div className="bg-yellow-400 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-blue-900" />
              </div>
              <h3 className="font-bold text-xl mb-2">Easy Process</h3>
              <p className="text-blue-100 text-sm">We handle the rest after you refer</p>
            </div>
          </div>

          <div className="text-center">
            <a
              href={`mailto:${COMPANY_INFO.email}?subject=Affiliate Program Interest`}
              className="inline-block bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-yellow-300 transition-all"
            >
              Join Affiliate Program
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
