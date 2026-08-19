import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles, MapPin, Award, CheckCircle2 } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'AHMEDABAD & GUJARAT COVERAGE',
    question: 'Why is KD Creation considered the best luxury wedding photographer in Ahmedabad?',
    answer: 'KD Creation is led by founders Mahesh Parmar and Harshad Chavda with over 10+ years of expertise and 500+ luxury weddings shot across Ahmedabad, Gujarat, and international destinations. We specialize in 4K anamorphic cinematography, candid emotional storytelling, fine-art portraiture, and handcrafted Italian leather heirloom albums.'
  },
  {
    id: 'faq-2',
    category: 'PRICING & PACKAGES',
    question: 'What is the cost of wedding photography & 4K cinematography packages in Ahmedabad?',
    answer: 'Our bespoke wedding packages range from Essential Luxury (₹5L – ₹10L), Royal Signature (₹10L – ₹15L), to Master Experience (₹15L – ₹25L+). Pricing depends on event duration, crew size (up to 10+ directors), drone aerial cinematics, pre-wedding films, and heirloom album choices.'
  },
  {
    id: 'faq-3',
    category: 'DESTINATION WEDDINGS',
    question: 'Do you cover destination weddings outside Ahmedabad in Udaipur, Goa, or Worldwide?',
    answer: 'Yes! Over 40% of our portfolio includes royal destination weddings in Udaipur, Jaipur, Jodhpur, Goa beachfront resorts, Mumbai, Delhi, and international destinations. Our director team handles all logistics, permits, and destination location scouting.'
  },
  {
    id: 'faq-4',
    category: 'DELIVERY TIMELINES',
    question: 'How quickly do we receive our wedding photos, 4K cinema films, and reels?',
    answer: 'We provide Next-Day 24-Hour delivery for Instagram Social Reels. High-resolution edited candid photos are delivered via private online client gallery within 3 weeks. Master 4K Cinema Feature Films and handcrafted genuine leather heirloom albums are delivered within 4 to 6 weeks.'
  },
  {
    id: 'faq-5',
    category: 'CINEMA EQUIPMENT',
    question: 'What camera gear and drone technology does KD Creation use for wedding films?',
    answer: 'We deploy Sony FX Series 4K Cinema cameras, anamorphic cine optics, 85mm prime portrait lenses, DJI Ronin 3-axis gimbals, continuous cinema directional lighting matrix, master multi-channel audio recorders, and 4K aerial drones.'
  },
  {
    id: 'faq-6',
    category: 'BOOKING & AVAILABILITY',
    question: 'How far in advance should we book KD Creation for our Gujarati wedding dates?',
    answer: 'Because we limit our bookings each wedding season to guarantee uncompromising artistic quality, we recommend reserving your dates 4 to 8 months in advance, especially for popular auspicious Gujarati wedding muhurat dates in November to March.'
  }
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  // Structured Data for Google Search Engine FAQ Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': FAQS.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="relative py-28 sm:py-36 bg-[#2B050B] border-t border-gold/20 text-[#F5F2EB] overflow-hidden">
      {/* Dynamic Schema Injection for Google FAQ Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-serif-luxury font-bold tracking-widest uppercase mb-4 shadow-md">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>EXPERT WEDDING INSIGHTS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold uppercase text-[#F5F2EB] mb-6">
            FREQUENTLY ASKED <span className="text-gold-gradient italic font-normal">QUESTIONS</span>
          </h2>
          <div className="w-16 h-[1.5px] bg-gold mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#F5F2EB]/80 font-semibold leading-relaxed">
            Everything you need to know about hiring Ahmedabad’s premier luxury wedding photography & 4K cinematography team.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-gold/30 bg-[#3B0811]/90 overflow-hidden shadow-lg transition-all duration-300 hover:border-gold/60"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none group"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] tracking-[0.2em] font-mono text-gold font-bold uppercase block">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif-luxury font-bold text-[#F5F2EB] group-hover:text-gold transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`p-2 rounded-full border border-gold/30 text-gold transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 bg-gold/20' : 'bg-gold/5'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-gold/15 text-xs sm:text-sm text-[#F5F2EB]/85 font-medium leading-relaxed">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Geographic Coverage Footer SEO Bar */}
        <div className="mt-16 p-6 rounded-2xl border border-gold/30 bg-[#1C0307] text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-gold text-xs font-serif-luxury font-bold uppercase">
            <MapPin className="w-4 h-4" />
            <span>PRIMARY SERVICE LOCATIONS ACROSS GUJARAT & INDIA</span>
          </div>
          <p className="text-xs text-[#F5F2EB]/70 font-semibold leading-relaxed max-w-4xl mx-auto">
            <strong>Ahmedabad</strong> • <strong>Gandhinagar</strong> • <strong>Vadodara</strong> • <strong>Surat</strong> • <strong>Rajkot</strong> • <strong>Anand</strong> • <strong>Nadiad</strong> • <strong>Udaipur</strong> • <strong>Jaipur</strong> • <strong>Goa</strong> • <strong>Mumbai</strong> • <strong>International Destinations</strong>
          </p>
        </div>
      </div>
    </section>
  );
};
