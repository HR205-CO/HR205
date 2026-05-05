import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LOGO_URL, COMPANY_INFO } from '../constants/data';

export default function Navbar({ onBookClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={LOGO_URL} 
              alt={COMPANY_INFO.name}
              className="h-12 sm:h-16"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600 font-medium">
              Services
            </button>
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600 font-medium">
              About
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-blue-600 font-medium">
              Reviews
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-gray-700 hover:text-blue-600 font-medium">
              FAQ
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 font-medium">
              Contact
            </button>
            <button 
              onClick={onBookClick}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
            <button onClick={() => scrollToSection('services')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50">
              Services
            </button>
            <button onClick={() => scrollToSection('about')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50">
              About
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50">
              Reviews
            </button>
            <button onClick={() => scrollToSection('faq')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50">
              FAQ
            </button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50">
              Contact
            </button>
            <div className="px-4">
              <button 
                onClick={() => {
                  setIsOpen(false);
                  onBookClick();
                }}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
