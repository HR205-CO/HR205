import React, { useState, useEffect, useRef } from 'react';
import { Upload, CheckCircle, Image } from 'lucide-react';
import { supabase } from '../lib/supabase';

import { SITE } from '../config/site';

const CLOUD_NAME  = SITE.cloudinary.cloudName;
const UPLOAD_PRESET = SITE.cloudinary.uploadPreset; // Create this in Cloudinary dashboard
const TEAM_PASSWORD = SITE.teamUploadPassword;        // Share this with the team

export default function TeamUpload() {
  const [authed, setAuthed]     = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [uploads, setUploads]   = useState([]);
  const [caption, setCaption]   = useState('');
  const widgetRef = useRef(null);

  // Load Cloudinary upload widget script once authenticated
  useEffect(() => {
    if (!authed) return;

    const script = document.createElement('script');
    script.src   = 'https://upload-widget.cloudinary.com/global/all.js';
    script.async = true;

    script.onload = () => {
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName:            CLOUD_NAME,
          uploadPreset:         UPLOAD_PRESET,
          sources:              ['local', 'camera'],
          folder:               'hr205/customer-photos',
          tags:                 ['customer-gallery'],
          multiple:             true,
          maxFiles:             20,
          resourceType:         'image',
          clientAllowedFormats: ['jpg', 'jpeg', 'png', 'heic', 'webp'],
          maxFileSize:          15000000, // 15 MB
          styles: {
            palette: {
              window:          '#1e3a8a',
              windowBorder:    '#2563eb',
              tabIcon:         '#FFFFFF',
              menuIcons:       '#CCCCCC',
              textDark:        '#FFFFFF',
              textLight:       '#FFFFFF',
              link:            '#60a5fa',
              action:          '#2563eb',
              inactiveTabIcon: '#8699B0',
              error:           '#F44235',
              inProgress:      '#60a5fa',
              complete:        '#20B832',
              sourceBg:        '#1e2f6a',
            },
            frame: { background: '#0E2048' },
          },
        },
        async (err, result) => {
          if (err || result.event !== 'success') return;

          const info = result.info;

          // Save to Supabase so the gallery component picks it up automatically
          const { error: dbErr } = await supabase
            .from('gallery_images')
            .insert({
              public_id:   info.public_id,
              secure_url:  info.secure_url,
              width:       info.width,
              height:      info.height,
              caption:     caption.trim() || null,
            });

          if (!dbErr) {
            setUploads(prev => [
              { id: info.asset_id, secure_url: info.secure_url },
              ...prev,
            ]);
          }
        }
      );
    };

    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, [authed, caption]);

  const handleLogin = () => {
    if (password === TEAM_PASSWORD) {
      setAuthed(true);
      setError('');
    } else {
      setError('Wrong password. Ask Swerve or Renyeh for access.');
    }
  };

  const openWidget = () => widgetRef.current?.open();

  /* ── Password gate ─────────────────────────────────────────── */
  if (!authed) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Upload className="w-5 h-5 text-brand-blue" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">HR205 Team Upload</h1>
              <p className="text-xs text-gray-400">Internal team access only</p>
            </div>
          </div>

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Team password"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            autoFocus
          />

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-brand-blue hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  /* ── Upload area ───────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-navy py-6 px-6">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Image className="w-6 h-6 text-blue-300" />
          <h1 className="text-xl font-bold text-white">HR205 Photo Upload</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Caption field */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Caption <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={caption}
            onChange={e => setCaption(e.target.value)}
            placeholder="e.g. Customer in Houston — AT&T upgrade"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
          <p className="text-xs text-gray-400 mt-2">
            Caption will be saved with every photo uploaded in this session.
          </p>
        </div>

        {/* Upload button */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <button
            onClick={openWidget}
            className="w-full bg-brand-blue hover:bg-blue-700 text-white font-bold py-5 rounded-xl text-lg transition-colors flex items-center justify-center gap-3"
          >
            <Upload className="w-6 h-6" />
            Upload Photos
          </button>
          <p className="text-center text-gray-400 text-xs mt-3">
            JPG · PNG · HEIC · up to 15 MB each · up to 20 at a time
          </p>
        </div>

        {/* Uploaded this session */}
        {uploads.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h2 className="font-semibold text-gray-700">
                Uploaded this session ({uploads.length}) — live on the site now
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {uploads.map(img => (
                <img
                  key={img.id}
                  src={img.secure_url}
                  alt="Uploaded"
                  className="rounded-xl w-full aspect-square object-cover"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
