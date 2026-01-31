/* eslint-disable */
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const PRERENDER_TOKEN = "crkSHWldzKzAXAS1vHkf";

const BOT_PATTERNS = [
  "googlebot",
  "bingbot",
  "yandex",
  "baiduspider",
  "facebookexternalhit",
  "twitterbot",
  "rogerbot",
  "linkedinbot",
  "embedly",
  "quora link preview",
  "showyoubot",
  "outbrain",
  "pinterest",
  "slackbot",
  "vkShare",
  "W3C_Validator",
  "whatsapp",
  "telegrambot",
  "discordbot",
  "applebot",
  "duckduckbot",
  "slurp",
  "msnbot",
  "ia_archiver",
  "seznambot",
  "mj12bot",
];

const isBot = (userAgent) => {
  if (!userAgent) return false;
  const agent = userAgent.toLowerCase();
  return BOT_PATTERNS.some((bot) => agent.includes(bot));
};

const generateMetaTags = (path) => {
  const pages = {
    "/": {
      title: "Country Counter - App to create your travel and wishlists",
      description: "Create your travel list, share it with your friends, create wishlists and track them, keep track of where you have been and discover new destinations",
      keywords: "countries, travel, counter, flags, destinations, wishlist",
    },
    "/sign-in": {
      title: "Sign in or Sign up Country Counter",
      description: "Get started making your travel lists",
      keywords: "authorization, sign in, sign up",
    },
    "/allflags": {
      title: "Flags of countries",
      description: "All countries by flags",
      keywords: "flags, countries",
    },
    "/wishlist": {
      title: "Countries wishlist",
      description: "Discover new destinations. Make your own wishlist and share it with your friends",
      keywords: "wishlist, travel plan, choose country, vacation",
    },
    "/allnames": {
      title: "Names of countries",
      description: "All countries by names",
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
    const url = req.url || "/";
    
    const hasEscapedFragment = url.includes('_escaped_fragment_');
    const isBotRequest = isBot(userAgent) || hasEscapedFragment;
    
    console.log("📱 Request details:", {
      path: requestPath,
      userAgent: userAgent.substring(0, 100),
      isBot: isBotRequest,
      escapedFragment: hasEscapedFragment,
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

    // For regular users (not bots)
    if (!isBotRequest) {
      try {
        const indexPath = path.join(__dirname, "../build/index.html");
        if (!fs.existsSync(indexPath)) {
          throw new Error("index.html not found in build directory");
        }
        const indexHtml = fs.readFileSync(indexPath, "utf8");
        
        res.set("Content-Type", "text/html");
        res.set("X-Frame-Options", "DENY");
        res.set("X-Content-Type-Options", "nosniff");
        res.set("Cache-Control", "public, max-age=0, must-revalidate");
        res.set("Vary", "User-Agent");
        
        console.log("👤 Serving SPA to regular user");
        return res.send(indexHtml);
      } catch (error) {
        console.error("❌ Error serving SPA:", error);
        
        const meta = generateMetaTags(requestPath);
        const fallbackHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}">
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 40px; text-align: center; }
        h1 { color: #333; }
        a { color: #007bff; text-decoration: none; }
    </style>
</head>
<body>
    <h1>Country Counter</h1>
    <p>${meta.description}</p>
    <p><a href="/">Go to homepage</a></p>
</body>
</html>`;
        
        return res.status(200).send(fallbackHtml);
      }
    }

    // For bots - use prerender.io
    console.log("🤖 Detected bot, using prerender.io");
    
    try {
      const prerenderUrl = `https://service.prerender.io/https://countrycounter.online${requestPath}`;
      console.log("🌐 Fetching from prerender.io:", prerenderUrl);

      const response = await fetch(prerenderUrl, {
        headers: {
          "X-Prerender-Token": PRERENDER_TOKEN,
          "User-Agent": userAgent,
        },
        timeout: 25000,
      });

      if (!response.ok) {
        throw new Error(`Prerender.io returned status ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();

      if (!html || typeof html !== "string" || html.length < 100) {
        throw new Error("Received invalid or empty HTML from prerender.io");
      }

      console.log(`✅ Successfully prerendered ${requestPath}, HTML length: ${html.length} chars`);

      res.set("Content-Type", "text/html");
      res.set("X-Frame-Options", "DENY");
      res.set("X-Content-Type-Options", "nosniff");
      res.set("Cache-Control", "public, max-age=3600, s-maxage=7200");
      res.set("Vary", "User-Agent");
      res.set("X-Robots-Tag", "index, follow");

      return res.send(html);
    } catch (error) {
      console.error("⚠️ Prerender.io failed:", error.message);

      // Fallback: Serve index.html
      try {
        const indexPath = path.join(__dirname, "../build/index.html");
        if (!fs.existsSync(indexPath)) {
          throw new Error("index.html not found");
        }
        
        let indexHtml = fs.readFileSync(indexPath, "utf8");
        const meta = generateMetaTags(requestPath);
        
        // Simple replacement of title and description
        indexHtml = indexHtml
          .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
          .replace(
            /<meta name="description"[^>]*>/,
            `<meta name="description" content="${meta.description}">`
          );
        
        res.set("Content-Type", "text/html");
        res.set("X-Frame-Options", "DENY");
        res.set("X-Content-Type-Options", "nosniff");
        res.set("Cache-Control", "public, max-age=3600");
        
        console.log("📄 Served enhanced index.html as fallback");
        return res.send(indexHtml);
        
      } catch (fallbackError) {
        console.error("❌ Fallback also failed:", fallbackError.message);

        const meta = generateMetaTags(requestPath);
        const staticHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}">
    <meta name="keywords" content="${meta.keywords}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://countrycounter.online${requestPath}">
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        .spinner { border: 5px solid #f3f3f3; border-top: 5px solid #3498db; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; margin: 20px auto; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    </style>
</head>
<body>
    <h1>Country Counter</h1>
    <p>Loading application...</p>
    <div class="spinner"></div>
    <script>
        setTimeout(() => { window.location.href = '/'; }, 1000);
    </script>
</body>
</html>`;
      
        res.set("Content-Type", "text/html");
        return res.send(staticHtml);
      }
    }
  }
);