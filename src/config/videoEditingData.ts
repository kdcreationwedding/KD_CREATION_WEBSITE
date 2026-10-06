export interface VideoEditingProject {
  id: string;
  folderId: string;
  title: string;
  client: string;
  eventDate: string;
  aspectRatio: string; // e.g. "2.39:1 CinemaScope", "9:16 Vertical", "16:9 4K UHD"
  duration: string; // e.g. "01:30", "08:45", "00:54"
  resolution: string; // e.g. "4K 60FPS", "4K 24FPS DCI", "1080x1920 60FPS"
  software: string[]; // e.g. ["DaVinci Resolve Studio", "Premiere Pro", "After Effects"]
  tags: string[]; // e.g. ["Beat Sync", "Sound Design", "Film Emulation", "Multi-Cam"]
  thumbnail: string;
  videoUrl: string;
  description: string;
  keyFeature: string;
}

export interface VideoEditingFolder {
  id: string;
  folderCode: string;
  name: string;
  nameGujarati: string;
  badge: string;
  iconName: 'Film' | 'Video' | 'Smartphone' | 'Sliders' | 'Sparkles' | 'Scissors';
  description: string;
  softwareStack: string[];
  workflowHighlights: string[];
}

export const VIDEO_EDITING_FOLDERS: VideoEditingFolder[] = [
  {
    id: 'wedding-teasers',
    folderCode: 'DIR_01_TEASERS',
    name: 'Wedding Teasers & Trailers',
    nameGujarati: 'વેડિંગ ટીઝર અને સિનેમેટિક ટ્રેલર્સ',
    badge: 'CINEMASCOPE 2.39:1 / 4K',
    iconName: 'Film',
    description: 'High-impact, suspenseful 60–90 second cinematic teasers cut with orchestral swell, dialogue cues, and anamorphic letterboxing.',
    softwareStack: ['DaVinci Resolve Studio 19', 'Adobe Premiere Pro', 'Logic Pro X (Sound FX)'],
    workflowHighlights: ['Anamorphic Crop 2.39:1', 'Dynamic Sound Foley & Whoosh', 'Emotional Dialog Snips', '48h Priority Render']
  },
  {
    id: 'feature-films',
    folderCode: 'DIR_02_HIGHLIGHTS',
    name: 'Cinematic Highlights & Feature Films',
    nameGujarati: 'સિનેમેટિક હાઇલાઇટ્સ અને ફુલ વેડિંગ ફિલ્મ્સ',
    badge: 'NARRATIVE 4K MASTER (5-12 MIN)',
    iconName: 'Video',
    description: 'Bespoke storytelling that fuses multi-camera 4K angles, heartfelt vows, live cheers, and custom color grading into a timeless documentary.',
    softwareStack: ['DaVinci Resolve Studio 19', 'Premiere Pro', 'iZotope RX 10 Audio Restoration'],
    workflowHighlights: ['Multi-Cam 4K Synchronization', 'Vows & Speeches Audio Clean', 'Three-Act Narrative Flow', 'DCI-P3 Color Space']
  },
  {
    id: 'pre-wedding-concepts',
    folderCode: 'DIR_03_PREWEDDING',
    name: 'Pre-Wedding Concept Edits & Music Films',
    nameGujarati: 'પ્રી-વેડિંગ સિનેમેટિક મ્યુઝિક સ્ટોરીઝ',
    badge: 'STORYBOARD & LYRIC SYNC',
    iconName: 'Sparkles',
    description: 'Stylized music videos featuring speed-ramped emotional transitions, slow-motion poetry, and scenic drone establishing shots.',
    softwareStack: ['Premiere Pro', 'After Effects', 'DaVinci Resolve Studio'],
    workflowHighlights: ['Lyric & Beat Drop Sync', 'Atmospheric Ambience Audio', 'Speed Ramping 120 FPS to 24 FPS', 'Film Emulation LUTs']
  },
  {
    id: 'reels-vertical',
    folderCode: 'DIR_04_REELS_9X16',
    name: 'Instagram 9:16 Viral Reels & Shorts',
    nameGujarati: 'ઇન્સ્ટાગ્રામ વાયરલ રીલ્સ (9:16)',
    badge: 'VERTICAL 9:16 / MOBILE OLED',
    iconName: 'Smartphone',
    description: 'Fast-paced, hook-driven edits built specifically for mobile screens with vibrant contrast, rhythmic beat cuts, and kinetic titles.',
    softwareStack: ['Premiere Pro', 'DaVinci Resolve Studio', 'Adobe After Effects'],
    workflowHighlights: ['Immediate 3-Second Hook', 'Punchy Bass Beat Syncing', 'Mobile OLED HDR Contrast', 'Kinetic Typography']
  },
  {
    id: 'ceremony-rituals',
    folderCode: 'DIR_05_RITUALS',
    name: 'Ceremony & Ritual Highlights',
    nameGujarati: 'વિધિ અને ઉત્સવ સ્પેશિયલ એડિટ્સ (હળદી, સંગીત, ફેરા)',
    badge: 'RITUAL & CULTURAL EMOTION',
    iconName: 'Scissors',
    description: 'Dedicated ceremony cuts: Haldi splash slow-mo, high-energy Sangeet choreography cuts, and emotional Mandap Pheras pacing.',
    softwareStack: ['Adobe Premiere Pro', 'DaVinci Resolve Studio'],
    workflowHighlights: ['Haldi Yellow Warmth Retention', 'Sangeet Multi-Cam Dance Cuts', 'Sacred Mantras Clean Sound', 'Emotional Family Reactions']
  },
  {
    id: 'color-grading-suite',
    folderCode: 'DIR_06_COLOR_STUDIO',
    name: 'DaVinci Resolve Color Grading Suite',
    nameGujarati: 'કલર ગ્રેડિંગ & LUT ફિલ્મ એમ્યુલેશન',
    badge: 'LOG TO REC.709 & FILM LOOK',
    iconName: 'Sliders',
    description: 'Hardware node-based color grading transforming raw Sony S-Log3 and Apple ProRes into cinematic Kodak 2383 film stock tones.',
    softwareStack: ['DaVinci Resolve Studio 19', 'Hardware Grading Panels', 'Color Calibrated 10-bit Displays'],
    workflowHighlights: ['Kodak 2383 Film Emulation', 'Organic Film Grain & Halation', 'True Skin Tone Isolation', 'ACES & DaVinci Color Science']
  }
];

export const VIDEO_EDITING_PROJECTS: VideoEditingProject[] = [
  // Folder 1: Wedding Teasers & Trailers
  {
    id: 'teaser-yash-kavya',
    folderId: 'wedding-teasers',
    title: 'Yash & Kavya — Royal Roka 4K Official Teaser',
    client: 'Yash & Kavya',
    eventDate: 'Grand Roka Ceremony',
    aspectRatio: '2.39:1 CinemaScope',
    duration: '01:45',
    resolution: '4K UHD 60FPS Master',
    software: ['DaVinci Resolve Studio 19', 'Adobe Premiere Pro', 'Logic Pro'],
    tags: ['Anamorphic Crop', 'Cinematic Sound Design', 'Dramatic Ramping', 'Gold Hue Grade'],
    thumbnail: 'assets/yash-kavya-outer-cover.jpg',
    videoUrl: 'https://youtu.be/3i1-aJcasSg',
    description: 'Fast-paced cinematic teaser highlighting the royal grand entry, emotional parents blessings, and high-energy floral showers.',
    keyFeature: 'Custom acoustic score with orchestral rise & bass drop'
  },
  {
    id: 'teaser-kaushik-anjali',
    folderId: 'wedding-teasers',
    title: 'Kaushik & Anjali — Royal Wedding Cinema Trailer',
    client: 'Kaushik & Anjali',
    eventDate: 'Royal Wedding Celebration',
    aspectRatio: '2.39:1 CinemaScope',
    duration: '02:10',
    resolution: '4K 24FPS DCI Master',
    software: ['DaVinci Resolve Studio 19', 'Premiere Pro'],
    tags: ['Anamorphic Letterbox', 'Dialogue Voiceover', 'Film Grain', 'Bass Foley'],
    thumbnail: 'assets/kaushik-anjali-outer-cover.jpg',
    videoUrl: 'https://youtu.be/DPSPFKgsDs4',
    description: 'Trailer featuring bride voiceover vows, fireworks slow-motion, and majestic palace entry with rich royal red and gold grading.',
    keyFeature: 'Seamless bride-entry voiceover overlaid on cinematic crescendo'
  },
  {
    id: 'teaser-dhaval-sangeeta',
    folderId: 'wedding-teasers',
    title: 'Dhaval & Sangeeta — Pre-Wedding Cinematic Teaser',
    client: 'Dhaval & Sangeeta',
    eventDate: 'Pre-Wedding Celebration',
    aspectRatio: '16:9 4K Cinema',
    duration: '01:15',
    resolution: '4K 60FPS Smooth',
    software: ['Adobe Premiere Pro', 'DaVinci Resolve Studio'],
    tags: ['Speed Ramp 120fps', 'Lens Flare FX', 'Golden Hour Grade', 'Beat Snips'],
    thumbnail: 'assets/dhaval-sangeeta-outer-cover.jpg',
    videoUrl: 'https://youtu.be/mJ49EXaTXO8',
    description: 'High-energy romance teaser cut to a pulsating beat with sunset backlights and dramatic speed transitions.',
    keyFeature: 'Sub-second speed ramps synchronized to percussion'
  },

  // Folder 2: Feature Films & Highlights
  {
    id: 'film-kaushik-anjali-highlights',
    folderId: 'feature-films',
    title: 'Kaushik & Anjali — Royal Wedding Highlights Film',
    client: 'Kaushik & Anjali',
    eventDate: 'Full Wedding Ceremony',
    aspectRatio: '16:9 4K UHD Master',
    duration: '07:35',
    resolution: '4K ProRes Master',
    software: ['DaVinci Resolve Studio 19', 'Premiere Pro', 'iZotope RX 10'],
    tags: ['Multi-Cam Sync (4 Cameras)', 'Dialogue & Vows Restoration', 'Three-Act Emotional Arc'],
    thumbnail: 'assets/kaushik-anjali-modal-cover.jpg',
    videoUrl: 'https://youtu.be/DPSPFKgsDs4',
    description: 'Full narrative highlight film following the three-act wedding journey: morning quiet anticipation, ceremonial vows, and midnight reception celebration.',
    keyFeature: 'Multi-cam 4-camera synchronization with isolated lapel audio'
  },
  {
    id: 'film-yash-kavya-roka-film',
    folderId: 'feature-films',
    title: 'Yash & Kavya — Grand Roka Ceremony 4K Film',
    client: 'Yash & Kavya',
    eventDate: 'Roka Celebration Film',
    aspectRatio: '16:9 4K UHD Master',
    duration: '05:42',
    resolution: '4K 60FPS UHD',
    software: ['DaVinci Resolve Studio 19', 'Adobe Premiere Pro'],
    tags: ['Family Narrative Cut', 'Ambient Audio Mix', 'True Skin Tones', 'Gimbal Flow'],
    thumbnail: 'assets/yash-kavya-modal-cover.jpg',
    videoUrl: 'https://youtu.be/3i1-aJcasSg',
    description: 'Emotional documentary highlighting family speeches, ring exchange intimacy, and spontaneous laughter with natural studio acoustic mix.',
    keyFeature: 'Balanced speech levels amidst loud live Indian orchestra'
  },
  {
    id: 'film-vishwa-dhawal-story',
    folderId: 'feature-films',
    title: 'Vishwa & Dhaval — Heritage Wedding Narrative Film',
    client: 'Vishwa & Dhaval',
    eventDate: 'Heritage Wedding Film',
    aspectRatio: '16:9 4K UHD Master',
    duration: '06:18',
    resolution: '4K Ultra High Definition',
    software: ['DaVinci Resolve Studio 19', 'Adobe Premiere Pro'],
    tags: ['Story Arc', 'Mandap Pheras Vows', 'Warm Heritage Color Palette', 'Drone Perspective'],
    thumbnail: 'assets/vishwa-dhawal-modal-cover.jpg',
    videoUrl: 'https://youtu.be/DPSPFKgsDs4',
    description: 'Timeless heirloom wedding film designed with authentic cultural pacing, heartfelt family moments, and cinematic framing.',
    keyFeature: 'Film curve tonal transition preserving sacred flame highlights'
  },

  // Folder 3: Pre-Wedding Concepts & Music Films
  {
    id: 'prewed-dhaval-sangeeta-full',
    folderId: 'pre-wedding-concepts',
    title: 'Dhaval & Sangeeta — Pre-Wedding Teaser & Song Film',
    client: 'Dhaval & Sangeeta',
    eventDate: 'Pre-Wedding Music Film',
    aspectRatio: '2.39:1 CinemaScope',
    duration: '04:12',
    resolution: '4K Cinematic 24P',
    software: ['Adobe Premiere Pro', 'DaVinci Resolve Studio', 'After Effects'],
    tags: ['Lyrical Sync', 'Dreamy Pastel Grade', '120fps Slow-Mo', 'Foley Soundscape'],
    thumbnail: 'assets/service-prewedding-dhaval-sangita.jpg',
    videoUrl: 'https://youtu.be/mJ49EXaTXO8',
    description: 'Musical romance film featuring poetic movement, natural eye-contact pauses, and picturesque landscape cinematography.',
    keyFeature: 'Custom lyric typography and beat-aligned motion'
  },
  {
    id: 'prewed-desert-sunset-story',
    folderId: 'pre-wedding-concepts',
    title: 'Sun-Kissed Romance — Concept Narrative Edit',
    client: 'KD Studio Showcase',
    eventDate: 'Destination Pre-Wedding',
    aspectRatio: '2.39:1 CinemaScope',
    duration: '03:30',
    resolution: '4K DCI Film Master',
    software: ['DaVinci Resolve Studio', 'Premiere Pro'],
    tags: ['Golden Hour LUT', 'Wind Foley Audio', 'Speed Ramps', 'Anamorphic Flares'],
    thumbnail: 'assets/service-prewedding-rakhi.jpg',
    videoUrl: 'https://youtu.be/mJ49EXaTXO8',
    description: 'Bespoke editorial romantic music video featuring sunset dunes, veil flow dynamics, and rich warm film emulation.',
    keyFeature: 'Organic wind & footsteps audio foley layered under acoustic guitar'
  },

  // Folder 4: Instagram 9:16 Viral Reels
  {
    id: 'reel-dhaval-sangeeta-viral',
    folderId: 'reels-vertical',
    title: 'Dhaval & Sangeeta — High-Impact Cinema Reel (9:16)',
    client: 'Dhaval & Sangeeta',
    eventDate: 'Viral Instagram Highlight',
    aspectRatio: '9:16 Vertical Reel',
    duration: '00:48',
    resolution: '1080x1920 60FPS Smooth',
    software: ['Adobe Premiere Pro', 'DaVinci Resolve Studio', 'CapCut Studio'],
    tags: ['9:16 Vertical Crop', 'Trend Beat Sync', 'High Saturation Contrast', 'Instant Hook'],
    thumbnail: 'assets/dhaval-sangeeta-g1.jpg',
    videoUrl: 'https://youtu.be/x7782vFootg',
    description: 'Tailored for Instagram feeds & algorithms with an immediate 2-second hook, bass punch, and saturated colors optimized for mobile screens.',
    keyFeature: '60 FPS hyper-fluid vertical motion with frame-accurate bass sync'
  },
  {
    id: 'reel-yash-kavya-entry',
    folderId: 'reels-vertical',
    title: 'Yash & Kavya — Royal Entry & Fireworks (9:16)',
    client: 'Yash & Kavya',
    eventDate: 'Entry Special Reel',
    aspectRatio: '9:16 Vertical Reel',
    duration: '00:35',
    resolution: '1080x1920 60FPS',
    software: ['DaVinci Resolve Studio', 'Premiere Pro'],
    tags: ['Cold Pyro Spark Sync', 'Crowd Roar Foley', 'Mobile OLED HDR', 'Beat Drop'],
    thumbnail: 'assets/yash-kavya-g2.jpg',
    videoUrl: 'https://youtu.be/3i1-aJcasSg',
    description: 'Adrenaline-filled couple entry reel with sync on cold firework sparks and crowd cheer drop.',
    keyFeature: 'Dynamic audio sidechain ducking under dramatic entry announcement'
  },
  {
    id: 'reel-bridal-royalty-solo',
    folderId: 'reels-vertical',
    title: 'Royal Bride — Elegance & Lehenga Twirl (9:16)',
    client: 'Bridal Portrait Studio',
    eventDate: 'Bridal Solo Reel',
    aspectRatio: '9:16 Vertical Reel',
    duration: '00:30',
    resolution: '1080x1920 60FPS',
    software: ['Premiere Pro', 'DaVinci Resolve Studio'],
    tags: ['Slow-Mo 120fps Twirl', 'Jewelry Shimmer Highlights', 'Luxury Warm Tones'],
    thumbnail: 'assets/service-bride-mirror.jpg',
    videoUrl: 'https://youtu.be/x7782vFootg',
    description: 'Fine-art editorial bridal reel with jewel sparkle enhancement, lehenga flare speed ramping, and classical sitar audio sync.',
    keyFeature: 'Subtle shimmer highlights tracking bridal jewelry'
  },

  // Folder 5: Ceremony & Ritual Highlights
  {
    id: 'ceremony-haldi-splash',
    folderId: 'ceremony-rituals',
    title: 'Haldi Sunshine — Flower Petals & Water Splash Cut',
    client: 'Haldi Madness Edit',
    eventDate: 'Haldi Ceremony Special',
    aspectRatio: '16:9 4K UHD Master',
    duration: '02:20',
    resolution: '4K 60FPS High-Frame',
    software: ['DaVinci Resolve Studio 19', 'Adobe Premiere Pro'],
    tags: ['Yellow Hue Isolation', 'Water Splash Speed Ramp', 'Laughs & Dhol Sync'],
    thumbnail: 'assets/service-wedding-joyful.jpg',
    videoUrl: 'https://youtu.be/3i1-aJcasSg',
    description: 'High-vibe Haldi edit balancing natural turmeric yellow tones without clipping, set to fast Gujarati folk fusion beats.',
    keyFeature: 'Preserved natural yellow skin hues without over-saturating whites'
  },
  {
    id: 'ceremony-sangeet-energy',
    folderId: 'ceremony-rituals',
    title: 'Sangeet Night — Dance Floor Fire & Choreography Cut',
    client: 'Sangeet & Garba Night',
    eventDate: 'Sangeet Special Edit',
    aspectRatio: '16:9 4K UHD Master',
    duration: '03:45',
    resolution: '4K UHD High Definition',
    software: ['Adobe Premiere Pro', 'DaVinci Resolve Studio'],
    tags: ['Multi-Angle Dance Cut', 'Lighting Flare Correction', 'Live Bass Boost'],
    thumbnail: 'assets/kaushik-anjali-g3.jpg',
    videoUrl: 'https://youtu.be/DPSPFKgsDs4',
    description: 'Fast-paced multi-angle dance routine edit seamlessly synchronizing stage choreography, couple duets, and crowd reactions.',
    keyFeature: 'Stage strobe light flash dampening for smooth viewing comfort'
  },

  // Folder 6: Color Grading Suite (DaVinci Resolve)
  {
    id: 'color-grade-sony-slog3',
    folderId: 'color-grading-suite',
    title: 'Sony S-Log3 to Kodak 2383 Film Print Emulation',
    client: 'KD Studio Color Lab',
    eventDate: 'Color Grading Suite',
    aspectRatio: '2.39:1 CinemaScope',
    duration: '01:50',
    resolution: '4K 10-bit 4:2:2 DCI',
    software: ['DaVinci Resolve Studio 19 (Hardware Panel)', 'ACEScc Color Science'],
    tags: ['Kodak 2383 Look', 'Skin Tone Qualifiers', 'Organic 35mm Film Grain', 'Highlight Rolloff'],
    thumbnail: 'assets/yash-kavya-g3.jpg',
    videoUrl: 'https://youtu.be/3i1-aJcasSg',
    description: 'Professional color pipeline showcase converting flat 10-bit camera log into rich, creamy film tones with velvety blacks and glowing skin.',
    keyFeature: 'Node-based ACEScc transform preserving 14+ stops of dynamic range'
  },
  {
    id: 'color-grade-golden-hour',
    folderId: 'color-grading-suite',
    title: 'Royal Mandap Golden Hour & Firelight Grading',
    client: 'KD Studio Color Lab',
    eventDate: 'Color Grading Suite',
    aspectRatio: '16:9 4K Master',
    duration: '01:30',
    resolution: '4K UHD 10-bit',
    software: ['DaVinci Resolve Studio 19'],
    tags: ['Warm Shadow Lift', 'Sacred Fire Highlight Recovery', 'Cyan-Amber Contrast'],
    thumbnail: 'assets/kaushik-anjali-g1.jpg',
    videoUrl: 'https://youtu.be/DPSPFKgsDs4',
    description: 'Advanced highlight rolloff and shadow separation ensuring holy sacred flames do not blow out the bride and groom facial details.',
    keyFeature: 'Split-tone amber highlights with teal-rich royal background separation'
  }
];

export const POST_PRODUCTION_STATS = [
  { value: '500+', label: 'Wedding Films Edited', sub: 'Crafted with narrative mastery' },
  { value: '4K UHD', label: 'Master Delivery', sub: 'Native ProRes & HDR options' },
  { value: '48h', label: 'Express Teaser Delivery', sub: 'Ready for Instagram & WhatsApp' },
  { value: '10-Bit', label: 'Color Calibrated Grading', sub: 'DaVinci Resolve Studio 19' }
];
