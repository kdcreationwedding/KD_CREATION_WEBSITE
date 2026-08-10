import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, MapPin, Phone, Mail, User, DollarSign, MessageSquare, CheckCircle, MessageCircle, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LeadService } from '../../services/leadService';
import { SITE_CONFIG } from '../../config/siteConfig';

interface LeadFormSectionProps {
  preselectedService?: string;
}

export const LeadFormSection: React.FC<LeadFormSectionProps> = ({ preselectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    weddingDate: '',
    weddingLocation: '',
    eventDays: '2 Days',
    eventType: 'Full Wedding',
    services: preselectedService ? [preselectedService] : ['Wedding Cinematography', 'Wedding Photography'],
    guestCount: '100-300',
    budget: '₹1.5L - ₹3L',
    message: ''
  });

  // Auto-fill Email, Name & Date if logged in or stored in browser
  useEffect(() => {
    const syncLoginDetails = () => {
      try {
        // 1. Check active logged in client user session
        const savedClient = localStorage.getItem('kd_client_user');
        if (savedClient) {
          const clientObj = JSON.parse(savedClient);
          if (clientObj.name || clientObj.email) {
            setFormData((prev) => ({
              ...prev,
              name: clientObj.name || prev.name,
              email: clientObj.email || prev.email,
              weddingDate: clientObj.weddingDate || prev.weddingDate
            }));
            return;
          }
        }

        // 2. Check saved form inputs
        const savedEmail = localStorage.getItem('kd_user_email') || localStorage.getItem('user_email') || '';
        const savedName = localStorage.getItem('kd_user_name') || localStorage.getItem('user_name') || '';
        if (savedEmail || savedName) {
          setFormData((prev) => ({
            ...prev,
            email: savedEmail || prev.email,
            name: savedName || prev.name
          }));
        }
      } catch (err) {
        // Storage fallback
      }
    };

    syncLoginDetails();
    const intervalId = setInterval(syncLoginDetails, 1000);
    window.addEventListener('storage', syncLoginDetails);
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', syncLoginDetails);
    };
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Store in browser for future auto-fill
    if (name === 'email' && value) {
      try { localStorage.setItem('kd_user_email', value); } catch (e) {}
    }
    if (name === 'name' && value) {
      try { localStorage.setItem('kd_user_name', value); } catch (e) {}
    }
  };

  const handleServiceToggle = (svc: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(svc);
      const updated = exists ? prev.services.filter((s) => s !== svc) : [...prev.services, svc];
      return { ...prev, services: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate Lead & Score
    const lead = LeadService.createLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      weddingDate: formData.weddingDate,
      weddingLocation: formData.weddingLocation,
      eventType: `${formData.eventType} • ${formData.eventDays}`,
      services: formData.services,
      guestCount: formData.guestCount,
      budget: formData.budget,
      message: formData.message,
      leadSource: 'Contact Form'
    });

    const waUrl = LeadService.generateWhatsAppUrl(lead);
    setWhatsappUrl(waUrl);
    setSubmitted(true);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F3E5AB', '#8B6D21']
      });
    } catch (err) {
      // Confetti fallback
    }
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 bg-[#2B050B] border-t border-gold/20 overflow-hidden text-[#F5F2EB]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs tracking-[0.3em] font-serif-luxury font-extrabold text-gold uppercase block mb-3">
            START YOUR ENQUIRY
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#F5F2EB] uppercase leading-tight mb-4">
            YOUR STORY DESERVES <br />
            <span className="text-gold-gradient italic font-normal">TO BE REMEMBERED.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#F5F2EB]/80 font-semibold mb-6">
            LET'S CREATE SOMETHING TIMELESS. Share your event details below or connect directly via Gmail, WhatsApp, or Call.
          </p>
          
          {/* Quick Action Badges: Gmail + WhatsApp + Call */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Gmail Action */}
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${SITE_CONFIG.brand.email}&su=${encodeURIComponent('Wedding Photography & Film Enquiry - KD CREATION')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs tracking-widest font-bold text-gold border border-gold/40 bg-[#3B0811] px-5 py-2.5 rounded-full hover:bg-gold-gradient hover:text-obsidian transition-all shadow-md"
              title="Click to open Gmail directly"
            >
              <Mail className="w-4 h-4" />
              <span>GMAIL: {SITE_CONFIG.brand.email}</span>
            </a>

            {/* WhatsApp Option */}
            <a
              href={`https://wa.me/${SITE_CONFIG.WHATSAPP.number}?text=${encodeURIComponent(SITE_CONFIG.WHATSAPP.defaultGreeting)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs tracking-widest font-extrabold text-white bg-emerald-700 hover:bg-emerald-600 px-5 py-2.5 rounded-full border border-emerald-500/40 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WHATSAPP MSG</span>
            </a>

            {/* Direct Call Option */}
            <a
              href={`tel:${SITE_CONFIG.brand.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 text-xs tracking-widest font-extrabold text-obsidian bg-gold-gradient px-5 py-2.5 rounded-full shadow-md hover:brightness-110 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>CALL: {SITE_CONFIG.brand.phone}</span>
            </a>
          </div>
        </div>

        {/* Form Container */}
        <div className="liquid-glass-panel rounded-3xl p-8 sm:p-12 shadow-2xl relative border border-gold/35 bg-[#3B0811]/90">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs tracking-widest text-gold uppercase font-serif-luxury font-extrabold flex items-center gap-2">
                      <User className="w-3.5 h-3.5" />
                      YOUR FULL NAME (PERSON NAME) *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Mahesh Parmar"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#2B050B] border border-gold/35 rounded-xl px-4 py-3.5 text-sm text-[#F5F2EB] placeholder-[#F5F2EB]/40 font-semibold focus:outline-none focus:border-gold transition-colors shadow-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs tracking-widest text-gold uppercase font-serif-luxury font-extrabold flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5" />
                      PHONE / WHATSAPP *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 7859894521"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#2B050B] border border-gold/35 rounded-xl px-4 py-3.5 text-sm text-[#F5F2EB] placeholder-[#F5F2EB]/40 font-semibold focus:outline-none focus:border-gold transition-colors shadow-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs tracking-widest text-gold uppercase font-serif-luxury font-extrabold flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" />
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="concierge@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#2B050B] border border-gold/35 rounded-xl px-4 py-3.5 text-sm text-[#F5F2EB] placeholder-[#F5F2EB]/40 font-semibold focus:outline-none focus:border-gold transition-colors shadow-sm"
                    />
                  </div>

                  {/* Wedding Date */}
                  <div className="space-y-2">
                    <label className="text-xs tracking-widest text-gold uppercase font-serif-luxury font-extrabold flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      WEDDING DATE / MONTH *
                    </label>
                    <input
                      type="text"
                      name="weddingDate"
                      required
                      placeholder="e.g. 18th December 2026"
                      value={formData.weddingDate}
                      onChange={handleChange}
                      className="w-full bg-[#2B050B] border border-gold/35 rounded-xl px-4 py-3.5 text-sm text-[#F5F2EB] placeholder-[#F5F2EB]/40 font-semibold focus:outline-none focus:border-gold transition-colors shadow-sm"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="text-xs tracking-widest text-gold uppercase font-serif-luxury font-extrabold flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" />
                      CITY / VENUE LOCATION *
                    </label>
                    <input
                      type="text"
                      name="weddingLocation"
                      required
                      placeholder="e.g. Taj Lake Palace, Udaipur"
                      value={formData.weddingLocation}
                      onChange={handleChange}
                      className="w-full bg-[#2B050B] border border-gold/35 rounded-xl px-4 py-3.5 text-sm text-[#F5F2EB] placeholder-[#F5F2EB]/40 font-semibold focus:outline-none focus:border-gold transition-colors shadow-sm"
                    />
                  </div>

                  {/* Function Duration (Number of Days) */}
                  <div className="space-y-2">
                    <label className="text-xs tracking-widest text-gold uppercase font-serif-luxury font-extrabold flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      EVENT DURATION (NO. OF DAYS) *
                    </label>
                    <select
                      name="eventDays"
                      value={formData.eventDays}
                      onChange={handleChange}
                      className="w-full bg-[#2B050B] border border-gold/35 rounded-xl px-4 py-3.5 text-sm text-[#F5F2EB] font-semibold focus:outline-none focus:border-gold transition-colors shadow-sm"
                    >
                      <option value="1 Day">1 Day</option>
                      <option value="2 Days">2 Days</option>
                      <option value="3 Days">3 Days</option>
                      <option value="4 Days">4 Days</option>
                      <option value="5+ Days">5+ Days (Multi-Day)</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div className="space-y-2">
                    <label className="text-xs tracking-widest text-gold uppercase font-serif-luxury font-extrabold flex items-center gap-2">
                      <DollarSign className="w-3.5 h-3.5" />
                      APPROXIMATE BUDGET *
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-[#2B050B] border border-gold/35 rounded-xl px-4 py-3.5 text-sm text-[#F5F2EB] font-semibold focus:outline-none focus:border-gold transition-colors shadow-sm"
                    >
                      <option value="₹1.5L - ₹3L">₹1.5 Lakhs – ₹3 Lakhs</option>
                      <option value="₹3L - ₹5L">₹3 Lakhs – ₹5 Lakhs</option>
                      <option value="₹5L - ₹10L">₹5 Lakhs – ₹10 Lakhs</option>
                      <option value="₹10L - ₹15L">₹10 Lakhs – ₹15 Lakhs</option>
                      <option value="₹15L+ Luxury Experience">Custom Luxury Experience (₹15L+)</option>
                    </select>
                  </div>

                  {/* Guest Count (Optional) */}
                  <div className="space-y-2">
                    <label className="text-xs tracking-widest text-gold uppercase font-serif-luxury font-extrabold flex items-center gap-2">
                      <User className="w-3.5 h-3.5" />
                      ESTIMATED GUESTS (OPTIONAL)
                    </label>
                    <select
                      name="guestCount"
                      value={formData.guestCount || '100-300'}
                      onChange={handleChange}
                      className="w-full bg-[#2B050B] border border-gold/35 rounded-xl px-4 py-3.5 text-sm text-[#F5F2EB] font-semibold focus:outline-none focus:border-gold transition-colors shadow-sm"
                    >
                      <option value="Under 100">Intimate Gathering (Under 100)</option>
                      <option value="100-300">100 – 300 Guests</option>
                      <option value="300-500">300 – 500 Guests</option>
                      <option value="500-1000+">Grand Celebration (500 – 1000+ Guests)</option>
                    </select>
                  </div>

                </div>

                {/* Services Checkboxes */}
                <div className="space-y-3 pt-2">
                  <label className="text-xs tracking-widest text-gold uppercase font-serif-luxury font-extrabold block">
                    SELECT REQUIRED SERVICES *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      'Wedding Cinematography',
                      'Wedding Photography',
                      'Pre-Wedding Film',
                      'Wedding Reels',
                      'Handcrafted Albums',
                      'Complete Coverage'
                    ].map((svc) => {
                      const isSelected = formData.services.includes(svc);
                      return (
                        <button
                          key={svc}
                          type="button"
                          onClick={() => handleServiceToggle(svc)}
                          className={`text-xs p-3 rounded-xl border text-left flex items-center gap-2 transition-all shadow-sm ${
                            isSelected
                              ? 'bg-gold-gradient text-obsidian font-bold border-gold'
                              : 'bg-[#2B050B] border-gold/30 text-[#F5F2EB] font-semibold hover:border-gold'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${isSelected ? 'bg-obsidian border-obsidian text-gold' : 'border-gold/50'}`}>
                            {isSelected && <CheckCircle className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="truncate">{svc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs tracking-widest text-gold uppercase font-serif-luxury font-extrabold flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5" />
                    ADDITIONAL WEDDING DETAILS
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Tell us more about your vision, themes, or specific requests..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#2B050B] border border-gold/35 rounded-xl px-4 py-3.5 text-sm text-[#F5F2EB] placeholder-[#F5F2EB]/40 font-semibold focus:outline-none focus:border-gold transition-colors shadow-sm"
                  />
                </div>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 text-sm tracking-[0.2em] font-extrabold text-obsidian bg-gold-gradient py-4 rounded-2xl shadow-2xl hover:brightness-110 transition-all duration-300 active:scale-98"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>START MY STORY</span>
                </button>
              </motion.form>
            ) : (
              /* Success Confirmation Card */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-gold-gradient text-obsidian flex items-center justify-center mx-auto shadow-2xl">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-xs tracking-[0.3em] font-serif-luxury text-gold uppercase block mb-2 font-extrabold">
                    ENQUIRY CONFIRMED
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#F5F2EB] uppercase">
                    YOUR STORY HAS BEGUN.
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#F5F2EB]/85 font-semibold max-w-md mx-auto leading-relaxed">
                  Thank you, **{formData.name}**. Our creative director team has received your enquiry for **{formData.weddingDate}** at **{formData.weddingLocation}**.
                </p>

                <div className="pt-6 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-xs tracking-widest font-bold text-obsidian bg-gold-gradient px-8 py-4 rounded-full shadow-2xl hover:brightness-110 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>CHAT WITH KD CREATION ON WHATSAPP</span>
                  </a>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-gold font-bold underline tracking-widest uppercase hover:text-white pt-2 sm:pt-0"
                  >
                    SUBMIT ANOTHER ENQUIRY
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
