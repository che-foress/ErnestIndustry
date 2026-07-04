'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Lightbulb, Anchor, ShieldCheck, Sparkles } from 'lucide-react';

export default function WhyChooseServices() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const items = [
    {
      icon: Lightbulb,
      title: 'Complete Lighting Range',
      text: 'Navigation, deck, underwater and interior LED systems  every marine bulb your vessel needs, in one place.',
    },
    {
      icon: Anchor,
      title: 'Onboard & Offboard Provisions',
      text: 'Beyond lighting, we supply full ship provisions, making us a single trusted partner for your vessel.',
    },
    {
      icon: ShieldCheck,
      title: 'Built to Last at Sea',
      text: 'Durable, marine-grade products designed to perform reliably in the harshest conditions.',
    },
  ];

  const fade = (delay) =>
    `transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  return (
    <section ref={ref} className='px-6 md:px-16 py-16 md:py-24 bg-white'>
      <div className='max-w-6xl mx-auto'>

        {/* Eyebrow */}
        <div className='flex items-center justify-center gap-2 mb-4'>
          <Sparkles size={16} className='text-orange-500' />
          <span className='text-orange-600 font-bold text-xs tracking-[0.2em] uppercase'>About Ernest Industry</span>
        </div>

        {/* Heading */}
        <h2 className='text-center font-bold text-3xl md:text-5xl leading-tight max-w-3xl mx-auto'>
          <span className='text-orange-950'>Why Should </span>
          <span className='bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent'>You</span>
          <br />
          <span className='bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent'>Choose </span>
          <span className='text-orange-950'>Our Services?</span>
        </h2>

        {/* Subtext */}
        <p className='text-center text-gray-600 text-sm md:text-base max-w-2xl mx-auto mt-5'>
          We are committed to delivering dependable marine lighting and ship supply that keeps your
          vessels running safely and efficiently  trusted across Douala, Kribi and Limbe ports.
        </p>

        {/* Two-column: items left, images right */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-14 items-center'>

          {/* Left — service items */}
          <div className='flex flex-col gap-8'>
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`flex items-start gap-4 ${fade()}`}
                  style={{ transitionDelay: visible ? `${index * 150}ms` : '0ms' }}
                >
                  <div className='shrink-0 w-12 h-12 rounded-full bg-linear-to-r from-amber-400 to-orange-600 flex items-center justify-center text-white'>
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <h3 className='text-orange-950 font-bold text-lg'>{item.title}</h3>
                    <p className='text-gray-600 text-sm leading-relaxed'>{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right — images */}
          <div className={`grid grid-cols-2 gap-4 ${fade()}`} style={{ transitionDelay: visible ? '300ms' : '0ms' }}>
            <div className='relative h-86 rounded-2xl overflow-hidden'>
              <Image src='/images/lighting.jpg' alt='Marine lighting' fill sizes='(max-width: 768px) 50vw, 25vw' className='object-cover' />
            </div>
            <div className='relative h-86 rounded-2xl overflow-hidden mt-8'>
              <Image src='/images/supply.jpg' alt='Ship supply' fill sizes='(max-width: 768px) 50vw, 25vw' className='object-cover' />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}