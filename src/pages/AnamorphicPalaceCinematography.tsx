import React, { useEffect } from 'react';
import { ArrowRight, Film, Camera, Sparkles, ShieldCheck, Phone, CheckCircle2, Award, Volume2 } from 'lucide-react';

interface PageProps {
  onBackToHome: () => void;
  onOpenBooking: () => void;
}

export const AnamorphicPalaceCinematography: React.FC<PageProps> = ({ onBackToHome, onOpenBooking }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = "4K Anamorphic Wedding Cinematography Heritage Palace Rajasthan | KD Creations";

    // Inject semantic JSON-LD schema into document head
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'schema-anamorphic-palace';
    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["PhotographyStudio", "LocalBusiness"],
          "@id": "https://www.kdcreations.in/#studio",
          "name": "KD Creations",
          "alternateName": [
            "KD Creation",
            "KD Creations Luxury Wedding Films",
            "KD Creations Ahmedabad"
          ],
          "url": "https://www.kdcreations.in/",
          "logo": "https://www.kdcreations.in/assets/kd-logo.jpg",
          "image": "https://www.kdcreations.in/assets/service-wedding-photography.jpg",
          "description": "KD Creations is Ahmedabad's premier luxury wedding photography and 4K anamorphic cinematography studio, engineering bespoke cinematic visual heirlooms for royal destination palace weddings across Rajasthan, Gujarat, and worldwide.",
          "telephone": "+919033032922",
          "email": "contact@kdcreations.in",
          "priceRange": "₹₹₹₹₹ (₹15,00,000+)",
          "currenciesAccepted": "INR, USD, AED, GBP",
          "paymentAccepted": "Bank Transfer, Wire Transfer",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "SG Highway, Prahlad Nagar",
            "addressLocality": "Ahmedabad",
            "addressRegion": "Gujarat",
            "postalCode": "380015",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 23.0225,
            "longitude": 72.5714
          },
          "founder": [
            {
              "@type": "Person",
              "@id": "https://www.kdcreations.in/#mahesh-parmar",
              "name": "Mahesh Parmar",
              "jobTitle": "Founder & Creative Director",
              "sameAs": [
                "https://www.instagram.com/kdcreation.in",
                "https://www.kdcreations.in/#founders"
              ]
            },
            {
              "@type": "Person",
              "@id": "https://www.kdcreations.in/#harshad-chavda",
              "name": "Harshad Chavda",
              "jobTitle": "Co-Founder & Technical Director",
              "sameAs": [
                "https://www.instagram.com/kdcreation.in",
                "https://www.kdcreations.in/#founders"
              ]
            }
          ],
          "sameAs": [
            "https://www.instagram.com/kdcreation.in",
            "https://www.youtube.com/@kdcreationwedding",
            "https://www.facebook.com/kdcreation.in",
            "https://www.wedmegood.com/profile/KD-Creation-Ahmedabad",
            "https://www.weddingwire.in/wedding-photographers/kd-creation"
          ]
        },
        {
          "@type": "Article",
          "@id": "https://www.kdcreations.in/4k-anamorphic-wedding-cinematography-heritage-palace-rajasthan/#article",
          "headline": "4K Anamorphic Wedding Cinematography for Heritage Palaces in Rajasthan",
          "description": "Technical and editorial guide to capturing royal destination weddings in Rajasthan using Hollywood-grade RED cinema sensors, Atlas anamorphic primes, 32-bit float sound, and hand-bound Italian leather albums.",
          "image": "https://www.kdcreations.in/assets/service-wedding-photography.jpg",
          "inLanguage": "en-US",
          "datePublished": "2026-09-10T08:00:00+05:30",
          "dateModified": "2026-09-10T10:30:00+05:30",
          "author": [
            { "@id": "https://www.kdcreations.in/#mahesh-parmar" },
            { "@id": "https://www.kdcreations.in/#harshad-chavda" }
          ],
          "publisher": { "@id": "https://www.kdcreations.in/#studio" },
          "mainEntityOfPage": "https://www.kdcreations.in/4k-anamorphic-wedding-cinematography-heritage-palace-rajasthan/"
        },
        {
          "@type": "VideoObject",
          "@id": "https://www.kdcreations.in/4k-anamorphic-wedding-cinematography-heritage-palace-rajasthan/#video",
          "name": "The Royal Pichola Union — 4K Anamorphic Wedding Film Masterpiece | KD Creations",
          "description": "A bespoke 4K anamorphic cinema showreel captured at an imperial island palace in Udaipur, Rajasthan by KD Creations, featuring authentic 2.39:1 cinemascope optics and multi-channel 32-bit float sound.",
          "thumbnailUrl": ["https://www.kdcreations.in/assets/dhaval-sangeeta-outer-cover.jpg"],
          "uploadDate": "2026-08-19T08:00:00+05:30",
          "duration": "PT4M45S",
          "contentUrl": "https://www.youtube.com/watch?v=3i1-aJcasSg",
          "embedUrl": "https://www.youtube.com/embed/3i1-aJcasSg",
          "publisher": { "@id": "https://www.kdcreations.in/#studio" },
          "hasPart": [
            {
              "@type": "Clip",
              "name": "Royal Lake Pichola Boat Arrival & Procession",
              "startOffset": 0,
              "endOffset": 45,
              "url": "https://www.youtube.com/watch?v=3i1-aJcasSg&t=0s"
            },
            {
              "@type": "Clip",
              "name": "Heritage Palace Courtyard Baarat & 32-Bit Soundscape",
              "startOffset": 46,
              "endOffset": 110,
              "url": "https://www.youtube.com/watch?v=3i1-aJcasSg&t=46s"
            },
            {
              "@type": "Clip",
              "name": "Sacred Varmala Garland Exchange Under Anamorphic Flares",
              "startOffset": 111,
              "endOffset": 175,
              "url": "https://www.youtube.com/watch?v=3i1-aJcasSg&t=111s"
            },
            {
              "@type": "Clip",
              "name": "Nocturnal Mandap Saptapadi & Vedic Phera Rituals",
              "startOffset": 176,
              "endOffset": 240,
              "url": "https://www.youtube.com/watch?v=3i1-aJcasSg&t=176s"
            },
            {
              "@type": "Clip",
              "name": "Sunset Palace Terrace Couple Portraiture",
              "startOffset": 241,
              "endOffset": 285,
              "url": "https://www.youtube.com/watch?v=3i1-aJcasSg&t=241s"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.kdcreations.in/4k-anamorphic-wedding-cinematography-heritage-palace-rajasthan/#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Why is 4K anamorphic cinematography superior to standard 4K digital video for palace weddings?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "True 4K anamorphic cinematography utilizes specialized cylindrical glass elements that squeeze a wider horizontal field of view onto the camera sensor, producing an authentic 2.39:1 cinemascope aspect ratio without cropping away valuable pixels. This optical process produces oval bokeh, horizontal blue or golden lens flares, and an unmistakable organic three-dimensional separation between the couple and the vast palace architecture that spherical lenses cannot replicate."
              }
            },
            {
              "@type": "Question",
              "name": "How does KD Creations handle heritage preservation rules at historical palaces in Rajasthan?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "KD Creations operates with a 100% wireless, self-powered lighting and camera infrastructure that complies completely with the Archaeological Survey of India and private palace trust regulations. We do not drill, tape, or run high-voltage cables across historic marble or sandstone, deploying lightweight carbon-fiber stands and specialized architectural lighting that protects heritage surfaces."
              }
            },
            {
              "@type": "Question",
              "name": "What deliverables are included in KD Creations’ ₹15,00,000+ ultra-luxury palace package?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our ultra-luxury package includes full multi-day destination coverage led personally by founders Mahesh Parmar and Harshad Chavda, a 4K Anamorphic Feature Film, a 3-Minute Cinematic Trailer, RAW archive storage on encrypted drives, two hand-bound Italian leather flush-mount heirloom albums, and drone cinematography operated by certified aerial pilots."
              }
            },
            {
              "@type": "Question",
              "name": "How far in advance should we reserve KD Creations for a destination wedding in Udaipur or Jaipur?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Because KD Creations strictly accepts only 12 luxury commissions worldwide per calendar year to preserve our uncompromising production standards, royal families and planners typically commission our team 8 to 14 months prior to the wedding date."
              }
            }
          ]
        }
      ]
    });

    document.head.appendChild(schemaScript);

    return () => {
      const existingScript = document.getElementById('schema-anamorphic-palace');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#240409] text-[#F5F2EB] pt-24 pb-24 selection:bg-gold selection:text-obsidian font-sans">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-gold mb-10 border-b border-gold/20 pb-4">
          <button onClick={onBackToHome} className="hover:underline transition-all">Home</button>
          <span>/</span>
          <span>Cinematography</span>
          <span>/</span>
          <span className="text-white font-semibold">4K Anamorphic Heritage Palace Rajasthan</span>
        </nav>

        {/* Hero Section */}
        <header className="mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-widest mb-6">
            <Award className="w-3.5 h-3.5 text-gold" />
            <span>Ultra-Luxury Tier • ₹15,00,000+ Master Commission</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-luxury font-bold leading-[1.1] mb-8 text-[#F5F2EB]">
            4K Anamorphic Wedding Cinematography for <span className="text-gold-gradient italic font-normal">Heritage Palaces</span> in Rajasthan
          </h1>
          
          <div className="p-6 sm:p-8 rounded-2xl bg-[#33060D] border border-gold/30 shadow-2xl mb-10">
            <p className="text-lg sm:text-xl font-medium text-[#F5F2EB] leading-relaxed mb-4">
              <strong className="text-gold font-bold">4K anamorphic wedding cinematography at heritage palaces in Rajasthan requires true 2x cylindrical optical glass elements to capture the sweeping 2.39:1 widescreen grandeur of royal architecture without cropping sensor resolution.</strong> At KD Creations, founders Mahesh Parmar and Harshad Chavda deploy cinema-grade anamorphic primes paired with large-format Hollywood sensors to immortalize royal destination unions across Udaipur, Jaipur, and Jodhpur. Where standard wedding videography relies on consumer spherical lenses that compress background depth, true anamorphic capture renders creamy horizontal bokeh, signature anamorphic flares, and an expansive perspective that mirrors high-budget period epics.
            </p>
            <p className="text-sm sm:text-base text-[#F5F2EB]/80 leading-relaxed">
              Our multi-day palace commissions operate strictly within our signature ₹15,00,000+ ultra-luxury tier, reflecting an uncompromising technical infrastructure. Every celebration is captured with bespoke camera builds, redundant dual-operator monitoring stations, and calibrated cinema color pipelines that treat the 400-year-old sandstone ramparts of Rajasthan as a living, breathing cinematic character.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 rounded-xl bg-gold-gradient text-obsidian font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-3 shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
            >
              <span>Commission Royal Cinema Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/919033032922?text=Inquiry%20regarding%204K%20Anamorphic%20Palace%20Cinematography%20Commission%20(₹15L+)"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-[#3B0811] border border-gold/40 text-gold font-bold text-sm uppercase tracking-wider hover:bg-gold hover:text-obsidian transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Direct Founder WhatsApp</span>
            </a>
          </div>
        </header>

        {/* Cinematic Video Showcase */}
        <section className="mb-20 rounded-2xl overflow-hidden border border-gold/40 bg-black/60 shadow-2xl relative">
          <div className="aspect-w-16 aspect-h-9 w-full relative">
            <img
              src="assets/dhaval-sangeeta-outer-cover.jpg"
              alt="4K Anamorphic Wedding Film Lake Pichola Palace - KD Creations"
              className="w-full h-[480px] object-cover filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#240409] via-transparent to-transparent flex flex-col justify-end p-8">
              <span className="text-xs font-mono text-gold uppercase tracking-widest mb-1">Featured Master Film Showcase</span>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white mb-2">The Royal Pichola Union — 4K Anamorphic Mastercut</h2>
              <p className="text-xs sm:text-sm text-[#F5F2EB]/80 max-w-2xl mb-4">Filmed on RED V-Raptor 8K VV with Atlas Orion 2x Anamorphic Primes and 32-bit Float Multi-track Spatial Sound at Lake Pichola, Udaipur.</p>
              <a
                href="https://www.youtube.com/watch?v=3i1-aJcasSg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider hover:underline"
              >
                <span>Watch 4K Master on YouTube</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Pillar 1: Large Format Sensors & Atlas Glass */}
        <section className="mb-20 space-y-6">
          <div className="flex items-center gap-3 text-gold">
            <Camera className="w-6 h-6" />
            <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white">
              The Technical Reality of Palatial Cinema: Large-Format RED Sensors and Atlas Anamorphic Glass
            </h2>
          </div>
          <div className="p-8 rounded-2xl bg-[#33060D] border border-gold/25 space-y-4">
            <p className="text-base sm:text-lg text-[#F5F2EB] leading-relaxed">
              <strong className="text-gold font-bold">Royal palace courtyards demand cinema sensors engineered with over 16 stops of dynamic range to resolve blinding ceremonial pyres alongside deep, nocturnal marble corridors simultaneously.</strong> KD Creations captures royal celebrations utilizing Hollywood-certified RED V-Raptor and ARRI Alexa large-format cameras rigged with bespoke Atlas Orion and Cooke anamorphic prime lenses. Standard mirrorless cameras utilized by conventional wedding vendors clip highlights the instant sacred camphor flames ignite, rendering the bride’s hand-embroidered metallic zardozi lehenga as an overexposed wash of white noise.
            </p>
            <p className="text-sm sm:text-base text-[#F5F2EB]/80 leading-relaxed">
              Our cinema sensors record in 16-bit uncompressed RAW formats, preserving the intricate gold zari threads, crushed velvet sherwanis, and the subtle ambient glow of thousands of brass oil diyas. By bypassing internal consumer camera compression, our post-production colorists pull rich, natural, filmic skin tones that reflect the true luxury of an imperial Rajputana or Royal Marwari wedding.
            </p>
            <p className="text-sm sm:text-base text-[#F5F2EB]/80 leading-relaxed">
              Our optical packages feature focal lengths specifically calibrated for heritage scale: an ultra-wide 32mm anamorphic for grand courtyards, a 50mm for unscripted processional movement, and an 85mm portrait anamorphic for tearful, intimate Phera vows. This optical discipline ensures zero wide-angle facial distortion, capturing royal portraiture with flattering, classical proportions.
            </p>
          </div>
        </section>

        {/* Pillar 2: Low Light Mandap Illumination */}
        <section className="mb-20 space-y-6">
          <div className="flex items-center gap-3 text-gold">
            <Sparkles className="w-6 h-6" />
            <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white">
              Resolving the Heritage Low-Light Problem: Zero-Intrusion Night Mandap Illuminations
            </h2>
          </div>
          <div className="p-8 rounded-2xl bg-[#33060D] border border-gold/25 space-y-4">
            <p className="text-base sm:text-lg text-[#F5F2EB] leading-relaxed">
              <strong className="text-gold font-bold">Nighttime mandap cinematography in heritage palaces requires high-CRI continuous wireless lighting that respects sacred Vedic rituals without blinding royal guests or washing out the natural historic ambiance.</strong> Under the technical direction of Harshad Chavda, KD Creations eliminates intrusive, glaring white LED panels in favor of calibrated, diffused wireless lighting instruments mapped to the palace’s architectural color temperature. Heritage properties like Jagmandir Island Palace or Umaid Bhawan feature centuries-old lime plaster and yellow Jodhpur sandstone that turn muddy and unnatural when hit with harsh, uncalibrated consumer lights.
            </p>
            <p className="text-sm sm:text-base text-[#F5F2EB]/80 leading-relaxed">
              We deploy bespoke Aputure and Astera wireless cinema fixtures equipped with custom honeycomb grids and lantern diffusers, suspended discretely or positioned beyond guest sightlines. This directional light control illuminates the bride and groom with a soft, flattering 5600K-to-3200K wrap-around key light while allowing the background palace arches to fall into natural, velvety shadow.
            </p>
            <p className="text-sm sm:text-base text-[#F5F2EB]/80 leading-relaxed">
              Because historical palace venues impose strict heritage preservation rules barring wall anchors or heavy floor rigging, our lighting infrastructure is 100% self-powered and wireless. Our camera sensors operate at calibrated dual-native ISOs of 800 and 3200, allowing us to film dimly lit torchlit lake arrivals and midnight Pheras with immaculate clarity and zero digital grain.
            </p>
          </div>
        </section>

        {/* Pillar 3: 32-Bit Float Sound */}
        <section className="mb-20 space-y-6">
          <div className="flex items-center gap-3 text-gold">
            <Volume2 className="w-6 h-6" />
            <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white">
              32-Bit Float Sound Engineering: Preserving the Acoustic Soul of Royal Heritage
            </h2>
          </div>
          <div className="p-8 rounded-2xl bg-[#33060D] border border-gold/25 space-y-4">
            <p className="text-base sm:text-lg text-[#F5F2EB] leading-relaxed">
              <strong className="text-gold font-bold">Pure palatial cinematography requires multi-channel 32-bit float acoustic recording to capture the delicate whisper of ancestral vows without audio clipping during deafening cannon fire and festive dhol processions.</strong> Wedding films often suffer from poor audio where the acoustic grandeur of historic courtyards turns into hollow, reverberant echo. KD Creations approaches wedding sound with the discipline of feature-film sound designers, deploying discrete Sennheiser MKH shotgun microphones, wireless micro-lavaliers hidden within bridal jewelry, and ambient stereo boundary mics placed strategically across the palace perimeter.
            </p>
            <p className="text-sm sm:text-base text-[#F5F2EB]/80 leading-relaxed">
              Our 32-bit float digital recording infrastructure eliminates the concept of distorted or clipped audio forever. When a royal groom arrives accompanied by fifty synchronized Punjabi dhols and ceremonial brass bands producing over 120 decibels of sound pressure, our recording preamps automatically maintain pristine dynamic headroom without peak distortion.
            </p>
            <p className="text-sm sm:text-base text-[#F5F2EB]/80 leading-relaxed">
              During the silent sanctity of the Kanyadaan and Saptapadi, our directional microphones reject surrounding ambient wind across palace lakes to isolate the sacred Sanskrit mantras chanted by the family priests. In post-production, this audio undergoes Hollywood-grade stereo and Dolby Atmos spatial mastering, immersing the family in a three-dimensional soundscape that transports them back to the palace marble decades into the future.
            </p>
          </div>
        </section>

        {/* Pillar 4: Italian Leather Albums */}
        <section className="mb-20 space-y-6">
          <div className="flex items-center gap-3 text-gold">
            <Award className="w-6 h-6" />
            <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white">
              The Masterpiece Deliverable: Hand-Bound Italian Leather Heirloom Flush-Mount Albums
            </h2>
          </div>
          <div className="p-8 rounded-2xl bg-[#33060D] border border-gold/25 space-y-4">
            <p className="text-base sm:text-lg text-[#F5F2EB] leading-relaxed">
              <strong className="text-gold font-bold">Physical visual heirlooms must be crafted from archival museum-grade materials designed to resist atmospheric humidity and thermal yellowing across multiple generations.</strong> Complementing our 4K anamorphic films, Creative Director Mahesh Parmar personally curates KD Creations’ bespoke 12x18 and 12x24-inch master heirloom flush-mount albums for our ₹15L+ patrons. Unlike mass-market photo books that crack at the gutter and utilize chemical-bleached paper, our master volumes are hand-bound in Florence, Italy, using full-grain Tuscan vegetable-tanned leather, hand-stitched book blocks, and shatterproof acrylic glass frontispieces.
            </p>
            <p className="text-sm sm:text-base text-[#F5F2EB]/80 leading-relaxed">
              Each panoramic spread is printed on 100% cotton-rag, acid-free museum fine-art archival paper using 12-color pigment-based Lucia PRO inks that guarantee color stability for over 200 years. The rigid flush-mount core substrate ensures that pages lay perfectly flat across two-foot spreads, allowing panoramic royal palace portraits to extend uninterrupted across the binding.
            </p>
            <p className="text-sm sm:text-base text-[#F5F2EB]/80 leading-relaxed">
              Each heirloom volume is housed inside an artisan-crafted solid teakwood or brushed gold presentation coffer, customized with the couple’s royal wedding crest laser-engraved in 24-karat gold leaf. This is not merely a photo album; it is a generational family archive designed to outlive everyone present on the wedding day.
            </p>
          </div>
        </section>

        {/* Pillar 5: Discreet Royalty Etiquette */}
        <section className="mb-20 space-y-6">
          <div className="flex items-center gap-3 text-gold">
            <ShieldCheck className="w-6 h-6" />
            <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white">
              The KD Creations Production Protocol: Discreet Royalty-Calibrated Etiquette
            </h2>
          </div>
          <div className="p-8 rounded-2xl bg-[#33060D] border border-gold/25 space-y-4">
            <p className="text-base sm:text-lg text-[#F5F2EB] leading-relaxed">
              <strong className="text-gold font-bold">Capturing royal destination weddings requires a completely unobtrusive, editorial production footprint that never directs, interrupts, or stages sacred heritage ceremonies.</strong> Mahesh Parmar and Harshad Chavda adhere to a strict observational documentary doctrine: the real emotional weight of a royal wedding occurs in the unscripted spaces between formal rituals. Our team dresses in formal bespoke monochrome attire that blends into the background of high-society gatherings, moving with the quiet precision of an editorial photojournalism unit.
            </p>
            <p className="text-sm sm:text-base text-[#F5F2EB]/80 leading-relaxed">
              We operate without massive shoulder rigs, bulky cranes, or shouting crew members that shatter the solemnity of ancestral Rajputana or Gujarati marriage customs. By pairing high-magnification cinema primes with stabilized handheld gimbals and silent electronic shutters, we capture unguarded tears, spontaneous embraces, and authentic royal dignity from respectful, long-range vantage points.
            </p>
            <p className="text-sm sm:text-base text-[#F5F2EB]/80 leading-relaxed">
              Every commission is limited to a maximum of 12 royal destination weddings per calendar year. This exclusivity ensures that our founding directors personally lead the pre-production venue recce, oversee every camera package on location, and hand-edit every frame of the final 4K anamorphic master film.
            </p>
          </div>
        </section>

        {/* Case Study */}
        <section className="mb-20 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#3B0811] to-[#240409] border border-gold/40 shadow-2xl">
          <span className="text-xs font-mono text-gold font-bold uppercase tracking-widest block mb-2">Architectural Field Study</span>
          <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white mb-6">
            The Udaipur Island Palace Sunset Commission
          </h2>
          <p className="text-base sm:text-lg text-[#F5F2EB] leading-relaxed mb-4">
            <strong className="text-gold font-bold">Transforming a sunset palace wedding on Lake Pichola into an anamorphic cinema masterwork requires meticulous synchronization between astronomical golden hour and royal procession schedules.</strong> During a recent ₹25L+ multi-day destination commission at a private island palace in Udaipur, KD Creations was tasked with documenting a 400-guest royal union spanning water arrivals, terrace Sangeet spectacles, and a lakeside Mandap. Utilizing astronomical sun-tracking software, Harshad Chavda mapped the exact 14-minute window where the sun crested the Aravalli hills, positioning two anamorphic camera units to capture the bride's boat arrival backlit by molten gold reflections.
          </p>
          <p className="text-sm sm:text-base text-[#F5F2EB]/80 leading-relaxed">
            As twilight settled, our team balanced the warm illumination of 3,000 traditional oil lamps with cold-tone fill lights concealed within the palace arches, creating a dramatic color contrast that evoked classic cinema aesthetics. The resulting 4K 2.39:1 feature film captured the historic event with the visual gravity of a Hollywood historical drama, earning unanimous acclaim from the royal family and international guests alike.
          </p>
        </section>

        {/* Comprehensive FAQ Section */}
        <section className="mb-20 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-gold text-center mb-10 uppercase tracking-wider">
            Frequently Answered Technical Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-[#33060D] border border-gold/30">
              <h3 className="font-bold text-gold text-base mb-2">Why is 4K anamorphic cinematography superior to standard 4K digital video?</h3>
              <p className="text-xs sm:text-sm text-[#F5F2EB]/80 leading-relaxed">
                True 4K anamorphic cinematography utilizes specialized cylindrical glass elements that squeeze a wider horizontal field of view onto the camera sensor, producing an authentic 2.39:1 cinemascope aspect ratio without cropping away valuable pixels. This optical process produces oval bokeh, horizontal blue or golden lens flares, and an unmistakable organic three-dimensional separation between the couple and the vast palace architecture that spherical lenses cannot replicate.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#33060D] border border-gold/30">
              <h3 className="font-bold text-gold text-base mb-2">How does KD Creations handle heritage preservation rules at palaces?</h3>
              <p className="text-xs sm:text-sm text-[#F5F2EB]/80 leading-relaxed">
                KD Creations operates with a 100% wireless, self-powered lighting and camera infrastructure that complies completely with the Archaeological Survey of India and private palace trust regulations. We do not drill, tape, or run high-voltage cables across historic marble or sandstone, deploying lightweight carbon-fiber stands and specialized architectural lighting that protects heritage surfaces.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#33060D] border border-gold/30">
              <h3 className="font-bold text-gold text-base mb-2">What is included in the ₹15,00,000+ ultra-luxury palace package?</h3>
              <p className="text-xs sm:text-sm text-[#F5F2EB]/80 leading-relaxed">
                Our ultra-luxury package includes full multi-day destination coverage led personally by founders Mahesh Parmar and Harshad Chavda, a 4K Anamorphic Feature Film, a 3-Minute Cinematic Trailer, RAW archive storage on encrypted drives, two hand-bound Italian leather flush-mount heirloom albums, and drone cinematography operated by certified aerial pilots.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#33060D] border border-gold/30">
              <h3 className="font-bold text-gold text-base mb-2">How far in advance should royal families reserve KD Creations?</h3>
              <p className="text-xs sm:text-sm text-[#F5F2EB]/80 leading-relaxed">
                Because KD Creations strictly accepts only 12 luxury commissions worldwide per calendar year to preserve our uncompromising production standards, royal families and planners typically commission our team 8 to 14 months prior to the wedding date.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Concierge Banner */}
        <section className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-[#4A0E17] via-[#33060D] to-[#240409] border-2 border-gold text-center relative shadow-[0_20px_50px_rgba(212,175,55,0.25)]">
          <span className="text-xs font-mono text-gold font-bold uppercase tracking-widest block mb-3">Limited Annual Calendar • Max 12 Commissions</span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white mb-6">
            Commission Your Heritage Palace Cinema Masterpiece
          </h2>
          <p className="text-base sm:text-lg text-[#F5F2EB]/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Entrust your royal celebration to the master visual directors who treat your family heritage as high cinema. Connect directly with founders Mahesh Parmar and Harshad Chavda for a private full-length anamorphic cinema screening and palace architectural consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-10 py-5 rounded-xl bg-gold-gradient text-obsidian font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-xl"
            >
              Request Private Screening & Availability
            </button>
            <a
              href="https://wa.me/919033032922?text=Inquiry%20regarding%204K%20Anamorphic%20Palace%20Cinematography%20Commission%20(₹15L+)"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 rounded-xl bg-[#240409] border border-gold text-gold font-bold text-sm uppercase tracking-wider hover:bg-gold hover:text-obsidian transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Direct WhatsApp Concierge</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};
