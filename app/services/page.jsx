import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import WhyChooseServices from '../components/services/WhyChooseServices';
import PartnersMarquee from '../components/services/PartnersMarquee';
import ServicesShowcase from '../components/services/ServicesShowcase';
import WhatWeDo from '../components/services/WhatWeDo';
import HowItWorks from '../components/services/HowItWorks';
import ExpertTeam from '../components/services/ExpertTeam';
import ClientTestimonials from '../components/services/ClientTestimonials';
import Footer from '../components/footer/Footer';
import NavbarComponent from '../components/navbar/NavbarComponent';


export default function ServicesPage() {
  return (
    <div>
        <NavbarComponent />
      {/* Hero */}
      <section className='relative h-[70vh] min-h-120 flex items-center overflow-hidden'>
        {/* Background image */}
        <Image
          src='/images/servicehero1.png'  // your hero background image
          alt='Ernest Industry marine services'
          fill
          sizes='100vw'
          className='object-cover'
          priority
        />
        {/* Dark overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/40' />

        {/* Content */}
        <div className='relative max-w-6xl mx-auto px-6 md:px-16 w-full'>
          <h1 className='font-bold text-4xl md:text-6xl leading-tight max-w-3xl'>
            <span className='text-white'>Professional Marine</span>
            <br />
            <span className='bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent'>
              Lighting & Ship Supply
            </span>
          </h1>

          <p className='text-white/80 text-base md:text-lg mt-6 max-w-xl'>
            Full-range marine bulbs and complete onboard and offboard provisions —
            trusted by vessels across Cameroon&apos;s leading ports.
          </p>

          <Link
            href='#services'
            className='inline-flex items-center gap-2 mt-8 bg-linear-to-r from-amber-400 to-orange-600 text-white px-6 py-3 rounded-md text-sm font-semibold hover:scale-105 transition-transform'
          >
            Our Services <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Next sections will go here */}
      {/* Next sections will go here */}
      <WhyChooseServices />
      <PartnersMarquee />
      <ServicesShowcase />
      <WhatWeDo />
      <HowItWorks />
      <ExpertTeam />
      <ClientTestimonials />
      <Footer />
    </div>
  );
}