import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingDown, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PromotionPopup() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('hasSeenPromoPopup');
      if (!hasSeenPopup) {
        setIsVisible(true);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    sessionStorage.setItem('hasSeenPromoPopup', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100"
          >
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-700 to-blue-900 -z-0" />
            
            <button 
              onClick={closePopup}
              className="absolute top-6 right-6 p-2 text-white/80 hover:text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative p-8 sm:p-12 pt-16">
              <div className="inline-flex items-center justify-center bg-white rounded-3xl shadow-xl mb-8 relative z-10 p-3">
                <img 
                  src="https://res.cloudinary.com/dptzwxncr/image/upload/q_auto/f_auto/v1777878516/IMG_1193_ysom0i.png"
                  alt="HR205 LLC Communications"
                  className="h-16 w-auto"
                />
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
                Save Up To <span className="text-blue-700">30% Monthly</span> on Your Bills
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                HR205 Communications helps residents and businesses in <span className="font-bold text-gray-900">Texas & Alabama</span> slash their telecom costs with expert consulting.
              </p>

              <div className="grid gap-4 mb-10">
                {[
                  { title: 'Free Analysis', desc: 'We audit your current plans for free.' },
                  { title: 'Better Rates', desc: 'Access exclusive unlisted provider deals.' },
                  { title: 'No Fees', desc: 'Our service is 100% free for customers.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="mt-1 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                      <p className="text-gray-500 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/schedule"
                onClick={closePopup}
                className="flex items-center justify-center gap-2 w-full py-5 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-xl shadow-blue-600/20 group"
              >
                Start Saving Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <p className="mt-6 text-center text-xs text-gray-400 font-medium uppercase tracking-widest">
                Trusted by 500+ Local Clients
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
