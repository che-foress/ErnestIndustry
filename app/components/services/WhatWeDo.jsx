'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Package, Anchor, ArrowRight } from 'lucide-react';

export default function WhatWeDo() {
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

  const fade = `transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
  const slideRight = `transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`;

  return (
    <section ref={ref} className='px-6 md:px-16 py-16 md:py-24 bg-white'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center'>

        {/* Left — text */}
        <div className={`flex flex-col gap-6 ${fade}`}>
          {/* Eyebrow */}
          <div className='flex items-center gap-2'>
            <Sparkles size={16} className='text-orange-500' />
            <span className='text-orange-600 font-bold text-xs tracking-[0.2em] uppercase'>What We Do</span>
          </div>

          {/* Heading */}
          <h2 className='font-bold text-3xl md:text-5xl leading-tight'>
            <span className='text-orange-950'>Behind </span>
            <span className='bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent'>Ernest Industry</span>
            <br />
            <span className='text-orange-950'>and Our Story.</span>
          </h2>

          {/* Subtext */}
          <p className='text-gray-600 text-sm md:text-base max-w-lg'>
            We help vessels stay lit, stocked and running with dependable marine lighting
            and full ship provisions  trusted across Cameroon&apos;s leading ports.
          </p>

          {/* Stats */}
          <div className='flex gap-10'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-full bg-linear-to-r from-amber-400 to-orange-600 flex items-center justify-center text-white'>
                <Package size={22} />
              </div>
              <div className='flex flex-col'>
                <span className='text-orange-950 font-bold text-2xl'>500+</span>
                <span className='text-gray-500 text-xs'>Products Supplied</span>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-full bg-linear-to-r from-amber-400 to-orange-600 flex items-center justify-center text-white'>
                <Anchor size={22} />
              </div>
              <div className='flex flex-col'>
                <span className='text-orange-950 font-bold text-2xl'>3</span>
                <span className='text-gray-500 text-xs'>Ports Served</span>
              </div>
            </div>
          </div>

          {/* Closing line */}
          <p className='text-gray-600 text-sm'>
            We put our customers at the heart of everything we do.
          </p>

          {/* Button */}
          <Link
  href='/about-page'
  className='inline-flex items-center gap-2 w-fit bg-linear-to-r from-amber-400 to-orange-600 text-white px-6 py-3 rounded-md text-sm font-semibold hover:scale-105 transition-transform'
>
  Our Story <ArrowRight size={18} />
</Link>
        </div>

        {/* Right — image */}
        <div className={`relative h-80 md:h-[480px] rounded-2xl overflow-hidden ${slideRight}`} style={{ transitionDelay: visible ? '200ms' : '0ms' }}>
          <Image
            src='/images/ernest.jpg'  // your image
            alt='Ernest Industry marine services'
            fill
            sizes='(max-width: 768px) 100vw, 50vw'
            className='object-cover'
          />
        </div>

      </div>
    </section>
  );
}