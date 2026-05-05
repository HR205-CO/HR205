import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, User, Phone, CheckCircle, MapPin, Loader2, 
  Users, UserCheck, Hand, Share2, Search, Megaphone, Plus,
  ChevronRight, ArrowLeft, Heart, AlertCircle, X
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { US_STATES, REFERRAL_SOURCES, SERVICE_INTERESTS } from '../constants/data';

const ICON_MAP = {
  Users, UserCheck, Hand, Share2, Search, Megaphone, Plus
};

export default function BookingForm({ onClose }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    time: 'Morning (9 AM - 12 PM)',
    name: '',
    phone: '',
    email: '',
    state: '',
    interests: [],
    referralSource: '',
    referralDetail: ''
  });

  const handleNext = () => {
    setError(null);
    
    if (step === 1) {
      if (!formData.date) {
        setError('Please select a preferred date');
        return;
      }
    } else if (step === 2) {
      if (!formData.name || !formData.phone || !formData.state) {
        setError('Please fill in all contact details');
        return;
      }
    }
    
    setStep(step + 1);
  };

  const handleBack = () => {
    setError(null);
    setStep(step - 1);
  };

  const toggleInterest = (interest) => {
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
      const { error: submitError } = await supabase
        .from('consultations')
        .insert([{
          name: formData.name,
          email: formData.email || formData.name + '@client.local',
          phone: formData.phone,
          state: formData.state,
          interests: formData.interests,
          referral_source: formData.referralSource,
          referral_detail: formData.referralDetail || null,
          date: formData.date,
          time: formData.time,
          status: 'pending'
        }]);

      if (submitError) {
        throw new Error(submitError.message || 'Could not save booking');
      }

      setStep(4);
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'Failed to schedule consultation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-8 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Progress Bar */}
          {step < 4 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
                  </div>
                  <span className="text-xs font-bold mt-2">SCHEDULE</span>
                </div>
                <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    {step > 2 ? <CheckCircle className="w-5 h-5" /> : '2'}
                  </div>
                  <span className="text-xs font-bold mt-2">DETAILS</span>
                </div>
                <div className={`flex flex-col items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    3
                  </div>
                  <span className="text-xs font-bold mt-2">REFERRAL</span>
                </div>
              </div>
              <div className="bg-gray-200 h-2 rounded-full">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Header */}
          {step < 4 && (
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Schedule Your Free Consultation</h2>
              <p className="text-gray-600 mt-2">Expert telecom consulting at no cost to you</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {/* STEP 1: Schedule */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Preferred Date
                    </label>
                    <input 
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Time</label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                    >
                      <option>Morning (9 AM - 12 PM)</option>
                      <option>Afternoon (12 PM - 3 PM)</option>
                      <option>Late Afternoon (3 PM - 6 PM)</option>
                      <option>Evening (6 PM - 9 PM)</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Details */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Full Name
                    </label>
                    <input 
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Smith"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number
                    </label>
                    <input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="205-555-0123"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      State
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                    >
                      <option value="">Select your state</option>
                      {US_STATES.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Services Interested In</label>
                    <div className="grid grid-cols-2 gap-2">
                      {SERVICE_INTERESTS.map(interest => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`p-3 rounded-lg text-sm font-medium transition-all border-2 ${
                            formData.interests.includes(interest)
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Referral */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">How did you hear about us?</h3>
                    <p className="text-sm text-gray-600 mb-4">We love knowing who sent you our way!</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {REFERRAL_SOURCES.map(source => {
                      const Icon = ICON_MAP[source.icon];
                      return (
                        <button
                          key={source.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, referralSource: source.id })}
                          className={`p-4 rounded-xl text-sm font-medium transition-all border-2 flex flex-col items-center gap-2 ${
                            formData.referralSource === source.id
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                          {source.label}
                        </button>
                      );
                    })}
                  </div>

                  {formData.referralSource && (
                    <input 
                      type="text"
                      value={formData.referralDetail}
                      onChange={(e) => setFormData({ ...formData, referralDetail: e.target.value })}
                      placeholder="Name or details (optional)"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                    />
                  )}
                </motion.div>
              )}

              {/* STEP 4: Success */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="inline-block bg-green-100 rounded-full p-4 mb-6">
                    <CheckCircle className="w-16 h-16 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">You're All Set!</h2>
                  <p className="text-gray-600 mb-6">
                    We've received your booking, <strong>{formData.name}</strong>. We will contact you soon to confirm.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left">
                    <p className="text-sm text-blue-900">
                      <strong>Pro Tip:</strong> Have your current telecom bills handy for the consultation. We can often find savings right away!
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-900 text-white font-bold px-8 py-3 rounded-xl hover:bg-gray-800 transition-all"
                  >
                    Return to Home
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {step < 4 && (
              <div className="flex justify-between gap-4 mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 py-3 text-gray-700 font-bold border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-auto flex items-center gap-2 px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      <>
                        Complete
                        <CheckCircle className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
}
