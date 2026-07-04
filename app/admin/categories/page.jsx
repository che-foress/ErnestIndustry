'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClient } from '../../lib/supabase/client';
import { Trash2, Plus } from 'lucide-react';

export default function CategoriesAdmin() {
  const supabase = createClient();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [file, setFile] = useState(null);

  const loadCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setCategories(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
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
        const fileName = `category-${slugify(name)}-${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, file);
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }

      const { error: insertError } = await supabase.from('categories').insert({
        name,
        slug: slugify(name),
        image_url: imageUrl,
      });
      if (insertError) throw insertError;

      setName('');
      setFile(null);
      e.target.reset();
      await loadCategories();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) return;
    await supabase.from('categories').delete().eq('id', id);
    await loadCategories();
  };

  return (
    <div>
      <h1 className='text-orange-950 font-bold text-2xl mb-6'>Categories</h1>

      {/* Add category form */}
      <div className='bg-white rounded-xl shadow p-6 mb-8'>
        <h2 className='text-orange-700 font-bold text-lg mb-4 flex items-center gap-2'>
          <Plus size={18} /> Add New Category
        </h2>
        <form onSubmit={handleAdd} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-semibold text-gray-700'>Category Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder='e.g. Navigation Lights'
              className='border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-orange-500 text-sm text-gray-900'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className='text-sm font-semibold text-gray-700'>Category Image</label>
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
            {saving ? 'Saving...' : 'Add Category'}
          </button>
        </form>
      </div>

      {/* Categories list */}
      <div className='bg-white rounded-xl shadow p-6'>
        <h2 className='text-orange-700 font-bold text-lg mb-4'>All Categories ({categories.length})</h2>

        {loading ? (
          <p className='text-gray-500 text-sm'>Loading...</p>
        ) : categories.length === 0 ? (
          <p className='text-gray-500 text-sm'>No categories yet. Add your first one above.</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {categories.map((cat) => (
              <div key={cat.id} className='border border-gray-200 rounded-lg overflow-hidden'>
                <div className='relative h-32 bg-gray-100'>
                  {cat.image_url ? (
                    <Image src={cat.image_url} alt={cat.name} fill sizes='300px' className='object-cover' />
                  ) : (
                    <div className='flex items-center justify-center h-full text-gray-400 text-sm'>No image</div>
                  )}
                </div>
                <div className='p-4 flex flex-col gap-2'>
                  <h3 className='font-bold text-gray-800'>{cat.name}</h3>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className='flex items-center gap-1 text-red-500 text-sm hover:text-red-700 w-fit'
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