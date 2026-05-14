import { SITE } from "../config/site";
import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'react-qr-code';
import { Download, Printer, QrCode, BarChart2, Users, User, Globe } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { REPS } from '../constants/data';

const SITE_URL = window.location.origin;

const TIERS = [
  { id: 1, label: 'General',   icon: Globe,  color: 'bg-gray-100 text-gray-700',  desc: 'For merchandise & marketing materials' },
  { id: 2, label: 'Affiliate', icon: Users,  color: 'bg-purple-100 text-purple-700', desc: 'Unique QR per affiliate with referral ID' },
  { id: 3, label: 'Sales Rep', icon: User,   color: 'bg-blue-100 text-brand-blue',  desc: 'Tied to rep number for badge use' },
];

function buildUrl(tier, sourceId) {
  if (tier === 1) return SITE_URL;
  if (tier === 2) return `${SITE_URL}?aff=${encodeURIComponent(sourceId)}`;
  if (tier === 3) return `${SITE_URL}?rep=${encodeURIComponent(sourceId)}`;
  return SITE_URL;
}

function downloadSVG(svgEl, filename) {
  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(svgEl);
  const blob = new Blob([svgStr], { type: 'image/svg+xml' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function QRManager() {
  const [tier,     setTier]     = useState(1);
  const [affId,    setAffId]    = useState('');
  const [repId,    setRepId]    = useState(REPS[0]?.id || 1);
  const [scans,    setScans]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const qrRef = useRef(null);

  const sourceId = tier === 2 ? affId : tier === 3 ? String(repId) : 'general';
  const qrUrl    = buildUrl(tier, sourceId);
  const isReady  = tier === 1 || (tier === 2 && affId.trim()) || tier === 3;

  useEffect(() => {
    supabase
      .from('qr_scans')
      .select('*')
      .order('scanned_at', { ascending: false })
      .limit(200)
      .then(({ data }) => {
        setScans(data || []);
        setLoading(false);
      });
  }, []);

  const handleDownload = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;
    const label = tier === 1 ? 'general' : sourceId;
    downloadSVG(svg, `hr205-qr-tier${tier}-${label}.svg`);
  };

  const handlePrint = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;
    const win = window.open('', '_blank');
    win.document.write(`
      <html><head><title>HR205 QR — ${qrUrl}</title>
      <style>
        body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 24px; }
        svg  { width: 280px; height: 280px; }
        p    { margin-top: 16px; font-size: 13px; color: #555; text-align: center; max-width: 300px; word-break: break-all; }
        h2   { margin: 0 0 8px; font-size: 18px; color: #1e3a8a; }
      </style></head><body>
      <h2>${SITE.name}</h2>
      ${svg.outerHTML}
      <p>${qrUrl}</p>
      </body></html>`);
    win.document.close();
    win.print();
  };

  // Analytics aggregation
  const tierCounts = [1, 2, 3].map(t => ({
    tier: t,
    total: scans.filter(s => s.tier === t).length,
  }));

  const topSources = Object.values(
    scans.reduce((acc, s) => {
      const key = s.source_id || 'general';
      acc[key] = acc[key] || { source_id: key, tier: s.tier, count: 0 };
      acc[key].count++;
      return acc;
    }, {})
  ).sort((a, b) => b.count - a.count).slice(0, 10);

  return (
    <div className="space-y-8">

      {/* Tier selector */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <QrCode className="w-5 h-5 text-brand-blue" /> Generate QR Code
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {TIERS.map(t => (
            <button
              key={t.id}
              onClick={() => setTier(t.id)}
              className={`text-left p-4 rounded-xl border-2 transition-all ${
                tier === t.id
                  ? 'border-brand-blue bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-2 ${t.color}`}>
                <t.icon className="w-3.5 h-3.5" />
                Tier {t.id} — {t.label}
              </div>
              <p className="text-xs text-gray-500">{t.desc}</p>
            </button>
          ))}
        </div>

        {/* Source ID input */}
        {tier === 2 && (
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Affiliate ID</label>
            <input
              value={affId}
              onChange={e => setAffId(e.target.value)}
              placeholder="e.g. JOHN_SMITH or AFF001"
              className="w-full max-w-sm border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
        )}

        {tier === 3 && (
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Select Rep</label>
            <select
              value={repId}
              onChange={e => setRepId(e.target.value)}
              className="w-full max-w-sm border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            >
              {REPS.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* QR display */}
        {isReady && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-white border border-gray-200 rounded-2xl">
            <div ref={qrRef} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <QRCode
                value={qrUrl}
                size={200}
                fgColor="#1e3a8a"
                bgColor="#ffffff"
                level="M"
              />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Encoded URL</p>
                <p className="text-sm text-gray-700 font-mono break-all bg-gray-50 p-2 rounded-lg">{qrUrl}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" /> Download SVG
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  <Printer className="w-4 h-4" /> Print
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Analytics */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-brand-blue" /> Scan Analytics
        </h3>

        {loading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : (
          <>
            {/* Tier totals */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {tierCounts.map(({ tier: t, total }) => {
                const info = TIERS.find(x => x.id === t);
                return (
                  <div key={t} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-brand-navy">{total}</p>
                    <p className="text-xs text-gray-500 mt-1">Tier {t} · {info.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Top sources table */}
            {topSources.length > 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Source</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Tier</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Scans</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {topSources.map(s => (
                      <tr key={s.source_id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">{s.source_id}</td>
                        <td className="px-4 py-3 text-gray-500">Tier {s.tier}</td>
                        <td className="px-4 py-3 text-right font-bold text-brand-blue">{s.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-400 text-sm text-center py-8">No scans recorded yet. Share your QR codes to start tracking.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
