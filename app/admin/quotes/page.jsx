'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '../../lib/supabase/client';

export default function QuotesAdmin() {
  const supabase = createClient();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('quote_requests')
        .select('*, products(name)')
        .order('created_at', { ascending: false });
      setQuotes(data || []);
      setLoading(false);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className='text-orange-950 font-bold text-2xl mb-6'>Quote Requests</h1>

      <div className='bg-white rounded-xl shadow p-6'>
        <h2 className='text-orange-700 font-bold text-lg mb-4'>Total: {quotes.length}</h2>

        {loading ? (
          <p className='text-gray-500 text-sm'>Loading...</p>
        ) : quotes.length === 0 ? (
          <p className='text-gray-500 text-sm'>No quote requests yet.</p>
        ) : (
          <div className='flex flex-col gap-4'>
            {quotes.map((q) => (
              <div key={q.id} className='border border-gray-200 rounded-lg p-4'>
                <div className='flex items-start justify-between gap-4'>
                  <div className='flex flex-col gap-1'>
                    <h3 className='font-bold text-gray-800'>{q.name}</h3>
                    <a href={`mailto:${q.email}`} className='text-orange-600 text-sm hover:underline'>{q.email}</a>
                    {q.phone && <span className='text-gray-500 text-sm'>{q.phone}</span>}
                  </div>
                  <span className='text-gray-400 text-xs shrink-0'>
                    {new Date(q.created_at).toLocaleDateString()}
                  </span>
                </div>
                {q.products?.name && (
                  <p className='text-sm mt-2'>
                    <span className='text-gray-500'>Product: </span>
                    <span className='text-orange-700 font-semibold'>{q.products.name}</span>
                  </p>
                )}
                {q.message && (
                  <p className='text-gray-600 text-sm mt-2 bg-gray-50 rounded p-3'>{q.message}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}