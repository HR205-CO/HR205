import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Reads URL params on load, determines QR tier, logs scan to Supabase,
// and stores referral context so the consultation form can attribute it.
export default function QRTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const repId  = params.get('rep');
    const affId  = params.get('aff');

    let tier     = 1;
    let sourceId = 'general';

    if (repId) {
      tier     = 3;
      sourceId = `rep_${repId}`;
    } else if (affId) {
      tier     = 2;
      sourceId = `aff_${affId}`;
    } else {
      // No QR param — organic visit, don't log
      return;
    }

    // Store for consultation form attribution (persists through page nav)
    sessionStorage.setItem('hr205_referral', JSON.stringify({ tier, sourceId }));

    // Log the scan
    supabase.from('qr_scans').insert({ tier, source_id: sourceId }).then(() => {});
  }, []);

  return null; // invisible
}
