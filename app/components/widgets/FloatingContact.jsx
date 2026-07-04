'use client';

import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, X, Send } from 'lucide-react';
import Link from 'next/link';

export default function FloatingContact() {
  const [open, setOpen] = useState(false);        // options fan open
  const [chatOpen, setChatOpen] = useState(false); // whatsapp chat popup
  const [message, setMessage] = useState('');

  // ---- EDIT THESE ----
  const whatsappNumber = '237676000067';           // no +, no spaces
  const phoneNumber = '+237676000067';
  const email = 'contact@ernestindustry.com';
  // --------------------

  const sendWhatsApp = () => {
    const text = encodeURIComponent(message || 'Hello, I have an inquiry about your marine products.');
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className='fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3'>

      {/* WhatsApp chat popup */}
      {chatOpen && (
        <div className='w-72 rounded-2xl overflow-hidden shadow-2xl bg-white'>
          {/* Header */}
          <div className='bg-linear-to-r from-amber-400 to-orange-600 text-white px-4 py-3 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center'>
                <MessageCircle size={18} />
              </div>
              <span className='font-semibold text-sm'>Let&apos;s chat with us</span>
            </div>
            <button onClick={() => setChatOpen(false)} aria-label='Close chat'>
              <X size={18} />
            </button>
          </div>
          {/* Body */}
          <div className='bg-gray-50 p-4 h-40 flex flex-col justify-start'>
            <div className='bg-white rounded-lg rounded-tl-none px-3 py-2 shadow-sm w-fit max-w-[85%]'>
              <p className='text-gray-700 text-sm'>How can we help you? :)</p>
              <span className='text-gray-400 text-[10px]'>Online now</span>
            </div>
          </div>
          {/* Input */}
          <div className='flex items-center gap-2 p-3 bg-white border-t border-gray-100'>
            <input
              type='text'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendWhatsApp()}
              placeholder='Write your message...'
              className='flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none text-sm text-gray-700'
            />
            <button
              onClick={sendWhatsApp}
              className='w-9 h-9 rounded-full bg-linear-to-r from-amber-400 to-orange-600 text-white flex items-center justify-center shrink-0'
              aria-label='Send on WhatsApp'
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Expanded option buttons */}
      {open && !chatOpen && (
        <div className='flex flex-col items-end gap-3 mb-1'>
          <button
            onClick={() => { setChatOpen(true); }}
            className='w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform'
            aria-label='Chat on WhatsApp'
          >
            <MessageCircle size={22} />
          </button>
          
           <Link href={`tel:${phoneNumber}`}
            className='w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform'
            aria-label='Call us'
          >
            <Phone size={22} />
          </Link>
          
           <Link href={`mailto:${email}`}
            className='w-12 h-12 rounded-full bg-linear-to-r from-amber-400 to-orange-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform'
            aria-label='Email us'
          >
            <Mail size={22} />
          </Link>
        </div>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => {
          if (chatOpen) { setChatOpen(false); return; }
          setOpen(!open);
        }}
        className='w-14 h-14 rounded-full bg-linear-to-r from-amber-400 to-orange-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform'
        aria-label='Contact options'
      >
        {(open || chatOpen) ? <X size={26} /> : <MessageCircle size={26} />}
      </button>

    </div>
  );
}