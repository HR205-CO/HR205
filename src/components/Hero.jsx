import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Wifi, Tv, Smartphone, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LOGO_URL } from '../constants/data';

const FloatingIcon = ({ Icon, className, delay = 0 }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-10, 10, -10] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute hidden lg:flex p-4 glass rounded-2xl ${className}`}
  >
    <Icon className="w-6 h-6 text-blue-600" />
  </motion.div>
);

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative pt-32 pb-24 lg:pt-52 lg:pb-40 overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-blue-50/50 via-white to-white" />
      
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute top-1/4 right-[10%] w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px] -z-10" 
      />
      <motion.div 
        style={{ y: useTransform(scrollY, [0, 500], [0, -100]), opacity }}
        className="absolute bottom-1/4 left-[5%] w-[400px] h-[400px] bg-indigo-50/40 rounded-full blur-[100px] -z-10" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FloatingIcon Icon={Wifi} className="top-20 left-[15%] rotate-[-12deg]" />
        <FloatingIcon Icon={Tv} className="top-40 right-[15%] rotate-[12deg]" delay={1} />
        <FloatingIcon Icon={Smartphone} className="bottom-40 left-[10%] rotate-[8deg]" delay={2} />
        <FloatingIcon Icon={Shield} className="bottom-20 right-[10%] rotate-[-8deg]" delay={1.5} />

        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img 
              src={LOGO_URL}
              alt="HR205 LLC Communications"
              className="h-32 sm:h-40 mx-auto mb-8"
            />

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-100 bg-blue-50/50 text-blue-700 text-sm font-bold mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 fill-blue-500" />
              <span>Texas & Alabama's Top Telecom Consultant</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 tracking-tight mb-8 leading-[1.05] text-balance">
              Expert Connections. <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
                Zero Fees. Always.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed max-w-2xl mx-auto text-balance">
              We compare the giants so you don't have to. Get the best pricing on internet, cable, and security through our direct partnerships.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link
              to="/schedule"
              className="w-full sm:w-auto bg-gray-900 text-white px-10 py-5 rounded-[2rem] text-lg font-bold hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-gray-200 flex items-center justify-center gap-3 relative group overflow-hidden"
            >
              <span className="relative z-10">Get Started Now</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            
            <Link
              to="/services"
              className="w-full sm:w-auto bg-white text-gray-900 border-2 border-gray-100 px-10 py-5 rounded-[2rem] text-lg font-bold hover:border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              Learn More
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-20 pt-12 border-t border-gray-50 flex flex-col items-center gap-6"
          >
            <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">Partnered with Industry Leaders</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
              {['AT&T', 'Spectrum', 'Xfinity', 'Optimum', 'DirectTV', 'Vivint'].map((brand) => (
                <span key={brand} className="text-xl font-black italic tracking-tighter text-gray-900">{brand}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="lg:hidden mt-16 px-4">
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 snap-x">
          {[
            { icon: Wifi, title: 'Fiber Internet', desc: 'Up to 5Gbps speed' },
            { icon: Shield, title: 'Smart Security', desc: '24/7 Monitoring' },
            { icon: Tv, title: 'Better TV', desc: 'All your channels' },
          ].map((benefit, idx) => (
            <div key={idx} className="min-w-[280px] snap-center p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                <benefit.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{benefit.title}</h3>
                <p className="text-sm text-gray-500">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
