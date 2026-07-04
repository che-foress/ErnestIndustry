// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';
// import QuoteForm from '../quote/QuoteForm';

// export default function ProductCard({ product, categoryName }) {
//   const [expanded, setExpanded] = useState(false);

//   const hasLongText = product.description && product.description.length > 90;

//   return (
//     <div className='bg-white border border-gray-100 rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-shadow'>
//       <div className='relative h-48 bg-gray-100'>
//         {product.image_url ? (
//           <Image
//             src={product.image_url}
//             alt={product.name}
//             fill
//             sizes='(max-width: 768px) 50vw, 25vw'
//             className='object-cover'
//           />
//         ) : (
//           <div className='flex items-center justify-center h-full text-gray-400 text-sm'>No image</div>
//         )}
//       </div>

//       <div className='p-4 flex flex-col gap-2 flex-1'>
//         <span className='text-xs text-orange-600 font-semibold uppercase tracking-wide'>{categoryName}</span>
//         <h3 className='text-orange-950 font-bold text-base leading-snug'>{product.name}</h3>

//         <p className={`text-gray-500 text-xs flex-1 ${expanded ? '' : 'line-clamp-2'}`}>
//           {product.description}
//         </p>

//         {hasLongText && (
//           <button
//             onClick={() => setExpanded(!expanded)}
//             className='text-orange-600 text-xs font-semibold hover:underline w-fit'
//           >
//             {expanded ? 'Read less' : 'Read more'}
//           </button>
//         )}

//         <div className='mt-2'>
//           <QuoteForm product={product} />
//         </div>
//       </div>
//     </div>
//   );
// }