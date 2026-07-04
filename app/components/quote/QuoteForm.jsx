'use client';

import React, { useState } from 'react';
import { createClient } from '../../lib/supabase/client';
import { X } from 'lucide-react';

export default function QuoteForm({ product }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // '', 'loading', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const supabase = createClient();
    const { error } = await supabase.from('quote_requests').insert({
      name,
      email,
      phone,
      message,
      product_id: product.id,
    });

    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setName(''); setEmail(''); setPhone(''); setMessage('');
    }
  };

  return (
    <>
      {/* Button that opens the form */}
      <button
        onClick={() => { setOpen(true); setStatus(''); }}
        className='w-fit bg-linear-to-r from-amber-400 to-orange-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform'
      >
        Request a Quote
      </button>

      {/* Modal */}
      {open && (
        <div className='fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4' onClick={() => setOpen(false)}>
          <div className='bg-white rounded-xl w-full max-w-md p-6 relative' onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpen(false)}
              className='absolute top-4 right-4 text-gray-400 hover:text-gray-600'
              aria-label='Close'
            >
              <X size={20} />
            </button>

            <h2 className='text-orange-950 font-bold text-xl mb-1'>Request a Quote</h2>
            <p className='text-gray-500 text-sm mb-5'>For: <span className='text-orange-700 font-semibold'>{product.name}</span></p>

            {status === 'success' ? (
              <div className='text-center py-6'>
                <p className='text-green-600 font-semibold mb-2'>Request sent!</p>
                <p className='text-gray-500 text-sm'>We&apos;ll get back to you with a quotation soon.</p>
                <button
                  onClick={() => setOpen(false)}
                  className='mt-4 text-orange-600 text-sm font-semibold hover:underline'
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                <input
                  type='text' placeholder='Your name' value={name}
                  onChange={(e) => setName(e.target.value)} required
                  className='border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-orange-500 text-sm text-gray-900'
                />
                <input
                  type='email' placeholder='Your email' value={email}
                  onChange={(e) => setEmail(e.target.value)} required
                  className='border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-orange-500 text-sm text-gray-900'
                />
                <input
                  type='tel' placeholder='Your phone (optional)' value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className='border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-orange-500 text-sm text-gray-900'
                />
                <textarea
                  placeholder='Message (optional)' value={message} rows={3}
                  onChange={(e) => setMessage(e.target.value)}
                  className='border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-orange-500 text-sm text-gray-900 resize-none'
                />
                {status === 'error' && <p className='text-red-500 text-sm'>Something went wrong. Try again.</p>}
                <button
                  type='submit' disabled={status === 'loading'}
                  className='bg-linear-to-r from-amber-400 to-orange-600 text-white py-2 rounded-md font-semibold text-sm disabled:opacity-60'
                >
                  {status === 'loading' ? 'Sending...' : 'Send Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}