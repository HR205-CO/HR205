import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { SITE } from '../config/site';

export default function ResetPassword() {
  const [password,  setPassword]  = useState('');
  const [confirm,   setConfirm]   = useState('');
  const [error,     setError]     = useState('');
  const [loading,   setLoading]   = useState(false);
  const [done,      setDone]      = useState(false);
  const [validLink, setValidLink] = useState(false);
  const navigate = useNavigate();

  // Supabase puts the session in the URL hash on redirect from reset email
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setValidLink(!!session);
    });
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (password.length < 8)  { setError('Password must be at least 8 characters.'); return; }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) { setError(updateError.message); return; }
    setDone(true);
    setTimeout(() => navigate('/'), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8">
        <div className="flex justify-center mb-6">
          <img src={SITE.logo} alt={SITE.name} className="h-12 w-auto" />
        </div>

        {done ? (
          <div className="text-center">
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-brand-navy mb-2">Password updated</h2>
            <p className="text-sm text-gray-500">Redirecting you to the site…</p>
          </div>
        ) : !validLink ? (
          <div className="text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-brand-navy mb-2">Link expired or invalid</h2>
            <p className="text-sm text-gray-500 mb-6">Reset links expire after 24 hours.</p>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-brand-blue text-white font-bold py-3 rounded-xl"
            >
              Go home
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-brand-navy text-center mb-1">Set new password</h2>
            <p className="text-sm text-gray-400 text-center mb-6">Choose a strong password for your hr205.org account</p>

            <form onSubmit={handleReset} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="New password (min 8 chars)"
                required
                autoFocus
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Confirm new password"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-blue hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60"
              >
                {loading ? 'Updating…' : 'Update Password'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
