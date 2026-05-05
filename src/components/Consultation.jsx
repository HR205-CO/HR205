import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, User, Phone, CheckCircle, MapPin, Loader2, 
  Users, UserCheck, Hand, Share2, Search, Megaphone, Plus,
  ChevronRight, ArrowLeft, Heart
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { US_STATES, REFERRAL_SOURCES } from '../constants/data';

const ICON_MAP = {
  Users, UserCheck, Hand, Share2, Search, Megaphone, Plus, Handshake: Hand
};

export default function Consultation() {
  const [step, setStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [formData, setFormData] = React.useState({
    date: '',
    time: 'Morning (9 AM - 12 PM)',
    name: '',
    phone: '',
    state: 'Alabama',
    service: 'internet',
    referralSource: '',
    referralDetail: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: submitError } = await supabase
        .from('consultations')
        .insert([{
          name: formData.name,
          email: formData.name + '@client.local',
          phone: formData.phone,
          state: formData.state,
          interests: [formData.service],
          referral_source: formData.referralSource,
          referral_detail: formData.referralDetail || null,
          date: formData.date,
          time: formData.time,
          status: 'pending'
        }]);
      
      if (submitError) throw submitError;
      setStep(4);
    } catch (err) {
      console.error("Error submitting consultation:", err);
      setError("Failed to schedule consultation. Please try again later.");
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
    <div className="min-h-screen pt-24 pb-12 sm:pb-20 bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8 sm:mb-12">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
                  step >= s ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-400 border-2 border-gray-100'
                }`}>
                  {step > s ? <CheckCircle className="w-6 h-6" /> : s}
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-bold mt-2 ${step >= s ? 'text-blue-600' : 'text-gray-400'}`}>
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

        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100">
          <div className="grid lg:grid-cols-5 min-h-[600px]">
            {/* Sidebar Info */}
            <div className="lg:col-span-2 bg-gray-900 p-6 sm:p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">Start Your <span className="text-blue-400">Better Connection</span> Journey</h2>
                <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8">Expert telecom consulting at no cost to you. We find the deals, you enjoy the service.</p>
                
                <div className="space-y-6">
                  {['Personalized Savings', 'Top-Tier Providers', 'Free Setup Advice'].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 relative z-10 pt-12 border-t border-gray-800">
                <p className="text-sm text-gray-500 mb-2">SERVING</p>
                <p className="text-xl font-bold text-gray-300">Customers Nationwide</p>
              </div>

              {/* Decorative background element */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
            </div>

            {/* Form Content */}
            <div className="lg:col-span-3 p-6 sm:p-8 lg:p-12">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">When should we talk?</h3>
                      <p className="text-gray-500">Pick a time that works best for your schedule.</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 ml-1 uppercase tracking-wider">Preferred Date</label>
                        <div className="relative">
                          <input 
                            type="date" 
                            required
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-lg font-medium"
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            value={formData.date}
                          />
                          <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3 ml-1 uppercase tracking-wider">Preferred Time Window</label>
                        <div className="grid gap-3">
                          {['Morning (9 AM - 12 PM)', 'Afternoon (12 PM - 5 PM)', 'Evening (5 PM - 8 PM)'].map((time) => (
                            <button
                              key={time}
                              onClick={() => setFormData({...formData, time})}
                              className={`w-full px-6 py-4 rounded-2xl border-2 text-left transition-all font-medium ${
                                formData.time === time 
                                ? 'border-blue-600 bg-blue-50 text-blue-700 ring-4 ring-blue-50' 
                                : 'border-gray-50 bg-gray-50 text-gray-600 hover:border-gray-200'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={nextStep}
                      className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 group"
                    >
                      Continue to Details <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Tell us about you</h3>
                      <p className="text-gray-500">Fast-track your consultation with these quick details.</p>
                    </div>

                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 uppercase tracking-wider">Full Name</label>
                          <input 
                            type="text" 
                            required
                            placeholder="John Doe"
                            className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-blue-600 outline-none transition-all"
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            value={formData.name}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 uppercase tracking-wider">Phone</label>
                          <input 
                            type="tel" 
                            required
                            placeholder="(555) 000-0000"
                            className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-blue-600 outline-none transition-all"
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            value={formData.phone}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 uppercase tracking-wider">State</label>
                        <select 
                          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-blue-600 outline-none transition-all appearance-none cursor-pointer"
                          value={formData.state}
                          onChange={(e) => setFormData({...formData, state: e.target.value})}
                        >
                          {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 uppercase tracking-wider">I'm interested in...</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {[
                            {id: 'internet', label: 'Internet'},
                            {id: 'cable', label: 'TV'},
                            {id: 'cellular', label: 'Cellular'},
                            {id: 'security', label: 'Security'},
                            {id: 'bundle', label: 'Bundles'}
                          ].map(s => (
                            <button
                              key={s.id}
                              onClick={() => setFormData({...formData, service: s.id})}
                              className={`px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                                formData.service === s.id 
                                ? 'border-blue-600 bg-blue-50 text-blue-700' 
                                : 'border-gray-50 bg-gray-50 text-gray-500 hover:border-gray-200'
                              }`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button onClick={prevStep} className="flex-1 py-5 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                        <ArrowLeft className="w-5 h-5" /> Back
                      </button>
                      <button onClick={nextStep} className="flex-[2] py-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 group">
                        Next: Referral <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">How did you hear about us?</h3>
                      <p className="text-gray-500">We love knowing who sent you our way!</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {REFERRAL_SOURCES.map((source) => {
                        const Icon = ICON_MAP[source.icon];
                        return (
                          <button
                            key={source.id}
                            onClick={() => setFormData({...formData, referralSource: source.id})}
                            className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all text-center group ${
                              formData.referralSource === source.id
                              ? 'border-blue-600 bg-blue-50 ring-4 ring-blue-50'
                              : 'border-gray-50 bg-gray-50 hover:bg-white hover:border-gray-200'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                              formData.referralSource === source.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-400 group-hover:text-blue-600'
                            }`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-wider ${
                              formData.referralSource === source.id ? 'text-blue-700' : 'text-gray-500'
                            }`}>
                              {source.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <AnimatePresence>
                      {formData.referralSource && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 uppercase tracking-wider">
                            {formData.referralSource === 'friend' ? "Friend's Name" : 
                             formData.referralSource === 'customer' ? "Customer's Name or Code" :
                             formData.referralSource === 'affiliate' ? "Affiliate ID/Company" :
                             "Any extra details?"}
                          </label>
                          <input 
                            type="text" 
                            className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 bg-white focus:bg-white focus:border-blue-600 outline-none transition-all"
                            placeholder="Optional info..."
                            onChange={(e) => setFormData({...formData, referralDetail: e.target.value})}
                            value={formData.referralDetail}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-4 pt-4">
                      <button onClick={prevStep} className="flex-1 py-5 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                        <ArrowLeft className="w-5 h-5" /> Back
                      </button>
                      <button 
                        onClick={(e) => handleSubmit(e)}
                        disabled={isSubmitting}
                        className={`flex-[2] py-5 ${isSubmitting ? 'bg-green-400' : 'bg-green-500 hover:bg-green-600'} text-white rounded-2xl font-bold transition-all shadow-xl shadow-green-200 flex items-center justify-center gap-2`}
                      >
                        {isSubmitting ? (
                          <>Finalizing... <Loader2 className="w-5 h-5 animate-spin" /></>
                        ) : (
                          <>Complete Booking <CheckCircle className="w-5 h-5" /></>
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
                    <div className="relative inline-block">
                      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto relative z-10">
                        <CheckCircle className="w-12 h-12" />
                      </div>
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="absolute inset-0 bg-green-100/50 rounded-full text-green-200"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-4xl font-bold text-gray-900 mb-3">You're All Set!</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        We've received your booking, <span className="font-bold text-gray-900">{formData.name}</span>. 
                        Our team will reach out to you in <span className="font-bold text-blue-600">{formData.state}</span> on 
                        <span className="block font-bold mt-2 text-gray-900">{formData.date} during the {formData.time} window.</span>
                      </p>
                    </div>

                    <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-start gap-4 text-left">
                      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0">
                        <Heart className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-blue-900">Expert Tip</p>
                        <p className="text-sm text-blue-700">Have your current telecom bills ready for the call. We might be able to find hidden savings immediately!</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => window.location.href = '/'}
                      className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl shadow-gray-200"
                    >
                      Return Home
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* Help text */}
        <p className="mt-8 text-center text-gray-500 text-sm">
          Secured by bank-grade encryption. Your data is never sold. <br className="sm:hidden" />
          Need help? <a href="tel:2058101636" className="text-blue-600 font-bold hover:underline">Call 205-810-1636</a>
        </p>
      </div>
    </div>
  );
}
