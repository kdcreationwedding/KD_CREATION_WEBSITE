export interface VideoEditingProject {
  id: string;
  folderId: string;
  title: string;
  client: string;
  eventDate: string;
  aspectRatio: string;
  duration: string;
  resolution: string;
  software: string[];
  tags: string[];
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
    "id": "ai",
    "folderCode": "DIR_01_AI",
    "name": "AI",
    "nameGujarati": "AI સિનેમેટિક એડિટ્સ અને કંકોત્રી લેખન",
    "badge": "4 PROJECT EDITS",
    "iconName": "Sparkles",
    "description": "Cutting-edge AI-assisted video storytelling, virtual invitations, and animated legacy reels.",
    "softwareStack": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro",
      "Logic Pro X"
    ],
    "workflowHighlights": [
      "Color Grading & LUT Emulation",
      "4K Multi-Cam Sync",
      "Sound Design & Foley"
    ]
  },
  {
    "id": "highlight",
    "folderCode": "DIR_02_HIGHLIGHT",
    "name": "Highlight",
    "nameGujarati": "સિનેમેટિક વેડિંગ અને ઇવેન્ટ હાઇલાઇટ્સ",
    "badge": "4 PROJECT EDITS",
    "iconName": "Video",
    "description": "Bespoke multi-cam wedding highlights capturing raw emotion, family tears, sacred rituals, and celebrations.",
    "softwareStack": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro",
      "Logic Pro X"
    ],
    "workflowHighlights": [
      "Color Grading & LUT Emulation",
      "4K Multi-Cam Sync",
      "Sound Design & Foley"
    ]
  },
  {
    "id": "portraits",
    "folderCode": "DIR_03_PORTRAITS",
    "name": "Portraits",
    "nameGujarati": "બ્રાઇડલ & કપલ સિનેમેટિક પોર્ટ્રેટ્સ",
    "badge": "4 PROJECT EDITS",
    "iconName": "Smartphone",
    "description": "Editorial slow-motion portrait films focusing on intricate bridal jewelry, royal attire, and emotional eyes.",
    "softwareStack": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro",
      "Logic Pro X"
    ],
    "workflowHighlights": [
      "Color Grading & LUT Emulation",
      "4K Multi-Cam Sync",
      "Sound Design & Foley"
    ]
  },
  {
    "id": "pre-wedding",
    "folderCode": "DIR_04_PRE_WEDDING",
    "name": "Pre Wedding",
    "nameGujarati": "પ્રી-વેડિંગ સિનેમેટિક મ્યુઝિક સ્ટોરીઝ",
    "badge": "2 PROJECT EDITS",
    "iconName": "Sliders",
    "description": "Dreamy pre-wedding concept films cut with romantic speed ramps, drone perspectives, and acoustic lyrical flow.",
    "softwareStack": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro",
      "Logic Pro X"
    ],
    "workflowHighlights": [
      "Color Grading & LUT Emulation",
      "4K Multi-Cam Sync",
      "Sound Design & Foley"
    ]
  },
  {
    "id": "reel",
    "folderCode": "DIR_05_REEL",
    "name": "Reel",
    "nameGujarati": "ઇન્સ્ટાગ્રામ 9:16 વાયરલ રીલ્સ",
    "badge": "14 PROJECT EDITS",
    "iconName": "Smartphone",
    "description": "Fast-paced, hook-driven vertical edits engineered for Instagram feeds with mobile OLED punch and beat drops.",
    "softwareStack": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro",
      "Logic Pro X"
    ],
    "workflowHighlights": [
      "Color Grading & LUT Emulation",
      "4K Multi-Cam Sync",
      "Sound Design & Foley"
    ]
  },
  {
    "id": "teaser",
    "folderCode": "DIR_06_TEASER",
    "name": "Teaser",
    "nameGujarati": "સિનેમેટિક વેડિંગ ટીઝર્સ (2.39:1)",
    "badge": "2 PROJECT EDITS",
    "iconName": "Film",
    "description": "High-adrenaline 60–90 second widescreen trailers with orchestral rise and dialogue snips.",
    "softwareStack": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro",
      "Logic Pro X"
    ],
    "workflowHighlights": [
      "Color Grading & LUT Emulation",
      "4K Multi-Cam Sync",
      "Sound Design & Foley"
    ]
  },
  {
    "id": "vehicle-delivery",
    "folderCode": "DIR_07_VEHICLE_DELIVERY",
    "name": "Vehicle Delivery",
    "nameGujarati": "રોયલ કાર ડિલિવરી અને સેલિબ્રેશન હાઇલાઇટ્સ",
    "badge": "2 PROJECT EDITS",
    "iconName": "Scissors",
    "description": "Cinematic automobile delivery celebrations capturing the proud milestone moments with family.",
    "softwareStack": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro",
      "Logic Pro X"
    ],
    "workflowHighlights": [
      "Color Grading & LUT Emulation",
      "4K Multi-Cam Sync",
      "Sound Design & Foley"
    ]
  }
];

export const VIDEO_EDITING_PROJECTS: VideoEditingProject[] = [
  {
    "id": "proj-ai-1",
    "folderId": "ai",
    "title": "AI Hilight",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "16:9 4K Master",
    "duration": "02:30",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "Multi-Cam Sync",
      "Film Emulation",
      "Dialogue Foley",
      "4K Master"
    ],
    "thumbnail": "assets/yash-kavya-outer-cover.jpg",
    "videoUrl": "video-portfolio/AI/AI Hilight.mp4",
    "description": "AI Hilight — Official post-production cut curated under AI.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-ai-2",
    "folderId": "ai",
    "title": "AI Kankotri Lekhan",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "16:9 4K Master",
    "duration": "02:30",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "Multi-Cam Sync",
      "Film Emulation",
      "Dialogue Foley",
      "4K Master"
    ],
    "thumbnail": "assets/yash-kavya-outer-cover.jpg",
    "videoUrl": "video-portfolio/AI/AI Kankotri Lekhan.mp4",
    "description": "AI Kankotri Lekhan — Official post-production cut curated under AI.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-ai-3",
    "folderId": "ai",
    "title": "AI Kankotri Lekhan",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "16:9 4K Master",
    "duration": "02:30",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "Multi-Cam Sync",
      "Film Emulation",
      "Dialogue Foley",
      "4K Master"
    ],
    "thumbnail": "assets/yash-kavya-outer-cover.jpg",
    "videoUrl": "video-portfolio/AI/AI Kankotri_Lekhan.mp4",
    "description": "AI Kankotri Lekhan — Official post-production cut curated under AI.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-ai-4",
    "folderId": "ai",
    "title": "Ai Animation Story Reel",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "9:16 Vertical Reel",
    "duration": "00:50",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "9:16 Mobile Cut",
      "Beat Sync",
      "Punchy Bass",
      "Color Pop"
    ],
    "thumbnail": "assets/yash-kavya-outer-cover.jpg",
    "videoUrl": "video-portfolio/AI/Ai Animation Story Reel.mp4",
    "description": "Ai Animation Story Reel — Official post-production cut curated under AI.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-highlight-1",
    "folderId": "highlight",
    "title": "Garba Highlight",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "16:9 4K Master",
    "duration": "02:30",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "Multi-Cam Sync",
      "Film Emulation",
      "Dialogue Foley",
      "4K Master"
    ],
    "thumbnail": "assets/kaushik-anjali-outer-cover.jpg",
    "videoUrl": "video-portfolio/Highlight/Garba_Highlight.mp4",
    "description": "Garba Highlight — Official post-production cut curated under Highlight.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-highlight-2",
    "folderId": "highlight",
    "title": "Haldi  Highlight",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "16:9 4K Master",
    "duration": "02:30",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "Multi-Cam Sync",
      "Film Emulation",
      "Dialogue Foley",
      "4K Master"
    ],
    "thumbnail": "assets/kaushik-anjali-outer-cover.jpg",
    "videoUrl": "video-portfolio/Highlight/Haldi _Highlight.mp4",
    "description": "Haldi  Highlight — Official post-production cut curated under Highlight.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-highlight-3",
    "folderId": "highlight",
    "title": "SAMEDAY DHAWAL  Highlight(AI)",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "16:9 4K Master",
    "duration": "02:30",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "Multi-Cam Sync",
      "Film Emulation",
      "Dialogue Foley",
      "4K Master"
    ],
    "thumbnail": "assets/kaushik-anjali-outer-cover.jpg",
    "videoUrl": "https://youtu.be/mJ49EXaTXO8",
    "description": "SAMEDAY DHAWAL  Highlight(AI) — Official post-production cut curated under Highlight.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-highlight-4",
    "folderId": "highlight",
    "title": "Shivani Bharvad Highlight",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "16:9 4K Master",
    "duration": "02:30",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "Multi-Cam Sync",
      "Film Emulation",
      "Dialogue Foley",
      "4K Master"
    ],
    "thumbnail": "assets/kaushik-anjali-outer-cover.jpg",
    "videoUrl": "video-portfolio/Highlight/Shivani Bharvad Highlight.mp4",
    "description": "Shivani Bharvad Highlight — Official post-production cut curated under Highlight.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-portraits-1",
    "folderId": "portraits",
    "title": "Couple Portrait",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "16:9 4K Master",
    "duration": "02:30",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "Multi-Cam Sync",
      "Film Emulation",
      "Dialogue Foley",
      "4K Master"
    ],
    "thumbnail": "assets/service-bride-mirror.jpg",
    "videoUrl": "video-portfolio/Portraits/Couple Portrait.mp4",
    "description": "Couple Portrait — Official post-production cut curated under Portraits.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-portraits-2",
    "folderId": "portraits",
    "title": "PANKAJBHAI Rec",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "16:9 4K Master",
    "duration": "02:30",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "Multi-Cam Sync",
      "Film Emulation",
      "Dialogue Foley",
      "4K Master"
    ],
    "thumbnail": "assets/service-bride-mirror.jpg",
    "videoUrl": "video-portfolio/Portraits/PANKAJBHAI_Rec.mp4",
    "description": "PANKAJBHAI Rec — Official post-production cut curated under Portraits.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-portraits-3",
    "folderId": "portraits",
    "title": "Pre Wedding REEL",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "9:16 Vertical Reel",
    "duration": "00:50",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "9:16 Mobile Cut",
      "Beat Sync",
      "Punchy Bass",
      "Color Pop"
    ],
    "thumbnail": "assets/service-bride-mirror.jpg",
    "videoUrl": "video-portfolio/Portraits/Pre-Wedding_REEL.mp4",
    "description": "Pre Wedding REEL — Official post-production cut curated under Portraits.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-portraits-4",
    "folderId": "portraits",
    "title": "Sivani Solo Portrait",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "16:9 4K Master",
    "duration": "02:30",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "Multi-Cam Sync",
      "Film Emulation",
      "Dialogue Foley",
      "4K Master"
    ],
    "thumbnail": "assets/service-bride-mirror.jpg",
    "videoUrl": "video-portfolio/Portraits/Sivani Solo Portrait.mp4",
    "description": "Sivani Solo Portrait — Official post-production cut curated under Portraits.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-pre-wedding-1",
    "folderId": "pre-wedding",
    "title": "PREWEDDING SONG(Mahesh & Ila)",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "16:9 4K Master",
    "duration": "02:30",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "Multi-Cam Sync",
      "Film Emulation",
      "Dialogue Foley",
      "4K Master"
    ],
    "thumbnail": "assets/service-prewedding-dhaval-sangita.jpg",
    "videoUrl": "video-portfolio/Pre-Wedding/PREWEDDING_SONG(Mahesh & Ila).mp4",
    "description": "PREWEDDING SONG(Mahesh & Ila) — Official post-production cut curated under Pre Wedding.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-pre-wedding-2",
    "folderId": "pre-wedding",
    "title": "Pre Wedding Teaser + Song(Dhawal & Sangita)",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "16:9 4K Master",
    "duration": "02:30",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "Multi-Cam Sync",
      "Film Emulation",
      "Dialogue Foley",
      "4K Master"
    ],
    "thumbnail": "assets/service-prewedding-dhaval-sangita.jpg",
    "videoUrl": "https://youtu.be/mJ49EXaTXO8",
    "description": "Pre Wedding Teaser + Song(Dhawal & Sangita) — Official post-production cut curated under Pre Wedding.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-reel-1",
    "folderId": "reel",
    "title": "BADALBHAI HALDI",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "9:16 Vertical Reel",
    "duration": "00:50",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "9:16 Mobile Cut",
      "Beat Sync",
      "Punchy Bass",
      "Color Pop"
    ],
    "thumbnail": "assets/dhaval-sangeeta-outer-cover.jpg",
    "videoUrl": "video-portfolio/Reel/BADALBHAI_HALDI.mp4",
    "description": "BADALBHAI HALDI — Official post-production cut curated under Reel.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-reel-2",
    "folderId": "reel",
    "title": "BRIDE",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "9:16 Vertical Reel",
    "duration": "00:50",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "9:16 Mobile Cut",
      "Beat Sync",
      "Punchy Bass",
      "Color Pop"
    ],
    "thumbnail": "assets/dhaval-sangeeta-outer-cover.jpg",
    "videoUrl": "video-portfolio/Reel/BRIDE.mp4",
    "description": "BRIDE — Official post-production cut curated under Reel.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-reel-3",
    "folderId": "reel",
    "title": "BRIDE REEL REEL",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "9:16 Vertical Reel",
    "duration": "00:50",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "9:16 Mobile Cut",
      "Beat Sync",
      "Punchy Bass",
      "Color Pop"
    ],
    "thumbnail": "assets/dhaval-sangeeta-outer-cover.jpg",
    "videoUrl": "video-portfolio/Reel/BRIDE_REEL_REEL.mp4",
    "description": "BRIDE REEL REEL — Official post-production cut curated under Reel.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-reel-4",
    "folderId": "reel",
    "title": "Bride REEL",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "9:16 Vertical Reel",
    "duration": "00:50",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "9:16 Mobile Cut",
      "Beat Sync",
      "Punchy Bass",
      "Color Pop"
    ],
    "thumbnail": "assets/dhaval-sangeeta-outer-cover.jpg",
    "videoUrl": "video-portfolio/Reel/Bride_REEL.mp4",
    "description": "Bride REEL — Official post-production cut curated under Reel.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-reel-5",
    "folderId": "reel",
    "title": "Couple REEL",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "9:16 Vertical Reel",
    "duration": "00:50",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "9:16 Mobile Cut",
      "Beat Sync",
      "Punchy Bass",
      "Color Pop"
    ],
    "thumbnail": "assets/dhaval-sangeeta-outer-cover.jpg",
    "videoUrl": "video-portfolio/Reel/Couple REEL.mp4",
    "description": "Couple REEL — Official post-production cut curated under Reel.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-reel-6",
    "folderId": "reel",
    "title": "GARBA",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "9:16 Vertical Reel",
    "duration": "00:50",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "9:16 Mobile Cut",
      "Beat Sync",
      "Punchy Bass",
      "Color Pop"
    ],
    "thumbnail": "assets/dhaval-sangeeta-outer-cover.jpg",
    "videoUrl": "video-portfolio/Reel/GARBA.mp4",
    "description": "GARBA — Official post-production cut curated under Reel.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-reel-7",
    "folderId": "reel",
    "title": "HALDI REEL KD CREATION",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "9:16 Vertical Reel",
    "duration": "00:50",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "9:16 Mobile Cut",
      "Beat Sync",
      "Punchy Bass",
      "Color Pop"
    ],
    "thumbnail": "assets/dhaval-sangeeta-outer-cover.jpg",
    "videoUrl": "video-portfolio/Reel/HALDI_REEL_KD_CREATION.mp4",
    "description": "HALDI REEL KD CREATION — Official post-production cut curated under Reel.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-reel-8",
    "folderId": "reel",
    "title": "INTRO VIDEO",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "9:16 Vertical Reel",
    "duration": "00:50",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "9:16 Mobile Cut",
      "Beat Sync",
      "Punchy Bass",
      "Color Pop"
    ],
    "thumbnail": "assets/dhaval-sangeeta-outer-cover.jpg",
    "videoUrl": "video-portfolio/Reel/INTRO VIDEO.mp4",
    "description": "INTRO VIDEO — Official post-production cut curated under Reel.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-reel-9",
    "folderId": "reel",
    "title": "MODEL REEL 2",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "9:16 Vertical Reel",
    "duration": "00:50",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "9:16 Mobile Cut",
      "Beat Sync",
      "Punchy Bass",
      "Color Pop"
    ],
    "thumbnail": "assets/dhaval-sangeeta-outer-cover.jpg",
    "videoUrl": "video-portfolio/Reel/MODEL REEL 2.mp4",
    "description": "MODEL REEL 2 — Official post-production cut curated under Reel.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-reel-10",
    "folderId": "reel",
    "title": "REEL 1",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "9:16 Vertical Reel",
    "duration": "00:50",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "9:16 Mobile Cut",
      "Beat Sync",
      "Punchy Bass",
      "Color Pop"
    ],
    "thumbnail": "assets/dhaval-sangeeta-outer-cover.jpg",
    "videoUrl": "video-portfolio/Reel/REEL_1.mp4",
    "description": "REEL 1 — Official post-production cut curated under Reel.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-reel-11",
    "folderId": "reel",
    "title": "Reel 3",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "9:16 Vertical Reel",
    "duration": "00:50",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "9:16 Mobile Cut",
      "Beat Sync",
      "Punchy Bass",
      "Color Pop"
    ],
    "thumbnail": "assets/dhaval-sangeeta-outer-cover.jpg",
    "videoUrl": "video-portfolio/Reel/Reel_3.mp4",
    "description": "Reel 3 — Official post-production cut curated under Reel.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-reel-12",
    "folderId": "reel",
    "title": "SANGEET REEL KD CREATION FINAL",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "9:16 Vertical Reel",
    "duration": "00:50",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "9:16 Mobile Cut",
      "Beat Sync",
      "Punchy Bass",
      "Color Pop"
    ],
    "thumbnail": "assets/dhaval-sangeeta-outer-cover.jpg",
    "videoUrl": "video-portfolio/Reel/SANGEET_REEL_KD_CREATION_FINAL_.mp4",
    "description": "SANGEET REEL KD CREATION FINAL — Official post-production cut curated under Reel.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-reel-13",
    "folderId": "reel",
    "title": "SAVE THE DATE DHAWAL KD Creation",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "9:16 Vertical Reel",
    "duration": "00:50",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "9:16 Mobile Cut",
      "Beat Sync",
      "Punchy Bass",
      "Color Pop"
    ],
    "thumbnail": "assets/dhaval-sangeeta-outer-cover.jpg",
    "videoUrl": "https://youtu.be/x7782vFootg",
    "description": "SAVE THE DATE DHAWAL KD Creation — Official post-production cut curated under Reel.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-reel-14",
    "folderId": "reel",
    "title": "WEDDING REEL KD CREATION",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "9:16 Vertical Reel",
    "duration": "00:50",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "9:16 Mobile Cut",
      "Beat Sync",
      "Punchy Bass",
      "Color Pop"
    ],
    "thumbnail": "assets/dhaval-sangeeta-outer-cover.jpg",
    "videoUrl": "https://youtu.be/x7782vFootg",
    "description": "WEDDING REEL KD CREATION — Official post-production cut curated under Reel.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-teaser-1",
    "folderId": "teaser",
    "title": "Pre Wedding Teaser(Mahesh & Ila)",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "16:9 4K Master",
    "duration": "02:30",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "Multi-Cam Sync",
      "Film Emulation",
      "Dialogue Foley",
      "4K Master"
    ],
    "thumbnail": "assets/vishwa-dhawal-outer-cover.jpg",
    "videoUrl": "video-portfolio/Teaser/Pre-Wedding_teaser(Mahesh & Ila).mp4",
    "description": "Pre Wedding Teaser(Mahesh & Ila) — Official post-production cut curated under Teaser.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-teaser-2",
    "folderId": "teaser",
    "title": "TEASER INSTA",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "16:9 4K Master",
    "duration": "02:30",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "Multi-Cam Sync",
      "Film Emulation",
      "Dialogue Foley",
      "4K Master"
    ],
    "thumbnail": "assets/vishwa-dhawal-outer-cover.jpg",
    "videoUrl": "video-portfolio/Teaser/TEASER_INSTA.mp4",
    "description": "TEASER INSTA — Official post-production cut curated under Teaser.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-vehicle-delivery-1",
    "folderId": "vehicle-delivery",
    "title": "CREATA DELIVERY Hilight",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "16:9 4K Master",
    "duration": "02:30",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "Multi-Cam Sync",
      "Film Emulation",
      "Dialogue Foley",
      "4K Master"
    ],
    "thumbnail": "assets/service-complete-coverage.jpg",
    "videoUrl": "video-portfolio/Vehicle Delivery/CREATA DELIVERY Hilight.mp4",
    "description": "CREATA DELIVERY Hilight — Official post-production cut curated under Vehicle Delivery.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  },
  {
    "id": "proj-vehicle-delivery-2",
    "folderId": "vehicle-delivery",
    "title": "CREATA With Family Hilight",
    "client": "KD Creation Official Client",
    "eventDate": "Cinema Master Edit",
    "aspectRatio": "16:9 4K Master",
    "duration": "02:30",
    "resolution": "4K Ultra HD",
    "software": [
      "DaVinci Resolve Studio 19",
      "Adobe Premiere Pro"
    ],
    "tags": [
      "Multi-Cam Sync",
      "Film Emulation",
      "Dialogue Foley",
      "4K Master"
    ],
    "thumbnail": "assets/service-complete-coverage.jpg",
    "videoUrl": "video-portfolio/Vehicle Delivery/CREATA With Family Hilight.mp4",
    "description": "CREATA With Family Hilight — Official post-production cut curated under Vehicle Delivery.",
    "keyFeature": "Master 4K Edit with Color Grading & Sound Design"
  }
];

export const POST_PRODUCTION_STATS = [
  { value: '32+', label: 'Curated Video Edits', sub: 'Crafted with narrative mastery' },
  { value: '4K UHD', label: 'Master Delivery', sub: 'Native ProRes & HDR options' },
  { value: '48h', label: 'Express Teaser Delivery', sub: 'Ready for Instagram & WhatsApp' },
  { value: '10-Bit', label: 'Color Calibrated Grading', sub: 'DaVinci Resolve Studio 19' }
];
