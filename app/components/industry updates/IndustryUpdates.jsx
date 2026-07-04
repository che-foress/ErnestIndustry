'use client';

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function IndustryUpdates() {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [activePage, setActivePage] = useState(0);
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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const articles = [
    { tags: ['News'],                          title: 'Updated CLMS marine catalogues',         image: '/images/catalogues.webp', href: '/news/catalogues' },
    { tags: ['Floodlights', 'News'],           title: 'New release: Module 70-S LED work lamps', image: '/images/floodlightnews.png', href: '/news/module-70s' },
    { tags: ['Events', 'News'],                title: 'Visit us at the Douala Maritime Expo',    image: '/images/Port-Douala.jpg', href: '/news/maritime-expo' },
    { tags: ['Navigation Lights', 'News'],     title: 'Powering rescue vessels across the coast', image: '/images/navigationnews.jpg', href: '/news/rescue-vessels' },
    { tags: ['Underwater Lights'],             title: 'Brighter, tougher underwater LED range',  image: '/images/underwater-lights.jpg', href: '/news/underwater-range' },
  ];

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const page = Math.round(el.scrollLeft / el.clientWidth);
    setActivePage(page);
  };

  const scrollToPage = (page) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: page * el.clientWidth, behavior: 'smooth' });
  };

  const pages = Math.ceil(articles.length / 2);

  return (
    <section ref={sectionRef} className='relative bg-linear-to-b from-amber-400 via-orange-600 to-orange-400 pt-24 pb-16'>

      {/* Curved wave top edge */}
      <div className='absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180'>
        <svg className='relative block w-full h-15 md:h-20' viewBox='0 0 1200 80' preserveAspectRatio='none'>
          <path d='M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z' fill='white' />
        </svg>
      </div>

      {/* Header row */}
      <div className='max-w-6xl mx-auto px-6 flex items-center justify-center relative mb-10'>
        <h2 className={`text-white font-bold text-2xl md:text-3xl text-center transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
          Industry updates
        </h2>
        <Link
          href='/news'
          className={`absolute right-6 text-white text-sm font-semibold underline underline-offset-4 hover:text-orange-200 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}
          style={{ transitionDelay: visible ? '150ms' : '0ms' }}
        >
          See All
        </Link>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className='flex gap-5 overflow-x-auto px-6 md:px-16 pb-4 snap-x snap-mandatory scrollbar-hide'
      >
        {articles.map((article, index) => (
          <Link
            key={article.title}
            href={article.href}
            className={`group relative shrink-0 w-70 md:w-85 h-65 rounded-lg overflow-hidden snap-start transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: visible ? `${300 + index * 120}ms` : '0ms' }}
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              className='object-cover transition-transform duration-500 group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10' />

            <div className='absolute inset-0 p-5 flex flex-col justify-end gap-3'>
              <div className='flex flex-wrap gap-2'>
                {article.tags.map((tag) => (
                  <span key={tag} className='text-[10px] font-bold uppercase tracking-wide text-white/90'>
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className='text-white font-bold text-lg leading-snug'>{article.title}</h3>
              <span className='inline-block w-fit bg-white text-orange-700 text-xs font-semibold px-4 py-2 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-colors'>
                Read Article
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination dots */}
      <div className={`flex justify-center gap-2 mt-8 transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: visible ? '700ms' : '0ms' }}>
        {Array.from({ length: pages }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToPage(index)}
            aria-label={`Go to page ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-400 ${activePage === index ? 'w-6 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'}`}
          />
        ))}
      </div>
    </section>
  )
}