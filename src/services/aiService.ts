import { ChatMessage, Lead } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';

export interface ChatState {
  step: 'greeting' | 'consultation' | 'name' | 'date' | 'location' | 'services' | 'budget' | 'phone' | 'complete';
  leadData: Partial<Lead>;
  conversationHistory: { role: 'user' | 'assistant'; text: string }[];
}

export class AiService {
  /**
   * Initial AI Greeting Message
   */
  static getInitialState(): { message: ChatMessage; state: ChatState } {
    const message: ChatMessage = {
      id: 'init-1',
      sender: 'ai',
      text: `Namaste & Warm Welcome! ✨\n\nI am **KD AI**, your Chief Wedding Film Consultant at **KD CREATION**.\n\nWhether you're planning a royal palace affair in Rajasthan, a beach destination in Goa, or an intimate luxury wedding, I am here to answer all your questions about our 4K cinema films, dates, pricing, and photography style.\n\nHow can I help curate your dream wedding story today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      options: [
        { label: '📅 CHECK DATE AVAILABILITY', action: 'check_avail' },
        { label: '💰 EXPLORE PACKAGES & PRICING', action: 'view_pricing' },
        { label: '🎬 WATCH 4K SHOWREELS & FILMS', action: 'explore_films' },
        { label: '👤 MEET FOUNDERS & CREW', action: 'about_founders' },
        { label: '💬 CHAT ON WHATSAPP WITH DIRECTOR', action: 'whatsapp_direct' }
      ]
    };

    return {
      message,
      state: {
        step: 'greeting',
        leadData: { services: [], leadSource: 'AI Chatbot' },
        conversationHistory: [{ role: 'assistant', text: message.text }]
      }
    };
  }

  /**
   * Advanced OpenAI-Style Natural Language Processing Engine
   */
  static processUserResponse(
    userText: string, 
    actionValue: string | undefined, 
    currentState: ChatState
  ): { reply: ChatMessage; newState: ChatState } {
    const rawText = userText.trim();
    const lower = rawText.toLowerCase();
    const updatedLead = { ...currentState.leadData };
    const history = [...(currentState.conversationHistory || [])];
    
    if (rawText) {
      history.push({ role: 'user', text: rawText });
    }

    let nextStep = currentState.step;
    let replyText = "";
    let options: { label: string; action: string; value?: string }[] | undefined;

    // --- ENTITY EXTRACTIONS (Phone, Email, Names) ---
    const phoneMatch = rawText.match(/(\+?91[\-\s]?)?[6-9]\d{9}/);
    if (phoneMatch) {
      updatedLead.phone = phoneMatch[0];
    }

    const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) {
      updatedLead.email = emailMatch[0];
    }

    // --- KNOWLEDGE ENGINE & INTENT ROUTER ---

    // 1. Direct WhatsApp Inquiry
    if (actionValue === 'whatsapp_direct' || lower.includes('whatsapp') || lower.includes('chat with team') || lower.includes('number') || lower.includes('call')) {
      nextStep = 'complete';
      replyText = `You can connect directly with our Creative Director team right now on WhatsApp! Click below to start chatting with **${SITE_CONFIG.brand.phone}**.\n\nOur founders **Mahesh Parmar** and **Harshad Chawda** will personally respond to your inquiry! 🥂`;
      options = [
        { label: '💬 OPEN WHATSAPP NOW', action: 'whatsapp_direct' },
        { label: '📅 CHECK DATE AVAILABILITY', action: 'check_avail' }
      ];
    }

    // 2. Pricing & Cost Inquiries
    else if (actionValue === 'view_pricing' || lower.includes('price') || lower.includes('cost') || lower.includes('package') || lower.includes('rate') || lower.includes('bhav') || lower.includes('ketla') || lower.includes('kethla')) {
      nextStep = 'budget';
      replyText = `At **KD CREATION**, we treat every wedding as an heirloom film piece.\n\nHere is our signature package structure:\n\n✨ **Essential Luxury Tier (₹5L – ₹10L)**:\nComplete candid photography, 4K highlight film, and 24-hour social reels.\n\n👑 **Royal Signature Tier (₹10L – ₹15L)**:\n4K Anamorphic cinema coverage + drone cinematics + luxury Italian leather heirloom albums.\n\n🌟 **Master Experience (₹15L – ₹25L+)**:\n10+ Director crew, pre-wedding love story film, same-day edit reels, & full multi-camera coverage.\n\nWhich experience aligns best with your wedding scale?`;
      options = [
        { label: '₹5L - ₹10L Package', action: 'set_budget', value: '₹5L - ₹10L' },
        { label: '₹10L - ₹15L Package', action: 'set_budget', value: '₹10L - ₹15L' },
        { label: '₹15L - ₹25L+ Royal Package', action: 'set_budget', value: '₹15L - ₹25L+' },
        { label: 'Custom Luxury Experience', action: 'set_budget', value: 'Custom Package' }
      ];
    }

    // 3. Date & Availability Inquiries
    else if (actionValue === 'check_avail' || lower.includes('available') || lower.includes('date') || lower.includes('book') || lower.includes('tariq') || lower.includes('kayre') || lower.includes('month')) {
      nextStep = 'date';
      replyText = `Fantastic! We limit our bookings each wedding season to maintain our uncompromising cinematic standards.\n\nWhat is your proposed **Wedding Date** or month?`;
      options = [
        { label: 'Upcoming Months 2025', action: 'set_date', value: '2025 Season' },
        { label: 'Early 2026 Season', action: 'set_date', value: 'Early 2026' },
        { label: 'Mid / Late 2026 Season', action: 'set_date', value: 'Late 2026' },
        { label: '2027 Wedding Season', action: 'set_date', value: '2027 Season' }
      ];
    }

    // 4. Explore Films & Showreels
    else if (actionValue === 'explore_films' || lower.includes('film') || lower.includes('teaser') || lower.includes('video') || lower.includes('showreel') || lower.includes('youtube')) {
      replyText = `We are proud to share some of our acclaimed 4K wedding films:\n\n🎬 **Yash & Kavya**: Royal Roka & Engagement Film\n🎬 **Dhaval & Sangeeta**: Pre-Wedding Love Story Teaser\n🎬 **Kaushik & Anjali**: High-Energy Wedding Highlights\n\nAll our films are shot in 4K Anamorphic with custom color grading by our in-house colorists. Would you like to check availability for your dates?`;
      options = [
        { label: '📅 CHECK DATE AVAILABILITY', action: 'check_avail' },
        { label: '💰 VIEW PRICING & PACKAGES', action: 'view_pricing' },
        { label: '💬 CHAT ON WHATSAPP', action: 'whatsapp_direct' }
      ];
    }

    // 5. About Founders & Crew
    else if (actionValue === 'about_founders' || lower.includes('founder') || lower.includes('owner') || lower.includes('team') || lower.includes('mahesh') || lower.includes('harshad') || lower.includes('aniket')) {
      replyText = `**KD CREATION** was founded by passion-driven visual storytellers:\n\n• **Mahesh Parmar** (Founder & Creative Director): 10+ years shaping fine-art wedding photography.\n• **Harshad Chawda** (Co-Founder & Technical Director): Master of 4K anamorphic cinema lighting.\n• **Aniket Vaghela** (Head of Cinematography): Drone & high-speed camera specialist.\n\nOur team has covered over **500+ Luxury Weddings** across India and international destinations!`;
      options = [
        { label: '📅 CHECK DATE AVAILABILITY', action: 'check_avail' },
        { label: '💰 VIEW PACKAGES', action: 'view_pricing' },
        { label: '💬 CONNECT ON WHATSAPP', action: 'whatsapp_direct' }
      ];
    }

    // 6. Conversational Greetings (Gujarati, Hindi, English)
    else if (lower.includes('kem chho') || lower.includes('kem cho') || lower.includes('majama') || lower.includes('su haal') || lower.includes('namaste') || lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('kemchho')) {
      replyText = `Ekdam Majama! Namaste & Hello! 😊\n\nIt is a pleasure meeting you! I'm KD AI, ready to assist you with dates, customized packages, or filming styles for your upcoming wedding.\n\nWhere would you like to start?`;
      options = [
        { label: '📅 CHECK DATE AVAILABILITY', action: 'check_avail' },
        { label: '💰 VIEW PRICING & TIERS', action: 'view_pricing' },
        { label: '🎬 WATCH SHOWREEL FILMS', action: 'explore_films' }
      ];
    }

    // 7. Date Handling
    else if (actionValue === 'set_date' || currentState.step === 'date') {
      if (rawText) updatedLead.weddingDate = rawText;
      nextStep = 'location';
      replyText = `Splendid! Date noted: **${rawText}**.\n\nWhere is your wedding venue or destination planned? (e.g., Udaipur, Jaipur, Goa, Mumbai, Ahmedabad, International)`;
      options = [
        { label: 'Udaipur / Rajasthan Palaces', action: 'set_loc', value: 'Rajasthan Heritage Palace' },
        { label: 'Goa Beachfront Resort', action: 'set_loc', value: 'Goa Beach Destination' },
        { label: 'Gujarat / Ahmedabad / Surat', action: 'set_loc', value: 'Gujarat Royal Venue' },
        { label: 'Mumbai / Delhi Metro', action: 'set_loc', value: 'Mumbai / Delhi Metro' }
      ];
    }

    // 8. Location Handling
    else if (actionValue === 'set_loc' || currentState.step === 'location') {
      if (rawText) updatedLead.weddingLocation = rawText;
      nextStep = 'services';
      replyText = `Wonderful choice (**${rawText}**)! Destined for a grand visual backdrop.\n\nWhat services would you like us to craft for you?`;
      options = [
        { label: 'Complete Package (Cinema + Photography + Reels)', action: 'set_service', value: 'Complete Coverage' },
        { label: 'Cinematography & 4K Reels', action: 'set_service', value: 'Wedding Cinematography' },
        { label: 'Editorial Still Photography', action: 'set_service', value: 'Wedding Photography' },
        { label: 'Pre-Wedding Film Shoot', action: 'set_service', value: 'Pre-Wedding Film' }
      ];
    }

    // 9. Service Selection Handling
    else if (actionValue === 'set_service' || currentState.step === 'services') {
      if (rawText) {
        const currentSvcs = updatedLead.services || [];
        if (!currentSvcs.includes(rawText)) currentSvcs.push(rawText);
        updatedLead.services = currentSvcs;
      }
      nextStep = 'budget';
      replyText = `Understood (**${rawText}**).\n\nTo tailor the ideal director crew size and cinema equipment for your dates, what budget tier matches your plans?`;
      options = [
        { label: '₹5L - ₹10L Tier', action: 'set_budget', value: '₹5L - ₹10L' },
        { label: '₹10L - ₹15L Tier', action: 'set_budget', value: '₹10L - ₹15L' },
        { label: '₹15L - ₹25L+ Royal Tier', action: 'set_budget', value: '₹15L - ₹25L+' }
      ];
    }

    // 10. Budget Handling
    else if (actionValue === 'set_budget' || currentState.step === 'budget') {
      if (rawText) updatedLead.budget = rawText;
      nextStep = 'name';
      replyText = `Got it! May I know your **Full Name** so our founder Mahesh Parmar can address your booking personally?`;
    }

    // 11. Name Handling
    else if (currentState.step === 'name') {
      updatedLead.name = rawText;
      nextStep = 'phone';
      replyText = `Pleasure to meet you, **${rawText}**! ✨\n\nLastly, please enter your **Phone or WhatsApp Number** so our team can send over customized PDF brochures and confirm team availability for your dates.`;
    }

    // 12. Phone Handling & Completion
    else if (currentState.step === 'phone' || phoneMatch) {
      if (rawText) updatedLead.phone = phoneMatch ? phoneMatch[0] : rawText;
      nextStep = 'complete';
      replyText = `Thank you so much, **${updatedLead.name || 'Dear Friend'}**! 🎉\n\nYour consultation request has been prioritized in our system. You can connect directly with founder **Mahesh Parmar** on WhatsApp right now with your inquiry details pre-loaded!`;
      options = [
        { label: '💬 CHAT ON WHATSAPP NOW', action: 'whatsapp_direct' },
        { label: '📅 SUBMIT ANOTHER INQUIRY', action: 'check_avail' }
      ];
    }

    // 13. General Human-Like Intelligence Fallback
    else {
      replyText = `That's great! At KD CREATION, we specialize in high-end 4K cinematography, editorial photography, and pre-wedding concept films.\n\nWould you like to check date availability, explore pricing, or connect directly on WhatsApp with our team?`;
      options = [
        { label: '📅 CHECK DATE AVAILABILITY', action: 'check_avail' },
        { label: '💰 VIEW PRICING & TIERS', action: 'view_pricing' },
        { label: '💬 CHAT ON WHATSAPP', action: 'whatsapp_direct' }
      ];
    }

    history.push({ role: 'assistant', text: replyText });

    const reply: ChatMessage = {
      id: `reply-${Date.now()}`,
      sender: 'ai',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      options
    };

    return {
      reply,
      newState: {
        step: nextStep,
        leadData: updatedLead,
        conversationHistory: history
      }
    };
  }
}
