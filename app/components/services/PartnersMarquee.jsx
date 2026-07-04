import React from 'react';
import { Sparkle } from 'lucide-react';

export default function PartnersMarquee() {
  const words = ['LIGHTING', 'PROVISIONS', 'SHIP SUPPLY', 'NAVIGATION', 'MARINE GEAR', 'CHANDLERY'];

  return (
    <section className='py-12 md:py-16 bg-white overflow-hidden'>
      <div className='flex whitespace-nowrap animate-marquee'>
        {/* duplicated for a seamless loop */}
        {[...words, ...words].map((word, index) => (
          <div key={index} className='flex items-center'>
            <span className='text-4xl md:text-6xl font-extrabold tracking-wide text-gray-200 mx-6'>
              {word}
            </span>
            <Sparkle size={22} className='text-gray-200 shrink-0' fill='currentColor' />
          </div>
        ))}
      </div>
    </section>
  );
}