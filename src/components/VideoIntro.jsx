import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';
import { SITE } from '../config/site';

const VIDEO_URL = SITE.introVideo;
const FULLSCREEN_DURATION_MS = 10000;


export default function VideoIntro() {
  // 'hidden' | 'fullscreen' | 'corner' | 'closed'
  const [phase, setPhase] = useState('hidden');
  const [muted, setMuted] = useState(true);
  const [showUnmuteHint, setShowUnmuteHint] = useState(false);
  const [justArrivedAtCorner, setJustArrivedAtCorner] = useState(false);
  const videoRef = useRef(null);

  // Show on every page load — no session gate
  useEffect(() => {
    setPhase('fullscreen');

    // Show "Tap to unmute" hint after a beat, then auto-fade
    const showHint = setTimeout(() => setShowUnmuteHint(true), 1500);
    const hideHint = setTimeout(() => setShowUnmuteHint(false), 4500);
    return () => {
      clearTimeout(showHint);
      clearTimeout(hideHint);
    };
  }, []);

  // Auto-shrink to corner after 10s in fullscreen
  useEffect(() => {
    if (phase !== 'fullscreen') return;
    const t = setTimeout(() => setPhase('corner'), FULLSCREEN_DURATION_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // Trigger arrival glow when entering corner phase + auto-mute so audio stops
  // distracting from the rest of the site (user can re-unmute manually via the speaker button)
  useEffect(() => {
    if (phase !== 'corner') return;
    if (videoRef.current) videoRef.current.muted = true;
    setMuted(true);
    setJustArrivedAtCorner(true);
    const t = setTimeout(() => setJustArrivedAtCorner(false), 1100);
    return () => clearTimeout(t);
  }, [phase]);

  // Keep video element's muted attribute in sync; dismiss hint once unmuted
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
    if (!muted) setShowUnmuteHint(false);
  }, [muted]);

  if (phase === 'hidden' || phase === 'closed') return null;

  const isFullscreen = phase === 'fullscreen';

  const handleSkip = () => setPhase('corner');
  const handleClose = () => setPhase('closed');
  const toggleMute = () => setMuted((m) => !m);

  return (
    <>
      <motion.div
        key="video-intro-shell"
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: { duration: 0.4, ease: 'easeOut' },
          layout: { type: 'spring', damping: 22, stiffness: 180, mass: 0.9 },
        }}
        className={
          isFullscreen
            ? 'fixed inset-0 z-[200] bg-black flex items-center justify-center'
            : 'fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[200] w-48 sm:w-72 rounded-2xl overflow-hidden bg-black ring-1 ring-blue-400/40 shadow-[0_25px_80px_-15px_rgba(37,99,235,0.55),0_0_0_1px_rgba(255,255,255,0.06)]'
        }
      >
        <motion.video
          ref={videoRef}
          src={VIDEO_URL}
          autoPlay
          muted={muted}
          playsInline
          loop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={
            isFullscreen
              ? 'w-full h-full object-cover'
              : 'w-full aspect-video object-cover'
          }
        />

        {/* Cinematic vignette over fullscreen video */}
        {isFullscreen && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25" />
        )}

        {/* Skip button — fullscreen only, brand blue */}
        {isFullscreen && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            onClick={handleSkip}
            className="absolute top-6 right-6 px-5 py-2.5 rounded-full bg-blue-600/90 hover:bg-blue-500 backdrop-blur-md text-white text-sm font-semibold tracking-wide border border-blue-300/40 shadow-lg shadow-blue-900/40 transition-colors"
          >
            Skip Intro
          </motion.button>
        )}

        {/* "Tap to unmute" hint — fullscreen only, while muted */}
        <AnimatePresence>
          {isFullscreen && showUnmuteHint && muted && (
            <motion.button
              key="unmute-hint"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={toggleMute}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-sm font-medium tracking-wide border border-white/20 flex items-center gap-2 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              Tap to unmute
            </motion.button>
          )}
        </AnimatePresence>

        {/* Mute toggle — both modes */}
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          className={
            isFullscreen
              ? 'absolute bottom-6 left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 transition-colors'
              : 'absolute bottom-2 left-2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white transition-colors'
          }
        >
          {muted ? (
            isFullscreen ? <VolumeX className="w-5 h-5" /> : <VolumeX className="w-3.5 h-3.5" />
          ) : (
            isFullscreen ? <Volume2 className="w-5 h-5" /> : <Volume2 className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Corner-only controls */}
        {!isFullscreen && (
          <button
            onClick={handleClose}
            aria-label="Close video"
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {/* 10-second progress bar — fullscreen only, glowing brand blue */}
        {isFullscreen && (
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: FULLSCREEN_DURATION_MS / 1000, ease: 'linear' }}
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-400 shadow-[0_0_14px_rgba(59,130,246,0.85)]"
          />
        )}
      </motion.div>

      {/* Soft glow pulse when video arrives at the corner */}
      <AnimatePresence>
        {justArrivedAtCorner && (
          <motion.div
            key="corner-arrival-glow"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0, 0.65, 0], scale: [0.7, 1.35, 1.55] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 w-48 sm:w-72 aspect-video rounded-2xl bg-blue-500/45 blur-2xl pointer-events-none z-[199]"
          />
        )}
      </AnimatePresence>
    </>
  );
}
