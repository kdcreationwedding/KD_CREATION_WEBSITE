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
    title: "KD Creation Photography | Best Wedding Photographer in Ahmedabad",
    description: "Looking for the best wedding photographer in Ahmedabad? KD Creation Photography (KD Creations) captures royal Gujarati celebrations, candid fine-art bridal portraits, and luxury weddings.",
    h1: "Best Wedding Photographer in Ahmedabad | KD Creation Photography",
    summary: "KD Creation Photography (KD Creations) is Ahmedabad's premier luxury wedding photography and 4K cinema studio founded by Mahesh Parmar, Harshad Chavda, and Aniket Vaghela. Located in Bapunagar, Ahmedabad, we craft editorial wedding films and fine-art portraits for royal families across Gujarat."
  },
  {
    path: "/wedding-videographer-ahmedabad",
    title: "Best Wedding Videographer in Ahmedabad | KD Creation Photography",
    description: "Premier 4K wedding videographer in Ahmedabad. KD Creation Photography crafts Hollywood-grade cinematic wedding films, royal teasers, and anamorphic features.",
    h1: "Best Wedding Videographer in Ahmedabad | KD Creation Photography",
    summary: "Experience Hollywood-grade cinematic wedding films shot on cinema cameras and anamorphic master lenses. Capturing royal celebrations across Ahmedabad and Gujarat."
  },
  {
    path: "/pre-wedding-photographer-ahmedabad",
    title: "Best Pre Wedding Photographer in Ahmedabad | KD Creation Photography",
    description: "Capture your royal love story with Ahmedabad's top pre-wedding photographer. Cinematic outdoor shoots, palace locations, and luxury concept films by KD Creation Photography.",
    h1: "Best Pre Wedding Photographer in Ahmedabad | KD Creation Photography",
    summary: "From heritage Havelis to modern architectural marvels, KD Creation Photography captures signature luxury pre-wedding shoots across Gujarat and Rajasthan."
  },
  {
    path: "/candid-wedding-photographer-ahmedabad",
    title: "Candid Wedding Photographer in Ahmedabad | KD Creation Photography",
    description: "Capture raw, unscripted emotions with the best candid wedding photographer in Ahmedabad. Discreet, fine-art editorial coverage by KD Creation Photography.",
    h1: "Candid Wedding Photographer in Ahmedabad | KD Creation Photography",
    summary: "Unobtrusive, heartfelt candid photography documenting authentic laughter, tears, and timeless moments across luxury Gujarati weddings."
  },
  {
    path: "/photo-editing-services-ahmedabad",
    title: "Professional Photo Editing & Retouching Services in Ahmedabad | KD Creation Photography",
    description: "High-end magazine-grade photo retouching, portrait beauty retouching, and fine-art color grading in Ahmedabad by KD Creation Photography (KD Creations).",
    h1: "Professional Photo Editing & Retouching Services in Ahmedabad",
    summary: "KD Creation Photography offers master photo editing services in Ahmedabad, specializing in skin texture preservation, high-end bridal portrait retouching, color grading, and archival photo finishing."
  },
  {
    path: "/video-editing",
    title: "Video Editing Portfolio | 36 Master 4K Edits | KD Creation Photography",
    description: "Explore KD Creation Photography's dedicated folder-wise video editing portfolio. 36 master 4K edits across AI, wedding highlights, teasers, reels, portraits, and automobile delivery.",
    h1: "Video Editing Portfolio & Master Post-Production Suite | KD Creation",
    summary: "Curated folder-wise archive of 36 cinematic video edits color-graded in DaVinci Resolve Studio 19 and edited under the direction of Mr. Aniket Vaghela."
  },
  {
    path: "/video-editing-services-ahmedabad",
    title: "Cinematic Video Editing & Color Grading in Ahmedabad | KD Creation Photography",
    description: "Professional 4K video editing, DaVinci Resolve color grading, multi-camera audio sync, and cinematic wedding film post-production in Ahmedabad.",
    h1: "Cinematic Video Editing & Post-Production in Ahmedabad",
    summary: "From 9:16 viral Instagram reels to full-length 2.39:1 widescreen anamorphic cinema feature films, KD Creation Photography delivers master video editing and sound design in Ahmedabad."
  },
  {
    path: "/album-designing-services-ahmedabad",
    title: "Heirloom Album Designing & Photobook Services Ahmedabad | KD Creation Photography",
    description: "Bespoke album designing and luxury handcrafted photobooks in Ahmedabad. Archival metallic prints, Italian leather binding, and color-calibrated layouts.",
    h1: "Bespoke Heirloom Album Designing & Photobooks in Ahmedabad",
    summary: "Preserve your cherished wedding memories in handcrafted heirloom albums designed page-by-page by KD Creation Photography with genuine leather covers and museum-grade archival durability."
  },
  {
    path: "/destination-wedding-photographer-gujarat",
    title: "Destination Wedding Photographer in Gujarat & Rajasthan | KD Creation Photography",
    description: "Acclaimed destination wedding photographer in Gujarat covering royal palace celebrations in Udaipur, Jaipur, Goa, and heritage resorts.",
    h1: "Destination Wedding Photographer in Gujarat & Udaipur",
    summary: "Specializing in royal destination weddings across Udaipur, Jaipur, Jodhpur, Goa, and luxury Gujarat resorts with full cinema crews and aerial cinematography."
  },
  {
    path: "/wedding-photography-cost-ahmedabad",
    title: "Luxury Wedding Photography Investment & Packages | Ahmedabad | KD Creation",
    description: "Explore bespoke luxury wedding photography and 4K cinematography commissions in Ahmedabad by KD Creation Photography. Limited to 18 weddings per season.",
    h1: "Bespoke Wedding Commissions in Ahmedabad & Beyond",
    summary: "KD Creation Photography operates on an exclusive application-only commission model, accepting just 18 discerning couples per season for peerless craftsmanship and cinematic perfection."
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
    summary: "Discover Gujarat's most breathtaking backdrop locations for cinematic pre-wedding photography, from ancient stepwells to desert salt flats."
  },
  {
    path: "/wedding-photography",
    title: "Wedding Photography Ahmedabad | KD Creation Photography",
    description: "Capture your royal wedding celebrations with KD Creation Photography. Candid, traditional, and fine-art luxury wedding photography across Ahmedabad, Bodakdev, Satellite, SG Highway, and Gujarat.",
    h1: "Luxury Wedding Photography in Ahmedabad & Gujarat",
    summary: "KD Creation Photography is Ahmedabad's celebrated wedding photography studio, documenting sacred moments, candid tears, joyous laughter, and heirloom bridal portraits across Ahmedabad and royal destinations."
  },
  {
    path: "/wedding-videography",
    title: "Wedding Videography Ahmedabad | 4K Cinema | KD Creation",
    description: "Hollywood-grade 4K wedding videography in Ahmedabad. KD Creation crafts emotional cinematic wedding films, royal trailers, and multi-camera ceremony coverage.",
    h1: "Cinematic Wedding Videography in Ahmedabad",
    summary: "Master 4K cinema cameras, anamorphic widescreen optics, and DaVinci Resolve color grading capturing the grand spectacle and tender intimacy of your Gujarati wedding."
  },
  {
    path: "/wedding-films",
    title: "Cinematic Wedding Films Ahmedabad | KD Creation Photography",
    description: "Experience breathtaking 4K cinematic wedding films and royal teasers by KD Creation Photography. Highlighting unscripted love stories across Gujarat and Rajasthan.",
    h1: "Cinematic Wedding Films & Royal Highlights in Ahmedabad",
    summary: "We transform wedding memories into timeless cinematic films featuring original sound design, cinematic pacing, and magazine-quality editorial framing."
  },
  {
    path: "/wedding-filmmaker",
    title: "Wedding Filmmaker Ahmedabad | Award-Winning Cinema | KD Creation",
    description: "Looking for a premier wedding filmmaker in Ahmedabad? KD Creation specializes in anamorphic 2.39:1 widescreen wedding films with custom sound design and DaVinci color grading.",
    h1: "Premier Wedding Filmmaker in Ahmedabad & Gujarat",
    summary: "Led by Harshad Chavda and Mahesh Parmar, our master filmmakers bring theatrical cinematography to destination celebrations across Ahmedabad, Udaipur, Jaipur, and Goa."
  },
  {
    path: "/pre-wedding-photography",
    title: "Pre-Wedding Photography Ahmedabad | KD Creation Photography",
    description: "Romantic and conceptual pre-wedding photography in Ahmedabad. Heritage stepwells, luxury resorts, and palace locations across Gujarat and Rajasthan.",
    h1: "Bespoke Pre-Wedding Photography in Ahmedabad",
    summary: "Crafting stylized couple portraits and editorial romance narratives across Adalaj Stepwell, Polo Forest, Sabarmati Riverfront, and luxury golf resorts."
  },
  {
    path: "/pre-wedding-films",
    title: "Pre-Wedding Films & Teasers Ahmedabad | KD Creation Photography",
    description: "Turn your love story into a cinematic pre-wedding film. Direction, concept scripts, aerial drone cinematography, and 4K editing by KD Creation in Ahmedabad.",
    h1: "Cinematic Pre-Wedding Films in Ahmedabad & Beyond",
    summary: "Creative concept films scripted to your journey with drone aerials, exotic scenic backdrops, and cinematic audio tracks."
  },
  {
    path: "/cinematic-wedding-video",
    title: "Cinematic Wedding Video Ahmedabad | 4K HDR | KD Creation",
    description: "Elevate your wedding video into a cinema masterpiece. Anamorphic optics, master color grading, and heartfelt narrative storytelling by KD Creation Photography.",
    h1: "Cinematic Wedding Videos in Ahmedabad & Gujarat",
    summary: "Moving beyond traditional static videos into true cinematic cinema with emotional music sync, multi-mic audio clarity, and 4K anamorphic colors."
  },
  {
    path: "/event-photography",
    title: "Event Photographer Ahmedabad | Corporate & Family | KD Creation",
    description: "Professional event photography in Ahmedabad for luxury engagements, anniversaries, corporate galas, and family milestones by KD Creation Photography.",
    h1: "Professional Event Photography in Ahmedabad",
    summary: "Discreet, high-impact photojournalism covering grand Sangeet nights, ring ceremonies, corporate inaugurations, and private luxury galas across Ahmedabad."
  },
  {
    path: "/event-videography",
    title: "Event Videography Ahmedabad | 4K Film Coverage | KD Creation",
    description: "Comprehensive 4K event videography in Ahmedabad for corporate conferences, grand inaugurations, Sangeet galas, and VIP receptions.",
    h1: "4K Event Videography & Highlight Films in Ahmedabad",
    summary: "Broadcast-quality multi-camera video coverage, live streaming support, and next-day social highlight reels for prestigious events."
  },
  {
    path: "/photo-video",
    title: "Wedding Photography & Videography Ahmedabad | KD Creation Team",
    description: "All-in-one synchronized wedding photo and video team in Ahmedabad. Seamless multi-camera coverage, director-level execution, and heirloom albums.",
    h1: "Complete Wedding Photo & Video Team in Ahmedabad",
    summary: "Experience total visual peace of mind with a fully coordinated in-house team of photographers, cinematographers, drone pilots, and editors."
  },
  {
    path: "/photography",
    title: "Professional Photographer Ahmedabad | KD Creation Photography",
    description: "Discover premier photography services in Ahmedabad by KD Creation. Specializing in luxury weddings, fine-art portraits, pre-wedding, and events.",
    h1: "Professional Photography Studio in Ahmedabad, Gujarat",
    summary: "KD Creation Photography delivers award-worthy visual arts across Ahmedabad, serving Bodakdev, Satellite, SG Highway, Prahlad Nagar, Bopal, Vastrapur, and Gandhinagar."
  },
  {
    path: "/portfolio",
    title: "Wedding Photography & Film Portfolio | KD Creation Ahmedabad",
    description: "Explore KD Creation Photography's signature portfolio of royal Gujarati weddings, cinematic teasers, bridal portraits, and luxury heirloom photobooks.",
    h1: "Signature Wedding Photography & Film Portfolio",
    summary: "Curated real wedding stories, 4K cinema trailers, and heirloom digital albums crafted for discerning couples across India."
  },
  {
    path: "/about",
    title: "About KD Creation Photography | Ahmedabad Wedding Studio & Directors",
    description: "Learn about KD Creation Photography, founded by Mahesh Parmar, Harshad Chavda, and Aniket Vaghela. 16+ years of crafting luxury wedding films in Ahmedabad.",
    h1: "About KD Creation Photography — The People Behind The Frames",
    summary: "Discover our heritage, camera technology, editing suite, and creative philosophy rooted in Bapunagar, Ahmedabad, Gujarat."
  },
  {
    path: "/contact",
    title: "Contact KD Creation Photography | Ahmedabad Studio VIP Inquiries",
    description: "Book a private consultation with KD Creation Photography in Bapunagar, Ahmedabad. Check wedding date availability, 4K film packages, and commissions.",
    h1: "Connect With KD Creation Photography in Ahmedabad",
    summary: "Reach out via WhatsApp at +91 90330 32922 or visit our studio in Bapunagar, Ahmedabad. Limited to 18 exclusive commissions per wedding season."
  },
  {
    path: "/blog",
    title: "Wedding Photography Guides & Insights Ahmedabad | KD Creation Blog",
    description: "Expert wedding photography advice, Ahmedabad venue guides, Gujarati wedding muhurat tips, and pre-wedding location inspiration from KD Creation.",
    h1: "Wedding Photography Guides, Venue Insights & Cinematography Tips",
    summary: "In-depth editorial articles covering how to choose wedding photographers, cinematography checklists, and venue recommendations across Gujarat."
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
      <nav style="margin-bottom: 2rem; display: flex; flex-wrap: wrap; gap: 1rem;">
        <a href="/" style="color: #D4AF37; text-decoration: none;">Home</a>
        <a href="/wedding-photographer-ahmedabad" style="color: #D4AF37; text-decoration: none;">Wedding Photography</a>
        <a href="/wedding-videographer-ahmedabad" style="color: #D4AF37; text-decoration: none;">Wedding Films</a>
        <a href="/pre-wedding-photographer-ahmedabad" style="color: #D4AF37; text-decoration: none;">Pre-Wedding</a>
        <a href="/photo-editing-services-ahmedabad" style="color: #D4AF37; text-decoration: none;">Photo Editing</a>
        <a href="/video-editing-services-ahmedabad" style="color: #D4AF37; text-decoration: none;">Video Editing</a>
        <a href="/album-designing-services-ahmedabad" style="color: #D4AF37; text-decoration: none;">Album Designing</a>
        <a href="/wedding-photography-cost-ahmedabad" style="color: #D4AF37; text-decoration: none;">Commissions</a>
      </nav>
      <header>
        <h1 style="font-size: 2.5rem; color: #D4AF37; font-family: serif; margin-bottom: 1rem;">${route.h1}</h1>
        <p style="font-size: 1.15rem; line-height: 1.7; opacity: 0.9;">${route.summary}</p>
      </header>
      <section style="margin-top: 2.5rem; border-top: 1px solid rgba(212, 175, 55, 0.3); padding-top: 2rem;">
        <h2 style="font-size: 1.5rem; color: #D4AF37; font-family: serif;">KD Creation Photography — Luxury Wedding Films, Photography & Post-Production in Ahmedabad</h2>
        <p style="line-height: 1.8; opacity: 0.85;">KD Creation Photography (also known as KD Creation and KD Creations) is Ahmedabad's premier luxury wedding photography and 4K cinematography studio, capturing royal weddings, destination celebrations, pre-wedding shoots, photo editing, video editing, and handcrafted heirloom albums across Ahmedabad, Gujarat, Udaipur, Jaipur, and worldwide. Directed by Mahesh Parmar, Harshad Chavda, and Aniket Vaghela, our studio is located in Bapunagar, Ahmedabad 380024.</p>
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

// Pre-render the root homepage dist/index.html with rich semantic fallback
const homepagePreRendered = `
  <div style="padding: 2.5rem 1.5rem; max-width: 1200px; margin: 0 auto; color: #F5F2EB; background: #1C0307;">
    <header style="text-align: center; margin-bottom: 3rem;">
      <p style="color: #D4AF37; font-weight: bold; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 0.75rem;">KD CREATION PHOTOGRAPHY • LUXURY WEDDING FILM STUDIO</p>
      <h1 style="font-size: 2.75rem; color: #D4AF37; font-family: serif; margin: 1rem 0; line-height: 1.15;">WE TURN YOUR WEDDING INTO A TIMELESS FILM</h1>
      <p style="font-size: 1.2rem; line-height: 1.6; max-width: 820px; margin: 0 auto; opacity: 0.9;">
        KD Creation Photography (also widely known as KD Creations or KD Creation Studio) is Ahmedabad’s premier luxury wedding photographer and 4K anamorphic cinema studio located in Bapunagar, Ahmedabad, Gujarat.
      </p>
    </header>

    <section style="margin-bottom: 3rem; border-top: 1px solid rgba(212,175,55,0.3); padding-top: 2rem;">
      <h2 style="font-size: 1.85rem; color: #D4AF37; font-family: serif; margin-bottom: 1.25rem;">Our Core Services & Specializations in Ahmedabad</h2>
      <ul style="line-height: 2.2; font-size: 1.05rem; list-style: square; padding-left: 2rem;">
        <li><a href="/wedding-photographer-ahmedabad" style="color: #D4AF37; font-weight: 600;">Luxury Wedding Photography</a>: Bespoke candid, traditional, and fine-art editorial bridal photography.</li>
        <li><a href="/wedding-videographer-ahmedabad" style="color: #D4AF37; font-weight: 600;">4K Anamorphic Wedding Cinematography</a>: 2.39:1 widescreen films with master color grading and live sound design.</li>
        <li><a href="/pre-wedding-photographer-ahmedabad" style="color: #D4AF37; font-weight: 600;">Cinematic Pre-Wedding Shoots</a>: Concept films shot across Gujarat stepwells, heritage havelis, and desert dunes.</li>
        <li><a href="/photo-editing-services-ahmedabad" style="color: #D4AF37; font-weight: 600;">Professional Photo Editing & Retouching</a>: Magazine-grade beauty skin retouching and archival color calibration.</li>
        <li><a href="/video-editing-services-ahmedabad" style="color: #D4AF37; font-weight: 600;">Cinematic Video Editing & Color Grading</a>: Multi-camera 4K DaVinci Resolve editing and viral Instagram reels.</li>
        <li><a href="/album-designing-services-ahmedabad" style="color: #D4AF37; font-weight: 600;">Handcrafted Heirloom Albums</a>: Genuine Italian leather flush-mount photobooks with non-tearable metallic pages.</li>
      </ul>
    </section>

    <section style="margin-bottom: 3rem; border-top: 1px solid rgba(212,175,55,0.3); padding-top: 2rem;">
      <h2 style="font-size: 1.85rem; color: #D4AF37; font-family: serif; margin-bottom: 1rem;">Studio Leadership & Location</h2>
      <p style="line-height: 1.8; font-size: 1.05rem; opacity: 0.9;">
        Directed by <strong>Mahesh Parmar</strong> (Founder of KD Group & Creative Director), <strong>Harshad Chavda</strong> (Co-Founder & Master Cinematographer), and <strong>Aniket Vaghela</strong> (Co-Founder & Creative Head of Post-Production). Headquartered in <strong>Bapunagar, Ahmedabad, Gujarat 380024</strong>. Serving Ahmedabad, Gandhinagar, Vadodara, Surat, Rajkot, Udaipur, Jaipur, Goa, and destination weddings worldwide.
      </p>
      <p style="margin-top: 1.25rem; font-size: 1.05rem;">
        <strong>Phone / WhatsApp:</strong> <a href="tel:+919033032922" style="color: #D4AF37;">+91 90330 32922</a> &nbsp;|&nbsp; <strong>Email:</strong> <a href="mailto:kdcreationwedding@gmail.com" style="color: #D4AF37;">kdcreationwedding@gmail.com</a>
      </p>
    </section>
  </div>
`;

let rootIndexHtml = fs.readFileSync(templatePath, "utf-8");
rootIndexHtml = rootIndexHtml.replace(
  /<div id=["']root["']>.*?<\/div>/s,
  `<div id="root">${homepagePreRendered}</div>`
);
fs.writeFileSync(templatePath, rootIndexHtml, "utf-8");
console.log("Pre-rendered root homepage dist/index.html with semantic content!");

console.log(`Successfully pre-rendered ${routes.length} routes + root homepage with unique canonicals, meta tags, and H1 headings!`);
