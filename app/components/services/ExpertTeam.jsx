'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function ExpertTeam() {
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

  const team = [
    { name: 'Ernest Ndula', role: 'Founder & Lead Supplier', image: '/images/team-1.jpg' },
    { name: 'Grace Mbella', role: 'Provisions Manager', image: '/images/team-2.jpg' },
    { name: 'Samuel Eyong', role: 'Marine Lighting Specialist', image: '/images/team-3.jpg' },
  ];

  return (
    <section ref={ref} className='px-6 md:px-16 py-16 md:py-24 bg-white'>
      <div className='max-w-6xl mx-auto'>

        {/* Eyebrow */}
        <div className='flex items-center justify-center gap-2 mb-4'>
          <Sparkles size={16} className='text-orange-500' />
          <span className='text-orange-600 font-bold text-xs tracking-[0.2em] uppercase'>Team Members</span>
        </div>

        {/* Heading */}
        <h2 className='text-center font-bold text-3xl md:text-5xl leading-tight max-w-2xl mx-auto mb-14'>
          <span className='text-orange-950'>We Have An </span>
          <span className='bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent'>Expert Team</span>
          <br />
          <span className='text-orange-950'>To </span>
          <span className='bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent'>Serve </span>
          <span className='text-orange-950'>You.</span>
        </h2>

        {/* Team cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`relative h-96 rounded-2xl overflow-hidden group transition-all duration-700 ease-out ${
                index === 1 ? 'lg:mt-10' : ''
              } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: visible ? `${index * 150}ms` : '0ms' }}
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes='(max-width: 768px) 100vw, 33vw'
                className='object-cover transition-transform duration-500 group-hover:scale-105'
              />
              {/* Gradient overlay */}
              <div className='absolute inset-0 bg-gradient-to-t from-orange-950/90 via-orange-950/20 to-transparent' />

              {/* Name / role */}
              <div className='absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between'>
                <div>
                  <h3 className='text-white font-bold text-lg'>{member.name}</h3>
                  <p className='text-white/70 text-sm'>{member.role}</p>
                </div>
                <div className='w-10 h-10 rounded-full bg-linear-to-r from-amber-400 to-orange-600 flex items-center justify-center text-white shrink-0'>
                  <ArrowRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}