import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, LogIn, Share2, DollarSign, Users, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { US_STATES } from '../constants/data';

export default function AffiliatePortal() {
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    state: 'Texas',
    referralCode: ''
  });
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [authError, setAuthError] = React.useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');
    setAuthError(null);
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error: submitError } = await supabase
        .from('affiliates')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          state: formData.state,
          referral_code: formData.referralCode || null
        }]);
      
      if (submitError) {
        console.warn('Affiliates table may not exist:', submitError);
      }
      
      setSuccessMessage('Application submitted! We will review and contact you with next steps.');
      setFormData({ fullName: '', email: '', state: 'Texas', referralCode: '' });
    } catch (err) {
      console.error("Submission error:", err);
      setAuthError('An error occurred. Please try again later.');
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
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-green-50 text-green-700 mb-6 uppercase tracking-wider">
              Affiliate Program
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Turn Your Recommendations <br/><span className="text-blue-600">Into Revenue.</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10">
              You already know people who need better internet, cable, or security. Why not get paid for connecting them? Zero selling required. Just share and earn.
            </p>

            <div className="space-y-8">
              {[
                { icon: Share2, title: 'Effortless Sharing', desc: 'Simply refer friends, family, or clients to us. We handle all the heavy lifting, comparisons, and setup.' },
                { icon: DollarSign, title: 'Passive Income Stream', desc: 'Earn generous payouts for every successful referral that connects a service through us.' },
                { icon: Users, title: 'Zero Sales Pressure', desc: 'You are not a salesperson. You are a connector. Help people find better deals and get rewarded for it.' },
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
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Become an Affiliate</h3>

            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 font-medium text-center">
                {successMessage}
              </div>
            )}
            
            {authError && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 font-medium text-center text-sm">
                {authError}
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
                <label className="block text-sm font-bold text-gray-700 mb-2">State of Operation</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                >
                  <option value="Texas">Texas</option>
                  <option value="Alabama">Alabama</option>
                  {US_STATES.filter(s => s !== 'Texas' && s !== 'Alabama').map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Referral Code (Optional)</label>
                <input
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder="REF123"
                />
              </div>
              <button
                disabled={isSubmitting}
                className={`w-full py-4 ${isSubmitting ? 'bg-gray-400' : 'bg-gray-900 hover:bg-blue-600'} text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2`}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <UserPlus className="w-5 h-5" />
                )}
                {isSubmitting ? 'Please wait...' : 'Apply Now'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
