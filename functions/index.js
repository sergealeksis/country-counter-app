/* eslint-disable */
const { onRequest } = require("firebase-functions/v2/https");
const fs = require("fs");
const path = require("path");

const BOT_PATTERNS = [
  "googlebot", "googlebot-news", "googlebot-image", "googlebot-video",
  "bingbot", "yandex", "baiduspider",
  "facebookexternalhit", "twitterbot", "linkedinbot",
  "whatsapp", "telegrambot", "discordbot", "slackbot",
  "applebot", "duckduckbot", "slurp", "msnbot",
  "ia_archiver", "seznambot", "mj12bot", "ahrefsbot",
  "semrushbot", "dotbot", "megaindex",
  "crawler", "spider", "robot", "crawling"
];

const isBot = (userAgent, url) => {
  if (!userAgent) return false;
  
  
  if (url && (url.includes('_escaped_fragment_') || url.includes('_prerender'))) {
    return true;
  }
  
  const agent = userAgent.toLowerCase();
  return BOT_PATTERNS.some((bot) => agent.includes(bot));
};

const generateMetaTags = (path) => {
  const pages = {
    "/": {
      title: "Country Counter - Complete Collection of National Flags, App to Create Your Travel and Wishlists",
      description: "Browse the collection of all country flags. View national flags of 200+ countries with high-quality images. Learn and create your travel list, share it with your friends, create wishlists and track them, keep track of where you have been and discover new destinations",
      keywords: "countries, travel, counter, flags, destinations, wishlist",
    },
    "/sign-in": {
      title: "Sign in or Sign up Country Counter",
      description: "Get started to browse country flags and making your travel lists",
      keywords: "start, authorization, sign in, sign up",
    },
    "/allflags": {
      title: "Country Flags - Complete Collection of National Flags | Country Counter",
      description: "Browse the collection of all country flags. View national flags of 200+ countries with high-quality images. Learn and create your travel list, share it with your friends, create wishlists and track them, keep track of where you have been and discover new destinations",
      keywords: "country flags, national flags, flags of countries, world flags, flag collection, all country flags, flags list, flag images, country flag pictures",
    },
    "/wishlist": {
      title: "Countries wishlist",
      description: "Discover new destinations. Make your own wishlist and share it with your friends",
      keywords: "wishlist, travel plan, choose country, vacation",
    },
    "/allnames": {
      title: "Names of countries",
      description: "Browse the collection of all country names with flags. Browse 200+ countries names. Learn and create your travel list, share it with your friends, create wishlists and track them, keep track of where you have been and discover new destinations",
      keywords: "countries, country name, country flag, flags",
    },
    "/visited": {
      title: "Visited countries",
      description: "Keep track of where you have been. Check your travel history",
      keywords: "visited countries list, check list, vacation, checker, travel story",
    },
    "/profile": {
      title: "My Country Counter profile",
      description: "User profile, change username, verify email, get random country, clear all lists",
      keywords: "profile, settings",
    },
  };

  if (path.startsWith("/shared/wishlist/")) {
    return {
      title: "Travel wishlist",
      description: "Share your travel list to discover new destinations together",
      keywords: "share, wishlist, planning",
    };
  }

  if (path.startsWith("/shared/visitedlist/")) {
    return {
      title: "Visited countries list",
      description: "Share with friends where you have already been",
      keywords: "share, achievements, visited list",
    };
  }

  return pages[path] || {
    title: "Country Counter - App for travellers",
    description: "Keep track of where you have been, create wishlists and track them, share it with friends.",
    keywords: "countries, counter, checker, wishlist",
  };
};

exports.prerender = onRequest(
  {
    region: "us-central1",
    memory: "1GiB",
    timeoutSeconds: 60,
    minInstances: 0,
    maxInstances: 10,
  },
  async (req, res) => {
    const userAgent = req.headers["user-agent"] || "";
    const requestPath = req.path || "/";
    const fullUrl = req.url || "/";
    
    console.log("📱 Request:", {
      path: requestPath,
      userAgent: userAgent.substring(0, 120),
    });

    // Handle static files
    const staticFileExtensions = [
      '.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg',
      '.woff', '.woff2', '.ttf', '.eot', '.mp4', '.webm', '.json',
      '.xml', '.txt', '.map'
    ];
    
    const isStaticFile = staticFileExtensions.some(ext => requestPath.endsWith(ext));
    
    if (isStaticFile) {
      const filePath = path.join(__dirname, "../build", requestPath);
      if (fs.existsSync(filePath)) {
        console.log(`📁 Serving static file: ${requestPath}`);
        return res.sendFile(filePath);
      }
      return res.status(404).send("Not found");
    }

    // Handle SEO files
    if (requestPath === "/robots.txt") {
      const robotsPath = path.join(__dirname, "../build/robots.txt");
      if (fs.existsSync(robotsPath)) {
        res.set("Content-Type", "text/plain");
        return res.sendFile(robotsPath);
      }
      
      res.set("Content-Type", "text/plain");
      return res.send(`User-agent: *
Allow: /
Sitemap: https://countrycounter.online/sitemap.xml`);
    }

    if (requestPath === "/sitemap.xml") {
      const sitemapPath = path.join(__dirname, "../build/sitemap.xml");
      if (fs.existsSync(sitemapPath)) {
        res.set("Content-Type", "application/xml");
        return res.sendFile(sitemapPath);
      }
      
      res.set("Content-Type", "application/xml");
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://countrycounter.online/</loc>
    <lastmod>2026-01-22</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://countrycounter.online/allflags</loc>
    <lastmod>2026-01-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://countrycounter.online/allnames</loc>
    <lastmod>2026-01-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://countrycounter.online/wishlist</loc>
    <lastmod>2026-01-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://countrycounter.online/visited</loc>
    <lastmod>2026-01-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://countrycounter.online/sign-in</loc>
    <lastmod>2026-01-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://countrycounter.online/profile</loc>
    <lastmod>2026-01-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;
      return res.send(sitemap);
    }

    const isBotRequest = isBot(userAgent, fullUrl);
    console.log(`Is bot: ${isBotRequest}`);

    if (!isBotRequest) {
      console.log("👤 Regular user - serving SPA");
      
      try {
        const indexPath = path.join(__dirname, "../build/index.html");
        if (!fs.existsSync(indexPath)) {
          throw new Error("index.html not found");
        }
        
        const indexHtml = fs.readFileSync(indexPath, "utf8");
        
        res.set("Content-Type", "text/html");
        res.set("X-Frame-Options", "DENY");
        res.set("X-Content-Type-Options", "nosniff");
        res.set("Cache-Control", "public, max-age=0, must-revalidate");
        res.set("Vary", "User-Agent");
        
        return res.send(indexHtml);
      } catch (error) {
        console.error("❌ Error serving SPA:", error);
        
        res.set("Content-Type", "text/html");
        return res.send(`<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0;url=https://countrycounter.online/">
</head>
<body>Redirecting...</body>
</html>`);
      }
    }

    console.log("🤖 Bot detected - serving SEO HTML");
    
    const meta = generateMetaTags(requestPath);
    
    let contentHtml = `
    <h1>Country Counter</h1>
    <p><strong>${meta.title}</strong></p>
    <p>${meta.description}</p>`;
    
    if (requestPath === "/allflags") {
      contentHtml += `
      <h2>Popular Country Flags</h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 30px 0;">
        <div style="text-align: center;">
          <img src="https://flagcdn.com/w320/us.png" alt="USA" style="width: 100px; height: auto; border: 1px solid #ddd;">
          <p>United States</p>
        </div>
        <div style="text-align: center;">
          <img src="https://flagcdn.com/w320/gb.png" alt="UK" style="width: 100px; height: auto; border: 1px solid #ddd;">
          <p>United Kingdom</p>
        </div>
        <div style="text-align: center;">
          <img src="https://flagcdn.com/w320/fr.png" alt="France" style="width: 100px; height: auto; border: 1px solid #ddd;">
          <p>France</p>
        </div>
      </div>
      <p>Browse flags of all 200+ countries in the world. Learn about different cultures and plan your travels.</p>`;
    } else if (requestPath === "/allnames") {
      contentHtml += `
      <h2>List of Countries</h2>
      <ul style="list-style: none; padding: 0; column-count: 2;">
        <li style="padding: 5px 0;">United States</li>
        <li style="padding: 5px 0;">United Kingdom</li>
        <li style="padding: 5px 0;">France</li>
        <li style="padding: 5px 0;">Germany</li>
        <li style="padding: 5px 0;">Japan</li>
        <li style="padding: 5px 0;">Russia</li>
        <li style="padding: 5px 0;">China</li>
        <li style="padding: 5px 0;">India</li>
        <li style="padding: 5px 0;">Brazil</li>
        <li style="padding: 5px 0;">Australia</li>
      </ul>
      <p>Explore all countries by name</p>`;
    } else if (requestPath === "/wishlist") {
      contentHtml += `
      <h2>Travel Wishlist</h2>
      <p>Create your personal travel wishlist. Mark countries you want to visit and share with friends.</p>
      <ul>
        <li>Save dream destinations</li>
        <li>Track your travel goals</li>
        <li>Share with friends</li>
        <li>Plan your adventures</li>
      </ul>`;
    } else if (requestPath === "/visited") {
      contentHtml += `
      <h2>Visited Countries</h2>
      <p>Track where you've been. Mark visited countries and see your travel history.</p>
      <ul>
        <li>Mark visited countries</li>
        <li>See travel statistics</li>
        <li>Create travel memories</li>
        <li>Share achievements</li>
      </ul>`;
    }
    
    // Финальный HTML для бота
    const botHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}">
    <meta name="keywords" content="${meta.keywords}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://countrycounter.online${requestPath}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${meta.title}">
    <meta property="og:description" content="${meta.description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://countrycounter.online${requestPath}">
    <meta property="og:image" content="https://countrycounter.online/og-image.jpg">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${meta.title}">
    <meta name="twitter:description" content="${meta.description}">
    <meta name="twitter:image" content="https://countrycounter.online/twitter-image.jpg">
    
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px; 
            line-height: 1.6;
            color: #333;
        }
        h1 { color: #2d3748; }
        h2 { color: #4a5568; margin-top: 30px; }
        p { margin: 15px 0; }
        ul { padding-left: 20px; }
        li { margin: 8px 0; }
        .feature { 
            background: #f7fafc; 
            padding: 15px; 
            border-radius: 8px; 
            margin: 15px 0; 
        }
    </style>
</head>
<body>
    ${contentHtml}
    
    <div class="feature">
        <h3>Features:</h3>
        <ul>
            <li>Track visited countries</li>
            <li>Create travel wishlists</li>
            <li>Share with friends</li>
            <li>Explore world flags</li>
            <li>Learn country names</li>
        </ul>
    </div>
    
    <p style="color: #666; font-size: 14px; border-top: 1px solid #eee; padding-top: 20px; margin-top: 40px;">
        This is a search-optimized preview. For the full interactive experience, 
        visit <a href="https://countrycounter.online/">Country Counter</a>.
    </p>
    
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Country Counter",
      "url": "https://countrycounter.online",
      "description": "${meta.description}",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://countrycounter.online/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
    </script>
</body>
</html>`;

    res.set("Content-Type", "text/html");
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Cache-Control", "public, max-age=3600, s-maxage=7200");
    res.set("Vary", "User-Agent");
    res.set("X-Robots-Tag", "index, follow");
    
    console.log("📄 Served SEO HTML to bot");
    return res.send(botHtml);
  }
);