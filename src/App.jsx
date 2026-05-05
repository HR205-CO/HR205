import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceArea from './components/ServiceArea';
import Services from './components/Services';
import AffiliatePortal from './components/AffiliatePortal';
import Hiring from './components/Hiring';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Consultation from './components/Consultation';
import PromotionPopup from './components/PromotionPopup';
import ProviderLogos from './components/ProviderLogos';
import FloatingCTA from './components/FloatingCTA';
import AdminLogin from './components/AdminLogin';
import ManagerPortal from './components/ManagerPortal';
import RepPortal from './components/RepPortal';

function HomePage() {
  return (
    <>
      <PromotionPopup />
      <Hero />
      <ServiceArea />
      <ProviderLogos />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}

function MainSite({ onAdminClick }) {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900 relative">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/affiliates" element={<AffiliatePortal />} />
          <Route path="/hiring" element={<Hiring />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/schedule" element={<Consultation />} />
        </Routes>
      </main>
      
      <FloatingCTA />
      
      <footer className="bg-gray-50 border-t border-gray-100 py-10 sm:py-16 pb-24 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 sm:gap-12 items-center text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <img 
                  src="https://res.cloudinary.com/dptzwxncr/image/upload/q_auto/f_auto/v1777878516/IMG_1193_ysom0i.png"
                  alt="HR205 LLC Communications"
                  className="h-14 sm:h-16 w-auto"
                />
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Expert telecom consulting in Texas & Alabama. <br />
                Connecting you to the best providers at no cost.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-gray-900 uppercase tracking-wider">Contact Us</p>
              <a href="tel:2058101636" className="block text-gray-600 hover:text-blue-600 transition-colors font-medium">
                205-810-1636
              </a>
              <p className="text-gray-600 text-sm break-all">
                hr205.co@hotmail.com
              </p>
              <p className="text-gray-600 text-sm">
                1711 Bessemer Rd.<br />
                Birmingham, Alabama 35208
              </p>
            </div>
            <div className="flex justify-center md:justify-end gap-4">
              <Link to="/schedule" className="bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-blue-700 transition-all">
                Free Consultation
              </Link>
            </div>
          </div>
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-400 text-xs mb-2">
              © {new Date().getFullYear()} HR205 LLC Communications. All rights reserved.
            </p>
            <button
              onClick={onAdminClick}
              className="text-xs text-gray-400 hover:text-gray-600 underline"
            >
              Admin Login
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  const handleAdminLogin = (role, rep) => {
    setAdminUser({ role, rep });
    setShowAdminLogin(false);
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
  };

  if (adminUser?.role === 'manager') {
    return <ManagerPortal onLogout={handleAdminLogout} />;
  }

  if (adminUser?.role === 'rep') {
    return <RepPortal rep={adminUser.rep} onLogout={handleAdminLogout} />;
  }

  return (
    <Router>
      <MainSite onAdminClick={() => setShowAdminLogin(true)} />
      {showAdminLogin && (
        <AdminLogin 
          onLogin={handleAdminLogin} 
          onClose={() => setShowAdminLogin(false)} 
        />
      )}
    </Router>
  );
}
