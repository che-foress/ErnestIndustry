'use client';

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutHero() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className='px-6 md:px-16 py-16 md:py-24 bg-white'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center'>

        {/* Left — text */}
        <div
          className={`flex flex-col gap-6 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
        >
          <h2 className='text-orange-950 font-bold text-3xl md:text-4xl leading-tight'>
            Meet Ernest Industry: your partner in marine lighting and supply
          </h2>
          <p className='text-gray-600 text-base md:text-lg leading-relaxed max-w-xl'>
            At Ernest Industry, we supply the full range of marine bulbs  from navigation
            and deck lights to underwater and interior systems  alongside complete onboard
            and offboard provisions. Built to perform in the harshest conditions at sea and
            trusted by vessels across Cameroon&apos;s leading ports.
          </p>
          <Link
            href='/about'
            className='w-fit bg-linear-to-r from-amber-400 to-orange-600 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg hover:scale-105 hover:shadow-orange-300/50 transition-all duration-300'
          >
            About Us
          </Link>
        </div>

        {/* Right — product image */}
        <div
          className={`relative h-72 md:h-96 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          style={{ transitionDelay: visible ? '200ms' : '0ms' }}
        >
          <Image
            src='' // your product image
            alt='Ernest Industry marine light'
            fill
            className='object-contain'
          />
        </div>

      </div>
    </section>
  )
}
