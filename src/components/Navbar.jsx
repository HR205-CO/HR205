import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOGO_URL } from '../constants/data';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Affiliates', path: '/affiliates' },
    { name: 'Careers', path: '/hiring' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'py-3' : 'py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-500 rounded-[2rem] px-6 lg:px-8 flex justify-between h-16 items-center ${
          scrolled ? 'glass shadow-2xl shadow-blue-900/5' : 'bg-transparent'
        }`}>
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={LOGO_URL}
              alt="HR205 LLC Communications"
              className="h-12 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1 bg-gray-100/50 rounded-full p-1 mr-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                    location.pathname === link.path 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a href="tel:2058101636" className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-gray-900 hover:bg-gray-100 transition-colors">
                <Phone className="w-4 h-4 text-blue-600" />
                205-810-1636
              </a>
              <Link
                to="/schedule"
                className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 transition-all flex items-center gap-2"
              >
                Book Consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 active:scale-95 transition-all" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[-1] md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[100] md:hidden overflow-y-auto"
            >
              <div className="p-8 space-y-8">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-black tracking-tighter">NAVIGATION</span>
                  <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-100 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block p-6 rounded-3xl border-2 transition-all ${
                        location.pathname === link.path 
                        ? 'border-blue-600 bg-blue-50 text-blue-700' 
                        : 'border-gray-50 bg-gray-50 text-gray-900'
                      }`}
                    >
                      <span className="text-xl font-bold">{link.name}</span>
                    </Link>
                  ))}
                </div>

                <div className="pt-8 border-t border-gray-100 space-y-4">
                  <a href="tel:2058101636" className="flex items-center justify-center gap-3 p-5 bg-blue-50 rounded-3xl text-blue-700 font-bold">
                    <Phone className="w-5 h-5" />
                    Call 205-810-1636
                  </a>
                  <Link
                    to="/schedule"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-3 p-5 bg-gray-900 text-white rounded-3xl font-bold shadow-xl shadow-gray-200"
                  >
                    Schedule Consultation
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
