import React, { useEffect } from "react";
import { ArrowRight, MapPin, Calendar, Star, Camera, Phone, CheckCircle2, Film, Heart, Sparkles, Award } from "lucide-react";

interface PageProps {
  onBackToHome: () => void;
  onOpenBooking: () => void;
}

export const RealWeddingBelvedereCaseStudy: React.FC<PageProps> = ({ onBackToHome, onOpenBooking }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Royal Wedding at Belvedere Golf & Country Club Ahmedabad | Real Wedding Case Study | KD Creation";

    const schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.id = "schema-real-wedding-belvedere";
    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "@id": "https://www.kdcreations.in/real-weddings/royal-belvedere-club-wedding-ahmedabad/#article",
          "headline": "Royal 3-Day Wedding Celebration at The Belvedere Golf & Country Club, Ahmedabad",
          "description": "Comprehensive visual case study documenting a royal 3-day wedding celebration at The Belvedere Golf & Country Club Ahmedabad, captured on RED V-Raptor 8K and Atlas Orion 2x anamorphic cinema lenses by KD Creation.",
          "image": "https://www.kdcreations.in/assets/service-wedding-photography.jpg",
          "datePublished": "2026-09-02T10:00:00+05:30",
          "dateModified": "2026-09-10T11:00:00+05:30",
          "author": {
            "@type": "Person",
            "name": "Mahesh Parmar",
            "jobTitle": "Creative Director & Principal Photographer",
            "url": "https://www.kdcreations.in/"
          },
          "publisher": {
            "@type": "PhotographyStudio",
            "name": "KD Creation",
            "url": "https://www.kdcreations.in/",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.kdcreations.in/assets/kd-logo.jpg"
            }
          }
        },
        {
          "@type": "Event",
          "@id": "https://www.kdcreations.in/real-weddings/royal-belvedere-club-wedding-ahmedabad/#event",
          "name": "Royal 3-Day Wedding Celebration",
          "location": {
            "@type": "Place",
            "name": "The Belvedere Golf & Country Club",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Adani Shantigram, SG Highway",
              "addressLocality": "Ahmedabad",
              "addressRegion": "Gujarat",
              "postalCode": "382421",
              "addressCountry": "IN"
            }
          },
          "organizer": {
            "@type": "PhotographyStudio",
            "name": "KD Creation",
            "url": "https://www.kdcreations.in/"
          }
        }
      ]
    });

    document.head.appendChild(schemaScript);
    return () => {
      const existing = document.getElementById("schema-real-wedding-belvedere");
      if (existing) document.head.removeChild(existing);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#33060D] text-[#F5F2EB] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-gold mb-8">
          <button onClick={onBackToHome} className="hover:underline">Home</button>
          <span>/</span>
          <span>Real Weddings</span>
          <span>/</span>
          <span className="text-white">Royal Celebration • The Belvedere Club Ahmedabad</span>
        </div>

        {/* Hero Headline */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-widest inline-block mb-4">
            Real Wedding Case Study • Ahmedabad
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold leading-tight mb-6">
            Royal 3-Day Celebration at <span className="text-gold-gradient italic font-normal">The Belvedere Club</span>
          </h1>
          <p className="text-base sm:text-lg text-[#F5F2EB]/80 leading-relaxed max-w-3xl mx-auto mb-8">
            An intimate yet opulent royal union captured across the rolling championship fairways of The Belvedere Golf & Country Club, Ahmedabad. Filmed in true 2.39:1 anamorphic 4K with true-to-skin color science and 32-bit float acoustic preservation by KD Creation.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 rounded-xl bg-gold-gradient text-obsidian font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-3 shadow-xl"
            >
              <span>Check Date Availability</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/919033032922?text=Hi%20KD%20Creation,%20I%20saw%20your%20Belvedere%20Club%20wedding%20case%20study%20and%20want%20to%20check%20availability%20for%20our%20wedding."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-[#4A0E17] border border-gold/40 text-gold font-bold text-sm uppercase tracking-wider hover:bg-gold hover:text-obsidian transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Founders Desk</span>
            </a>
          </div>
        </div>

        {/* Wedding Specification Card */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#3B0811] border border-gold/30 mb-16 text-center font-mono">
          <div className="p-3 border-r border-gold/20">
            <span className="text-[10px] text-gold uppercase tracking-wider block mb-1">Venue</span>
            <p className="text-xs sm:text-sm font-bold text-white">The Belvedere Club, Ahmedabad</p>
          </div>
          <div className="p-3 border-r border-gold/20">
            <span className="text-[10px] text-gold uppercase tracking-wider block mb-1">Duration</span>
            <p className="text-xs sm:text-sm font-bold text-white">3 Days (Mehendi to Reception)</p>
          </div>
          <div className="p-3 border-r border-gold/20">
            <span className="text-[10px] text-gold uppercase tracking-wider block mb-1">Cinema System</span>
            <p className="text-xs sm:text-sm font-bold text-white">RED 8K + Atlas Orion 2x</p>
          </div>
          <div className="p-3">
            <span className="text-[10px] text-gold uppercase tracking-wider block mb-1">Audio Protocol</span>
            <p className="text-xs sm:text-sm font-bold text-white">32-Bit Float Sound Stems</p>
          </div>
        </div>

        {/* Visual Narrative Grid */}
        <div className="space-y-16 mb-20">
          
          {/* Chapter 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-2xl overflow-hidden border border-gold/30 shadow-2xl">
              <img
                src="assets/service-wedding-photography.jpg"
                alt="Sunrise Bridal Couture Session at The Belvedere Club Ahmedabad - KD Creation"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <span className="text-gold font-mono text-xs uppercase font-bold tracking-wider block mb-2">Act I • The Sacred Morning</span>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white mb-4">
                Sunrise Bridal Couture & Architectural Symmetry
              </h2>
              <p className="text-xs sm:text-sm text-[#F5F2EB]/80 leading-relaxed mb-4">
                We capitalized on the early 6:30 AM dawn light washing across the Mediterranean stonework of The Belvedere Club. Using 5-foot diffused parabolic softboxes, we recorded delicate hand-woven Zardozi embroidery and heirloom Polki diamond refraction without harsh spectral glare.
              </p>
              <p className="text-xs sm:text-sm text-[#F5F2EB]/80 leading-relaxed">
                Rather than orchestrating stiff poses, Creative Director Mahesh Parmar captured quiet, contemplative moments as the bride shared tea with her mother before the arrival of the Baraat.
              </p>
            </div>
          </div>

          {/* Chapter 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-gold font-mono text-xs uppercase font-bold tracking-wider block mb-2">Act II • Royal Procession</span>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white mb-4">
                The High-Energy Varghodo & Widescreen 2.39:1 Cinema
              </h2>
              <p className="text-xs sm:text-sm text-[#F5F2EB]/80 leading-relaxed mb-4">
                The groom arrived in a vintage 1930s convertible flanked by dhol players and royal red safas. Technical Director Harshad Chavda deployed the Atlas Orion 40mm anamorphic prime lens on a specialized Steadicam rig.
              </p>
              <p className="text-xs sm:text-sm text-[#F5F2EB]/80 leading-relaxed">
                Horizontal anamorphic streak flares cut through the afternoon haze, imbuing the festive dancing with Hollywood-grade cinematic texture that standard spherical cameras simply cannot replicate.
              </p>
            </div>
            <div className="order-1 lg:order-2 rounded-2xl overflow-hidden border border-gold/30 shadow-2xl">
              <img
                src="assets/service-candid-photography.jpg"
                alt="Varghodo High-Energy Procession at The Belvedere Club Ahmedabad - KD Creation"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Chapter 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-2xl overflow-hidden border border-gold/30 shadow-2xl">
              <img
                src="assets/service-destination-weddings.jpg"
                alt="Twilight Vedic Pheras Under the Open Sky at The Belvedere Club Ahmedabad - KD Creation"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <span className="text-gold font-mono text-xs uppercase font-bold tracking-wider block mb-2">Act III • The Sacred Pheras</span>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white mb-4">
                Twilight Vedic Pheras & 32-Bit Acoustic Preservation
              </h2>
              <p className="text-xs sm:text-sm text-[#F5F2EB]/80 leading-relaxed mb-4">
                As night fell over the championship fairway, the mandap was illuminated by candlelit glass lanterns and soft overhead key lights. 32-bit float audio recorders concealed within the mandap captured sacred Sanskrit slokas chanted by the pandit with infinite dynamic range.
              </p>
              <p className="text-xs sm:text-sm text-[#F5F2EB]/80 leading-relaxed">
                When the emotional Vidai ceremony unfolded, our candid photographers worked at a respectful distance using 85mm and 135mm prime lenses, capturing unscripted tears and blessings with complete discretion.
              </p>
            </div>
          </div>

        </div>

        {/* Deliverables & Archival Preservation */}
        <div className="border border-gold/30 rounded-2xl p-8 sm:p-12 bg-gradient-to-r from-[#240409] to-[#3B0811] mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-gold mb-6 text-center">
            Archival Heirlooms Delivered
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#F5F2EB]/80">
            <div className="p-5 rounded-xl bg-[#240409] border border-gold/20">
              <Film className="w-5 h-5 text-gold mb-3" />
              <h3 className="font-bold text-gold text-sm mb-1">4K Widescreen Cinema Film</h3>
              <p>28-minute master feature film edited with bespoke musical arrangement, multi-track audio stems, and uncompressed 4K master file.</p>
            </div>
            <div className="p-5 rounded-xl bg-[#240409] border border-gold/20">
              <Sparkles className="w-5 h-5 text-gold mb-3" />
              <h3 className="font-bold text-gold text-sm mb-1">60-Second Viral Teaser</h3>
              <p>Graded and delivered within 72 hours of the reception for immediate private family and social sharing.</p>
            </div>
            <div className="p-5 rounded-xl bg-[#240409] border border-gold/20">
              <Award className="w-5 h-5 text-gold mb-3" />
              <h3 className="font-bold text-gold text-sm mb-1">Italian Leather Albums</h3>
              <p>Two 12x18-inch flush-mount albums bound in Florence, Italy, using vegetable-tanned Tuscan Nappa leather with 100-year guarantee.</p>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="text-center p-8 rounded-2xl bg-[#3B0811] border border-gold/30">
          <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-gold mb-4">
            Planning a Wedding at The Belvedere Club?
          </h2>
          <p className="text-sm text-[#F5F2EB]/80 max-w-2xl mx-auto mb-6">
            Reserve our dedicated Belvedere photography & 4K anamorphic cinema team. Because we accept only 18 weddings annually, availability for peak season dates is strictly limited.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-xl bg-gold-gradient text-obsidian font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
            >
              Check Date Availability
            </button>
            <a
              href="https://wa.me/919033032922?text=Hi%20KD%20Creation,%20I%20am%20planning%20a%20wedding%20at%20Belvedere%20Club%20Ahmedabad."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl bg-[#4A0E17] border border-gold/40 text-gold font-bold text-xs uppercase tracking-wider hover:bg-gold hover:text-obsidian transition-all"
            >
              WhatsApp Founders Desk
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
