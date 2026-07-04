'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../lib/supabase/client';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-orange-50 px-6'>
      <div className='w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6'>
        <h1 className='text-orange-950 font-bold text-2xl text-center'>Admin Login</h1>
        <p className='text-gray-500 text-sm text-center'>Ernest Industry — Sign in to manage your products</p>

        <form onSubmit={handleLogin} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-semibold text-gray-700'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-orange-500 text-sm'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className='text-sm font-semibold text-gray-700'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-orange-500 text-sm'
            />
          </div>

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <button
            type='submit'
            disabled={loading}
            className='bg-linear-to-r from-amber-400 to-orange-600 text-white py-2 rounded-md font-semibold text-sm disabled:opacity-60'
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}