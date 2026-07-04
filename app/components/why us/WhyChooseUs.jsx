'use client';

import React, { useRef, useEffect, useState } from 'react'
import { Lightbulb, ShieldCheck, Anchor, Truck } from 'lucide-react'

export default function WhyChooseUs() {
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
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Lightbulb,
      title: 'Complete range of marine lighting',
      text: 'From navigation and deck lights to underwater and interior LED systems, we stock the full range of marine bulbs for every vessel and every need.',
    },
    {
      icon: ShieldCheck,
      title: 'Trusted for quality and reliability',
      text: 'We supply durable, marine-grade lighting built to withstand harsh conditions at sea, so you can rely on consistent performance trip after trip.',
    },
    {
      icon: Anchor,
      title: 'Onboard & offboard provisions',
      text: 'Beyond lighting, we provide complete ship provisions both onboard and offboard, making us a single trusted partner for your vessel supply needs.',
    },
    {
      icon: Truck,
      title: 'Serving Cameroon\u2019s leading ports',
      text: 'With a strong local presence at Douala, Kribi and Limbe, we deliver fast, dependable supply right where your vessels operate.',
    },
  ]

  return (
    <section ref={sectionRef} className='px-6 md:px-16 py-12 md:py-20'>
      <h2
        className={`text-center text-orange-950 font-bold text-2xl md:text-4xl mb-12 md:mb-16 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        A different class of maritime provider
      </h2>

      <div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8'>
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={feature.title}
              className={`group flex flex-col items-center text-center gap-4 transition-all duration-700 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // springy overshoot
                transitionDelay: visible ? `${index * 230}ms` : '0ms',
              }}
            >
              <div className='relative flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-r from-amber-400 to-orange-600 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1'>
                {/* pulsing ring */}
                <span className='absolute inset-0 rounded-full bg-orange-400/40 animate-ping' style={{ animationDuration: '2.5s' }} />
                <Icon size={32} className='relative text-white' strokeWidth={1.8} />
              </div>
              <h3 className='text-orange-950 font-bold text-base md:text-lg leading-snug'>
                {feature.title}
              </h3>
              <p className='text-gray-600 text-sm md:text-base leading-relaxed'>
                {feature.text}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}