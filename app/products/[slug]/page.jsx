import { createClient } from '../../lib/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import QuoteForm from '../../components/quote/QuoteForm';
import Footer from '../../components/footer/Footer';

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!category) {
    notFound();
  }

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', category.id)
    .order('created_at', { ascending: false });

  return (
    <div>
      {/* Hero banner with background image + dark overlay */}
      <section className='relative h-[380px] md:h-[440px] flex items-center overflow-hidden'>
        {category.image_url ? (
          <Image
            src={category.image_url}
            alt={category.name}
            fill
            sizes='100vw'
            className='object-cover'
            priority
          />
        ) : (
          <div className='absolute inset-0 bg-orange-950' />
        )}
        {/* Dark overlay */}
        <div className='absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/30' />

        {/* Hero content */}
        <div className='relative max-w-6xl mx-auto px-6 md:px-16 w-full'>
          <Link href='/' className='text-white/70 text-sm font-semibold hover:text-white transition-colors'>
            ← Back to home
          </Link>
          <h1 className='text-white font-bold text-4xl md:text-6xl mt-4 leading-tight max-w-2xl'>
            {category.name}
          </h1>
          <p className='text-white/80 text-base md:text-lg mt-4 max-w-xl'>
            Explore our full range of {category.name.toLowerCase()} — built for performance and durability at sea.
          </p>
          <div className='mt-6'>
            <span className='inline-block bg-linear-to-r from-amber-400 to-orange-600 text-white px-6 py-3 rounded-md text-sm font-semibold'>
              {products?.length || 0} Product{products?.length === 1 ? '' : 's'} Available
            </span>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className='bg-orange-950 text-white'>
        <div className='max-w-6xl mx-auto px-6 md:px-16 py-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-xs md:text-sm text-center'>
          <span>✓ Marine-grade quality</span>
          <span>✓ Trusted at Douala, Kribi &amp; Limbe</span>
          <span>✓ Quotes within 24 hours</span>
        </div>
      </div>

      {/* Products section */}
      <section className='px-6 md:px-16 py-12 md:py-16 bg-gray-50'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-center text-orange-950 font-bold text-2xl md:text-3xl mb-10'>
            Featured Products
          </h2>

          {!products || products.length === 0 ? (
            <p className='text-center text-gray-500'>No products in this category yet. Check back soon.</p>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {products.map((product) => (
                <div key={product.id} className='bg-white border border-gray-100 rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-shadow'>
                  <div className='relative h-48 bg-gray-100'>
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        sizes='(max-width: 768px) 50vw, 25vw'
                        className='object-cover'
                      />
                    ) : (
                      <div className='flex items-center justify-center h-full text-gray-400 text-sm'>No image</div>
                    )}
                  </div>
                  <div className='p-4 flex flex-col gap-2 flex-1'>
                    <span className='text-xs text-orange-600 font-semibold uppercase tracking-wide'>{category.name}</span>
                    <h3 className='text-orange-950 font-bold text-base leading-snug'>{product.name}</h3>
                    <p className='text-gray-500 text-xs flex-1 line-clamp-4'>{product.description}</p>
                    <div className='mt-2'>
                      <QuoteForm product={product} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to action section */}{/* Promo banner */}
<div className='max-w-7xl mx-auto mt-12'>
  <div className='relative rounded-xl overflow-hidden h-48 md:h-76'>
    {/* Background image */}
    <Image
      src='/images/clients.jpg'  // your banner background image
      alt='Marine equipment promotion'
      fill
      sizes='100vw'
      className='object-cover'
    />
    {/* Dark overlay */}
    <div className='absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-black/20' />

    {/* Content */}
    <div className='absolute inset-0 flex flex-col justify-center px-8 md:px-12 gap-3'>
      <h3 className='text-white font-bold text-2xl md:text-3xl max-w-md leading-tight'>
        Equip Your Vessel for the Voyage
      </h3>
      <p className='text-white/80 text-sm md:text-base max-w-sm'>
        Full range of marine lighting and provisions, onboard and offboard.
      </p>
      <Link
        href='/'
        className='w-fit bg-linear-to-r from-amber-400 to-orange-600 text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:scale-105 transition-transform mt-1'
      >
        Browse Now
      </Link>
    </div>
  </div>
</div>

<div>
          <Footer />
</div>
    </div>
  );
}