const fs = require('fs');
const path = require('path');

const pages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/allflags', priority: '0.9', changefreq: 'weekly' },
  { url: '/allnames', priority: '0.9', changefreq: 'weekly' },
  { url: '/wishlist', priority: '0.8', changefreq: 'weekly' },
  { url: '/visited', priority: '0.8', changefreq: 'weekly' },
  { url: '/sign-in', priority: '0.3', changefreq: 'monthly' },
  { url: '/profile', priority: '0.3', changefreq: 'monthly' },
];

const today = new Date().toISOString().split('T')[0];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages.map(page => `
  <url>
    <loc>https://countrycounter.online${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`;


const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}


fs.writeFileSync(
  path.join(publicDir, 'sitemap.xml'),
  sitemapContent
);


const robotsContent = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /api/

User-agent: Googlebot
Allow: /
Disallow: /signin/
Disallow: /profile/

User-agent: Bingbot
Allow: /
Disallow: /signin/
Disallow: /profile/

Sitemap: https://countrycounter.online/sitemap.xml`;

fs.writeFileSync(
  path.join(publicDir, 'robots.txt'),
  robotsContent
);

console.log('✅ Sitemap.xml and robots.txt generated successfully!');