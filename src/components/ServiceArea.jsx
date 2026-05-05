import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Building2, MapPin } from 'lucide-react';

const locations = [
  { name: 'Birmingham (HQ)', top: '58%', left: '66%', isHQ: true, labelPos: 'right' },
  { name: 'Dallas (Office)', top: '60%', left: '46%', isOffice: true, labelPos: 'left' },
];

// Coverage dots scattered across the US to show nationwide service
const coverageDots = [
  { top: '40%', left: '20%' }, // West coast
  { top: '50%', left: '25%' },
  { top: '35%', left: '30%' },
  { top: '45%', left: '38%' }, // Midwest
  { top: '40%', left: '50%' },
  { top: '55%', left: '55%' },
  { top: '30%', left: '60%' }, // North
  { top: '35%', left: '75%' }, // Northeast
  { top: '45%', left: '78%' },
  { top: '50%', left: '82%' },
  { top: '65%', left: '40%' }, // South
  { top: '70%', left: '55%' },
  { top: '60%', left: '72%' }, // Southeast
  { top: '72%', left: '70%' },
  { top: '42%', left: '65%' },
  { top: '52%', left: '70%' },
];

export default function ServiceArea() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-emerald-50 text-emerald-700 mb-6 uppercase tracking-wider">
              Coverage Area
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Nationwide Service.<br />
              <span className="text-blue-600">Local Expertise.</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              We provide expert telecom consulting across the entire United States. With our headquarters in Birmingham, Alabama and a second office in Dallas, Texas, we deliver tailored connectivity solutions to homes and businesses everywhere.
            </p>
            
            <div className="space-y-4">
              {[
                'Coast-to-coast provider network access',
                'Headquartered in Birmingham, Alabama',
                'Second office in Dallas, Texas',
                'Personalized consultations nationwide'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start sm:items-center gap-3">
                  <CheckCircle2 className="w-5 sm:w-6 h-5 sm:h-6 text-emerald-500 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="text-gray-700 font-medium text-sm sm:text-base">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[350px] sm:h-[450px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-blue-50/50"
          >
            {/* Abstract dotted map pattern */}
            <div 
              className="absolute inset-0 opacity-30 bg-[length:24px_24px]"
              style={{ backgroundImage: 'radial-gradient(circle at center, #9ca3af 1.5px, transparent 1.5px)' }}
            />
            
            {/* Stylized US Map Image */}
            <div 
              className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-25"
              style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/1/1a/Blank_US_Map_%28states_only%29.svg")' }}
            />

            {/* Coverage dots showing nationwide presence */}
            {coverageDots.map((dot, idx) => (
              <motion.div
                key={`dot-${idx}`}
                className="absolute"
                style={{ top: dot.top, left: dot.left }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + idx * 0.05 }}
              >
                <div className="w-2 h-2 rounded-full bg-blue-400/60 animate-pulse" />
              </motion.div>
            ))}

            {/* Connection lines from HQ to Office */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
              <motion.line
                x1="66%" y1="58%"
                x2="46%" y2="60%"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="6 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </svg>

            {/* HQ and Office Markers */}
            {locations.map((loc, idx) => {
              let labelClasses = "";
              switch (loc.labelPos) {
                case 'top': labelClasses = "bottom-full mb-2 left-1/2 -translate-x-1/2"; break;
                case 'bottom': labelClasses = "top-full mt-2 left-1/2 -translate-x-1/2"; break;
                case 'left': labelClasses = "right-full mr-2 top-1/2 -translate-y-1/2"; break;
                case 'right': labelClasses = "left-full ml-2 top-1/2 -translate-y-1/2"; break;
                default: labelClasses = "";
              }

              return (
                <motion.div 
                  key={loc.name}
                  className="absolute z-20 group cursor-pointer"
                  style={{ top: loc.top, left: loc.left }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + idx * 0.2 }}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulse effect */}
                    <div className={`absolute -inset-3 rounded-full blur-md animate-pulse ${loc.isHQ ? 'bg-blue-500/60' : 'bg-emerald-500/60'}`} />
                    
                    {/* Marker Dot - bigger for HQ */}
                    <div className={`relative z-10 ${loc.isHQ ? 'w-5 h-5' : 'w-4 h-4'} rounded-full border-2 border-white shadow-lg ${loc.isHQ ? 'bg-blue-600' : 'bg-emerald-500'} group-hover:scale-125 transition-transform duration-300`} />
                    
                    {/* Permanent Label */}
                    <div className={`absolute ${labelClasses} whitespace-nowrap pointer-events-none`}>
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg shadow-md border ${loc.isHQ ? 'bg-blue-600 text-white border-blue-500' : 'bg-emerald-500 text-white border-emerald-400'} group-hover:-translate-y-1 transition-transform duration-300`}>
                        {loc.isHQ ? <Building2 className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                        <span className="text-xs font-bold">{loc.name}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Nationwide badge */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg border border-gray-100">
                <span className="text-xs sm:text-sm font-bold text-gray-900">🇺🇸 Nationwide Coverage</span>
              </div>
            </div>

            {/* Decorative gradients */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-emerald-500/10 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
