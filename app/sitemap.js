import { createClient } from './lib/supabase/server';

export default async function sitemap() {
  const baseUrl = 'https://ernestindustry.vercel.app'; // ← change to your actual Vercel URL

  // Static pages
  const staticPages = [
    '',
    '/services',
    '/about-page',
    '/contact',
    '/where-to-buy',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));

  // Dynamic category pages from the database
  let categoryPages = [];
  try {
    const supabase = await createClient();
    const { data: categories } = await supabase
      .from('categories')
      .select('slug, created_at');

    categoryPages = (categories || []).map((cat) => ({
      url: `${baseUrl}/products/${cat.slug}`,
      lastModified: new Date(cat.created_at || Date.now()),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch (e) {
    // if the DB call fails, still return the static pages
    categoryPages = [];
  }

  return [...staticPages, ...categoryPages];
}