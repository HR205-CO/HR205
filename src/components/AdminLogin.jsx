import React, { useState } from 'react';
import { SITE } from "../config/site";
import { supabase } from '../lib/supabase';
import { MANAGER_AUTH, REPS } from '../constants/data';

export default function AdminLogin({ onLogin, onClose }) {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [view,     setView]     = useState('login'); // 'login' | 'forgot' | 'sent'

  // ── Sign in ──────────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 1. Try Supabase Auth first (proper auth for production users)
    const { data, error: sbError } = await supabase.auth.signInWithPassword({ email, password });

    if (!sbError && data?.user) {
      const role = data.user.user_metadata?.role || 'rep';
      onLogin({ role, user: data.user, via: 'supabase' });
      setLoading(false);
      return;
    }

    // 2. Fallback: hardcoded credentials (demo / pre-migration)
    if (email === MANAGER_AUTH.email && password === MANAGER_AUTH.password) {
      onLogin({ role: 'manager', via: 'local' });
      setLoading(false);
      return;
    }
    const rep = REPS.find(r => r.email === email && r.password === password);
    if (rep) {
      onLogin({ role: 'rep', ...rep, via: 'local' });
      setLoading(false);
      return;
    }

    setError('Invalid email or password.');
    setLoading(false);
  };

  // ── Forgot password ───────────────────────────────────────────────────────
  const handleForgot = async (e) => {
    e.preventDefault();
    if (!email) { setError('Enter your email first.'); return; }
    setError('');
    setLoading(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);
    if (resetError) { setError(resetError.message); return; }
    setView('sent');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 relative">

        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-light">✕</button>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={SITE.logo} alt={SITE.name} className="h-12 w-auto" />
        </div>

        {/* ── Login view ── */}
        {view === 'login' && (
          <>
            <h2 className="text-xl font-bold text-brand-navy text-center mb-1">Staff Portal</h2>
            <p className="text-sm text-gray-400 text-center mb-6">Sign in with your hr205.org account</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@hr205.org"
                required
                autoFocus
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-blue hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60"
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <button
              onClick={() => { setView('forgot'); setError(''); }}
              className="w-full mt-4 text-sm text-gray-400 hover:text-brand-blue transition-colors text-center"
            >
              Forgot password?
            </button>
          </>
        )}

        {/* ── Forgot password view ── */}
        {view === 'forgot' && (
          <>
            <h2 className="text-xl font-bold text-brand-navy text-center mb-1">Reset Password</h2>
            <p className="text-sm text-gray-400 text-center mb-6">We'll send a reset link to your hr205.org email</p>

            <form onSubmit={handleForgot} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@hr205.org"
                required
                autoFocus
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-blue hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60"
              >
                {loading ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>

            <button
              onClick={() => { setView('login'); setError(''); }}
              className="w-full mt-4 text-sm text-gray-400 hover:text-brand-blue transition-colors text-center"
            >
              ← Back to sign in
            </button>
          </>
        )}

        {/* ── Sent confirmation ── */}
        {view === 'sent' && (
          <div className="text-center">
            <div className="text-4xl mb-4">📬</div>
            <h2 className="text-xl font-bold text-brand-navy mb-2">Check your email</h2>
            <p className="text-sm text-gray-500 mb-6">
              If <span className="font-medium text-brand-navy">{email}</span> is a registered hr205.org account, a reset link is on its way.
            </p>
            <button
              onClick={() => { setView('login'); setError(''); }}
              className="w-full bg-brand-blue hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Back to sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
