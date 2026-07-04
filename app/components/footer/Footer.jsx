'use client';

import { createClient } from '../../lib/supabase/client'
import Image from 'next/image'
import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { MapPin, Phone, AtSign, Globe, Share2, Send, Camera, Users } from 'lucide-react'

export default function Footer() {

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // '', 'loading', 'success', 'error'

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    const supabase = createClient();
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email });

    if (error) {
      setStatus(error.code === '23505' ? 'duplicate' : 'error');
    } else {
      setStatus('success');
      setEmail('');
    }
  };

  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Our Services', href: '/services' },
    { label: 'Products', href: '/#products' },
    { label: 'About Us', href: '/about-page' },
    { label: 'Where to Buy', href: '/where-to-buy' },
    { label: 'Contact Us', href: '/contact' },
  ];
  const ports = ['Douala', 'Kribi', 'Limbe'];
  const socials = [Share2, Send, Camera, Users];

  const fade = `transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  return (
    <footer ref={footerRef} className='relative bg-orange-50 pt-28'>

      {/* Mountain slope top edge */}
      <div className='absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-px'>
        <svg className='relative block w-full h-16 md:h-24' viewBox='0 0 1200 100' preserveAspectRatio='none'>
          <path d='M0,100 L1200,0 L1200,100 Z' fill='#fff7ed' />
          <path d='M0,100 L1200,0 L1200,0 L0,100 Z' fill='white' />
        </svg>
      </div>

      {/* Newsletter bar */}
      <div className={`max-w-3xl mx-auto px-6 mb-16 flex flex-col md:flex-row items-center gap-4 justify-center ${fade}`}>
        <div className='text-center md:text-right'>
          <p className='text-gray-700 font-bold text-sm tracking-wide'>SUBSCRIBE FOR</p>
          <p className='text-orange-600 font-bold text-sm tracking-wide'>NEWSLETTER</p>
        </div>
        <form onSubmit={handleSubscribe} className='flex flex-col gap-2 w-full max-w-md'>
          <div className='flex items-center bg-white rounded-full shadow-md overflow-hidden'>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Enter your email'
              className='flex-1 px-5 py-3 outline-none text-sm text-gray-700'
            />
            <button
              type='submit'
              disabled={status === 'loading'}
              className='bg-linear-to-r from-amber-400 to-orange-600 text-white px-6 py-3 text-xs font-bold whitespace-nowrap disabled:opacity-60'
            >
              {status === 'loading' ? 'JOINING...' : 'SUBSCRIBE NOW'}
            </button>
          </div>
          {status === 'success' && <p className='text-orange-700 text-xs'>Thanks for subscribing!</p>}
          {status === 'duplicate' && <p className='text-orange-700 text-xs'>You&apos;re already subscribed.</p>}
          {status === 'error' && <p className='text-red-600 text-xs'>Something went wrong. Try again.</p>}
        </form>
      </div>

      {/* Main columns */}
      <div className='max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 pb-16'>

        {/* Company info */}
        <div className={`flex flex-col gap-4 ${fade}`} style={{ transitionDelay: visible ? '100ms' : '0ms' }}>
          {/* Logo + brand */}
          <Link href='/' className='flex items-center gap-2'>
            <div className='relative w-12 h-12 shrink-0'>
              <Image
                src='/images/Llogo.png'  // your logo image
                alt='Ernest Industry Maritime Services'
                fill
                sizes='48px'
                className='object-contain'
              />
            </div>
            <div className='flex flex-col leading-tight'>
              <span className='font-bold text-lg bg-linear-to-r from-amber-500 to-orange-700 bg-clip-text text-transparent'>
                Ernest Industry
              </span>
              <span className='text-[10px] text-gray-500 font-semibold tracking-wide uppercase'>
                Maritime Services
              </span>
            </div>
          </Link>

          <p className='text-gray-600 text-sm leading-relaxed'>
            Ernest Industry is a marine lighting and ship supply provider, serving vessels
            of all kinds across the Limbe, Kribi and Douala ports of Cameroon.
          </p>
          <p className='text-gray-600 text-sm leading-relaxed'>
            We supply the full range of marine bulbs alongside complete onboard and
            offboard provisions, all in reference to ISSA and IMPA standards.
          </p>
        </div>

        {/* Quick navigation */}
        <div className={`flex flex-col gap-4 ${fade}`} style={{ transitionDelay: visible ? '220ms' : '0ms' }}>
          <h4 className='text-orange-950 font-bold text-lg'>Quick Navigation</h4>
          <ul className='flex flex-col gap-2'>
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className='text-gray-600 text-sm hover:text-orange-600 transition-colors flex items-center gap-2'>
                  <span className='text-orange-500'>›</span> {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Get in touch */}
        <div className={`flex flex-col gap-4 ${fade}`} style={{ transitionDelay: visible ? '340ms' : '0ms' }}>
          <h4 className='text-orange-950 font-bold text-lg'>Get In Touch</h4>
          <div className='flex items-start gap-3 text-gray-600 text-sm'>
            <MapPin size={18} className='text-orange-500 shrink-0 mt-0.5' />
            <span>Nouvelle Route Bessengue, behind Mboppi, Douala, Cameroon</span>
          </div>
          <div className='flex items-center gap-3 text-gray-600 text-sm'>
            <Phone size={18} className='text-orange-500 shrink-0' />
            <span>+237 676 000 067</span>
          </div>
          <div className='flex items-start gap-3 text-sm'>
            <AtSign size={18} className='text-orange-500 shrink-0 mt-0.5' />
            <div className='flex flex-col text-orange-600'>
              <a href='mailto:contact@ernestindustry.com' className='hover:underline'>contact@ernestindustry.com</a>
              <a href='mailto:ernestindustry@yahoo.com' className='hover:underline'>ernestindustry@yahoo.com</a>
            </div>
          </div>

          <h4 className='text-orange-950 font-bold text-lg mt-4'>Ports of Operation</h4>
          <div className='flex items-start gap-3'>
            <Globe size={18} className='text-orange-500 shrink-0 mt-0.5' />
            <div className='flex flex-col text-orange-600 text-sm gap-1'>
              {ports.map((port) => <span key={port}>{port}</span>)}
            </div>
          </div>
        </div>

        {/* Connect / social */}
        <div className={`flex flex-col gap-4 ${fade}`} style={{ transitionDelay: visible ? '460ms' : '0ms' }}>
          <h4 className='text-orange-950 font-bold text-lg'>Connect With Us</h4>
          <p className='text-gray-600 text-sm'>Follow us and stay updated on our latest products and services.</p>
          <div className='flex gap-3 mt-2'>
            {socials.map((Icon, i) => (
              <Link key={i} href='#' aria-label='Social link' className='flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-r from-amber-400 to-orange-600 text-white hover:scale-110 transition-transform'>
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className='bg-linear-to-r from-amber-500 to-orange-700 py-5'>
        <div className='max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-white text-xs'>
          <span>© {new Date().getFullYear()} Ernest Industry Maritime Services. All rights reserved.</span>
          <div className='flex gap-4'>
            <Link href='#' className='hover:underline'>Privacy Policy</Link>
            <span>|</span>
            <Link href='#' className='hover:underline'>Terms &amp; Conditions</Link>
            <span>|</span>
            <Link href='#' className='hover:underline'>Cookie Policy</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}