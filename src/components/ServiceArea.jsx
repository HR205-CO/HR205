import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Building2, MapPin } from 'lucide-react';

const locations = [
  { name: 'Birmingham (HQ)', top: '58%', left: '66%', isHQ: true, labelPos: 'right' },
  { name: 'Mobile', top: '68%', left: '65%', isHQ: false, labelPos: 'bottom' },
  { name: 'Dallas', top: '58%', left: '46%', isHQ: false, labelPos: 'top' },
  { name: 'Austin', top: '67%', left: '44%', isHQ: false, labelPos: 'left' },
  { name: 'Houston', top: '70%', left: '48%', isHQ: false, labelPos: 'right' },
];

export default function ServiceArea() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-emerald-50 text-emerald-700 mb-6 uppercase tracking-wider">
              Coverage Area
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Local Expertise.<br />
              <span className="text-blue-600">Nationwide Network.</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 font-heading">
              While we have access to a nationwide network of providers, we specialize in delivering tailored connectivity solutions for homes and businesses in Texas and Alabama.
            </p>
            
            <div className="space-y-4">
              {[
                'Deep understanding of regional provider coverage',
                'Local support and personalized consultations',
                'Exclusive regional promotions and bundles',
                'Fast-tracked installation coordination'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[450px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-blue-50/50"
          >
            {/* Abstract dotted map pattern */}
            <div 
              className="absolute inset-0 opacity-30 bg-[length:24px_24px]"
              style={{ backgroundImage: 'radial-gradient(circle at center, #9ca3af 1.5px, transparent 1.5px)' }}
            />
            
            {/* Stylized US Map Image */}
            <div 
              className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-20"
              style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/1/1a/Blank_US_Map_%28states_only%29.svg")' }}
            />

            {/* City Markers */}
            {locations.map((loc, idx) => {
              let labelClasses = "";
              switch (loc.labelPos) {
                case 'top': labelClasses = "bottom-full mb-2 left-1/2 -translate-x-1/2"; break;
                case 'bottom': labelClasses = "top-full mt-2 left-1/2 -translate-x-1/2"; break;
                case 'left': labelClasses = "right-full mr-2 top-1/2 -translate-y-1/2"; break;
                case 'right': labelClasses = "left-full ml-2 top-1/2 -translate-y-1/2"; break;
              }

              return (
                <motion.div 
                  key={loc.name}
                  className="absolute z-10 group cursor-pointer"
                  style={{ top: loc.top, left: loc.left }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulse effect */}
                    <div className={`absolute -inset-3 rounded-full blur-md animate-pulse ${loc.isHQ ? 'bg-blue-500/50' : 'bg-emerald-500/40'}`} />
                    
                    {/* Marker Dot */}
                    <div className={`relative z-10 w-4 h-4 rounded-full border-2 border-white shadow-md ${loc.isHQ ? 'bg-blue-600' : 'bg-emerald-500'} group-hover:scale-125 transition-transform duration-300`} />
                    
                    {/* Permanent Small Tag */}
                    <div className={`absolute ${labelClasses} whitespace-nowrap pointer-events-none`}>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg shadow-sm border ${loc.isHQ ? 'bg-blue-600 text-white border-blue-500' : 'bg-white text-gray-800 border-gray-200'} group-hover:-translate-y-1 transition-transform duration-300`}>
                        {loc.isHQ && <Building2 className="w-3 h-3" />}
                        {!loc.isHQ && <MapPin className="w-3 h-3 text-emerald-500" />}
                        <span className="text-xs font-bold">{loc.name}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Decorative gradients */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-emerald-500/10 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
