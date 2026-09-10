import React, { useEffect } from 'react';
import { ArrowRight, BookOpen, ShieldCheck, Award, Phone } from 'lucide-react';

interface PageProps {
  onBackToHome: () => void;
  onOpenBooking: () => void;
}

export const LuxuryWeddingAlbums: React.FC<PageProps> = ({ onBackToHome, onOpenBooking }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = "Italian Leather Wedding Albums & Prints | KD Creations";

    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'schema-wedding-albums';
    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Hand-Bound Italian Leather Flush-Mount Heirloom Wedding Albums",
      "brand": {
        "@type": "Brand",
        "name": "KD Creations"
      },
      "description": "Custom hand-bound Italian leather flush-mount wedding albums printed on 100% cotton-rag archival paper with 200-year colorfast pigment inks."
    });
    document.head.appendChild(schemaScript);

    return () => {
      const existingScript = document.getElementById('schema-wedding-albums');
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
          <span>Deliverables</span>
          <span>/</span>
          <span className="text-white">Italian Leather Wedding Albums</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-widest inline-block mb-4">
              200-Year Archival Preservation
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif-luxury font-bold leading-tight mb-6">
              Hand-Bound Italian Leather <span className="text-gold-gradient italic font-normal">Heirloom Albums</span>
            </h1>
            <p className="text-base sm:text-lg text-[#F5F2EB]/80 leading-relaxed mb-8">
              A physical archive designed to outlive generations. KD Creations curates bespoke 12x18 and 12x24-inch flush-mount albums hand-bound in Florence, Italy, using full-grain Tuscan leather and museum-grade archival fine-art paper.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 rounded-xl bg-gold-gradient text-obsidian font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-3 shadow-xl"
              >
                <span>Order Heirloom Album</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/919033032922?text=Hi%20KD%20Creations,%20I%20am%20inquiring%20about%20bespoke%20Italian%20leather%20wedding%20albums."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-[#4A0E17] border border-gold/40 text-gold font-bold text-sm uppercase tracking-wider hover:bg-gold hover:text-obsidian transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Album Concierge</span>
              </a>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-gold/40 shadow-2xl">
            <img
              src="assets/vishwa-dhawal-g2.jpg"
              alt="Italian Leather Wedding Albums - KD Creations"
              className="w-full h-[450px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
