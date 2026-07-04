'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ServicesShowcase() {
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

  const services = [
    {
      title: 'Marine Lighting Supply',
      text: 'Navigation, deck, underwater and interior LED systems — the full range of marine bulbs for every vessel.',
      image: '/images/service-1.jpg',
    },
    {
      title: 'Ship Provisions',
      text: 'Complete onboard and offboard provisions, delivered reliably to keep your vessel fully stocked.',
      image: '/images/service-2.jpg',
    },
    {
      title: 'Spare Parts Sourcing',
      text: 'Genuine or alternative parts sourced according to ISSA and IMPA codes by specialized staff.',
      image: '/images/service-3.jpg',
    },
    {
      title: 'Port-Side Support',
      text: 'Fast, dependable service at Douala, Kribi and Limbe ports, right where your vessels operate.',
      image: '/images/service-4.jpg',
    },
  ];

  return (
    <section ref={ref} className='px-6 md:px-16 py-16 md:py-24 bg-gray-50'>
      <div className='max-w-6xl mx-auto'>

        {/* Eyebrow */}
        <div className='flex items-center gap-2 mb-4'>
          <Sparkles size={16} className='text-orange-500' />
          <span className='text-orange-600 font-bold text-xs tracking-[0.2em] uppercase'>Featured Services</span>
        </div>

        {/* Heading */}
        <h2 className='font-bold text-3xl md:text-5xl leading-tight max-w-2xl mb-12'>
          <span className='text-orange-950'>Our Company </span>
          <span className='bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent'>Provides The</span>
          <br />
          <span className='bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent'>Best </span>
          <span className='text-orange-950'>Marine Service</span>
        </h2>

        {/* Horizontal scrolling cards */}
        <div className='flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide'>
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`shrink-0 w-72 md:w-80 snap-start bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: visible ? `${index * 120}ms` : '0ms' }}
            >
              {/* Image with arrow button */}
              <div className='relative h-56 rounded-2xl overflow-hidden m-3'>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes='320px'
                  className='object-cover'
                />
                <div className='absolute bottom-3 right-3 w-10 h-10 rounded-full bg-linear-to-r from-amber-400 to-orange-600 flex items-center justify-center text-white shadow-lg'>
                  <ArrowRight size={18} />
                </div>
              </div>

              {/* Text */}
              <div className='p-5 pt-2 flex flex-col gap-2'>
                <h3 className='text-orange-950 font-bold text-lg'>{service.title}</h3>
                <p className='text-gray-500 text-sm leading-relaxed'>{service.text}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}