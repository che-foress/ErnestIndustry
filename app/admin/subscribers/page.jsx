'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '../../lib/supabase/client';
import { Mail } from 'lucide-react';

export default function SubscribersAdmin() {
  const supabase = createClient();
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false });
      setSubscribers(data || []);
      setLoading(false);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className='text-orange-950 font-bold text-2xl mb-6'>Newsletter Subscribers</h1>

      <div className='bg-white rounded-xl shadow p-6'>
        <h2 className='text-orange-700 font-bold text-lg mb-4'>Total: {subscribers.length}</h2>

        {loading ? (
          <p className='text-gray-500 text-sm'>Loading...</p>
        ) : subscribers.length === 0 ? (
          <p className='text-gray-500 text-sm'>No subscribers yet.</p>
        ) : (
          <div className='flex flex-col divide-y divide-gray-100'>
            {subscribers.map((sub) => (
              <div key={sub.id} className='flex items-center gap-3 py-3'>
                <Mail size={16} className='text-orange-500 shrink-0' />
                <span className='text-gray-800 text-sm flex-1'>{sub.email}</span>
                <span className='text-gray-400 text-xs'>
                  {new Date(sub.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}