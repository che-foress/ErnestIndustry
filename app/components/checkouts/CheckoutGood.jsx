'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useEffect, useState } from 'react'

export default function CheckoutGood({ categories = [] }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // animate once
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const featured = {
    title: 'Marine Lighting Ecosystem',
    image: '/images/marineLight.jpg', // change to your banner image
    href: '/products',
  };

  // const categories = [
  //   { title: 'Underwater Lights',          image: '/images/underwater.jpg', href: '/products/underwater-lights' },
  //   { title: 'Interior / Exterior Lamps',  image: '/images/inexterior.jpg', href: '/products/interior-exterior-lamps' },
  //   { title: 'Light Bars',                 image: '/images/lightBars.jpg', href: '/products/light-bars' },
  //   { title: 'Navigation Lights',          image: '/images/marineLight.jpg', href: '/products/navigation-lights' },
  //   { title: 'Floodlights',                image: '/images/floodlight.jpg', href: '/products/floodlight' },
  //   { title: 'Courtesy Lamps',             image: '/images/courtesy.jpg', href: '/products/courtesy-lamps' },
  //   { title: 'Accessories',                image: '/images/accessories.jpg', href: '/products/accessories' },
  //   { title: 'Cruise Ship Lighting',       image: '/images/interior1.jpg', href: '/products/cruise-ship-lighting' },
  // ];

  // Shared fade-up classes; `visible` flips them on
  const fadeUp = (delay = 0) =>
    `transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  return (
    <section ref={sectionRef} id='products' className='px-6 md:px-16 py-8 md:py-10'>
      <div className='max-w-4xl mx-auto flex flex-col items-center text-center gap-6'>
        <h1
          className={`text-orange-950 font-bold text-2xl md:text-5xl leading-tight ${fadeUp()}`}
        >
          Specialists in marine lighting and ship supply
        </h1>
        <p
          className={`text-gray-800 text-base md:text-lg leading-relaxed max-w-4xl ${fadeUp()}`}
          style={{ transitionDelay: visible ? '120ms' : '0ms' }}
        >
          From LED navigation lights to high-performance deck and underwater systems,
          we supply the full range of marine bulbs  plus complete provisions onboard
          and offboard. A trusted name across Cameroon&apos;s leading ports. View our range below.
        </p>
      </div>

      {/* Lighting ecosystem grid */}
      <div className='max-w-6xl mx-auto mt-10 flex flex-col gap-4'>
        {/* Featured banner */}
        <Link
          href={featured.href}
          className={`relative block h-56 md:h-82 rounded-xl overflow-hidden group ${fadeUp()}`}
          style={{ transitionDelay: visible ? '380ms' : '0ms' }}
        >
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            sizes="100vw"
            className='object-cover transition-transform duration-500 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors' />
          <div className='absolute inset-0 flex items-center justify-center'>
            <h2 className='text-white font-bold text-2xl md:text-3xl'>{featured.title}</h2>
          </div>
        </Link>

        {/* Category tiles */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {categories.map((cat, index) => (
  <Link
    key={cat.id}
    href={`/products/${cat.slug}`}
    className={`relative block h-32 md:h-40 rounded-xl overflow-hidden cursor-pointer group ${fadeUp()}`}
    style={{ transitionDelay: visible ? `${380 + index * 90}ms` : '0ms' }}
  >
    {cat.image_url ? (
      <Image
        src={cat.image_url}
        alt={cat.name}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className='object-cover transition-transform duration-500 group-hover:scale-110'
      />
    ) : (
      <div className='absolute inset-0 bg-gray-300' />
    )}
    <div className='absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors' />
    <div className='absolute inset-0 flex items-center justify-center px-2'>
      <h3 className='text-white font-bold text-sm md:text-base text-center leading-tight'>{cat.name}</h3>
    </div>
  </Link>
))}
        </div>
      </div>
    </section>
  )
}