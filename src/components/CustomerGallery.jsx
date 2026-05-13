import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const CLOUD_NAME = 'hr205';

function cloudinaryUrl(publicId, opts = '') {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${opts}/${publicId}`;
}

export default function CustomerGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    supabase
      .from('gallery_images')
      .select('*')
      .order('uploaded_at', { ascending: false })
      .then(({ data }) => {
        setImages(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const prev = () => setSelected(i => (i > 0 ? i - 1 : images.length - 1));
  const next = () => setSelected(i => (i < images.length - 1 ? i + 1 : 0));

  if (loading || !images.length) return null;

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Customers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real people we've helped connect. Serving communities across the country.
          </p>
        </div>

        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
              onClick={() => setSelected(i)}
            >
              <img
                src={cloudinaryUrl(img.public_id, 'w_600,q_auto,f_auto,c_fill')}
                alt={img.caption || 'HR205 customer'}
                className="w-full rounded-xl transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/30 transition-colors duration-300 rounded-xl" />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium">{img.caption}</p>
                </div>
              )}
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
          >
            <button
              onClick={e => { e.stopPropagation(); setSelected(null); }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.img
              key={selected}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              src={cloudinaryUrl(images[selected].public_id, 'w_1400,q_auto,f_auto')}
              alt={images[selected].caption || 'HR205 customer'}
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
              onClick={e => e.stopPropagation()}
            />

            <button
              onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {selected + 1} / {images.length}
              {images[selected].caption && (
                <span className="ml-2 text-white/80">· {images[selected].caption}</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
