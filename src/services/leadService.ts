import { Lead, LeadScore } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';

export class LeadService {
  /**
   * Calculate Lead Qualification Score (HOT / WARM / COLD)
   */
  static calculateLeadScore(partialLead: Partial<Lead>): LeadScore {
    let score = 0;

    // Specific Date provided (+25)
    if (partialLead.weddingDate && partialLead.weddingDate.trim().length > 3) {
      score += 25;
    }

    // Phone provided (+25)
    if (partialLead.phone && partialLead.phone.trim().length >= 8) {
      score += 25;
    }

    // Email provided (+10)
    if (partialLead.email && partialLead.email.includes('@')) {
      score += 10;
    }

    // Location provided (+15)
    if (partialLead.weddingLocation && partialLead.weddingLocation.trim().length > 2) {
      score += 15;
    }

    // Budget check
    if (partialLead.budget) {
      if (partialLead.budget.includes('15') || partialLead.budget.includes('20') || partialLead.budget.includes('Luxury')) {
        score += 25;
      } else if (partialLead.budget.includes('10') || partialLead.budget.includes('5')) {
        score += 15;
      } else {
        score += 10;
      }
    }

    // Services selected
    if (partialLead.services && partialLead.services.length >= 2) {
      score += 15;
    }

    if (score >= 70) return 'HOT';
    if (score >= 40) return 'WARM';
    return 'COLD';
  }

  /**
   * Generate complete Lead object
   */
  static createLead(data: Omit<Lead, 'id' | 'leadScore' | 'createdDate' | 'status'>): Lead {
    const score = this.calculateLeadScore(data);
    const lead: Lead = {
      ...data,
      id: `LEAD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      leadScore: score,
      createdDate: new Date().toISOString(),
      status: 'New'
    };

    // Save locally for admin preview/demo
    this.saveLeadToLocalStorage(lead);
    
    // Sync to backend if configured
    this.syncToBackend(lead);

    // Trigger Meta Pixel & Google Ads Conversion Event
    this.trackPerformanceLeadEvent(lead);

    return lead;
  }

  /**
   * Performance Marketing Conversion Tracker Hook (Meta Pixel & GA4)
   */
  static trackPerformanceLeadEvent(lead: Partial<Lead>): void {
    if (typeof window !== 'undefined') {
      try {
        if ((window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: lead.eventType || 'Wedding Photography Coverage',
            value: lead.budget || 'Custom Package',
            currency: 'INR'
          });
        }
        if ((window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', {
            event_category: 'Wedding Booking Inquiry',
            event_label: lead.weddingLocation || 'Ahmedabad',
            value: 1.0
          });
        }
      } catch (e) {
        console.warn('Analytics tracking not initialized yet', e);
      }
    }
  }

  /**
   * Fetch all stored leads from localStorage
   */
  static getStoredLeads(): Lead[] {
    try {
      const stored = localStorage.getItem('kd_leads');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read leads from localStorage', e);
    }
    return [];
  }

  /**
   * Clear stored leads
   */
  static clearStoredLeads(): void {
    try {
      localStorage.removeItem('kd_leads');
    } catch (e) {
      console.warn('Could not clear leads', e);
    }
  }

  /**
   * Generate direct WhatsApp link with pre-filled message
   */
  static generateWhatsAppUrl(leadData: Partial<Lead>): string {
    const phone = SITE_CONFIG.WHATSAPP.number;
    
    let message = `Hi *KD CREATION*, I'd like to check availability and request a quote for my wedding.\n\n`;
    if (leadData.name) message += `👤 *Name:* ${leadData.name}\n`;
    if (leadData.weddingDate) message += `📅 *Wedding Date:* ${leadData.weddingDate}\n`;
    if (leadData.weddingLocation) message += `📍 *Location:* ${leadData.weddingLocation}\n`;
    if (leadData.services && leadData.services.length > 0) {
      message += `🎬 *Services Required:* ${leadData.services.join(', ')}\n`;
    }
    if (leadData.budget) message += `💰 *Budget Tier:* ${leadData.budget}\n`;
    if (leadData.guestCount) message += `👥 *Guest Count:* ${leadData.guestCount}\n`;
    if (leadData.phone) message += `📞 *Contact:* ${leadData.phone}\n`;

    message += `\nLooking forward to hearing from your team!`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encodedMessage}`;
  }

  private static saveLeadToLocalStorage(lead: Lead) {
    try {
      const existing = this.getStoredLeads();
      existing.unshift(lead);
      localStorage.setItem('kd_leads', JSON.stringify(existing));
    } catch (e) {
      console.warn('Could not store lead to localStorage', e);
    }
  }

  private static async syncToBackend(lead: Lead) {
    if (SITE_CONFIG.ENV.SUPABASE_URL && SITE_CONFIG.ENV.SUPABASE_ANON_KEY) {
      try {
        await fetch(`${SITE_CONFIG.ENV.SUPABASE_URL}/rest/v1/leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SITE_CONFIG.ENV.SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SITE_CONFIG.ENV.SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify(lead)
        });
      } catch (err) {
        console.error('Backend sync error:', err);
      }
    }
  }
}
