import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
  { src: '/customer-photos/photo-01.jpg', caption: 'Happy family with new service' },
  { src: '/customer-photos/photo-02.jpg', caption: 'In-home consultation' },
  { src: '/customer-photos/photo-05.jpg', caption: 'Helping customers at home' },
  { src: '/customer-photos/photo-06.jpg', caption: 'On-site service visit' },
  { src: '/customer-photos/photo-07.jpg', caption: 'Satisfied customer' },
  { src: '/customer-photos/photo-08.jpg', caption: 'DIRECTV setup complete' },
  { src: '/customer-photos/photo-09.jpg', caption: 'The whole family is connected' },
  { src: '/customer-photos/photo-10.jpg', caption: 'Another happy customer' },
  { src: '/customer-photos/photo-11.jpg', caption: 'Serving families nationwide' },
  { src: '/customer-photos/photo-12.jpg', caption: 'Door-to-door service' },
];

export default function CustomerGallery() {
  const [selected, setSelected] = useState(null);

  const prev = () => setSelected(i => (i > 0 ? i - 1 : photos.length - 1));
  const next = () => setSelected(i => (i < photos.length - 1 ? i + 1 : 0));

  const handleKey = (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape') setSelected(null);
  };

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Customers
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Real people. Real connections. Serving communities across the country.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              onClick={() => setSelected(i)}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full rounded-xl transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              <p className="absolute bottom-0 left-0 right-0 px-3 py-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {photo.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
            onKeyDown={handleKey}
            tabIndex={-1}
          >
            <button
              onClick={e => { e.stopPropagation(); setSelected(null); }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-3 sm:left-6 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.img
              key={selected}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={photos[selected].src}
              alt={photos[selected].caption}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            />

            <button
              onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-3 sm:right-6 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white/50 text-sm">{selected + 1} / {photos.length}</p>
              <p className="text-white/80 text-sm mt-1">{photos[selected].caption}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
