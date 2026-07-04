'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { DollarSign, Anchor, Users } from 'lucide-react';

export default function WhyErnest() {
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

  const features = [
    { icon: DollarSign, title: 'Competitive Pricing', text: 'Fair, transparent quotations with no hidden costs — quality marine supply that fits your budget.' },
    { icon: Anchor, title: 'Complete Marine Supply', text: 'From navigation lights to full provisions, we cover every category your vessel needs in one place.' },
    { icon: Users, title: 'Trusted Local Partner', text: 'A dependable presence at Douala, Kribi and Limbe ports, backed by specialized, experienced staff.' },
  ];

  const fade = `transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
  const slideLeft = `transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`;

  return (
    <section ref={ref} className='px-6 md:px-16 py-16 md:py-24 bg-white'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>

        {/* Left — images */}
        <div className={`relative ${slideLeft}`}>
          <div className='relative h-72 rounded-2xl overflow-hidden'>
            <Image src='/images/about-why-1.jpg' alt='Marine supply' fill sizes='(max-width: 768px) 100vw, 50vw' className='object-cover' />
          </div>
          {/* Small overlapping image top-left */}
          <div className='absolute -top-8 -left-4 w-40 h-28 rounded-xl overflow-hidden border-4 border-white shadow-lg hidden sm:block'>
            <Image src='/images/about-why-2.jpg' alt='Ship lighting' fill sizes='160px' className='object-cover' />
          </div>
          {/* Stats card bottom */}
          <div className='bg-gray-50 rounded-2xl p-6 mt-4 grid grid-cols-2 gap-6'>
            <div>
              <h4 className='text-orange-950 font-bold mb-1'>Reliability</h4>
              <p className='text-gray-500 text-xs leading-relaxed'>Marine-grade products built to perform in the harshest sea conditions.</p>
            </div>
            <div>
              <h4 className='text-orange-950 font-bold mb-1'>Availability</h4>
              <p className='text-gray-500 text-xs leading-relaxed'>Fast sourcing and delivery right where your vessels operate.</p>
            </div>
          </div>
        </div>

        {/* Right — features */}
        <div className={`flex flex-col gap-6 ${fade}`}>
          <span className='text-orange-600 font-bold text-xs tracking-[0.2em] uppercase'>Why Ernest Industry</span>
          <h2 className='text-orange-950 font-bold text-3xl md:text-5xl leading-tight'>
            Your Trusted Partner for Marine Supply
          </h2>

          <div className='flex flex-col gap-5 mt-2'>
            {features.map((f, index) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className={`flex items-start gap-4 ${fade}`}
                  style={{ transitionDelay: visible ? `${index * 130}ms` : '0ms' }}
                >
                  <div className='shrink-0 w-12 h-12 rounded-xl bg-linear-to-r from-amber-400 to-orange-600 flex items-center justify-center text-white'>
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className='text-orange-950 font-bold text-base mb-1'>{f.title}</h3>
                    <p className='text-gray-500 text-sm leading-relaxed'>{f.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}