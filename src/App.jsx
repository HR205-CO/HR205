import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceArea from './components/ServiceArea';
import Services from './components/Services';
import ProviderLogos from './components/ProviderLogos';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import PromotionPopup from './components/PromotionPopup';
import FloatingCTA from './components/FloatingCTA';
import BookingForm from './components/BookingForm';
import AffiliatePortal from './components/AffiliatePortal';
import Hiring from './components/Hiring';
import AdminLogin from './components/AdminLogin';
import ManagerPortal from './components/ManagerPortal';
import RepPortal from './components/RepPortal';

export default function App() {
  const [showBooking, setShowBooking] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  const openBooking = () => setShowBooking(true);
  const closeBooking = () => setShowBooking(false);

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
    <div className="min-h-screen bg-white">
      <Navbar onBookClick={openBooking} />
      <Hero onBookClick={openBooking} />
      <ProviderLogos />
      <ServiceArea />
      <Services />
      <Testimonials />
      <AffiliatePortal />
      <Hiring />
      <FAQ />
      <Contact />

      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm mb-2">© {new Date().getFullYear()} HR 205 LLC Communications. All rights reserved.</p>
          <button
            onClick={() => setShowAdminLogin(true)}
            className="text-xs text-gray-500 hover:text-gray-300 underline"
          >
            Admin Login
          </button>
        </div>
      </footer>

      <FloatingCTA onClick={openBooking} />
      <PromotionPopup onBookClick={openBooking} />

      {showBooking && <BookingForm onClose={closeBooking} />}
      {showAdminLogin && (
        <AdminLogin 
          onLogin={handleAdminLogin} 
          onClose={() => setShowAdminLogin(false)} 
        />
      )}
    </div>
  );
}
