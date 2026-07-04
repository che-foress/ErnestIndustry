'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { MapPinned } from 'lucide-react';
import { Phone } from 'lucide-react';
import { Mails } from 'lucide-react';
import { Globe } from 'lucide-react';
import { Search } from 'lucide-react';
import { Menu } from 'lucide-react';
import { X } from 'lucide-react';
import { CircleArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function NavbarComponent() {
    const linkClass ="relative cursor-pointer pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-orange-600 after:transition-all after:duration-300 hover:after:w-full";
    const [searchOpen, setSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { label: 'HOME', href: '/' },
        { label: 'PRODUCTS', href: '/#products' },
        { label: 'WHERE TO BUY', href: '/where-to-buy' },
        { label: 'ABOUT US', href: '/about-page' },
        { label: 'OUR SERVICES', href: '/services' },
        { label: 'CONTACT US', href: '/contact' },
    ];

  return (
    <div>
        {/* Top bar */}
        <div className='flex flex-col gap-2 lg:flex-row lg:justify-around items-center p-4 bg-linear-to-r from-amber-400 to-orange-600 text-white text-sm'>
            <div className='flex items-center justify-center gap-2'>
                <span><MapPinned size={15} /></span>
                <span>New Road Bessengue - Douala CM</span>
            </div>
            <div className='flex flex-wrap justify-center gap-3'>
                <div className='flex items-center justify-center gap-2'>
                    <span><Phone size={15} /></span>
                    <span>+237 676000067</span>
                </div>
                <div className='hidden sm:flex items-center justify-center gap-1'>
                    <span><Mails size={15} /></span>
                    <span>contact@chelogistique.com</span>
                </div>
                <div className='hidden md:flex items-center justify-center gap-1'>
                    <span><Mails size={15} /></span>
                    <span>chelogistics@yahoo.com</span>
                </div>
                <div className='flex items-center justify-center gap-1'>
                    <span><Globe size={15} /></span>
                    <span>English</span>
                </div>
            </div>
        </div>

        {/* Main navbar */}
        <div className='flex justify-between lg:justify-around items-center p-6 text-[#9CA3AF] text-[14px]'>
                <Link href='/' className='flex items-center gap-2'>
    {/* Logo image — paste your logo file here */}
    <div className='relative w-12 h-12 shrink-0'>
        <Image
            src='/images/Llogo.png'  // your logo image
            alt='Ernest Industry Maritime Services'
            fill
            sizes='48px'
            className='object-contain'
        />
    </div>
    {/* Brand text */}
    <div className='flex flex-col leading-tight'>
        <span className='font-bold text-base md:text-lg bg-linear-to-r from-amber-500 to-orange-700 bg-clip-text text-transparent'>
            Ernest Industry
        </span>
        <span className='text-[10px] md:text-xs text-gray-500 font-semibold tracking-wide uppercase'>
            Maritime Services
        </span>
    </div>
</Link>

                {/* Desktop links */}
                <div className='hidden lg:block'>
                    <ul className='flex gap-4 font-semibold'>
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href} className={linkClass}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='flex items-center justify-center gap-4'>
                        <Link href='/contact' className='hidden sm:block bg-linear-to-r from-amber-400 to-orange-600 text-white px-4 py-2 rounded-md text-xs font-semibold'>GET A QUOTE</Link>
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className='cursor-pointer text-[#9CA3AF] hover:text-orange-600 transition-colors'
                            aria-label='Toggle search'
                        >
                            <Search />
                        </button>
                        {/* Hamburger - only below lg */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className='lg:hidden cursor-pointer text-[#9CA3AF] hover:text-orange-600 transition-colors'
                            aria-label='Toggle menu'
                        >
                            {menuOpen ? <X /> : <Menu />}
                        </button>
                </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden overflow-hidden transition-all ease-in-out duration-700 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <ul className='flex flex-col justify-center gap-1 px-6 pb-4 font-semibold text-[#9CA3AF]'>
                {navLinks.map((link) => (
                    <li key={link.label}>
                        <Link
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className='flex items-center justify-between hover:bg-orange-200 hover:text-orange-600 p-2 rounded-md transition-colors'
                        >
                            <span className='cursor-pointer'>{link.label}</span>
                            <span className='text-orange-600'><CircleArrowRight size={22} /></span>
                        </Link>
                    </li>
                ))}
                <li className='sm:hidden'>
                    <Link href='/contact' className='inline-block bg-linear-to-r from-amber-400 to-orange-600 text-white px-4 py-2 rounded-md text-xs font-semibold'>GET A QUOTE</Link>
                </li>
            </ul>
        </div>

        {/* Search bar */}
        <div className={`overflow-hidden transition-all ease-in-out duration-700 ${searchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className='flex justify-center p-2 border-gray-200'>
                        <div className='flex items-center border border-gray-300 w-full max-w-2xl rounded-full overflow-hidden mx-4'>
                                <input
                                    type='text'
                                    placeholder='Search for marine bulbs...'
                                    className='flex-1 px-4 py-3 outline-none text-sm bg-gray-50 text-gray-700'
                                />
                                <button className='bg-linear-to-r from-amber-400 to-orange-600 px-4 py-3 flex items-center justify-center'>
                                     <Search size={18} />
                                </button>
                        </div>
                </div>
        </div>
    </div>
  )
}