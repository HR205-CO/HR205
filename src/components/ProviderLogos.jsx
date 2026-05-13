import React from 'react';
import { motion } from 'framer-motion';

const providers = [
  { name: 'AT&T' },
  { name: 'Spectrum' },
  { name: 'Verizon' },
  { name: 'DIRECTV' },
  { name: 'Frontier' },
  { name: 'Brightspeed' },
  { name: 'C-Spire' },
  { name: 'Optimum' },
  { name: 'Vivent' },
  { name: 'T-Fiber/Metronet' },
  { name: 'Gonet Speed Fiber' },
  { name: 'EarthLink' },
];

export default function ProviderLogos() {
  return (
    <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-10">
          Trusted Provider Network
        </p>
        
        <div className="relative">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {providers.map((provider, idx) => (
              <motion.div
                key={provider.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="h-8 md:h-10 flex items-center justify-center"
              >
                {/* Using text for now to ensure reliability, but styled to look like a placeholder logo */}
                <span className="text-xl md:text-2xl font-black tracking-tighter text-gray-400 hover:text-brand-navy transition-colors cursor-default">
                  {provider.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
