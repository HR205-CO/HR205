import React from 'react';
import { PROVIDERS } from '../constants/data';

export default function ProviderLogos() {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-bold text-gray-500 uppercase tracking-wider mb-8">
          We Work With All Major Providers
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
          {PROVIDERS.map((provider) => (
            <div 
              key={provider}
              className="text-2xl sm:text-3xl font-bold text-gray-400 hover:text-blue-600 transition-colors"
            >
              {provider}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
