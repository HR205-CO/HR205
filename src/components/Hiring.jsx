import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Briefcase, TrendingUp, Users, Loader2, DollarSign, Clock, GraduationCap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { US_STATES } from '../constants/data';

export default function Hiring() {
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    state: 'Alabama',
    experience: 'none',
    referredBy: ''
  });
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error: submitError } = await supabase
        .from('sales_reps')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          state: formData.state,
          experience: formData.experience,
          referred_by: formData.referredBy,
          status: 'pending'
        }]);
      
      if (submitError) {
        console.warn('Sales reps table may not exist:', submitError);
      }
      
      setSuccessMessage('Application submitted successfully! We will be in touch soon.');
      setFormData({ fullName: '', email: '', phone: '', state: 'Alabama', experience: 'none', referredBy: '' });
    } catch (err) {
      console.error("Submission error:", err);
      setErrors({ submit: 'An error occurred while submitting your application. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-12 sm:pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-blue-50 text-blue-700 mb-6 uppercase tracking-wider">
              Hiring
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              We're Hiring <br/><span className="text-blue-600">Sales Representatives!</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10">
              Join our team at HR205 LLC Communications and start your career in telecom communications. Take control of your income with no ceiling on your earnings.
            </p>

            <div className="space-y-8">
              {[
                { icon: DollarSign, title: 'Competitive Pay & Commission', desc: 'Earn top-tier payouts for every successful connection. Your hard work directly translates to your paycheck.' },
                { icon: Clock, title: 'Flexible Hours', desc: 'Work on your own schedule and manage your own time. True autonomy to build your business.' },
                { icon: GraduationCap, title: 'No Experience Necessary', desc: 'We provide the training, the playbook, and the tools you need to succeed from day one.' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-blue-600">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Questions? Contact Us</h4>
              <div className="space-y-2">
                <p className="text-gray-600 flex items-center gap-2">
                  <span className="font-bold">Call Us:</span> (205) 810-1636
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <span className="font-bold">Email Us:</span> homeremedies205@gmail.com
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Apply Now</h3>
              <p className="text-gray-600">Take the first step towards a rewarding career.</p>
            </div>

            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 font-medium text-center">
                {successMessage}
              </div>
            )}
            
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 font-medium text-center text-sm">
                {errors.submit}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all`}
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-500 font-medium">{errors.fullName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all`}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500 font-medium">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                >
                  {US_STATES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Experience</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                >
                  <option value="none">No experience (we'll train you)</option>
                  <option value="sales">Sales experience</option>
                  <option value="tech">Tech experience</option>
                  <option value="both">Both sales and tech</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Who referred you? (Optional)</label>
                <input
                  type="text"
                  name="referredBy"
                  value={formData.referredBy}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder="Name or Referral Code"
                />
              </div>

              <button
                disabled={isSubmitting}
                className={`w-full py-4 ${isSubmitting ? 'bg-gray-400' : 'bg-gray-900 hover:bg-blue-600'} text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2`}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Briefcase className="w-5 h-5" />
                )}
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
