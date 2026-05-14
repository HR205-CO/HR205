import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
  { src: '/customer-photos/photo-01.jpg', caption: 'New service day — happy family' },
  { src: '/customer-photos/photo-02.jpg', caption: 'Professional in-home consultation' },
  { src: '/customer-photos/photo-08.jpg', caption: 'DIRECTV setup complete' },
  { src: '/customer-photos/photo-10.jpg', caption: 'Customer appreciation' },
  { src: '/customer-photos/photo-11.jpg', caption: 'Serving families nationwide' },
  { src: '/customer-photos/photo-07.jpg', caption: 'Metronet install day' },
  { src: '/customer-photos/photo-12.jpg', caption: 'Welcome to better connectivity' },
];

export default function CustomerGallery() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const scrollRef = useRef(null);

  const scrollTo = (idx) => {
    const clamped = Math.max(0, Math.min(idx, photos.length - 1));
    setActive(clamped);
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[clamped];
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  // Track which card is centered via scroll position
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const onScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.children[0]?.offsetWidth || 1;
      const gap = 16;
      const idx = Math.round(scrollLeft / (cardWidth + gap));
      setActive(Math.max(0, Math.min(idx, photos.length - 1)));
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  const lbPrev = () => setLightbox(i => (i > 0 ? i - 1 : photos.length - 1));
  const lbNext = () => setLightbox(i => (i < photos.length - 1 ? i + 1 : 0));
  const lbKey = (e) => {
    if (e.key === 'ArrowLeft') lbPrev();
    if (e.key === 'ArrowRight') lbNext();
    if (e.key === 'Escape') setLightbox(null);
  };

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-gray-900 via-brand-navy to-gray-900 relative overflow-hidden">

      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '48px 48px'
      }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 px-4">
          <div className="inline-block mb-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-4" />
            <span className="text-blue-400 text-xs font-semibold uppercase tracking-[0.25em]">In the Field</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Our Customers
          </h2>
          <p className="text-base sm:text-lg text-blue-200/50 max-w-md mx-auto">
            Every photo is a home we helped connect.
          </p>
        </div>

        {/* Arrow buttons — desktop */}
        <div className="hidden sm:flex absolute top-1/2 left-2 right-2 z-20 justify-between pointer-events-none" style={{ marginTop: '40px' }}>
          <button
            onClick={() => scrollTo(active - 1)}
            className="pointer-events-auto p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-all backdrop-blur-sm border border-white/10 disabled:opacity-30"
            disabled={active === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollTo(active + 1)}
            className="pointer-events-auto p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-all backdrop-blur-sm border border-white/10 disabled:opacity-30"
            disabled={active === photos.length - 1}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Horizontal scroll carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 sm:px-8 pb-4 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setLightbox(i)}
              className="flex-none w-[85vw] sm:w-[45vw] lg:w-[32vw] snap-center cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 group-hover:ring-white/25 shadow-xl shadow-black/40 group-hover:shadow-2xl transition-all duration-500">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <p className="text-white text-sm font-medium drop-shadow-lg">{photo.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === active
                  ? 'w-8 h-2 bg-blue-400'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/97 flex items-center justify-center"
            onClick={() => setLightbox(null)}
            onKeyDown={lbKey}
            tabIndex={0}
            ref={el => el && el.focus()}
          >
            <button
              onClick={e => { e.stopPropagation(); setLightbox(null); }}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all z-10 backdrop-blur-sm border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={e => { e.stopPropagation(); lbPrev(); }}
              className="absolute left-3 sm:left-8 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all z-10 backdrop-blur-sm border border-white/10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              src={photos[lightbox].src}
              alt={photos[lightbox].caption}
              className="max-w-[92vw] sm:max-w-[80vw] max-h-[80vh] object-contain rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
              onClick={e => e.stopPropagation()}
            />

            <button
              onClick={e => { e.stopPropagation(); lbNext(); }}
              className="absolute right-3 sm:right-8 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all z-10 backdrop-blur-sm border border-white/10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
              <span className="text-white/40 text-sm">{lightbox + 1} / {photos.length}</span>
              <span className="text-white/20 mx-2">·</span>
              <span className="text-white/70 text-sm">{photos[lightbox].caption}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}
