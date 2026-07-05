export default function robots() {
  const baseUrl = 'https://ernestindustry.vercel.app'; // same as your sitemap

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}