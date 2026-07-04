'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Phone, Mail, Clock, Sparkles, Navigation } from 'lucide-react';
import Footer from '../components/footer/Footer';

export default function WhereToBuyPage() {
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

  const branches = [
    {
      name: 'Head Office  Douala',
      address: 'New Road Bessengue Akwa, Douala, Cameroon',
      phone: '+237 676 000 067',
      email: 'ernestindustry@yahoo.com',
      hours: 'Mon – Sat: 8am – 6pm',
    },
    {
      name: 'Kribi Branch',
      address: 'Kribi Port Area, Kribi, Cameroon',
      phone: '+237 676 000 067',
      email: 'ernestindustry@yahoo.com',
      hours: 'Mon – Sat: 8am – 6pm',
    },
    {
      name: 'Limbe Branch',
      address: 'Limbe Seaport, Limbe, Cameroon',
      phone: '+237 676 000 067',
      email: 'ernestindustry@yahoo.com',
      hours: 'Mon – Sat: 8am – 6pm',
    },
  ];

  const fade = `transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  return (
    <div>
      {/* Hero */}
      <section className='relative h-[45vh] min-h-80 flex items-center justify-center overflow-hidden'>
        <Image
          src='/images/map.webp'  
          alt='Where to buy Ernest Industry'
          fill
          sizes='100vw'
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/70' />

        <Link
          href='/'
          className='absolute top-6 left-6 flex items-center gap-2 text-white/80 text-sm font-semibold hover:text-white transition-colors z-10'
        >
          <ArrowLeft size={18} /> Back to home
        </Link>

        <div className='relative text-center px-6'>
          <h1 className='text-white font-bold text-4xl md:text-6xl'>Where To Buy</h1>
          <p className='text-white/80 text-sm md:text-base max-w-2xl mx-auto mt-4'>
            Find us at our branches across Cameroon&apos;s leading ports  always close to your vessel.
          </p>
          <div className='flex items-center justify-center gap-2 mt-6 text-sm font-semibold'>
            <Link href='/' className='text-white/70 hover:text-white transition-colors'>Home</Link>
            <span className='text-orange-500'>&raquo;&raquo;</span>
            <span className='bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent'>Where To Buy</span>
          </div>
        </div>
      </section>

      {/* Branches + map */}
      <section ref={ref} className='px-6 md:px-16 py-16 md:py-24 bg-white'>
        <div className='max-w-6xl mx-auto'>

          {/* Heading */}
          <div className={`text-center max-w-2xl mx-auto mb-14 ${fade}`}>
            <div className='flex items-center justify-center gap-2 mb-4'>
              <Sparkles size={16} className='text-orange-500' />
              <span className='text-orange-600 font-bold text-xs tracking-[0.2em] uppercase'>Our Locations</span>
            </div>
            <h2 className='font-bold text-3xl md:text-5xl leading-tight'>
              <span className='text-orange-950'>Visit Us at </span>
              <span className='bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent'>Any Branch</span>
            </h2>
          </div>

          {/* Branch cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
            {branches.map((branch, index) => (
              <div
                key={branch.name}
                className={` rounded-2xl p-6 flex flex-col gap-4  transition-all duration-700 ${fade}`}
                style={{ transitionDelay: visible ? `${index * 130}ms` : '0ms' }}
              >
                <div className='w-12 h-12 rounded-xl bg-linear-to-r from-amber-400 to-orange-600 flex items-center justify-center text-white'>
                  <MapPin size={22} />
                </div>
                <h3 className='text-orange-950 font-bold text-lg'>{branch.name}</h3>
                <div className='flex flex-col gap-3 text-sm text-gray-600'>
                  <div className='flex items-start gap-2'>
                    <MapPin size={16} className='text-orange-500 shrink-0 mt-0.5' />
                    <span>{branch.address}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Phone size={16} className='text-orange-500 shrink-0' />
                    <span>{branch.phone}</span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <Mail size={16} className='text-orange-500 shrink-0 mt-0.5' />
                    <span className='break-all'>{branch.email}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Clock size={16} className='text-orange-500 shrink-0' />
                    <span>{branch.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className={`rounded-2xl overflow-hidden shadow-sm ${fade}`} style={{ transitionDelay: visible ? '400ms' : '0ms' }}>
            <iframe
              title='Ernest Industry location'
              src='https://www.google.com/maps?q=Akwa,Douala,Cameroon&output=embed'
              width='100%'
              height='420'
              style={{ border: 0 }}
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              allowFullScreen
            />
          </div>

          {/* CTA */}
          <div className={`text-center mt-12 ${fade}`}>
            <p className='text-gray-600 text-sm mb-4'>Can&apos;t make it in person? Reach out and we&apos;ll come to you.</p>
            <Link
              href='/contact'
              className='inline-flex items-center gap-2 bg-linear-to-r from-amber-400 to-orange-600 text-white px-6 py-3 rounded-md text-sm font-semibold hover:scale-105 transition-transform'
            >
              Get a Quote <Navigation size={16} />
            </Link>
          </div>

        </div>
      </section>
      <Footer />
    </div>
  );
}