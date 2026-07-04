'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '../lib/supabase/client';
import { LayoutDashboard, Package, FileText, Users, LogOut, Menu, Tag } from 'lucide-react';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }
    const checkUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/admin/login');
      } else {
        setEmail(user.email);
        setLoading(false);
      }
    };
    checkUser();
  }, [router, isLoginPage]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center text-gray-500'>
        Loading...
      </div>
    );
  }

 const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Categories', href: '/admin/categories', icon: Tag },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Quote Requests', href: '/admin/quotes', icon: FileText },
  { label: 'Subscribers', href: '/admin/subscribers', icon: Users },
];

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-64 bg-orange-950 text-white flex flex-col z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className='p-6 border-b border-white/10'>
          <h1 className='font-bold text-lg'>Ernest Industry</h1>
          <p className='text-white/50 text-xs mt-1'>Admin Panel</p>
        </div>

        <nav className='flex-1 p-4 flex flex-col gap-1'>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  active ? 'bg-linear-to-r from-amber-400 to-orange-600 text-white' : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className='p-4 border-t border-white/10'>
          <p className='text-white/50 text-xs mb-2 px-2 truncate'>{email}</p>
          <button
            onClick={handleLogout}
            className='flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm text-white/70 hover:bg-white/10 transition-colors'
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className='fixed inset-0 bg-black/50 z-30 lg:hidden'
        />
      )}

      {/* Main area */}
      <div className='lg:ml-64'>
        {/* Top bar */}
        <header className='bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-20'>
          <button
            onClick={() => setSidebarOpen(true)}
            className='lg:hidden text-gray-600'
            aria-label='Open menu'
          >
            <Menu size={24} />
          </button>
          <h2 className='text-orange-950 font-bold'>Dashboard</h2>
          <div className='w-6 lg:w-0' />
        </header>

        {/* Page content */}
        <main className='p-6 md:p-8'>
          {children}
        </main>
      </div>
    </div>
  );
}