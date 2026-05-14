import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
  { src: '/customer-photos/photo-01.jpg', caption: 'Family setup — new service day' },
  { src: '/customer-photos/photo-02.jpg', caption: 'In-home consultation' },
  { src: '/customer-photos/photo-05.jpg', caption: 'Connecting our communities' },
  { src: '/customer-photos/photo-06.jpg', caption: 'On-site with a customer' },
  { src: '/customer-photos/photo-07.jpg', caption: 'Metronet install complete' },
  { src: '/customer-photos/photo-08.jpg', caption: 'DIRECTV — another happy home' },
  { src: '/customer-photos/photo-09.jpg', caption: 'The whole crew on location' },
  { src: '/customer-photos/photo-10.jpg', caption: 'Customer appreciation' },
  { src: '/customer-photos/photo-11.jpg', caption: 'Serving families nationwide' },
  { src: '/customer-photos/photo-12.jpg', caption: 'Welcome to better connectivity' },
];

// Bento grid layout — featured images get more real estate
const gridConfig = [
  { colSpan: 'md:col-span-2', rowSpan: '', aspect: 'aspect-[16/10]' },   // hero — wide
  { colSpan: '',               rowSpan: 'md:row-span-2', aspect: 'aspect-square md:aspect-auto md:h-full' },  // tall portrait
  { colSpan: '',               rowSpan: '', aspect: 'aspect-[4/3]' },
  { colSpan: '',               rowSpan: '', aspect: 'aspect-[4/3]' },
  { colSpan: '',               rowSpan: '', aspect: 'aspect-square' },
  { colSpan: 'md:col-span-2', rowSpan: '', aspect: 'aspect-[16/10]' },   // second hero — wide
  { colSpan: '',               rowSpan: '', aspect: 'aspect-[4/3]' },
  { colSpan: '',               rowSpan: '', aspect: 'aspect-[4/3]' },
  { colSpan: '',               rowSpan: '', aspect: 'aspect-square' },
  { colSpan: 'md:col-span-2', rowSpan: '', aspect: 'aspect-[16/10]' },   // closing hero
];

export default function CustomerGallery() {
  const [selected, setSelected] = useState(null);
  const lightboxRef = useRef(null);

  const prev = () => setSelected(i => (i > 0 ? i - 1 : photos.length - 1));
  const next = () => setSelected(i => (i < photos.length - 1 ? i + 1 : 0));

  useEffect(() => {
    if (selected !== null && lightboxRef.current) lightboxRef.current.focus();
  }, [selected]);

  const handleKey = (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape') setSelected(null);
  };

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-gray-900 via-brand-navy to-gray-900 relative overflow-hidden">

      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-14 sm:mb-20">
          <div className="inline-block mb-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-4" />
            <span className="text-blue-400 text-xs font-semibold uppercase tracking-[0.25em]">In the Field</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Our Customers
          </h2>
          <p className="text-lg text-blue-200/60 max-w-xl mx-auto leading-relaxed">
            Real people. Real connections. Every photo is a home we helped connect.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3.5">
          {photos.map((photo, i) => {
            const gc = gridConfig[i] || {};
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={() => setSelected(i)}
                className={`
                  ${gc.colSpan || ''} ${gc.rowSpan || ''}
                  cursor-pointer group relative overflow-hidden rounded-xl sm:rounded-2xl
                  ring-1 ring-white/10 hover:ring-white/25
                  shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-blue-900/30
                  transition-all duration-500
                `}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className={`w-full ${gc.aspect || 'aspect-[4/3]'} object-cover transition-transform duration-700 group-hover:scale-110`}
                  loading="lazy"
                />

                {/* Always-visible gradient + caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <p className="text-white text-xs sm:text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg">
                    {photo.caption}
                  </p>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[300] bg-black/97 flex items-center justify-center"
            onClick={() => setSelected(null)}
            onKeyDown={handleKey}
            tabIndex={0}
          >
            {/* Close */}
            <button
              onClick={e => { e.stopPropagation(); setSelected(null); }}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all z-10 backdrop-blur-sm border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-3 sm:left-8 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all z-10 backdrop-blur-sm border border-white/10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.img
              key={selected}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              src={photos[selected].src}
              alt={photos[selected].caption}
              className="max-w-[92vw] sm:max-w-[85vw] max-h-[80vh] object-contain rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
              onClick={e => e.stopPropagation()}
            />

            {/* Next */}
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-3 sm:right-8 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all z-10 backdrop-blur-sm border border-white/10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Caption bar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
              <span className="text-white/40 text-sm">{selected + 1} / {photos.length}</span>
              <span className="text-white/20 mx-2">·</span>
              <span className="text-white/70 text-sm">{photos[selected].caption}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
