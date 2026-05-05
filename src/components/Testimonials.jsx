import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'Austin, TX',
    text: "HR205 saved me over $50 a month on my internet and cable bundle. The process was so easy and the consultant was incredibly helpful!",
    rating: 5
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'Birmingham, AL',
    text: "I was overwhelmed by the cellular options for my small business. They found me a plan that actually works for my team and saved us a fortune.",
    rating: 5
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    location: 'Dallas, TX',
    text: "The security system they recommended gives me such peace of mind. Best part? I didn't pay a dime for their expert advice.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-gray-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg sm:text-xl text-gray-400">Real stories from real people across the country.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="relative bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
              <Quote className="absolute top-6 right-8 w-10 sm:w-12 h-10 sm:h-12 text-blue-400/20" />
              <div className="flex gap-1 mb-4 sm:mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 italic">"{t.text}"</p>
              <div>
                <p className="font-bold text-white">{t.name}</p>
                <p className="text-sm text-gray-400">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
