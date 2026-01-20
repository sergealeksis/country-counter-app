/* eslint-disable */
const functions = require("firebase-functions");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const PRERENDER_TOKEN = "crkSHWldzKzAXAS1vHkf";
const YOUR_DOMAIN = "countrycounter.online";

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

const generateStaticHtml = (path, userData = null) => {
  const pages = {
    "/": {
      title: "Country Counter - App to create your travel and wishlists",
      description:
        "Create your travel list, share it with your friends, " +
        "create wishlists and track them, keep track of where you have " +
        "been and discover new destinations",
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
      description:
        "Discover new destinations. Make your own wishkist and " +
        "share it with your friends",
      keywords: "wishlist, travel plan, choose country, vacation",
    },
    "/allnames": {
      title: "Names of countries",
      description: "All countries by names",
      keywords: "countries, country name, country flag, flags",
    },
    "/visited": {
      title: "Visited countries",
      description:
        "Keep track of where you have been. Check your travel history",
      keywords: "visited countries list, check list, vacation, checker, travel story",
    },
    "/profile": {
      title: "My Country Counter profile",
      description:
        "User profile, change username, verify email, " +
        "get random country, clear all lists",
      keywords: "profile, settings",
    },
  };

  // Для shared страниц
  if (path.startsWith("/shared/wishlist/")) {
    return {
      title: "Travel wishlist",
      description:
        "Share your travel list to discover new destinations together",
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
    description:
      "Keep track of where you have been, " +
      "create wishlists and track them, share it with friends.",
    keywords: "countries, counter, checker, wishlist",
  };
};

exports.prerender = functions
  .region("us-central1")
  .runWith({
    memory: "1GB",
    timeoutSeconds: 30,
  })
  .https.onRequest(async (req, res) => {
    const userAgent = req.headers["user-agent"] || "";
    const requestPath = req.path || "/";
    const isBotRequest = isBot(userAgent);

    console.log("🔍 Request details:", {
      path: requestPath,
      userAgent: userAgent.substring(0, 100),
      isBot: isBotRequest,
      method: req.method,
    });

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

        return res.send(indexHtml);
      } catch (error) {
        console.error("❌ Error serving SPA:", error);

        const fallback = generateStaticHtml(requestPath);
        const basicHtml = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fallback.title}</title>
    <meta name="description" content="${fallback.description}">
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 40px; text-align: center; }
        h1 { color: #333; }
        a { color: #007bff; text-decoration: none; }
    </style>
</head>
<body>
    <h1>Country Counter</h1>
    <p>Приложение временно недоступно. Пожалуйста, попробуйте позже.</p>
    <p><a href="/">На главную</a></p>
</body>
</html>`;

        res.status(500).send(basicHtml);
        return;
      }
    }

    console.log("🤖 Detected bot, using prerender.io");

    try {
      const prerenderUrl =
        `https://service.prerender.io/https://${YOUR_DOMAIN}${requestPath}`;

      console.log("🌐 Fetching from prerender.io:", prerenderUrl);

      const response = await fetch(prerenderUrl, {
        headers: {
          "X-Prerender-Token": PRERENDER_TOKEN,
          "User-Agent": userAgent,
        },
        timeout: 25000,
      });

      if (!response.ok) {
        throw new Error(
          `Prerender.io returned status ${response.status}: ${response.statusText}`,
        );
      }

      const html = await response.text();

      if (!html || typeof html !== "string" || html.length < 100) {
        throw new Error("Received invalid or empty HTML from prerender.io");
      }

      console.log(
        `✅ Successfully prerendered ${requestPath}, HTML length: ${html.length} chars`,
      );

      res.set("Content-Type", "text/html");
      res.set("X-Frame-Options", "DENY");
      res.set("X-Content-Type-Options", "nosniff");
      res.set("Cache-Control", "public, max-age=3600");

      res.send(html);
    } catch (error) {
      console.error("⚠️ Prerender.io failed:", error.message);

      try {
        const indexPath = path.join(__dirname, "../build/index.html");

        if (fs.existsSync(indexPath)) {
          const indexHtml = fs.readFileSync(indexPath, "utf8");

          const pageInfo = generateStaticHtml(requestPath);
          const enhancedHtml = indexHtml
            .replace(
              "<title>Country Counter</title>",
              `<title>${pageInfo.title}</title>`,
            )
            .replace(
              '<meta name="description" content="Country Counter App">',
              `<meta name="description" content="${pageInfo.description}">`,
            )
            .replace(
              "</head>",
              `<meta name="keywords" content="${pageInfo.keywords}"></head>`,
            );

          res.set("Content-Type", "text/html");
          res.set("X-Frame-Options", "DENY");
          res.set("X-Content-Type-Options", "nosniff");
          res.send(enhancedHtml);

          console.log("📄 Served enhanced index.html as fallback");
        } else {
          throw new Error("index.html not found");
        }
      } catch (fallbackError) {
        console.error("❌ Fallback also failed:", fallbackError.message);

        const pageInfo = generateStaticHtml(requestPath);
        const staticHtml = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageInfo.title}</title>
    <meta name="description" content="${pageInfo.description}">
    <meta name="keywords" content="${pageInfo.keywords}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://${YOUR_DOMAIN}${requestPath}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${pageInfo.title}">
    <meta property="og:description" content="${pageInfo.description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://${YOUR_DOMAIN}${requestPath}">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${pageInfo.title}">
    <meta name="twitter:description" content="${pageInfo.description}">
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
                         Roboto, Oxygen, Ubuntu, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 800px;
            width: 100%;
            padding: 40px;
            text-align: center;
        }
        h1 {
            color: #2d3748;
            margin-bottom: 20px;
            font-size: 2.5rem;
        }
        p {
            color: #4a5568;
            margin-bottom: 30px;
            font-size: 1.1rem;
        }
        .countries-count {
            font-size: 3rem;
            font-weight: bold;
            color: #667eea;
            margin: 20px 0;
        }
        .btn {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 15px 30px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: bold;
            margin: 10px;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 40px 0;
        }
        .feature {
            padding: 20px;
            background: #f7fafc;
            border-radius: 10px;
        }
        @media (max-width: 600px) {
            .container { padding: 20px; }
            h1 { font-size: 2rem; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Country Counter</h1>
        <p>${pageInfo.description}</p>
        
        <div class="countries-count">200+ стран</div>
        
        <div class="features">
            <div class="feature">
                <h3>📝 Отслеживание</h3>
                <p>Отмечайте посещенные страны</p>
            </div>
            <div class="feature">
                <h3>⭐ Wishlist</h3>
                <p>Создайте список стран для будущих путешествий</p>
            </div>
            <div class="feature">
                <h3>📊 Статистика</h3>
                <p>Анализируйте свои путешествия</p>
            </div>
        </div>
        
        <a href="/" class="btn">Перейти к приложению</a>
        <p style="margin-top: 30px; color: #a0aec0; font-size: 0.9rem;">
            Приложение загружается... Если страница не обновилась автоматически, 
            <a href="/" style="color: #667eea;">нажмите сюда</a>.
        </p>
    </div>
    
    <script>
        // Перенаправление на SPA через 2 секунды
        setTimeout(function() {
            window.location.href = '/';
        }, 2000);
        
        // Google Analytics (если нужно)
        if (window.location.hostname === '${YOUR_DOMAIN}') {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
        }
    </script>
</body>
</html>`;

        res.set("Content-Type", "text/html");
        res.set("X-Frame-Options", "DENY");
        res.set("X-Content-Type-Options", "nosniff");
        res.send(staticHtml);

        console.log("🆘 Served static HTML as last resort");
      }
    }
  });

exports.clearPrerenderCache = functions
  .region("us-central1")
  .https.onRequest(async (req, res) => {
    const SECRET_KEY = req.query.secret;
    const VALID_SECRET = functions.config().admin?.secret;

    if (SECRET_KEY !== VALID_SECRET) {
      return res.status(403).send("Forbidden");
    }

    const url = req.query.url;
    if (!url) {
      return res.status(400).send("URL parameter is required");
    }

    try {
      const response = await fetch("https://api.prerender.io/recache", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Prerender-Token": PRERENDER_TOKEN,
        },
        body: JSON.stringify({ url: `https://${YOUR_DOMAIN}${url}` }),
      });

      if (response.ok) {
        res.send(`Cache cleared for ${url}`);
      } else {
        res.status(500).send("Failed to clear cache");
      }
    } catch (error) {
      res.status(500).send(`Error: ${error.message}`);
    }
  });

if (process.env.NODE_ENV === "development") {
  console.log("🚀 Development mode: Prerender function loaded");
  console.log(`🌐 Your domain: ${YOUR_DOMAIN}`);
  console.log(`🤖 Bot patterns: ${BOT_PATTERNS.length} patterns loaded`);
}