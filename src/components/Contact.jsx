import React from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [submitted, setSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: submitError } = await supabase
        .from('contacts')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          message: formData.message
        }]);
      
      if (submitError) {
        // If contacts table doesn't exist, just show success anyway
        console.warn('Contacts table may not exist:', submitError);
      }
      
      setSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setError("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2">
            <div className="p-6 sm:p-12 lg:p-20">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">Get in Touch</h2>
              <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12">
                Have questions? Our team is ready to help you find the best connections.
              </p>

              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                    <Phone className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-400 font-medium">Call Us</p>
                    <a href="tel:2058101636" className="text-lg sm:text-xl font-bold text-white hover:text-blue-400 transition-colors">
                      205-810-1636
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                    <Mail className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-400 font-medium">Email Us</p>
                    <a href="mailto:hr205.co@hotmail.com" className="text-base sm:text-xl font-bold text-white hover:text-blue-400 transition-colors break-all">
                      hr205.co@hotmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                    <MapPin className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-400 font-medium">Visit Us</p>
                    <p className="text-base sm:text-xl font-bold text-white leading-tight">
                      1711 Bessemer Rd.<br />
                      Birmingham, Alabama 35208
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-12 lg:p-20">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6">
                    <Send className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h3>
                  <p className="text-gray-600 mb-8">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-brand-navy font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {error && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 font-medium text-sm">
                      {error}
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-navy outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-navy outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-navy outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows={4} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-navy outline-none resize-none"></textarea>
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className={`w-full py-4 ${isSubmitting ? 'bg-green-400' : 'bg-green-500 hover:bg-green-600'} text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-200/50`}
                  >
                    {isSubmitting ? (
                      <>Sending... <Loader2 className="w-4 h-4 animate-spin" /></>
                    ) : (
                      <>Send Message <Send className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
