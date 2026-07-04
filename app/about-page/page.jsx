import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import WhyErnest from '../components/about/WhyErnest';
import TrustedName from '../components/about/TrustedName';
import Footer from '../components/footer/Footer';
import OurStory from '../components/about/OurStory';

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className='relative h-[45vh] min-h-[320px] flex items-center justify-center overflow-hidden'>
        {/* Background image */}
        <Image
          src='/images/about-hero.jpg'  // your hero background image
          alt='About Ernest Industry'
          fill
          sizes='100vw'
          className='object-cover'
          priority
        />
        {/* Dark overlay */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70' />

        {/* Back to home — top left */}
        <Link
          href='/'
          className='absolute top-6 left-6 flex items-center gap-2 text-white/80 text-sm font-semibold hover:text-white transition-colors z-10'
        >
          <ArrowLeft size={18} /> Back to home
        </Link>

        {/* Content */}
        <div className='relative text-center px-6'>
          <h1 className='text-white font-bold text-4xl md:text-6xl'>About Us</h1>
          <p className='text-white/80 text-sm md:text-base max-w-2xl mx-auto mt-4'>
            Ernest Industry supplies the full range of marine lighting and ship provisions,
            trusted by vessels across Cameroon&apos;s leading ports.
          </p>
          {/* Breadcrumb */}
          <div className='flex items-center justify-center gap-2 mt-6 text-sm font-semibold'>
            <Link href='/' className='text-white/70 hover:text-white transition-colors'>Home</Link>
            <span className='text-orange-500'>&raquo;&raquo;</span>
            <span className='bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent'>About Us</span>
          </div>
        </div>
      </section>

      {/* Next sections will go here */}
      <WhyErnest />
       <OurStory />
      <TrustedName />
      <Footer />
    </div>
  );
}