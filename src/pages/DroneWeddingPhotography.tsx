import React, { useEffect } from 'react';
import { ArrowRight, Plane, ShieldCheck, Film, Phone } from 'lucide-react';

interface PageProps {
  onBackToHome: () => void;
  onOpenBooking: () => void;
}

export const DroneWeddingPhotography: React.FC<PageProps> = ({ onBackToHome, onOpenBooking }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = "Drone Wedding Photography & Aerial Cinematography | KD Creations";

    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'schema-drone-photography';
    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Drone Wedding Photography & 4K Aerial Cinematography",
      "serviceType": "Aerial Cinematography",
      "provider": {
        "@type": "PhotographyStudio",
        "name": "KD Creations",
        "url": "https://www.kdcreations.in/"
      },
      "areaServed": "Ahmedabad, Gujarat, India",
      "description": "DGCA-compliant 4K aerial drone photography and cinematic videography for grand luxury weddings in Ahmedabad, Gujarat, and destination venues."
    });
    document.head.appendChild(schemaScript);

    return () => {
      const existingScript = document.getElementById('schema-drone-photography');
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#33060D] text-[#F5F2EB] pt-24 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-gold mb-8">
          <button onClick={onBackToHome} className="hover:underline">Home</button>
          <span>/</span>
          <span>Services</span>
          <span>/</span>
          <span className="text-white">Drone Wedding Photography</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-widest inline-block mb-4">
              4K Aerial Cinematography
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif-luxury font-bold leading-tight mb-6">
              Drone Wedding Photography in <span className="text-gold-gradient italic font-normal">Ahmedabad & Gujarat</span>
            </h1>
            <p className="text-base sm:text-lg text-[#F5F2EB]/80 leading-relaxed mb-8">
              Capture majestic overhead vistas of your grand Baarat, palace lawns, and sunset fireworks. KD Creations deploys DGCA-licensed drone pilots utilizing 4K 10-bit cinema quadcopters for smooth, cinematic aerial sweeping shots.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 rounded-xl bg-gold-gradient text-obsidian font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-3 shadow-xl"
              >
                <span>Book Drone Coverage</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/919033032922?text=Hi%20KD%20Creations,%20I%20am%20inquiring%20about%204K%20drone%20wedding%20coverage."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-[#4A0E17] border border-gold/40 text-gold font-bold text-sm uppercase tracking-wider hover:bg-gold hover:text-obsidian transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Drone Team</span>
              </a>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-gold/40 shadow-2xl">
            <img
              src="assets/service-wedding-photography.jpg"
              alt="Drone Wedding Photography Ahmedabad - KD Creations"
              className="w-full h-[450px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
