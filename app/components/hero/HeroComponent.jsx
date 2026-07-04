'use client';
import React, { useState, useEffect } from 'react';

const slides = [
  {
    video: '/videos/video3 (2).mp4',
    animation: 'wipe',
    heading: 'IMPA & ISSA Codes',
    text: 'On-shore / offshore solutions. Delivering world-class service across all categories of vessel requirements.',
    button: 'READ MORE',
  },
  {
    video: '/videos/video3 (1).mp4',
    animation: 'leftToRight',
    heading: 'Ship Chandler',
    text: 'Premium marine lighting and Built For The Sea, trusted by vessels across the region.',
    button: 'OUR PRODUCTS',
  },
  {
    video: '/videos/video3 (4).mp4',
    animation: 'topToBottom',
    heading: 'Welcome to EIMS',
    text: 'Your trusted source for all types of marine lighting  from navigation and deck lights to underwater and interior bulbs plus complete onboard and offboard provisions. Serving Douala, Kribi & Limbe ports.',
    button: 'CONTACT US',
  },
];

/* Wipe-reveal: a white bar sweeps across, then retracts to reveal the child */
function WipeReveal({ children, delay = 0, className = '' }) {
  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <span
        className='relative z-0 opacity-0'
        style={{ animation: `revealBehind 1.1s ease-in-out ${delay}s forwards` }}
      >
        {children}
      </span>
      <span
        className='absolute inset-0 z-10 bg-white'
        style={{ animation: `barWipe 1.1s ease-in-out ${delay}s forwards` }}
      />
    </span>
  );
}

/* Renders the right animated text block for the active slide */
function SlideText({ slide }) {
  const { animation, heading, text, button } = slide;

  // Slide 1 — white bar wipe reveal (staggered per line)
  if (animation === 'wipe') {
    return (
      <div className='flex flex-col items-center gap-5'>
        <WipeReveal delay={0.1}>
          <h1 className='text-4xl md:text-6xl font-bold text-white'>{heading}</h1>
        </WipeReveal>
        <WipeReveal delay={0.55}>
          <p className='max-w-2xl text-sm md:text-base text-white leading-relaxed'>{text}</p>
        </WipeReveal>
        <WipeReveal delay={1.0}>
          <button className='bg-linear-to-r from-amber-400 to-orange-600 text-white px-6 py-3 rounded-md text-sm font-semibold'>{button}</button>
        </WipeReveal>
      </div>
    );
  }

  // Slide 2 — slides in from the left (staggered)
  if (animation === 'leftToRight') {
    return (
      <div className='flex flex-col items-center gap-5'>
        <h1 className='text-4xl md:text-6xl font-bold text-white opacity-0' style={{ animation: 'slideFromLeft 0.8s ease-out 0.1s forwards' }}>{heading}</h1>
        <p className='max-w-2xl text-sm md:text-base text-white leading-relaxed opacity-0' style={{ animation: 'slideFromLeft 0.8s ease-out 0.4s forwards' }}>{text}</p>
        <button className='bg-linear-to-r from-amber-400 to-orange-600 text-white px-6 py-3 rounded-md text-sm font-semibold opacity-0' style={{ animation: 'slideFromLeft 0.8s ease-out 0.7s forwards' }}>{button}</button>
      </div>
    );
  }

  // Slide 3 — drops in from the top (staggered)
  if (animation === 'topToBottom') {
    return (
      <div className='flex flex-col items-center gap-5'>
        <h1 className='text-4xl md:text-6xl font-bold text-white opacity-0' style={{ animation: 'slideFromTop 0.8s ease-out 0.1s forwards' }}>{heading}</h1>
        <p className='max-w-2xl text-sm md:text-base text-white leading-relaxed opacity-0' style={{ animation: 'slideFromTop 0.8s ease-out 0.4s forwards' }}>{text}</p>
        <button className='bg-linear-to-r from-amber-400 to-orange-600 text-white px-6 py-3 rounded-md text-sm font-semibold opacity-0' style={{ animation: 'slideFromTop 0.8s ease-out 0.7s forwards' }}>{button}</button>
      </div>
    );
  }

  return null;
}

export default function VideoSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative w-full h-[65vh] overflow-hidden'>
      {/* Video layers */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <video
            className='w-full h-full object-cover'
            src={slide.video}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className='absolute inset-0 bg-black/50' />
        </div>
      ))}

      {/* Text layer — keyed on `current` so the animation replays every slide change */}
      <div key={current} className='absolute inset-0 z-20 flex flex-col justify-center text-center px-6'>
        <SlideText slide={slides[current]} />
      </div>
    </div>
  );
}