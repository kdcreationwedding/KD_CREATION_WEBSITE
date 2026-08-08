export type LeadScore = 'HOT' | 'WARM' | 'COLD';

export type LeadStatus = 'New' | 'Contacted' | 'Follow-up' | 'Qualified' | 'Booked' | 'Lost';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  weddingDate: string;
  weddingLocation: string;
  eventType: string;
  services: string[];
  guestCount: string;
  budget: string;
  message?: string;
  leadSource: 'AI Chatbot' | 'Contact Form' | 'Exit Intent' | 'WhatsApp Direct';
  leadScore: LeadScore;
  createdDate: string;
  status: LeadStatus;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  options?: { label: string; action: string; value?: string }[];
}

export type ModalType = 'chat' | 'leadForm' | 'storyDetail' | 'videoPlayer' | 'exitIntent' | null;
