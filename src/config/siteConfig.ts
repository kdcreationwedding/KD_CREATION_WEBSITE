export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  cta: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  couple: string;
  location: string;
  year: string;
  category: 'Royal Wedding' | 'Destination' | 'Pre-Wedding' | 'Cinematic Film';
  description: string;
  heroImage: string;
  videoUrl?: string;
  gallery: string[];
  highlights: string[];
  bts: string;
}

export interface Testimonial {
  id: string;
  couple: string;
  location: string;
  portrait: string;
  quote: string;
  weddingDate: string;
}

export interface FounderItem {
  id: string;
  name: string;
  role: string;
  badge: string;
  tagline: string;
  bio: string;
  image: string;
  instagram?: string;
  email?: string;
}

export interface InstagramPostItem {
  id: string;
  shortcode: string;
  title: string;
  url: string;
}

export const SITE_CONFIG = {
  brand: {
    name: "KD CREATION",
    tagline: "WE TURN YOUR WEDDING INTO A TIMELESS FILM.",
    subheading: "Wedding Photography • Cinematography • Films • Reels",
    officialLogo: "/assets/kd-logo.jpg",
    logoAlt: "KD CREATION Official Monogram Brand Logo",
    foundedYear: 2018,
    location: "Mumbai & Worldwide",
    instagramHandle: "@kdcreation.in",
    instagramUrl: "https://www.instagram.com/kdcreation.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    youtubeUrl: "https://youtube.com/@kdcreationwedding?si=9j18Y9E_eXxGWrIW",
    email: "kdcreationwedding@gmail.com",
    phone: "+91 7859894521"
  },

  // Founders & Executive Leadership
  founders: [
    {
      id: "mahesh-parmar",
      name: "Mr. Mahesh Parmar",
      role: "Founder of KD Group",
      badge: "FOUNDER & CEO",
      tagline: "Executive Director & Visionary Leader of KD Group",
      bio: "Pioneering the overarching strategic vision and business expansion behind KD Group, elevating luxury wedding visual arts into timeless cinematic legacies.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85",
      instagram: "https://www.instagram.com/kdcreation.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      email: "kdcreationwedding@gmail.com"
    },
    {
      id: "harshad-chawda",
      name: "Mr. Harshad Chawda",
      role: "Co-Founder of KD Creation",
      badge: "CO-FOUNDER & MASTER CINEMATOGRAPHER",
      tagline: "Head of Cinematography & Camera Operations",
      bio: "Master cinematographer heading all camera technology, 4K anamorphic cinema gear matrix, specialized lighting setups, and live on-location shoot direction.",
      image: "/assets/harshad-chawda.jpg",
      instagram: "https://www.instagram.com/harshhhad.18?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      email: "chavdaharshad529@gmail.com"
    },
    {
      id: "aniket-vaghela",
      name: "Mr. Aniket Vaghela",
      role: "Co-Founder of KD Creation",
      badge: "CO-FOUNDER & CREATIVE / POST-PRODUCTION HEAD",
      tagline: "Head of Creativity, Editing & Studio Backoffice",
      bio: "Leading creative direction, post-production 4K editing suite, cinematic color matrix grading, sound design, and studio backoffice operations.",
      image: "/assets/aniket-vaghela.jpg",
      instagram: "https://www.instagram.com/the.aniketvaghela?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      email: "ajvaghela15300@gmail.com"
    }
  ] as FounderItem[],

  // Centralized Spline 3D Scene URL — Easily replaceable
  SPLINE_SCENE_URL: "https://prod.spline.design/6Wnt1MY7Y69uP30W/scene.splinecode",

  // Centralized WhatsApp Configuration
  WHATSAPP: {
    number: "917859894521",
    displayNumber: "+91 7859894521",
    defaultGreeting: "Hi KD CREATION, I would like to check availability and packages for my wedding."
  },

  // Backend Security Configuration Placeholders
  ENV: {
    AI_API_KEY: (import.meta as any).env?.VITE_AI_API_KEY || "",
    SUPABASE_URL: (import.meta as any).env?.VITE_SUPABASE_URL || "",
    SUPABASE_ANON_KEY: (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || ""
  },

  // Specific Individual Instagram Posts / Reels from @kdcreation.in
  // You can replace any shortcode with your exact post/reel shortcode (e.g. from instagram.com/p/SHORTCODE/)
  instagramFeed: [
    {
      id: "post-1",
      shortcode: "C5x1A2b3C4", // Replace with your exact Instagram Reel shortcode
      title: "Royal Udaipur Wedding Film Reel",
      url: "https://www.instagram.com/kdcreation.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
    },
    {
      id: "post-2",
      shortcode: "C4y2B3c4D5", // Replace with your exact Instagram Photo shortcode
      title: "Fine-Art Bride Editorial Portrait",
      url: "https://www.instagram.com/kdcreation.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
    },
    {
      id: "post-3",
      shortcode: "C3z3C4d5E6", // Replace with your exact Instagram Reel shortcode
      title: "Lake Como Sunset Romance Teaser",
      url: "https://www.instagram.com/kdcreation.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
    },
    {
      id: "post-4",
      shortcode: "C2w4D5e6F7", // Replace with your exact Instagram Post shortcode
      title: "Beachfront Mandap Sunset Pheras",
      url: "https://www.instagram.com/kdcreation.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
    },
    {
      id: "post-5",
      shortcode: "C1v5E6f7G8", // Replace with your exact Instagram Reel shortcode
      title: "Pre-Wedding Cinematic Love Story",
      url: "https://www.instagram.com/kdcreation.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
    },
    {
      id: "post-6",
      shortcode: "C6u6F7g8H9", // Replace with your exact Instagram Post shortcode
      title: "Italian Handcrafted Leather Album",
      url: "https://www.instagram.com/kdcreation.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
    }
  ] as InstagramPostItem[],

  // Services Directory
  services: [
    {
      id: "wedding-photography",
      title: "WEDDING PHOTOGRAPHY",
      subtitle: "Editorial & Emotional Still Frames",
      description: "Editorial photographs capturing every unscripted emotion, regal details, and timeless grandeur with fine-art precision.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
      features: ["Editorial Couple Portraits", "Candid Emotional Moments", "Fine-Art Detail Shots", "High-Resolution Master Retouching"],
      cta: "GET DETAILS"
    },
    {
      id: "wedding-cinematography",
      title: "WEDDING CINEMATOGRAPHY",
      subtitle: "Full-Length 4K Cinema Feature Films",
      description: "Cinematic storytelling crafted with high-end anamorphic optics, custom sound design, color grading, and emotional narrative flow.",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
      features: ["Anamorphic Cinema 4K", "Custom Original Sound Design", "Hollywood Grade Color Matrix", "Aerial Drone Cinematography"],
      cta: "GET DETAILS"
    },
    {
      id: "pre-wedding-films",
      title: "PRE-WEDDING FILMS",
      subtitle: "Concept-Driven Romance Narratives",
      description: "Custom concept-driven visual love stories shot in exotic domestic or international destinations crafted around your unique journey.",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85",
      features: ["Custom Scripted Storylines", "Destination Location Scouting", "Styling & Art Direction", "Cinematic Trailer & Teasers"],
      cta: "GET DETAILS"
    },
    {
      id: "wedding-reels",
      title: "WEDDING REELS",
      subtitle: "Next-Day Ultra High-Impact Social Films",
      description: "Short-form vertical visual masterworks color-graded and synchronized to audio trends for Instagram and digital showcases.",
      image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=85",
      features: ["24-Hour Same-Day Delivery", "Vertical 9:16 Cinema Color", "Custom Sound Syncing", "High-Engaging Instagram Hooks"],
      cta: "GET DETAILS"
    },
    {
      id: "wedding-albums",
      title: "WEDDING ALBUMS",
      subtitle: "Handcrafted Luxury Heirloom Books",
      description: "Museum-quality flush mount albums handcrafted in Italy & Japan with metallic silks, genuine leather, and archival inks.",
      image: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=85",
      features: ["Italian Genuine Leather Covers", "Fuji Crystal Archival Paper", "Custom Embossing & Foil Monograms", "Lifetime Guarantee"],
      cta: "GET DETAILS"
    },
    {
      id: "complete-coverage",
      title: "COMPLETE WEDDING COVERAGE",
      subtitle: "All-Inclusive Signature Master Experience",
      description: "The complete KD CREATION experience combining full photography, 4K film production, pre-wedding, reels, and master luxury albums.",
      image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85",
      features: ["Full Director Team (10+ Crew)", "360 Multi-Camera Sync", "Live Stream Support", "Master Box Set & Heirloom Vault"],
      cta: "GET DETAILS"
    }
  ] as ServiceItem[],

  // Portfolio Items — Selected Stories
  portfolio: [
    {
      id: "story-udainivas-royal",
      title: "The Palace of Echoing Vows",
      couple: "Aanya & Devraj",
      location: "Udaipur, Rajasthan",
      year: "2025",
      category: "Royal Wedding",
      description: "A three-day regal celebration amidst the grand marble courtyards and tranquil waters of Udaipur, capturing centuries of tradition infused with modern editorial luxury.",
      heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-walking-in-a-field-42861-large.mp4",
      gallery: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=85",
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=85"
      ],
      highlights: ["Royal Baarat with 50 Musicians", "Sunset Ceremony on Lake Pichola", "Midnight Candlelit Reception"],
      bts: "Shot with RED V-Raptor and anamorphic lenses over 72 continuous hours of creative direction."
    },
    {
      id: "story-como-romance",
      title: "Whispers Over Como",
      couple: "Rhea & Rohan",
      location: "Villa d'Este, Lake Como, Italy",
      year: "2025",
      category: "Destination",
      description: "An intimate romantic getaway surrounded by Italian cypress trees, antique speedboats, and sun-kissed alpine reflections.",
      heroImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=85",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-romantic-couple-looking-at-each-other-41618-large.mp4",
      gallery: [
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85",
        "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1000&q=85",
        "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1000&q=85"
      ],
      highlights: ["Wooden Riva Boat Portrait Session", "Open Air Italian Garden Feast", "Acoustic Cellist Sunset Vows"],
      bts: "Utilized natural golden-hour directional light with vintage Leica R lenses."
    },
    {
      id: "story-goa-sunset",
      title: "Symphony of Waves",
      couple: "Natasha & Kabir",
      location: "St. Regis, Goa",
      year: "2024",
      category: "Destination",
      description: "An energetic beachfront celebration featuring floral art installations, fiery sunset pheras, and uninhibited midnight revelry.",
      heroImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-couple-walking-hand-in-hand-on-the-beach-at-sunset-41551-large.mp4",
      gallery: [
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=85",
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=85"
      ],
      highlights: ["Barefoot Ocean Mandap", "Tropical Sangeet Dance Extravaganza", "Firework Finale"],
      bts: "Dual 4K drone coverage combined with 120fps slow-motion ocean spray portraits."
    },
    {
      id: "story-prewedding-ladakh",
      title: "Above the Clouds",
      couple: "Priya & Sidharth",
      location: "Pangong Tso & Nubra, Ladakh",
      year: "2024",
      category: "Pre-Wedding",
      description: "High-altitude cinematic love story filmed against snow-capped peaks, surreal blue lakes, and dramatic desert dunes.",
      heroImage: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1400&q=85",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-couple-walking-through-a-field-42862-large.mp4",
      gallery: [
        "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1000&q=85",
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85"
      ],
      highlights: ["Sunrise Reflection at 14,000ft", "Monastery Monochromatic Portraits", "Vintage Leather Styling"],
      bts: "Extreme weather filming with specialized battery thermal wraps and gimbal stabilization."
    }
  ] as PortfolioItem[],

  // Process Stages
  process: [
    { number: "01", title: "DISCOVER", description: "In-depth creative consultation to understand your love story, aesthetic preferences, and vision." },
    { number: "02", title: "PLAN", description: "Comprehensive shot listing, moodboarding, location scouting, and lighting timeline preparation." },
    { number: "03", title: "CAPTURE", description: "Discreet, high-impact cinematography & photography during your wedding celebrations." },
    { number: "04", title: "CRAFT", description: "Bespoke color grading, sound design, music scoring, and master editorial retouching." },
    { number: "05", title: "DELIVER", description: "Handcrafted Italian leather albums, 4K film vault, and next-day social reels." }
  ],

  // Testimonials
  testimonials: [
    {
      id: "t1",
      couple: "Aanya & Devraj",
      location: "Udaipur Palace",
      portrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      quote: "KD CREATION didn't just photograph our wedding; they immortalized our emotions. Watching our wedding film felt like sitting in a premiere cinema showing our soul.",
      weddingDate: "December 2025"
    },
    {
      id: "t2",
      couple: "Rhea & Rohan",
      location: "Lake Como, Italy",
      portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      quote: "The professionalism, artistic vision, and quiet grace of the KD CREATION team blew us away. Our guests were mesmerized by the next-day reels!",
      weddingDate: "October 2025"
    },
    {
      id: "t3",
      couple: "Natasha & Kabir",
      location: "St. Regis Goa",
      portrait: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      quote: "Every single frame looks straight out of Vogue. We couldn't have chosen a more gifted team for our destination wedding.",
      weddingDate: "November 2024"
    }
  ] as Testimonial[]
};
