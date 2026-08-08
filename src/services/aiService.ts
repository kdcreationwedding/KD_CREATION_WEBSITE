import { ChatMessage, Lead } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';

export interface ChatState {
  step: 'greeting' | 'name' | 'date' | 'location' | 'services' | 'budget' | 'phone' | 'complete';
  leadData: Partial<Lead>;
}

export class AiService {
  /**
   * Initial AI Greeting Message
   */
  static getInitialState(): { message: ChatMessage; state: ChatState } {
    const message: ChatMessage = {
      id: 'init-1',
      sender: 'ai',
      text: `Namaste & Welcome to **KD CREATION**! ✨\n\nI am **KD AI**, your personal Luxury Wedding Film & Photography Consultant.\n\nWhether you're planning a royal palace wedding, a beach destination, or a intimate celebration, I am here to help you check dates, tailor packages, or answer any questions.\n\nHow can I assist you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      options: [
        { label: '📅 CHECK DATE AVAILABILITY', action: 'check_avail' },
        { label: '🎬 EXPLORE SERVICES & PACKAGES', action: 'explore_services' },
        { label: '💰 VIEW PRICING & TIERS', action: 'view_pricing' },
        { label: '💬 CHAT DIRECTLY ON WHATSAPP', action: 'whatsapp_direct' }
      ]
    };

    return {
      message,
      state: {
        step: 'greeting',
        leadData: { services: [], leadSource: 'AI Chatbot' }
      }
    };
  }

  /**
   * Smart Natural Language Intent & Entity Parser
   */
  static processUserResponse(
    userText: string, 
    actionValue: string | undefined, 
    currentState: ChatState
  ): { reply: ChatMessage; newState: ChatState } {
    const rawText = userText.trim();
    const lower = rawText.toLowerCase();
    const updatedLead = { ...currentState.leadData };
    let nextStep = currentState.step;
    let replyText = "";
    let options: { label: string; action: string; value?: string }[] | undefined;

    // --- SMART ENTITY EXTRACTIONS ---
    
    // Extract Phone Number (10 digits)
    const phoneMatch = rawText.match(/(\+?91[\-\s]?)?[6-9]\d{9}/);
    if (phoneMatch) {
      updatedLead.phone = phoneMatch[0];
    }

    // Extract Email
    const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) {
      updatedLead.email = emailMatch[0];
    }

    // --- INTENT ROUTING ENGINE ---

    // 1. Direct WhatsApp Click
    if (actionValue === 'whatsapp_direct' || lower.includes('whatsapp') || lower.includes('chat with team')) {
      nextStep = 'complete';
      replyText = `You can chat directly with our Creative Director team right now on WhatsApp! Click below to open chat with **${SITE_CONFIG.brand.phone}**.\n\nOur team responds within minutes.`;
      options = [
        { label: '💬 OPEN WHATSAPP NOW', action: 'whatsapp_direct' },
        { label: '📅 CHECK DATE AVAILABILITY', action: 'check_avail' }
      ];
    }
    
    // 2. Pricing & Cost Queries
    else if (actionValue === 'view_pricing' || lower.includes('price') || lower.includes('cost') || lower.includes('package') || lower.includes('rate') || lower.includes('ketla') || lower.includes('bhav')) {
      nextStep = 'budget';
      replyText = `At **KD CREATION**, every wedding film is a bespoke cinematic masterpiece tailored to your scale, events, and vision.\n\nOur signature experiences range from:\n• **Essential Luxury (₹5L – ₹10L)**: Photography, Highlights & Reels\n• **Royal Signature (₹10L – ₹15L)**: 4K Anamorphic Cinema + Full Photography + Drone + Leather Albums\n• **Master Experience (₹15L – ₹25L+)**: Complete 10+ Director Crew Coverage + Pre-Wedding Film + Same-Day Reels\n\nWhat tier matches your wedding vision?`;
      options = [
        { label: '₹5L - ₹10L Tier', action: 'set_budget', value: '₹5L - ₹10L' },
        { label: '₹10L - ₹15L Tier', action: 'set_budget', value: '₹10L - ₹15L' },
        { label: '₹15L - ₹25L+ Tier', action: 'set_budget', value: '₹15L - ₹25L+' },
        { label: 'Custom Luxury Experience', action: 'set_budget', value: 'Custom Luxury' }
      ];
    }

    // 3. Availability & Date Queries
    else if (actionValue === 'check_avail' || lower.includes('available') || lower.includes('date') || lower.includes('book') || lower.includes('tariq') || lower.includes('kayre')) {
      nextStep = 'date';
      replyText = `Wonderful! Our director crew books limited royal weddings each season to guarantee uncompromising quality.\n\nWhat is your planned **Wedding Date** or month?`;
      options = [
        { label: 'Late 2025', action: 'set_date', value: 'Late 2025' },
        { label: 'Early 2026', action: 'set_date', value: 'Early 2026' },
        { label: 'Mid 2026', action: 'set_date', value: 'Mid 2026' },
        { label: 'Late 2026', action: 'set_date', value: 'Late 2026' }
      ];
    }

    // 4. Explore Services & Coverage
    else if (actionValue === 'explore_services' || lower.includes('service') || lower.includes('film') || lower.includes('photo') || lower.includes('reel') || lower.includes('album')) {
      replyText = `KD CREATION provides end-to-end luxury visual coverage:\n\n1. **Wedding Cinematography**: 4K Anamorphic Feature Films\n2. **Editorial Photography**: Fine-Art Portraits & Candid Stills\n3. **Pre-Wedding Films**: Concept Love Stories at Exotic Destinations\n4. **Wedding Reels**: 24-Hour Next-Day High Impact Reels\n5. **Handcrafted Albums**: Italian Leather Heirloom Books\n\nWhich of these would you like included in your package?`;
      options = [
        { label: 'Complete Coverage (Films + Photos)', action: 'set_service', value: 'Complete Wedding Coverage' },
        { label: 'Cinematography & Reels', action: 'set_service', value: 'Wedding Cinematography' },
        { label: 'Photography Only', action: 'set_service', value: 'Wedding Photography' },
        { label: 'Pre-Wedding Love Story Film', action: 'set_service', value: 'Pre-Wedding Film' }
      ];
    }

    // 5. Handling Date Selection
    else if (actionValue === 'set_date' || currentState.step === 'date') {
      if (rawText) updatedLead.weddingDate = rawText;
      nextStep = 'location';
      replyText = `Got it! Date recorded (${rawText}).\n\nWhich city, palace, or resort venue will your wedding celebration take place in?`;
      options = [
        { label: 'Udaipur / Jaipur / Jodhpur', action: 'set_loc', value: 'Rajasthan Royal Palace' },
        { label: 'Goa Beachfront', action: 'set_loc', value: 'Goa Destination' },
        { label: 'Mumbai / Delhi', action: 'set_loc', value: 'Mumbai / Delhi Metro' },
        { label: 'International Destination', action: 'set_loc', value: 'International Destination' }
      ];
    }

    // 6. Handling Location Selection
    else if (actionValue === 'set_loc' || currentState.step === 'location') {
      if (rawText) updatedLead.weddingLocation = rawText;
      nextStep = 'services';
      replyText = `Exquisite location (${rawText})!\n\nWhat type of visual coverage would you prefer for your celebrations?`;
      options = [
        { label: 'Full Team (Cinema + Photos + Reels)', action: 'set_service', value: 'Complete Wedding Coverage' },
        { label: 'Cinematography Feature Film', action: 'set_service', value: 'Wedding Cinematography' },
        { label: 'Editorial Still Photography', action: 'set_service', value: 'Wedding Photography' }
      ];
    }

    // 7. Handling Service Selection
    else if (actionValue === 'set_service' || currentState.step === 'services') {
      if (rawText) {
        const currentSvcs = updatedLead.services || [];
        if (!currentSvcs.includes(rawText)) currentSvcs.push(rawText);
        updatedLead.services = currentSvcs;
      }
      nextStep = 'budget';
      replyText = `Understood. To help us customize the exact crew size and cinema equipment for your dates, what is your approximate budget tier?`;
      options = [
        { label: '₹5L - ₹10L', action: 'set_budget', value: '₹5L - ₹10L' },
        { label: '₹10L - ₹15L', action: 'set_budget', value: '₹10L - ₹15L' },
        { label: '₹15L - ₹25L+', action: 'set_budget', value: '₹15L - ₹25L+' },
        { label: 'Custom Luxury Package', action: 'set_budget', value: 'Custom Luxury' }
      ];
    }

    // 8. Handling Budget Selection
    else if (actionValue === 'set_budget' || currentState.step === 'budget') {
      if (rawText) updatedLead.budget = rawText;
      nextStep = 'name';
      replyText = `Excellent! May I know your **Full Name** so our Creative Director can personally assist you?`;
    }

    // 9. Handling Name Selection
    else if (currentState.step === 'name') {
      updatedLead.name = rawText;
      nextStep = 'phone';
      replyText = `Pleasure to meet you, **${rawText}**! ✨\n\nLastly, please share your **Phone or WhatsApp Number** so our director team can send over customized brochure PDFs and date confirmations.`;
    }

    // 10. Handling Phone / Completion
    else if (currentState.step === 'phone' || phoneMatch || actionValue === 'set_phone') {
      if (rawText) updatedLead.phone = phoneMatch ? phoneMatch[0] : rawText;
      nextStep = 'complete';
      replyText = `Thank you so much, **${updatedLead.name || 'Friend'}**! 🎉\n\nYour enquiry has been assigned top priority in our system. You can connect directly with our founder on WhatsApp right now with all your details pre-loaded!`;
      options = [
        { label: '💬 CHAT ON WHATSAPP NOW', action: 'whatsapp_direct' },
        { label: '📅 SUBMIT ANOTHER ENQUIRY', action: 'check_avail' }
      ];
    }

    // 11. Multilingual Greetings (Gujarati, Hindi, English)
    else if (lower.includes('kem chho') || lower.includes('kem cho') || lower.includes('majama') || lower.includes('namaste') || lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      replyText = `Hello! Subh Sandhya / Welcome to **KD CREATION**! 😊\n\nWe would love to make your wedding an enduring cinematic film. Would you like to check date availability or discuss custom packages?`;
      options = [
        { label: '📅 CHECK DATE AVAILABILITY', action: 'check_avail' },
        { label: '💰 VIEW PRICING & PACKAGES', action: 'view_pricing' },
        { label: '💬 TALK ON WHATSAPP', action: 'whatsapp_direct' }
      ];
    }

    // 12. Fallback Intelligence
    else {
      replyText = `Thank you for reaching out! To assist you best, would you like to check team availability for your wedding date or discuss customized pricing packages?`;
      options = [
        { label: '📅 CHECK AVAILABILITY', action: 'check_avail' },
        { label: '💰 VIEW PRICING TIERS', action: 'view_pricing' },
        { label: '💬 CHAT ON WHATSAPP', action: 'whatsapp_direct' }
      ];
    }

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
        leadData: updatedLead
      }
    };
  }
}
