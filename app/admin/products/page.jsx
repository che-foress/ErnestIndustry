'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClient } from '../../lib/supabase/client';
import { Trash2, Plus } from 'lucide-react';

export default function ProductsAdmin() {
  const supabase = createClient();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const loadData = async () => {
    const { data: prods } = await supabase
      .from('products')
      .select('*, categories(name)')
      .order('created_at', { ascending: false });
    const { data: cats } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });
    setProducts(prods || []);
    setCategories(cats || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slugify = (text) =>
    text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  const handleAdd = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      let imageUrl = '';

      if (file) {
        const ext = file.name.split('.').pop();
        const fileName = `${slugify(name)}-${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, file);
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }

      const { error: insertError } = await supabase.from('products').insert({
        name,
        slug: slugify(name),
        category_id: categoryId || null,
        description,
        image_url: imageUrl,
      });
      if (insertError) throw insertError;

      setName('');
      setCategoryId('');
      setDescription('');
      setFile(null);
      e.target.reset();
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    await supabase.from('products').delete().eq('id', id);
    await loadData();
  };

  return (
    <div>
      <h1 className='text-orange-950 font-bold text-2xl mb-6'>Products</h1>

      {/* Add product form */}
      <div className='bg-white rounded-xl shadow p-6 mb-8'>
        <h2 className='text-orange-700 font-bold text-lg mb-4 flex items-center gap-2'>
          <Plus size={18} /> Add New Product
        </h2>

        {categories.length === 0 ? (
          <p className='text-gray-500 text-sm'>
            You need to create a category first before adding products. Go to the Categories page.
          </p>
        ) : (
          <form onSubmit={handleAdd} className='flex flex-col gap-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-1'>
                <label className='text-sm font-semibold text-gray-700'>Product Name</label>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className='border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-orange-500 text-sm text-gray-900'
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-sm font-semibold text-gray-700'>Category</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                  className='border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-orange-500 text-sm text-gray-900 bg-white'
                >
                  <option value=''>Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className='flex flex-col gap-1'>
              <label className='text-sm font-semibold text-gray-700'>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className='border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-orange-500 text-sm text-gray-900 resize-none'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='text-sm font-semibold text-gray-700'>Product Image</label>
              <input
                type='file'
                accept='image/*'
                onChange={(e) => setFile(e.target.files[0])}
                className='text-sm text-gray-600'
              />
            </div>

            {error && <p className='text-red-500 text-sm'>{error}</p>}

            <button
              type='submit'
              disabled={saving}
              className='w-fit bg-linear-to-r from-amber-400 to-orange-600 text-white px-6 py-2 rounded-md font-semibold text-sm disabled:opacity-60'
            >
              {saving ? 'Saving...' : 'Add Product'}
            </button>
          </form>
        )}
      </div>

      {/* Products list */}
      <div className='bg-white rounded-xl shadow p-6'>
        <h2 className='text-orange-700 font-bold text-lg mb-4'>All Products ({products.length})</h2>

        {loading ? (
          <p className='text-gray-500 text-sm'>Loading...</p>
        ) : products.length === 0 ? (
          <p className='text-gray-500 text-sm'>No products yet. Add your first one above.</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {products.map((product) => (
              <div key={product.id} className='border border-gray-200 rounded-lg overflow-hidden'>
                <div className='relative h-40 bg-gray-100'>
                  {product.image_url ? (
                    <Image src={product.image_url} alt={product.name} fill sizes='300px' className='object-cover' />
                  ) : (
                    <div className='flex items-center justify-center h-full text-gray-400 text-sm'>No image</div>
                  )}
                </div>
                <div className='p-4 flex flex-col gap-1'>
                  <span className='text-xs text-orange-600 font-semibold uppercase'>
                    {product.categories?.name || 'Uncategorized'}
                  </span>
                  <h3 className='font-bold text-gray-800'>{product.name}</h3>
                  <p className='text-gray-500 text-xs line-clamp-2'>{product.description}</p>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className='mt-2 flex items-center gap-1 text-red-500 text-sm hover:text-red-700 w-fit'
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}