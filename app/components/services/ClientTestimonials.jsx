'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Sparkles, Star } from 'lucide-react';

export default function ClientTestimonials() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

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

  const testimonials = [
    {
      quote: 'Working with Ernest Industry has been a real pleasure. They understand life at sea — when you need your vessel back on the water, they deliver quickly and reliably. A true partner.',
      name: ' Miss Ekindi',
      role: 'Vessel Operator, Douala Port',
      avatar: '/images/happy1.avif',
    },
    {
      quote: 'Their range of marine lighting is exactly what we needed, and the quality has held up in the harshest conditions. Sourcing spares has never been easier.',
      name: 'Narcisse FOTSO ',
      role: 'Founder & CEO Univers SOLUTIONS',
      avatar: '/images/happ2.jpg',
    },
  ];

  const t = testimonials[active];

  const fade = `transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  return (
    <section ref={ref} className='px-6 md:px-16 py-16 md:py-24 bg-gray-50'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center'>

        {/* Left — image with floating ratings card */}
        <div className={`relative ${fade}`}>
          <div className='relative h-96 rounded-2xl overflow-hidden'>
            <Image
              src='/images/happ2.jpg'  // your main image
              alt='Happy clients'
              fill
              sizes='(max-width: 768px) 100vw, 50vw'
              className='object-cover'
            />
            <div className='absolute inset-0 bg-orange-950/10' />
          </div>

          {/* Floating ratings card */}
          <div className='absolute -bottom-6 left-6 bg-white rounded-xl shadow-lg p-4 flex flex-col gap-2 max-w-[240px]'>
            <div className='flex items-center gap-2'>
              <span className='text-orange-950 font-bold text-lg'>Ratings 4.9</span>
              <div className='flex text-orange-500'>
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill='currentColor' />)}
              </div>
            </div>
            <p className='text-gray-500 text-xs'>Clients trust our service and quality.</p>
            <div className='flex items-center gap-1'>
              <div className='flex -space-x-2'>
                {[1, 2, 3].map((n) => (
                  <div key={n} className='w-6 h-6 rounded-full bg-gray-200 border-2 border-white' />
                ))}
              </div>
              <span className='ml-2 text-orange-600 text-xs font-semibold'>Trusted across ports</span>
            </div>
          </div>
        </div>

        {/* Right — testimonial content */}
        <div className={`flex flex-col gap-5 ${fade}`} style={{ transitionDelay: visible ? '200ms' : '0ms' }}>
          {/* Eyebrow */}
          <div className='flex items-center gap-2'>
            <Sparkles size={16} className='text-orange-500' />
            <span className='text-orange-600 font-bold text-xs tracking-[0.2em] uppercase'>What Clients Say</span>
          </div>

          {/* Heading */}
          <h2 className='font-bold text-3xl md:text-5xl leading-tight'>
            <span className='text-orange-950'>Hear What </span>
            <span className='bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent'>Our</span>
            <br />
            <span className='bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent'>Clients </span>
            <span className='text-orange-950'>Say</span>
          </h2>

          {/* Stars */}
          <div className='flex text-orange-500'>
            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill='currentColor' />)}
          </div>

          {/* Quote */}
          <p className='text-gray-600 text-sm md:text-base leading-relaxed'>
            &ldquo;{t.quote}&rdquo;
          </p>

          {/* Client */}
          <div className='flex items-center gap-3'>
            <div className='relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0'>
              <Image src={t.avatar} alt={t.name} fill sizes='48px' className='object-cover' />
            </div>
            <div className='flex flex-col'>
              <span className='text-orange-950 font-bold text-sm'>{t.name}</span>
              <span className='text-gray-500 text-xs'>{t.role}</span>
            </div>
          </div>

          {/* Dots */}
          <div className='flex gap-2 mt-2'>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${active === i ? 'w-6 bg-orange-500' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}