'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

export default function HowItWorks() {
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

  const steps = [
    {
      number: '01',
      title: 'Tell Us Your Needs',
      text: 'Send us a quick request with the marine lighting or provisions your vessel requires.',
      image: '/images/needs.jpg',
    },
    {
      number: '02',
      title: 'Get a Quotation or Contact Us',
      text: 'We prepare a clear, competitive quote based on your requirements  no hidden costs.',
      image: '/images/quotes.jpg',
    },
    {
      number: '03',
      title: 'We Supply & Deliver',
      text: 'Once approved, we source and deliver quality, marine-grade products right to your port.',
      image: '/images/wesupply.jpg',
    },
    {
      number: '04',
      title: 'Your Sail Ready',
      text: 'Your vessel is fully equipped and ready for the voyage, backed by our ongoing support.',
      image: '/images/ready.jpg',
    },
  ];

  return (
    <section ref={ref} className='px-6 md:px-16 py-16 md:py-24 '>
      <div className='max-w-6xl mx-auto'>

        {/* Eyebrow */}
        <div className='flex items-center justify-center gap-2 mb-4'>
          <Sparkles size={16} className='text-orange-500' />
          <span className='text-orange-600 font-bold text-xs tracking-[0.2em] uppercase'>How It Works</span>
        </div>

        {/* Heading */}
        <h2 className='text-center font-bold text-3xl md:text-5xl leading-tight max-w-2xl mx-auto mb-14'>
          <span className='text-orange-950'>Get Your Vessel </span>
          <span className='bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent'>Ready In</span>
          <br />
          <span className='bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent'>Four </span>
          <span className='text-orange-950'>Steps</span>
        </h2>

        {/* Step cards — staggered */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`bg-white rounded-2xl transition-all duration-700 ease-out ${
                // offset every other card downward on large screens
                index % 2 === 1 ? 'lg:mt-10' : ''
              } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: visible ? `${index * 130}ms` : '0ms' }}
            >
              {/* Image with number badge */}
              <div className='relative h-44 rounded-2xl overflow-hidden m-3'>
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes='(max-width: 768px) 100vw, 25vw'
                  className='object-cover'
                />
                <div className='absolute bottom-3 right-3 w-10 h-10 rounded-full bg-linear-to-r from-amber-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-lg'>
                  {step.number}
                </div>
              </div>

              {/* Text */}
              <div className='p-5 pt-2 flex flex-col gap-2'>
                <h3 className='text-orange-950 font-bold text-base'>{step.title}</h3>
                <p className='text-gray-500 text-sm leading-relaxed'>{step.text}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}