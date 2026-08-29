import { PortfolioItem, ServiceItem, FounderItem, Testimonial, SITE_CONFIG } from '../config/siteConfig';
import { apiClient } from './apiClient';

const CMS_STORAGE_KEYS = {
  STORIES: 'kd_cms_stories_v1',
  SERVICES: 'kd_cms_services_v1',
  FOUNDERS: 'kd_cms_founders_v1',
  TESTIMONIALS: 'kd_cms_testimonials_v1',
  SETTINGS: 'kd_cms_settings_v1'
};

export interface SiteSettings {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  heroTagline: string;
  instagramUrl: string;
  youtubeUrl: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  phone: '+91 9033032922',
  whatsapp: '9033032922',
  email: 'info@kdcreations.in',
  address: 'Ahmedabad • Gandhinagar • Vadodara • Surat • Udaipur • Goa • Pan India',
  heroTagline: 'CRAFTING LUXURY HEIRLOOM WEDDING FILMS & PHOTOGRAPHY',
  instagramUrl: 'https://www.instagram.com/kd_creation_wedding/',
  youtubeUrl: 'https://www.youtube.com/@kdcreationwedding'
};

let inMemoryStories: PortfolioItem[] | null = null;
let inMemoryServices: ServiceItem[] | null = null;
let inMemoryFounders: FounderItem[] | null = null;
let inMemoryTestimonials: Testimonial[] | null = null;
let inMemorySettings: SiteSettings | null = null;

export const cmsService = {
  // --- 1. PORTFOLIO STORIES ---
  getStories: (): PortfolioItem[] => {
    if (inMemoryStories !== null) return inMemoryStories;
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEYS.STORIES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          inMemoryStories = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read stories from storage', e);
    }
    inMemoryStories = SITE_CONFIG.portfolio;
    return SITE_CONFIG.portfolio;
  },

  saveStory: (story: PortfolioItem): PortfolioItem => {
    const stories = cmsService.getStories();
    const index = stories.findIndex((s) => s.id === story.id);
    let updatedStories: PortfolioItem[];
    if (index >= 0) {
      updatedStories = [...stories];
      updatedStories[index] = story;
    } else {
      updatedStories = [story, ...stories];
    }
    inMemoryStories = updatedStories;
    try {
      localStorage.setItem(CMS_STORAGE_KEYS.STORIES, JSON.stringify(updatedStories));
    } catch (e) {
      console.warn('Could not persist stories', e);
    }
    apiClient.saveStory(story).catch(() => {});
    return story;
  },

  deleteStory: (id: string): void => {
    const stories = cmsService.getStories();
    const updated = stories.filter((s) => s.id !== id);
    inMemoryStories = updated;
    try {
      localStorage.setItem(CMS_STORAGE_KEYS.STORIES, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not delete story', e);
    }
    apiClient.deleteStory(id).catch(() => {});
  },

  // --- 2. SERVICES ---
  getServices: (): ServiceItem[] => {
    if (inMemoryServices !== null) return inMemoryServices;
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEYS.SERVICES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          inMemoryServices = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read services from storage', e);
    }
    inMemoryServices = SITE_CONFIG.services;
    return SITE_CONFIG.services;
  },

  saveService: (service: ServiceItem): ServiceItem => {
    const services = cmsService.getServices();
    const index = services.findIndex((s) => s.id === service.id);
    let updated: ServiceItem[];
    if (index >= 0) {
      updated = [...services];
      updated[index] = service;
    } else {
      updated = [service, ...services];
    }
    inMemoryServices = updated;
    try {
      localStorage.setItem(CMS_STORAGE_KEYS.SERVICES, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not persist services', e);
    }
    apiClient.saveService(service).catch(() => {});
    return service;
  },

  // --- 3. FOUNDERS ---
  getFounders: (): FounderItem[] => {
    if (inMemoryFounders !== null) return inMemoryFounders;
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEYS.FOUNDERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          inMemoryFounders = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read founders from storage', e);
    }
    inMemoryFounders = SITE_CONFIG.founders;
    return SITE_CONFIG.founders;
  },

  saveFounder: (founder: FounderItem): FounderItem => {
    const founders = cmsService.getFounders();
    const index = founders.findIndex((f) => f.id === founder.id);
    let updated: FounderItem[];
    if (index >= 0) {
      updated = [...founders];
      updated[index] = founder;
    } else {
      updated = [founder, ...founders];
    }
    inMemoryFounders = updated;
    try {
      localStorage.setItem(CMS_STORAGE_KEYS.FOUNDERS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not persist founders', e);
    }
    apiClient.saveFounder(founder).catch(() => {});
    return founder;
  },

  // --- 4. TESTIMONIALS ---
  getTestimonials: (): Testimonial[] => {
    if (inMemoryTestimonials !== null) return inMemoryTestimonials;
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEYS.TESTIMONIALS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          inMemoryTestimonials = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read testimonials from storage', e);
    }
    inMemoryTestimonials = SITE_CONFIG.testimonials;
    return SITE_CONFIG.testimonials;
  },

  saveTestimonial: (t: Testimonial): Testimonial => {
    const list = cmsService.getTestimonials();
    const index = list.findIndex((item) => item.id === t.id);
    let updated: Testimonial[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = t;
    } else {
      updated = [t, ...list];
    }
    inMemoryTestimonials = updated;
    try {
      localStorage.setItem(CMS_STORAGE_KEYS.TESTIMONIALS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not persist testimonials', e);
    }
    apiClient.saveTestimonial(t).catch(() => {});
    return t;
  },

  deleteTestimonial: (id: string): void => {
    const list = cmsService.getTestimonials();
    const updated = list.filter((item) => item.id !== id);
    inMemoryTestimonials = updated;
    try {
      localStorage.setItem(CMS_STORAGE_KEYS.TESTIMONIALS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not delete testimonial', e);
    }
    apiClient.deleteTestimonial(id).catch(() => {});
  },

  // --- 5. SITE SETTINGS ---
  getSettings: (): SiteSettings => {
    if (inMemorySettings !== null) return inMemorySettings;
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEYS.SETTINGS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          const loadedSettings: SiteSettings = { ...DEFAULT_SETTINGS, ...parsed };
          inMemorySettings = loadedSettings;
          return loadedSettings;
        }
      }
    } catch (e) {
      console.warn('Could not read settings from storage', e);
    }
    inMemorySettings = DEFAULT_SETTINGS;
    return DEFAULT_SETTINGS;
  },

  saveSettings: (settings: SiteSettings): SiteSettings => {
    inMemorySettings = settings;
    try {
      localStorage.setItem(CMS_STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Could not persist site settings', e);
    }
    apiClient.saveSettings(settings).catch(() => {});
    return settings;
  }
};
