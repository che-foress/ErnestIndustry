'use client';

import React, { useRef, useEffect, useState } from 'react'
import { Check } from 'lucide-react'

export default function CoreServices() {
  const sectionRef = useRef(null);
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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const categories = [
    {
      title: 'Marine & Offshore Supply',
      items: [
        'Provisions supplies: fresh, dry and frozen stores of all kinds',
        "Bonded stores: liquors and tobacco products from the world's best brands",
        'Fuel and engine oils supply',
        'Medical supplies',
        'Paint & chemical supply',
        'Cabin, deck and engine stores',
        'Electrical & navigation equipment',
        'Fire, rescue and safety equipment',
        'Tools and workshop equipment',
        'Cleaning and upgrading of ventilation systems',
        'Marine charts, flags, admiralty publications & logbooks',
      ],
    },
    {
      title: 'Marine Services',
      items: [
        'Crew changing, hotel & flight reservations, boat & vehicle transportation',
        'Garbage skip and collection',
        'Sludge collection',
        'Tank, deck & engine room cleaning',
        
        'Electrical spare parts provision',
        'Carpentry, welding and refurbishment of accommodation areas',
        'Supply and installation of tire fenders for anchorage',
        'Refrigeration and HVAC: installations, repairs and service',
        'Standby jobs: general and specialized labor onboard and offshore',
      ],
    },
    {
      title: 'Transportation & Recreational Tourism',
      items: [
        'Flight scheduling & transportation services',
        'Urban waterfront taxi services',
        'Boat & water taxi services',
        'Coastal excursions',
      ],
    },
    {
      title: 'Knowledge of Spare Parts',
      items: [
        'Genuine or alternative parts according to ISSA or IMPA codes',
        'Professional sourcing and procurement',
        'Local knowledge of suppliers with specialized staff',
      ],
    },
  ];

  return (
    <section ref={sectionRef} className='px-6 md:px-16 py-12 md:py-20 bg-white'>
      {/* Eyebrow + heading */}
      <div className='text-center mb-12 md:mb-16'>
        <p className='text-orange-600 font-bold text-xs md:text-sm tracking-[0.2em] uppercase mb-2'>
          What We Offer
        </p>
        <h2 className='text-orange-950 font-bold text-3xl md:text-4xl'>
          Our Core Services
        </h2>
      </div>

      {/* Two-column category grid */}
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12'>
        {categories.map((cat, catIndex) => (
          <div
            key={cat.title}
            className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: visible ? `${catIndex * 150}ms` : '0ms' }}
          >
            <h3 className='text-orange-700 font-bold text-lg md:text-xl mb-5'>
              {cat.title}
            </h3>
            <ul className='flex flex-col gap-3'>
              {cat.items.map((item, itemIndex) => (
                <li
                  key={item}
                  className={`flex items-start gap-3 transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: visible ? `${catIndex * 150 + 200 + itemIndex * 100}ms` : '0ms' }}
                >
                  <span className='mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-linear-to-r from-amber-400 to-orange-600 shrink-0'>
                    <Check size={13} className='text-white' strokeWidth={3} />
                  </span>
                  <span className='text-gray-600 text-sm md:text-base leading-relaxed'>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}