'use client';

import React from 'react';
import Link from 'next/link';
import { Package, FileText, Users } from 'lucide-react';

export default function AdminDashboard() {
  const cards = [
    { label: 'Products', href: '/admin/products', icon: Package, desc: 'Add, edit and remove products' },
    { label: 'Quote Requests', href: '/admin/quotes', icon: FileText, desc: 'View incoming quote requests' },
    { label: 'Subscribers', href: '/admin/subscribers', icon: Users, desc: 'View newsletter subscribers' },
  ];

  return (
    <div>
      <h1 className='text-orange-950 font-bold text-2xl mb-1'>Welcome back</h1>
      <p className='text-gray-500 text-sm mb-8'>Manage your marine catalogue from here.</p>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href} className='bg-white rounded-xl shadow p-6 hover:shadow-md transition-shadow flex flex-col gap-3'>
              <div className='w-12 h-12 rounded-lg bg-linear-to-r from-amber-400 to-orange-600 flex items-center justify-center text-white'>
                <Icon size={22} />
              </div>
              <h2 className='text-orange-700 font-bold text-lg'>{card.label}</h2>
              <p className='text-gray-500 text-sm'>{card.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}