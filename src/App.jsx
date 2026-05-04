import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, User, Phone, CheckCircle, MapPin, Loader2, 
  Users, UserCheck, Handshake, Share2, Search, Megaphone, Plus,
  ChevronRight, ArrowLeft, Heart, LogOut, Filter, Download,
  Eye, EyeOff, Mail, Clock, AlertCircle
} from 'lucide-react';

// Mock data for demo - in production this connects to Supabase
const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
  "Wisconsin", "Wyoming"
];

const REFERRAL_SOURCES = [
  { id: 'friend', label: 'Friend or Family', icon: 'Users' },
  { id: 'customer', label: 'Current Customer', icon: 'UserCheck' },
  { id: 'affiliate', label: 'Affiliate Partner', icon: 'Handshake' },
  { id: 'social', label: 'Social Media', icon: 'Share2' },
  { id: 'search', label: 'Search Engine', icon: 'Search' },
  { id: 'ad', label: 'Advertisement', icon: 'Megaphone' },
  { id: 'other', label: 'Other', icon: 'Plus' }
];

const SERVICE_INTERESTS = [
  'High-Speed Internet',
  'Premium Cable & Streaming',
  'Cellular & Mobile Plans',
  'Home & Business Security',
  'Bundle Packages',
  'Other'
];

const ICON_MAP = {
  Users: Users,
  UserCheck: UserCheck,
  Handshake: Handshake,
  Share2: Share2,
  Search: Search,
  Megaphone: Megaphone,
  Plus: Plus
};

// Landing/Booking Page
function BookingPage() {
  const [step, setStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null);
  const [formData, setFormData] = React.useState({
    date: '',
    time: 'Morning (9 AM - 12 PM)',
    name: '',
    phone: '',
    state: 'Alabama',
    interests: [],
    referralSource: '',
    referralDetail: ''
  });

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      // In production, this submits to Supabase
      // For demo, we just show success
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(4);
      setSuccessMessage('Booking confirmed! Check your email for confirmation.');
    } catch (err) {
      setError('Failed to schedule consultation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && !formData.date) {
      setError("Please select a preferred date.");
      return;
    }
    if (step === 2 && (!formData.name || !formData.phone)) {
      setError("Please fill in all contact details.");
      return;
    }
    setError(null);
    setStep(step + 1);
  };

  const prevStep = () => {
    setError(null);
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="text-center mb-12">
          <img 
            src="https://res.cloudinary.com/dptzwxncr/image/upload/q_auto/f_auto/v1777878516/IMG_1193_ysom0i.png" 
            alt="HR 205 LLC Communications" 
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900">Schedule Your Free Consultation</h1>
          <p className="text-gray-600 mt-2">Expert telecom consulting at no cost to you</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
                  step >= s ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-400 border-2 border-gray-100'
                }`}>
                  {step > s ? <CheckCircle className="w-6 h-6" /> : s}
                </div>
                <span className={`text-xs uppercase tracking-widest font-bold mt-2 ${step >= s ? 'text-blue-600' : 'text-gray-400'}`}>
                  {s === 1 ? 'Schedule' : s === 2 ? 'Details' : 'Referral'}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(step / 3) * 100}%` }}
              className="h-full bg-blue-600 transition-all duration-500"
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid lg:grid-cols-5 min-h-[600px]">
            {/* Sidebar */}
            <div className="lg:col-span-2 bg-gradient-to-br from-blue-900 to-blue-800 p-8 lg:p-12 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4">Your Path to Better Connectivity</h2>
                <p className="text-blue-100 text-base mb-8">We find the best telecom solutions so you can focus on what matters.</p>
                
                <div className="space-y-4">
                  {['Personalized Savings', 'Top Providers', 'Free Setup'].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-300" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-blue-700">
                <p className="text-xs text-blue-200 mb-2">SERVING</p>
                <p className="font-bold text-blue-100">Texas & Alabama</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 p-8 lg:p-12">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">When should we talk?</h3>
                      <p className="text-gray-500">Pick a time that works best for you.</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Preferred Date</label>
                        <input 
                          type="date" 
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          value={formData.date}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Preferred Time</label>
                        <select 
                          className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-600 outline-none transition-all"
                          onChange={(e) => setFormData({...formData, time: e.target.value})}
                          value={formData.time}
                        >
                          <option>Morning (9 AM - 12 PM)</option>
                          <option>Afternoon (12 PM - 3 PM)</option>
                          <option>Late Afternoon (3 PM - 6 PM)</option>
                          <option>Evening (6 PM - 9 PM)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button disabled className="flex-1 py-4 bg-gray-100 text-gray-400 rounded-xl font-bold cursor-not-allowed">Back</button>
                      <button onClick={nextStep} className="flex-[2] py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
                        Next <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h3>
                      <p className="text-gray-500">We'll use this to match you with the best solutions.</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Full Name</label>
                        <input 
                          type="text" 
                          className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-600 outline-none transition-all"
                          placeholder="Your name"
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          value={formData.name}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Phone Number</label>
                        <input 
                          type="tel" 
                          className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-600 outline-none transition-all"
                          placeholder="(123) 456-7890"
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          value={formData.phone}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">State</label>
                        <select 
                          className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-600 outline-none transition-all"
                          onChange={(e) => setFormData({...formData, state: e.target.value})}
                          value={formData.state}
                        >
                          {US_STATES.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Services Interested In</label>
                        <div className="grid grid-cols-2 gap-3">
                          {SERVICE_INTERESTS.map(interest => (
                            <button
                              key={interest}
                              onClick={() => handleInterestToggle(interest)}
                              className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                                formData.interests.includes(interest)
                                  ? 'border-blue-600 bg-blue-50 text-blue-900'
                                  : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'
                              }`}
                            >
                              {interest}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button onClick={prevStep} className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                        <ArrowLeft className="w-5 h-5" /> Back
                      </button>
                      <button onClick={nextStep} className="flex-[2] py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
                        Next <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">How did you hear about us?</h3>
                      <p className="text-gray-500">We love knowing who sent you our way!</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {REFERRAL_SOURCES.map((source) => {
                        const Icon = ICON_MAP[source.icon];
                        return (
                          <button
                            key={source.id}
                            onClick={() => setFormData({...formData, referralSource: source.id})}
                            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all text-center ${
                              formData.referralSource === source.id
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${formData.referralSource === source.id ? 'text-blue-600' : 'text-gray-400'}`} />
                            <span className={`text-xs font-bold ${formData.referralSource === source.id ? 'text-blue-700' : 'text-gray-500'}`}>
                              {source.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {formData.referralSource && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="pt-2"
                      >
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                          {formData.referralSource === 'friend' ? "Friend's Name" : 
                           formData.referralSource === 'customer' ? "Customer Info" :
                           formData.referralSource === 'affiliate' ? "Affiliate Info" :
                           "Any Details?"}
                        </label>
                        <input 
                          type="text" 
                          className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 bg-white focus:border-blue-600 outline-none transition-all"
                          placeholder="Optional..."
                          onChange={(e) => setFormData({...formData, referralDetail: e.target.value})}
                          value={formData.referralDetail}
                        />
                      </motion.div>
                    )}

                    <div className="flex gap-4 pt-4">
                      <button onClick={prevStep} className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                        <ArrowLeft className="w-5 h-5" /> Back
                      </button>
                      <button 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`flex-[2] py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                          isSubmitting 
                            ? 'bg-green-400 text-white' 
                            : 'bg-green-500 text-white hover:bg-green-600 shadow-green-200'
                        }`}
                      >
                        {isSubmitting ? (
                          <>Booking... <Loader2 className="w-5 h-5 animate-spin" /></>
                        ) : (
                          <>Complete <CheckCircle className="w-5 h-5" /></>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div 
                    key="step4"
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-6"
                  >
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto">
                      <CheckCircle className="w-12 h-12" />
                    </div>
                    
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-3">You're All Set!</h3>
                      <p className="text-gray-600">
                        We've received your booking, <span className="font-bold">{formData.name}</span>. 
                        Check your email for confirmation and next steps.
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <p className="text-sm text-blue-900">
                        <strong>Pro Tip:</strong> Have your current telecom bills handy for the consultation. We can often find savings right away!
                      </p>
                    </div>

                    <button 
                      onClick={() => window.location.href = '/'}
                      className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg"
                    >
                      Return to Home
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-center text-gray-500 text-sm">
          Secured with bank-grade encryption. Your data is private and secure.
        </p>
      </div>
    </div>
  );
}

// Admin Dashboard
function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [bookings, setBookings] = useState([
    // Sample data for demo
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      phone: '205-555-0123',
      state: 'Alabama',
      interests: ['High-Speed Internet', 'Bundle Packages'],
      referralSource: 'friend',
      referralDetail: 'Mike Johnson',
      date: '2024-05-15',
      time: 'Morning (9 AM - 12 PM)',
      status: 'pending',
      createdAt: '2024-05-04T10:30:00Z'
    }
  ]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterState, setFilterState] = useState('all');

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail === 'hr205@hotmail.com' && loginPassword === 'hr205demo123') {
      setIsLoggedIn(true);
      setLoginError('');
      setLoginEmail('');
      setLoginPassword('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filterStatus !== 'all' && booking.status !== filterStatus) return false;
    if (filterState !== 'all' && booking.state !== filterState) return false;
    return true;
  });

  const updateStatus = (id, newStatus) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const exportCSV = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'State', 'Interests', 'Referral Source', 'Date', 'Time', 'Status'],
      ...filteredBookings.map(b => [
        b.name,
        b.email,
        b.phone,
        b.state,
        b.interests.join('; '),
        b.referralSource,
        b.date,
        b.time,
        b.status
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hr205-bookings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-600 mt-2">HR 205 LLC Booking Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-700 text-sm">{loginError}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
              <input 
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="hr205@hotmail.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Demo: hr205demo123</p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">HR 205 LLC Booking Management</p>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{bookings.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm font-medium">Pending</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{bookings.filter(b => b.status === 'pending').length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm font-medium">Confirmed</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{bookings.filter(b => b.status === 'confirmed').length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm font-medium">Completed</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{bookings.filter(b => b.status === 'completed').length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filter:</span>
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
            >
              <option value="all">All States</option>
              <option value="Alabama">Alabama</option>
              <option value="Texas">Texas</option>
              {US_STATES.map(s => s !== 'Alabama' && s !== 'Texas' && <option key={s} value={s}>{s}</option>)}
            </select>

            <button
              onClick={exportCSV}
              className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">State</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date/Time</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Referral</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{booking.name}</p>
                          <p className="text-xs text-gray-500">{booking.interests.join(', ')}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <p className="text-gray-900">{booking.phone}</p>
                        <p className="text-xs text-gray-500">{booking.email}</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.state}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <p>{booking.date}</p>
                        <p className="text-xs text-gray-500">{booking.time}</p>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <p className="text-gray-900 capitalize">{booking.referralSource}</p>
                        <p className="text-xs text-gray-500">{booking.referralDetail}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={booking.status}
                          onChange={(e) => updateStatus(booking.id, e.target.value)}
                          className="text-sm border border-gray-200 rounded px-2 py-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Router
export default function App() {
  const [currentPage, setCurrentPage] = useState('booking');

  return (
    <div>
      {currentPage === 'booking' ? (
        <>
          <BookingPage />
          <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-full text-sm">
            <button onClick={() => setCurrentPage('admin')} className="hover:underline">
              Admin →
            </button>
          </div>
        </>
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
}
