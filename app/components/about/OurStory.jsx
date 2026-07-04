'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, Quote } from 'lucide-react';

export default function OurStory() {
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

  const fade = `transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  return (
    <section ref={ref} className='px-6 md:px-16 py-16 md:py-24 bg-white'>
      <div className='max-w-6xl mx-auto'>

        {/* Eyebrow + heading */}
        <div className={`text-center max-w-3xl mx-auto mb-14 ${fade}`}>
          <div className='flex items-center justify-center gap-2 mb-4'>
            <Sparkles size={16} className='text-orange-500' />
            <span className='text-orange-600 font-bold text-xs tracking-[0.2em] uppercase'>Our Story</span>
          </div>
          <h2 className='font-bold text-3xl md:text-5xl leading-tight'>
            <span className='text-orange-950'>Over a Decade </span>
            <span className='bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent'>Keeping Vessels Running</span>
          </h2>
        </div>

        {/* Story + CEO */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center'>

          {/* Left — CEO image + quote card */}
          <div className={`relative ${fade}`}>
            <div className='relative h-96 rounded-2xl overflow-hidden'>
              <Image
                src='/images/ceo.jpg'  // photo of the CEO or the team/business
                alt='Tangie Ernest Che, Founder & CEO'
                fill
                sizes='(max-width: 768px) 100vw, 50vw'
                className='object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-orange-950/80 via-transparent to-transparent' />
              <div className='absolute bottom-0 left-0 p-6'>
                <h3 className='text-white font-bold text-lg'>Tangie Ernest Che</h3>
                <p className='text-white/80 text-sm'>Founder &amp; CEO</p>
              </div>
            </div>
            {/* Floating quote */}
            <div className='bg-linear-to-r from-amber-400 to-orange-600 text-white rounded-2xl p-5 shadow-lg -mt-6 mx-6 relative flex gap-3'>
              <Quote size={28} className='shrink-0 opacity-70' />
              <p className='text-sm italic leading-relaxed'>
                &ldquo;When a vessel needs us, we deliver  quickly, reliably, and with the quality
                the sea demands. That commitment has carried us for over ten years.&rdquo;
              </p>
            </div>
          </div>

          {/* Right — narrative */}
          <div className={`flex flex-col gap-5 ${fade}`} style={{ transitionDelay: visible ? '200ms' : '0ms' }}>
            <p className='text-gray-600 text-sm md:text-base leading-relaxed'>
              Ernest Industry was founded on a simple belief: that vessels calling at
              Cameroon&apos;s ports deserve a supplier who is dependable, thorough, and always
              within reach. Under the leadership of founder and CEO <span className='text-orange-700 font-semibold'>Tangie Ernest Che</span>,
              what began as a focused marine supply operation has grown into a trusted name
              in ship chandling and marine lighting.
            </p>
            <p className='text-gray-600 text-sm md:text-base leading-relaxed'>
              For more than <span className='text-orange-700 font-semibold'>ten years</span>, we have supplied the full range of
              marine bulbs  from navigation and deck lighting to underwater and interior
              systems  alongside complete onboard and offboard provisions. Every product we
              supply is chosen to perform in the harshest conditions at sea, and every order is
              handled with the urgency that maritime operations require.
            </p>
            <p className='text-gray-600 text-sm md:text-base leading-relaxed'>
              Serving Douala, Kribi and Limbe, we work in reference to ISSA and IMPA standards,
              backed by specialized staff who know the local waters and the vessels that depend
              on them. Our track record is built on one thing above all  being the partner our
              clients can count on, voyage after voyage.
            </p>

            <Link
              href='/contact'
              className='inline-flex items-center gap-2 w-fit bg-linear-to-r from-amber-400 to-orange-600 text-white px-6 py-3 rounded-md text-sm font-semibold hover:scale-105 transition-transform mt-2'
            >
              Work With Us <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}