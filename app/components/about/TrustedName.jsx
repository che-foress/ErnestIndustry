'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Leaf, ArrowRight } from 'lucide-react';

export default function TrustedName() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const points = ['Marine-grade quality', 'Fast, reliable supply', 'Full provisions range', 'Trusted at every port'];
  const fade = `transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  return (
    <section ref={ref} className='px-6 md:px-16 py-16 md:py-24 bg-gray-50'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-center'>

        {/* Left — heading + stats */}
        <div className={`flex flex-col gap-5 ${fade}`}>
          <span className='text-orange-600 font-bold text-xs tracking-[0.2em] uppercase'>About Ernest Industry</span>
          <h2 className='text-orange-950 font-bold text-3xl md:text-4xl leading-tight'>A Name Vessels Trust</h2>
          <p className='text-gray-500 text-sm leading-relaxed'>
            Supplying marine lighting and ship provisions with the reliability and speed
            that life at sea demands.
          </p>

          <div className='grid grid-cols-2 gap-5 mt-2'>
            <div>
              <span className='bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent font-bold text-3xl'>500+</span>
              <p className='text-gray-500 text-xs mt-1'>Products supplied</p>
            </div>
            <div>
              <span className='bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent font-bold text-3xl'>100%</span>
              <p className='text-gray-500 text-xs mt-1'>Marine-grade</p>
            </div>
            <div>
              <span className='bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent font-bold text-3xl'>3</span>
              <p className='text-gray-500 text-xs mt-1'>Ports served</p>
            </div>
            <div>
              <span className='bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent font-bold text-3xl'>24/7</span>
              <p className='text-gray-500 text-xs mt-1'>Support</p>
            </div>
          </div>

          <Link href='/products' className='inline-flex items-center gap-2 w-fit bg-linear-to-r from-amber-400 to-orange-600 text-white px-6 py-3 rounded-md text-sm font-semibold hover:scale-105 transition-transform mt-2'>
            Explore Products <ArrowRight size={18} />
          </Link>
        </div>

        {/* Center — images with badge */}
        <div className={`relative ${fade}`} style={{ transitionDelay: visible ? '150ms' : '0ms' }}>
          <div className='relative h-48 rounded-2xl overflow-hidden'>
            <Image src='/images/about-trust-1.jpg' alt='Marine' fill sizes='(max-width: 768px) 100vw, 33vw' className='object-cover' />
          </div>
          <div className='relative h-48 rounded-2xl overflow-hidden mt-4'>
            <Image src='/images/about-trust-2.jpg' alt='Port' fill sizes='(max-width: 768px) 100vw, 33vw' className='object-cover' />
          </div>
          {/* Floating badge */}
          <div className='absolute top-1/2 -translate-y-1/2 -right-4 bg-linear-to-r from-amber-400 to-orange-600 text-white rounded-2xl p-4 w-32 shadow-lg hidden md:flex flex-col items-center text-center gap-2'>
            <Leaf size={24} />
            <span className='text-xs font-bold'>Built for the sea</span>
          </div>
        </div>

        {/* Right — heading + checklist */}
        <div className={`flex flex-col gap-5 ${fade}`} style={{ transitionDelay: visible ? '300ms' : '0ms' }}>
          <h3 className='text-orange-950 font-bold text-2xl md:text-3xl leading-tight'>
            Quality and Service, Where It Matters Most
          </h3>
          <p className='text-gray-500 text-sm leading-relaxed'>
            We keep your vessel equipped and running with dependable products and
            responsive service at every port we serve.
          </p>
          <ul className='flex flex-col gap-3'>
            {points.map((point) => (
              <li key={point} className='flex items-center gap-3'>
                <span className='w-5 h-5 rounded-full bg-linear-to-r from-amber-400 to-orange-600 flex items-center justify-center text-white shrink-0'>
                  <Check size={13} strokeWidth={3} />
                </span>
                <span className='text-gray-700 text-sm'>{point}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}