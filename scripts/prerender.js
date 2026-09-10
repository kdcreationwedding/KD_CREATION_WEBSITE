import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, "../dist");
const templatePath = path.join(distDir, "index.html");

if (!fs.existsSync(templatePath)) {
  console.error("dist/index.html not found! Run vite build first.");
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf-8");

const routes = [
  {
    path: "/wedding-photographer-ahmedabad",
    title: "Best Wedding Photographer in Ahmedabad | KD Creation",
    description: "Looking for the best wedding photographer in Ahmedabad? KD Creation captures royal Gujarati celebrations, candid fine-art bridal portraits, and luxury weddings.",
    h1: "Best Wedding Photographer in Ahmedabad",
    summary: "KD Creation is Ahmedabad premier luxury wedding photography studio founded by Mahesh Parmar and Harshad Chavda. Located in Prahlad Nagar on SG Highway, we craft editorial wedding films and fine-art portraits for royal families across Gujarat."
  },
  {
    path: "/wedding-videographer-ahmedabad",
    title: "Best Wedding Videographer in Ahmedabad | 4K Wedding Films",
    description: "Premier 4K wedding videographer in Ahmedabad. KD Creation crafts Hollywood-grade cinematic wedding films, royal teasers, and anamorphic features.",
    h1: "Best Wedding Videographer in Ahmedabad",
    summary: "Experience Hollywood-grade cinematic wedding films shot on RED cinema cameras and anamorphic master lenses. Capturing royal celebrations across Ahmedabad and Gujarat."
  },
  {
    path: "/pre-wedding-photographer-ahmedabad",
    title: "Best Pre Wedding Photographer in Ahmedabad | KD Creation",
    description: "Capture your royal love story with Ahmedabad top pre-wedding photographer. Cinematic outdoor shoots, palace locations, and luxury concept films.",
    h1: "Best Pre Wedding Photographer in Ahmedabad",
    summary: "From heritage Havelis to modern architectural marvels, KD Creation captures signature luxury pre-wedding shoots across Gujarat and Rajasthan."
  },
  {
    path: "/candid-wedding-photographer-ahmedabad",
    title: "Candid Wedding Photographer in Ahmedabad | Fine-Art Moments",
    description: "Capture raw, unscripted emotions with the best candid wedding photographer in Ahmedabad. Discreet, fine-art editorial coverage by KD Creation.",
    h1: "Candid Wedding Photographer in Ahmedabad",
    summary: "Unobtrusive, heartfelt candid photography documenting authentic laughter, tears, and timeless moments across luxury Gujarati weddings."
  },
  {
    path: "/destination-wedding-photographer-gujarat",
    title: "Destination Wedding Photographer in Gujarat & Rajasthan | KD Creation",
    description: "Acclaimed destination wedding photographer in Gujarat covering royal palace celebrations in Udaipur, Jaipur, Goa, and heritage resorts.",
    h1: "Destination Wedding Photographer in Gujarat & Udaipur",
    summary: "Specializing in royal destination weddings across Udaipur, Jaipur, Jodhpur, Goa, and luxury Gujarat resorts with full cinema crews and aerial cinematography."
  },
  {
    path: "/wedding-photography-cost-ahmedabad",
    title: "Luxury Wedding Photography Investment & Packages | Ahmedabad",
    description: "Explore bespoke luxury wedding photography and 4K cinematography commissions in Ahmedabad by KD Creation. Limited to 18 weddings per season.",
    h1: "Bespoke Wedding Commissions in Ahmedabad & Beyond",
    summary: "KD Creation operates on an exclusive application-only commission model, accepting just 18 discerning couples per season for peerless craftsmanship and cinematic perfection."
  },
  {
    path: "/4k-anamorphic-wedding-cinematography-heritage-palace-rajasthan",
    title: "4K Anamorphic Wedding Cinematography | Heritage Palaces",
    description: "World-class 4K anamorphic cinema for grand heritage palace weddings in Rajasthan and Gujarat by KD Creation.",
    h1: "4K Anamorphic Wedding Cinematography for Heritage Palaces in Rajasthan & Gujarat",
    summary: "True 2.39:1 widescreen anamorphic cinema capturing the royal majesty of Rajasthan palaces, heritage architecture, and grand luxury celebrations."
  },
  {
    path: "/bridal-portraits",
    title: "Luxury Bridal Portraits in Ahmedabad | KD Creation Studio",
    description: "Editorial, Vogue-style bridal portraits capturing heirloom jewellery, couture lehengas, and emotional moments in Ahmedabad.",
    h1: "Luxury Bridal Portraits in Ahmedabad",
    summary: "Masterful editorial bridal portraiture highlighting exquisite bridal couture, heritage jewellery, and timeless beauty with painterly cinematic lighting."
  },
  {
    path: "/drone-wedding-photography",
    title: "Drone Wedding Photography & Aerial Cinema Ahmedabad | KD Creation",
    description: "Licensed 4K drone wedding cinematography and aerial photography for grand palace entries and destination weddings in Gujarat.",
    h1: "Drone Wedding Photography in Ahmedabad & Gujarat",
    summary: "Breathtaking aerial perspectives documenting royal baraat processions, sweeping palace architecture, and fireworks with licensed cinematic drone pilots."
  },
  {
    path: "/luxury-wedding-albums",
    title: "Hand-Bound Italian Leather Heirloom Albums | KD Creation",
    description: "Preserve your wedding memories in handcrafted Italian leather heirloom flush-mount albums with museum-grade archival prints.",
    h1: "Hand-Bound Italian Leather Heirloom Albums",
    summary: "Exquisite hand-bound flush-mount albums crafted in Florence, Italy, featuring velvet touch museum paper guaranteed to endure for generations."
  },
  {
    path: "/anamorphic-4k-wedding-videography-cost-gujarat",
    title: "Cost of Anamorphic 4K Wedding Videography in Gujarat | Guide",
    description: "Complete guide to Hollywood-grade 4K anamorphic wedding cinematography in Gujarat. Understand equipment, color grading, and bespoke commissions.",
    h1: "Anamorphic 4K Wedding Videography Cost in Gujarat",
    summary: "Detailed insight into true optical widescreen anamorphic cinematography, RED cinema sensors, DaVinci Resolve color science, and palace commissions."
  },
  {
    path: "/real-weddings/royal-belvedere-club-wedding-ahmedabad",
    title: "Real Wedding: Royal Belvedere Club Celebration | KD Creation",
    description: "Case study of a grand 3-day royal luxury wedding at The Belvedere Golf & Country Club Ahmedabad captured by KD Creation.",
    h1: "Royal 3-Day Celebration at The Belvedere Club",
    summary: "Step inside an extravagant 3-day Gujarati wedding celebration at The Belvedere Club, Shantigram, featuring 4K anamorphic cinema and candid editorial portraits."
  },
  {
    path: "/venues/belvedere-golf-country-club-wedding",
    title: "Belvedere Golf & Country Club Wedding Photography | Ahmedabad",
    description: "Comprehensive guide to luxury wedding photography and films at The Belvedere Golf & Country Club, Shantigram, Ahmedabad.",
    h1: "Wedding Photography at Belvedere Golf & Country Club",
    summary: "Masterful coverage of grand celebrations across the sprawling golf lawns and grand ballrooms of Adani Shantigram premier luxury venue."
  },
  {
    path: "/venues/taj-skyline-ahmedabad-wedding",
    title: "Taj Skyline Ahmedabad Wedding Photography & Films | KD Creation",
    description: "Luxury wedding photography at Taj Skyline, SG Highway, Ahmedabad. Elegant ballroom lighting and fine-art couple portraits.",
    h1: "Wedding Photography at Taj Skyline Ahmedabad",
    summary: "Five-star luxury wedding cinematography and candid photography at Taj Skyline, SG Highway, capturing regal opulence and contemporary elegance."
  },
  {
    path: "/venues/glade-one-ahmedabad-wedding",
    title: "Glade One Resort Wedding Photography | Sanand Ahmedabad",
    description: "Exclusive luxury wedding photography and 4K cinematography at Glade One Golf Resort, Sanand, Ahmedabad.",
    h1: "Wedding Photography at Glade One Resort",
    summary: "Serene lakeside vows, golf course grandeur, and twilight bridal portraits at Gujarat most exclusive private resort."
  },
  {
    path: "/venues/gulmohar-greens-wedding",
    title: "Gulmohar Greens Golf Club Wedding Photography | Ahmedabad",
    description: "Candid wedding photography and royal destination films at Gulmohar Greens Golf & Country Club, Sanand-Sarkhej Road, Ahmedabad.",
    h1: "Wedding Photography at Gulmohar Greens Golf Club",
    summary: "Expansive lush green lawns, grand open-air mandap setups, and vibrant Sangeet night cinematography at Gulmohar Greens."
  },
  {
    path: "/blog/pre-wedding-shoot-locations-gujarat",
    title: "Top 10 Luxury Pre-Wedding Shoot Locations in Gujarat | Guide",
    description: "Curated guide to the best luxury pre-wedding shoot locations across Gujarat including Adalaj, White Rann of Kutch, and heritage palaces.",
    h1: "Top 10 Luxury Pre-Wedding Shoot Locations in Gujarat",
    summary: "Discover Gujarat most breathtaking backdrop locations for cinematic pre-wedding photography, from ancient stepwells to desert salt flats."
  }
];

routes.forEach((route) => {
  const targetDir = path.join(distDir, route.path.replace(/^\//, ""));
  fs.mkdirSync(targetDir, { recursive: true });

  const canonicalUrl = `https://www.kdcreations.in${route.path}`;

  let html = template;

  // Replace Canonical
  html = html.replace(
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // Replace Title
  html = html.replace(
    /<title>.*?<\/title>/i,
    `<title>${route.title}</title>`
  );
  html = html.replace(
    /<meta\s+name=["']title["'][^>]*>/i,
    `<meta name="title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta\s+property=["']twitter:title["'][^>]*>/i,
    `<meta property="twitter:title" content="${route.title}" />`
  );

  // Replace Description
  html = html.replace(
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta\s+property=["']twitter:description["'][^>]*>/i,
    `<meta property="twitter:description" content="${route.description}" />`
  );

  // Replace OG & Twitter URL
  html = html.replace(
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta\s+property=["']twitter:url["'][^>]*>/i,
    `<meta property="twitter:url" content="${canonicalUrl}" />`
  );

  // Inject Semantic Pre-Rendered Root for Non-JS Crawlers (Ahrefs, Googlebot, Bing)
  const preRenderedContent = `
    <div style="padding: 2rem; max-width: 1200px; margin: 0 auto; color: #F5F2EB; background: #1C0307;">
      <nav style="margin-bottom: 2rem;">
        <a href="/" style="color: #D4AF37; margin-right: 1.5rem; text-decoration: none;">Home</a>
        <a href="/wedding-photographer-ahmedabad" style="color: #D4AF37; margin-right: 1.5rem; text-decoration: none;">Wedding Photography</a>
        <a href="/wedding-videographer-ahmedabad" style="color: #D4AF37; margin-right: 1.5rem; text-decoration: none;">Wedding Films</a>
        <a href="/pre-wedding-photographer-ahmedabad" style="color: #D4AF37; margin-right: 1.5rem; text-decoration: none;">Pre-Wedding</a>
        <a href="/wedding-photography-cost-ahmedabad" style="color: #D4AF37; text-decoration: none;">Commissions</a>
      </nav>
      <header>
        <h1 style="font-size: 2.5rem; color: #D4AF37; font-family: serif; margin-bottom: 1rem;">${route.h1}</h1>
        <p style="font-size: 1.15rem; line-height: 1.7; opacity: 0.9;">${route.summary}</p>
      </header>
      <section style="margin-top: 2.5rem; border-top: 1px solid rgba(212, 175, 55, 0.3); padding-top: 2rem;">
        <h2 style="font-size: 1.5rem; color: #D4AF37; font-family: serif;">Luxury 4K Cinematography & Candid Photography in Ahmedabad</h2>
        <p style="line-height: 1.8; opacity: 0.85;">KD Creation is Ahmedabad premier luxury wedding photography and 4K cinematography studio, capturing royal weddings, destination celebrations, and fine-art moments across Gujarat, Udaipur, Jaipur, and worldwide. Directed by Mahesh Parmar and Harshad Chavda, our studio is committed to timeless visual storytelling.</p>
        <p style="margin-top: 1rem;"><a href="/#contact" style="color: #D4AF37; font-weight: bold; text-decoration: underline;">Request Private Bespoke Consultation &rarr;</a></p>
      </section>
    </div>
  `;

  html = html.replace(
    /<div id=["']root["']>.*?<\/div>/s,
    `<div id="root">${preRenderedContent}</div>`
  );

  // Ensure absolute asset paths for subpages
  html = html.replace(/href=["']\.\/assets\//g, "href=\"/assets/");
  html = html.replace(/src=["']\.\/assets\//g, "src=\"/assets/");
  html = html.replace(/href=["']\.\/favicon\.ico["']/g, "href=\"/favicon.ico\"");
  html = html.replace(/href=["']\.\/apple-touch-icon\.png["']/g, "href=\"/apple-touch-icon.png\"");

  const outputPath = path.join(targetDir, "index.html");
  fs.writeFileSync(outputPath, html, "utf-8");
  console.log(`Pre-rendered route: ${route.path} -> ${outputPath}`);
});

console.log(`Successfully pre-rendered ${routes.length} routes with unique canonicals, meta tags, and H1 headings!`);
