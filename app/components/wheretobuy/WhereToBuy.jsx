'use client';
import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

export default function WhereToBuy() {
  const statsRef = useRef(null);
  const bottomRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [bottomVisible, setBottomVisible] = useState(false);

  useEffect(() => {
    const o1 = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.2 }
    );
    const o2 = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setBottomVisible(true); },
      { threshold: 0.2 }
    );
    if (statsRef.current) o1.observe(statsRef.current);
    if (bottomRef.current) o2.observe(bottomRef.current);
    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  const greetings = [
    'Welcome', 'Bienvenue', 'Akwaba', 'Karibu', 'Bem-vindo', 'Willkommen',
    'Bienvenidos', 'Benvenuto', 'Welkom', 'Mrhbaan', 'Huānyíng', 'Salamat datang',
  ];

  const stats = [
    { value: '500+', label: 'Marine products across our full range' },
    { value: '3',    label: 'Major ports served — Douala, Kribi & Limbe' },
    { value: '24/7', label: 'Supply and support for your vessels' },
    { value: '100%', label: 'Marine-grade, built to last at sea' },
  ];

  return (
    <section className='relative'>
      {/* Valley top edge — dips down in the middle */}
      <div className='absolute top-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none'>
        <svg className='relative block w-full h-12 md:h-20' viewBox='0 0 1200 80' preserveAspectRatio='none'>
          <path d='M0,0 C400,90 800,90 1200,0 L1200,0 L0,0 Z' fill='white' />
        </svg>
      </div>

      {/* Scrolling greetings marquee */}
      <div className='bg-linear-to-r from-amber-500 to-orange-600 py-4 pt-24 overflow-hidden'>
        <div className='flex whitespace-nowrap animate-marquee'>
          {[...greetings, ...greetings].map((word, index) => (
            <span key={index} className='text-white font-semibold text-base md:text-lg mx-6'>
              {word} <span className='text-white/50'>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Stats over the world map */}
      <div
        ref={statsRef}
        className='relative bg-cover bg-center py-20 md:py-14'
        style={{ backgroundImage: "url('/images/map.webp')" }}
      >
        <div className='absolute inset-0 bg-linear-to-r from-amber-500 to-orange-600/25' />
        <div className='relative max-w-6xl mx-auto px-6 flex flex-col items-center gap-6'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center'>
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center gap-2 transition-all duration-700 ${statsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transitionDelay: statsVisible ? `${index * 120}ms` : '0ms',
                }}
              >
                <span className='text-white font-bold text-4xl md:text-5xl'>{stat.value}</span>
                <span className='text-white/80 text-xs md:text-sm leading-snug max-w-[150px]'>{stat.label}</span>
              </div>
            ))}
          </div>
          <Link
            href='/where-to-buy'
            className={`bg-linear-to-r from-amber-400 to-orange-600 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg hover:scale-105 transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: statsVisible ? '520ms' : '0ms' }}
          >
            Where To Buy
          </Link>
        </div>
      </div>

      {/* Bottom — dark ocean parallax */}
      <div
        ref={bottomRef}
        className='relative bg-fixed bg-cover bg-center py-16 md:py-15'
        style={{ backgroundImage: "url('/images/ship.webp')" }}
      >
        <div className='absolute inset-0 bg-black/70' />
        <div className={`relative max-w-6xl mx-auto px-6 flex flex-col items-center md:items-start gap-5 text-center md:text-left transition-all duration-700 ease-out ${bottomVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className='text-white font-bold text-2xl md:text-4xl max-w-2xl leading-tight'>
            There&apos;s little adventure to be had in the dark
          </h2>
          <p className='text-white/80 text-sm md:text-base max-w-xl'>
            Navigate your next voyage with first-class marine lighting and full ship
            provisions  only from Ernest Industry.
          </p>
          <Link
            href='/products'
            className='bg-linear-to-r from-amber-400 to-orange-600 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg hover:scale-105 transition-transform duration-300'
          >
            Light The Way
          </Link>
        </div>
      </div>
    </section>
  )
}