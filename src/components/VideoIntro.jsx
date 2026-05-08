import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, Maximize2 } from 'lucide-react';

const VIDEO_URL =
  'https://res.cloudinary.com/dzu1guddd/video/upload/f_auto/v1778278920/copy_EB4CE56E-B47F-4D0A-819B-FB83E9FED83A_px3kis.mov';
const FULLSCREEN_DURATION_MS = 10000;
const STORAGE_KEY = 'hasSeenIntroVideo';

export default function VideoIntro() {
  // 'hidden' | 'fullscreen' | 'corner' | 'closed'
  const [phase, setPhase] = useState('hidden');
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);

  // On mount: only show once per browser session
  useEffect(() => {
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (!seen) {
      setPhase('fullscreen');
      sessionStorage.setItem(STORAGE_KEY, 'true');
    }
  }, []);

  // Auto-shrink to corner after 10s in fullscreen
  useEffect(() => {
    if (phase !== 'fullscreen') return;
    const t = setTimeout(() => setPhase('corner'), FULLSCREEN_DURATION_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // Keep video element's muted attribute in sync with state
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  if (phase === 'hidden' || phase === 'closed') return null;

  const isFullscreen = phase === 'fullscreen';

  const handleSkip = () => setPhase('corner');
  const handleClose = () => setPhase('closed');
  const handleExpand = () => setPhase('fullscreen');
  const toggleMute = () => setMuted((m) => !m);

  return (
    <AnimatePresence>
      <motion.div
        key="video-intro-shell"
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ layout: { type: 'spring', damping: 28, stiffness: 220 } }}
        className={
          isFullscreen
            ? 'fixed inset-0 z-[200] bg-black flex items-center justify-center'
            : 'fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[200] w-48 sm:w-72 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/20 bg-black'
        }
      >
        <video
          ref={videoRef}
          src={VIDEO_URL}
          autoPlay
          muted={muted}
          playsInline
          loop
          className={
            isFullscreen
              ? 'w-full h-full object-contain'
              : 'w-full aspect-video object-cover'
          }
        />

        {/* Skip button — fullscreen only */}
        {isFullscreen && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            onClick={handleSkip}
            className="absolute top-6 right-6 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-sm font-semibold tracking-wide border border-white/20 transition-colors"
          >
            Skip Intro
          </motion.button>
        )}

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
          <>
            <button
              onClick={handleClose}
              aria-label="Close video"
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleExpand}
              aria-label="Expand video"
              className="absolute top-2 left-2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </>
        )}

        {/* 10-second progress bar — fullscreen only */}
        {isFullscreen && (
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: FULLSCREEN_DURATION_MS / 1000, ease: 'linear' }}
            className="absolute bottom-0 left-0 h-1 bg-blue-500"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
