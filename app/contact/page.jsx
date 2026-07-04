'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Phone, Mail, Clock, Send, Sparkles } from 'lucide-react';
import Footer from '../components/footer/Footer';

export default function ContactPage() {
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

  // Placeholder submit — you'll wire this to your email service later
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form ready — connect it to your email service to start receiving messages.');
  };

  const info = [
    { icon: MapPin, title: 'Visit Us', lines: ['New Road Bessengue — Akwa', 'Douala, Cameroon'] },
    { icon: Phone, title: 'Call Us', lines: ['+237 676 000 067'] },
    { icon: Mail, title: 'Email Us', lines: ['contact@ernestindustry.com', 'ernestindustry@yahoo.com'] },
    { icon: Clock, title: 'Working Hours', lines: ['Mon – Sat: 8am – 6pm', '24/7 vessel support'] },
  ];

  const fade = `transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  return (
    <div>
      {/* Hero */}
      <section className='relative h-[45vh] min-h-[320px] flex items-center justify-center overflow-hidden'>
        <Image
          src='/images/contact-hero.jpg'  // your hero background image
          alt='Contact Ernest Industry'
          fill
          sizes='100vw'
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70' />

        {/* Back to home */}
        <Link
          href='/'
          className='absolute top-6 left-6 flex items-center gap-2 text-white/80 text-sm font-semibold hover:text-white transition-colors z-10'
        >
          <ArrowLeft size={18} /> Back to home
        </Link>

        <div className='relative text-center px-6'>
          <h1 className='text-white font-bold text-4xl md:text-6xl'>Contact Us</h1>
          <p className='text-white/80 text-sm md:text-base max-w-2xl mx-auto mt-4'>
            Get in touch for a quote or any inquiry — our team is ready to help keep your vessel running.
          </p>
          <div className='flex items-center justify-center gap-2 mt-6 text-sm font-semibold'>
            <Link href='/' className='text-white/70 hover:text-white transition-colors'>Home</Link>
            <span className='text-orange-500'>&raquo;&raquo;</span>
            <span className='bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent'>Contact Us</span>
          </div>
        </div>
      </section>

      {/* Contact info + form */}
      <section ref={ref} className='px-6 md:px-16 py-16 md:py-24 bg-white'>
        <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'>

          {/* Left — info */}
          <div className={`flex flex-col gap-6 ${fade}`}>
            <div className='flex items-center gap-2'>
              <Sparkles size={16} className='text-orange-500' />
              <span className='text-orange-600 font-bold text-xs tracking-[0.2em] uppercase'>Get In Touch</span>
            </div>
            <h2 className='text-orange-950 font-bold text-3xl md:text-4xl leading-tight'>
              Let&apos;s Talk About Your Vessel&apos;s Needs
            </h2>
            <p className='text-gray-600 text-sm md:text-base max-w-md'>
              Whether you need marine lighting, provisions, or a custom quote, reach out and our
              specialized team will get back to you quickly.
            </p>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4'>
              {info.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className='flex items-start gap-4'>
                    <div className='shrink-0 w-12 h-12 rounded-xl bg-linear-to-r from-amber-400 to-orange-600 flex items-center justify-center text-white'>
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className='text-orange-950 font-bold text-sm mb-1'>{item.title}</h3>
                      {item.lines.map((line) => (
                        <p key={line} className='text-gray-500 text-sm leading-relaxed'>{line}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — form */}
          <div className={`bg-gray-50 rounded-2xl p-6 md:p-8 shadow-sm ${fade}`} style={{ transitionDelay: visible ? '200ms' : '0ms' }}>
            <h3 className='text-orange-950 font-bold text-xl mb-6'>Send Us a Message</h3>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='flex flex-col gap-1'>
                  <label className='text-sm font-semibold text-gray-700'>Name</label>
                  <input
                    type='text' required
                    className='border border-gray-300 rounded-md px-4 py-2.5 outline-none focus:border-orange-500 text-sm text-gray-900 bg-white'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-sm font-semibold text-gray-700'>Email</label>
                  <input
                    type='email' required
                    className='border border-gray-300 rounded-md px-4 py-2.5 outline-none focus:border-orange-500 text-sm text-gray-900 bg-white'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='flex flex-col gap-1'>
                  <label className='text-sm font-semibold text-gray-700'>Phone</label>
                  <input
                    type='tel'
                    className='border border-gray-300 rounded-md px-4 py-2.5 outline-none focus:border-orange-500 text-sm text-gray-900 bg-white'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-sm font-semibold text-gray-700'>Subject</label>
                  <input
                    type='text'
                    className='border border-gray-300 rounded-md px-4 py-2.5 outline-none focus:border-orange-500 text-sm text-gray-900 bg-white'
                  />
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-semibold text-gray-700'>Message</label>
                <textarea
                  rows={5} required
                  className='border border-gray-300 rounded-md px-4 py-2.5 outline-none focus:border-orange-500 text-sm text-gray-900 bg-white resize-none'
                />
              </div>

              <button
                type='submit'
                className='inline-flex items-center justify-center gap-2 bg-linear-to-r from-amber-400 to-orange-600 text-white px-6 py-3 rounded-md text-sm font-semibold hover:scale-[1.02] transition-transform w-fit'
              >
                Send Message <Send size={16} />
              </button>
            </form>
          </div>

        </div>
      </section>
      <Footer />
    </div>
  );
}