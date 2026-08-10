export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  cta: string;
}

export interface VideoItem {
  title: string;
  url: string;
  thumbnail?: string;
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
  modalCover?: string;
  videoUrl?: string;
  videos?: VideoItem[];
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
      image: "/assets/mahesh-parmar.jpg",
      instagram: "https://www.instagram.com/mr_mahesh_sir?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
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
      image: "/assets/yash-kavya-modal-cover.jpg",
      features: ["Editorial Couple Portraits", "Candid Emotional Moments", "Fine-Art Detail Shots", "High-Resolution Master Retouching"],
      cta: "GET DETAILS"
    },
    {
      id: "wedding-cinematography",
      title: "WEDDING CINEMATOGRAPHY",
      subtitle: "Full-Length 4K Cinema Feature Films",
      description: "Cinematic storytelling crafted with high-end anamorphic optics, custom sound design, color grading, and emotional narrative flow.",
      image: "/assets/dhaval-sangeeta-outer-cover.jpg",
      features: ["Anamorphic Cinema 4K", "Custom Original Sound Design", "Hollywood Grade Color Matrix", "Aerial Drone Cinematography"],
      cta: "GET DETAILS"
    },
    {
      id: "pre-wedding-films",
      title: "PRE-WEDDING FILMS",
      subtitle: "Concept-Driven Romance Narratives",
      description: "Custom concept-driven visual love stories shot in exotic domestic or international destinations crafted around your unique journey.",
      image: "/assets/kaushik-anjali-outer-cover.jpg",
      features: ["Custom Scripted Storylines", "Destination Location Scouting", "Styling & Art Direction", "Cinematic Trailer & Teasers"],
      cta: "GET DETAILS"
    },
    {
      id: "wedding-reels",
      title: "WEDDING REELS",
      subtitle: "Next-Day Ultra High-Impact Social Films",
      description: "Short-form vertical visual masterworks color-graded and synchronized to audio trends for Instagram and digital showcases.",
      image: "/assets/DHAVAL & SANGEETA/DS PRE W (2).jpg",
      features: ["24-Hour Same-Day Delivery", "Vertical 9:16 Cinema Color", "Custom Sound Syncing", "High-Engaging Instagram Hooks"],
      cta: "GET DETAILS"
    },
    {
      id: "wedding-albums",
      title: "LUXURY HEIRLOOM ALBUMS",
      subtitle: "Original Genuine Leather & International Quality",
      description: "Handcrafted luxury photo books created with original genuine leather covers, museum-quality HD non-tearable metallic pages, precision color calibration, and international finishing standards.",
      image: "/assets/vishwa-dhawal-modal-cover.jpg",
      features: ["Original Genuine Leather Covers", "International Quality Handcrafted Finish", "Fuji Archival HD Non-Tearable Pages", "Custom Gold Embossing & Heirloom Wooden Box Vault", "Lifetime Print & Color Guarantee"],
      cta: "GET DETAILS"
    },
    {
      id: "complete-coverage",
      title: "COMPLETE WEDDING COVERAGE",
      subtitle: "All-Inclusive Signature Master Experience",
      description: "The complete KD CREATION experience combining full photography, 4K film production, pre-wedding, reels, and master luxury albums.",
      image: "/assets/vishwa-dhawal-outer-cover.jpg",
      features: ["Full Director Team (10+ Crew)", "360 Multi-Camera Sync", "Live Stream Support", "Master Box Set & Heirloom Vault"],
      cta: "GET DETAILS"
    }
  ] as ServiceItem[],

  // Portfolio Items — Selected Stories
  portfolio: [
    {
      id: "story-yash-kavya-ahmedabad",
      title: "The Heritage Grandeur",
      couple: "Yash & Kavya",
      location: "Ahmedabad, Gujarat",
      year: "2026",
      category: "Royal Wedding",
      description: "An opulent celebration blending rich Gujarati heritage, royal decor, and timeless cinematic moments captured with 4K anamorphic clarity.",
      heroImage: "/assets/yash-kavya-outer-cover.jpg",
      modalCover: "/assets/yash-kavya-modal-cover.jpg",
      videoUrl: "/assets/YASH & KAVYA/KD Creation - Roka.mp4",
      videos: [
        { title: "Yash & Kavya — Roka Ceremony Film", url: "/assets/YASH & KAVYA/KD Creation - Roka.mp4" }
      ],
      gallery: [
        "/assets/YASH & KAVYA/Yash & kavya.jpg",
        "/assets/YASH & KAVYA/Yash & kavya - Copy.jpg",
        "/assets/YASH & KAVYA/Yash & kavya - Copy - Copy.jpg",
        "/assets/YASH & KAVYA/Yash & kavya - Copy - Copy (2).jpg",
        "/assets/YASH & KAVYA/Yash & kavya - Copy - Copy (2) - Copy.jpg",
        "/assets/YASH & KAVYA/Yash & kavya - Copy - Copy (3).jpg",
        "/assets/YASH & KAVYA/Yash & kavya - Copy - Copy (3) - Copy.jpg",
        "/assets/YASH & KAVYA/Yash & kavya - Copy - Copy (4).jpg",
        "/assets/YASH & KAVYA/Yash & kavya - Copy - Copy (4) - Copy.jpg",
        "/assets/YASH & KAVYA/Yash & kavya - Copy - Copy (5) - Copy.jpg"
      ],
      highlights: ["Grand Royal Baarat Extravaganza", "Heritage Palace Mandap Ceremony", "Candlelit Gala Night"],
      bts: "Shot with 4K anamorphic cine lenses and specialized lighting setups."
    },
    {
      id: "story-dhaval-sangeeta-ahmedabad",
      title: "Two Souls — A Journey of Love",
      couple: "Dhaval & Sangeeta",
      location: "Ahmedabad, Gujarat",
      year: "2026",
      category: "Destination",
      description: "In black and white, love speaks louder than colors. A beautiful journey where two souls choose each other, captured with pure 4K cinematic connection.",
      heroImage: "/assets/dhaval-sangeeta-outer-cover.jpg",
      modalCover: "/assets/dhaval-sangeeta-modal-cover.jpg",
      videoUrl: "/assets/DHAVAL & SANGEETA/Pre-Wedding_Teaser + Song(Dhawal & Sangita).mp4",
      videos: [
        { title: "Dhaval & Sangeeta — Pre-Wedding Teaser + Song Film", url: "/assets/DHAVAL & SANGEETA/Pre-Wedding_Teaser + Song(Dhawal & Sangita).mp4" },
        { title: "Dhaval & Sangeeta — Pre-Wedding High-Impact Reel", url: "/assets/DHAVAL & SANGEETA/Pre-Wedding_REEL.mp4" }
      ],
      gallery: [
        "/assets/DHAVAL & SANGEETA/DHAVAL & SANDEETA PRE - Copy (4).jpg",
        "/assets/DHAVAL & SANGEETA/DHAVAL & SANDEETA PRE - Copy (5).jpg",
        "/assets/DHAVAL & SANGEETA/DHAVAL & SANGITA POST 01.jpg",
        "/assets/DHAVAL & SANGEETA/DHAVAL & SANGITA POST 02.jpg",
        "/assets/DHAVAL & SANGEETA/DHAVAL & SANGITA POST 03.jpg",
        "/assets/DHAVAL & SANGEETA/DHAVAL & SANGITA POST 04.jpg",
        "/assets/DHAVAL & SANGEETA/DHAVAL & SANGITA POST 05.jpg",
        "/assets/DHAVAL & SANGEETA/DHAVAL & SANGITA POST 06.jpg",
        "/assets/DHAVAL & SANGEETA/DS PRE W (2).jpg",
        "/assets/DHAVAL & SANGEETA/DS PRE W (3).jpg",
        "/assets/DHAVAL & SANGEETA/DS WEDDING (1).jpg",
        "/assets/DHAVAL & SANGEETA/DS WEDDING (3).jpg",
        "/assets/DHAVAL & SANGEETA/Dhaval & Sangita ......jpg",
        "/assets/DHAVAL & SANGEETA/Dhaval & Sangita....jpg",
        "/assets/DHAVAL & SANGEETA/KD_09678.jpg",
        "/assets/DHAVAL & SANGEETA/KD_09784.jpg",
        "/assets/DHAVAL & SANGEETA/KD_09786.jpg"
      ],
      highlights: ["Sunset Lakefront Portrait Session", "Emotional Mandap Ceremony", "Candlelit Gala Night"],
      bts: "Filmed in 4K anamorphic cinema with golden hour natural directional lighting."
    },
    {
      id: "story-kaushik-anjali-ahmedabad",
      title: "Symphony of Grace",
      couple: "Kaushik & Anjali",
      location: "Ahmedabad, Gujarat",
      year: "2025",
      category: "Pre-Wedding",
      description: "A joyful celebration of hand-in-hand devotion, lush mint green ethnic elegance, and timeless romantic moments captured in fine-art 4K cinema.",
      heroImage: "/assets/kaushik-anjali-outer-cover.jpg",
      modalCover: "/assets/kaushik-anjali-modal-cover.jpg",
      videoUrl: "/assets/kaushik & anjali/KAUSHIK HIGH LIGHT HC.mp4",
      videos: [
        { title: "Kaushik Highlight Cinema (Part 1)", url: "/assets/kaushik & anjali/KAUSHIK HIGH LIGHT HC.mp4" },
        { title: "Kaushik Highlight Cinema (Part 2)", url: "/assets/kaushik & anjali/KAUSHIK HIGH LIGHT HC_1.mp4" },
        { title: "Kaushik Highlight Cinema (Part 3)", url: "/assets/kaushik & anjali/KAUSHIK HIGH LIGHT HC_2.mp4" },
        { title: "Anjali Highlights Special Cinema Feature", url: "/assets/kaushik & anjali/Anjali highlits.mp4" }
      ],
      gallery: [
        "/assets/kaushik & anjali/DSC01971.JPG",
        "/assets/kaushik & anjali/DSC01993.JPG",
        "/assets/kaushik & anjali/DSC01997.JPG",
        "/assets/kaushik & anjali/DSC02026.JPG",
        "/assets/kaushik & anjali/DSC02030.JPG",
        "/assets/kaushik & anjali/DSC02032.JPG"
      ],
      highlights: ["Hand-in-Hand Fine-Art Portrait", "Mint Green Heritage Walk", "Sunset Garden Celebrations"],
      bts: "Captured with natural ambient light and 85mm prime portrait lenses."
    },
    {
      id: "story-vishwa-dhawal-ahmedabad",
      title: "Royal Vow Ceremony",
      couple: "Vishwa & Dhawal",
      location: "Ahmedabad, Gujarat",
      year: "2024",
      category: "Royal Wedding",
      description: "An authentic Gujarati royal wedding adorned with regal maroon lehengas, floral chhadar bridal entries, and sacred Varmala traditions.",
      heroImage: "/assets/vishwa-dhawal-outer-cover.jpg",
      modalCover: "/assets/vishwa-dhawal-modal-cover.jpg",
      gallery: [
        "/assets/vishva & Dhaval 8 jan 2024/1091  KD Designing.JPG",
        "/assets/vishva & Dhaval 8 jan 2024/1125  KD Designing.JPG",
        "/assets/vishva & Dhaval 8 jan 2024/1387  KD Designing.JPG",
        "/assets/vishva & Dhaval 8 jan 2024/Vishva (1).jpg",
        "/assets/vishva & Dhaval 8 jan 2024/Vishva (3).JPG",
        "/assets/vishva & Dhaval 8 jan 2024/Vishva (4).jpg"
      ],
      highlights: ["Phoolon Ki Chhadar Grand Entry", "Sacred Varmala Vow Exchange", "Royal Mandap Ceremony"],
      bts: "Shot with fine-art portrait lenses and high-resolution studio lighting."
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
