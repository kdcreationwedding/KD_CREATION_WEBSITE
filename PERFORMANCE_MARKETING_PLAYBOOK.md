# KD CREATIONS — PERFORMANCE MARKETING MASTER PLAYBOOK
**Brand:** KD CREATION  
**Domain:** [https://kdcreations.in/](https://kdcreations.in/)  
**Target Locations:** Ahmedabad, Gujarat, Rajasthan, Mumbai, Delhi & NRI Markets (USA, UK, UAE)  
**Primary Channels:** Meta Ads (Instagram & Facebook) | Google Search & YouTube Ads | Retargeting  

---

## 🎯 EXECUTIVE SUMMARY

This Performance Marketing Playbook outlines the complete Paid Advertising & Conversion Tracking Blueprint to scale **KD CREATION** into a high-ROI lead generation engine. By leveraging high-converting 4K Reel video creatives, precise audience targeting, and automated Meta Pixel & Google Analytics conversion tracking, this strategy turns ad spend into confirmed high-value wedding bookings.

---

## 1. AUDIENCE TARGETING MATRIX

### 1.1 Meta Ads (Instagram & Facebook) Audiences

| Audience Bucket | Target Location | Age & Gender | Target Interests & Behaviors | Campaign Goal |
| :--- | :--- | :--- | :--- | :--- |
| **Audience 1: Engaged Couples (Primary)** | Ahmedabad +50km, Gandhinagar, Vadodara, Surat, Rajkot | 22 – 36 (Men & Women) | Newly engaged, Engagement, Wedding Planning, WedMeGood, Sabyasachi, Bridal Wear, Jewelry | Lead Gen & Direct WhatsApp Inquiry |
| **Audience 2: High Net Worth Parents** | Ahmedabad, Gandhinagar, Vadodara | 48 – 65 (Men & Women) | Luxury Goods, Real Estate Investors, Fine Dining, Five-Star Hotels, Royal Weddings | High-Ticket Full Wedding Coverage |
| **Audience 3: NRI Gujarati Diaspora** | USA, UK, Canada, UAE (Gujarat Interest) | 24 – 38 (Men & Women) | Gujarati Language, India Travel, Destination Wedding India, Rajasthan Palaces | Destination Wedding Packages |
| **Audience 4: Custom Retargeting** | Global Website Visitors | 20 – 60 (All) | Retargeting past 30-day website visitors (`https://kdcreations.in/`) | High-Conversion Retargeting |

---

## 2. AD CAMPAIGN STRUCTURE & FUNNEL ARCHITECTURE

```text
               TOP OF FUNNEL (TOFU) - AWARENESS & TRAFFIC
 🎯 4K Anamorphic Wedding Reel Video Ads (Yash & Kavya Teaser / Pre-Wedding Story)
 📍 Target: Engaged Couples & NRI Gujarat Market
 🔗 CTA: "Check Date Availability at kdcreations.in"
                        │
                        ▼
            MIDDLE OF FUNNEL (MOFU) - CONSIDERATION & INTEREST
 📸 Carousel Ads: 5 Bespoke Offerings (Candid, 4K Film, Pre-Wedding, Albums, Reels)
 💬 OpenAI KD AI Chatbot Assistant Engagement
 🔗 CTA: "Explore Packages & Get Instant Quote"
                        │
                        ▼
           BOTTOM OF FUNNEL (BOFU) - RETARGETING & CONVERSION
 🎬 Client Testimonial Video Ads + Retargeting Website Visitors (Last 30 Days)
 📞 WhatsApp Instant Lead Form (+91 7859894521)
 🔗 CTA: "Reserve Your Wedding Muhurat Date Now"
```

---

## 3. AD CREATIVE TEMPLATES & HIGH-CONVERTING COPIES

### 3.1 Ad Copy Template 1 (Royal Gujarati Weddings Focus)

> **Headline:** 👑 Your Wedding Belongs in 4K Cinema | KD CREATION Ahmedabad  
> **Primary Text:**  
> Turning your royal Gujarati wedding into a timeless film. ✨  
>  
> From emotional Varmala tears to grand Garba nights, Mr. Mahesh & Mr. Harshad Chavda capture every unscripted moment in 4K anamorphic cinema and editorial fine-art photography.  
>  
> 🌟 500+ Royal Weddings Shot  
> 🎬 4K Anamorphic Feature Films  
> 📖 Handcrafted Genuine Leather Heirloom Albums  
>  
> Limited dates available for the upcoming wedding season. Check your wedding date availability in 10 seconds!  
>  
> **CTA Button:** [Book Now / Send WhatsApp Message]  
> **Destination URL:** https://kdcreations.in/

---

## 4. GOOGLE ADS & YOUTUBE CAMPAIGN SETUP

### 4.1 High-Intent Google Search Keywords

- `[wedding photographer ahmedabad]` (Exact Match)
- `[candid wedding photography ahmedabad]` (Exact Match)
- `[wedding cinematography ahmedabad]` (Exact Match)
- `"best pre wedding shoot photographer ahmedabad"` (Phrase Match)
- `"gujarati wedding photographer cost ahmedabad"` (Phrase Match)

### 4.2 YouTube 4K Video Ads
- 15-second Non-Skippable Bumper Ads running on wedding planning, bridal makeup, and Gujarati music YouTube channels.

---

## 5. TECHNICAL CONVERSION TRACKING IMPLEMENTATION

To measure Exact Cost Per Lead (CPL) and Return on Ad Spend (ROAS), the codebase includes Meta Pixel and Google Conversion Event tracking hooks:

### 5.1 Code Integration Snippet (`src/services/leadService.ts`)

```typescript
// Automatic Meta Pixel & Google Ads Lead Conversion Tracker
export const trackPerformanceLeadEvent = (leadData: any) => {
  if (typeof window !== 'undefined') {
    // 1. Meta Pixel Lead Event
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: leadData.services?.join(', ') || 'Wedding Visual Coverage',
        value: leadData.budget || 'Custom Package',
        currency: 'INR'
      });
    }

    // 2. Google Analytics 4 & Google Ads Conversion Event
    if ((window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        event_category: 'Wedding Booking Inquiry',
        event_label: leadData.weddingLocation || 'Ahmedabad',
        value: 1.0
      });
    }
  }
};
```

---

## 6. RECOMMENDED AD BUDGET ALLOCATION (30-DAY LAUNCH)

| Campaign Type | Platform | Daily Budget | Monthly Budget | Expected Monthly Leads |
| :--- | :--- | :--- | :--- | :--- |
| **Meta Reel Video Ads (TOFU)** | Instagram / FB | ₹500 / day | ₹15,000 | 40 – 60 High-Quality Leads |
| **Meta Retargeting (BOFU)** | Instagram / FB | ₹200 / day | ₹6,000 | 15 – 25 Direct WhatsApp Inquiries |
| **Google Search Ads (High Intent)** | Google Search | ₹400 / day | ₹12,000 | 25 – 35 Targeted Inquiries |
| **Total Performance Budget** | All Channels | **₹1,100 / day** | **₹33,000** | **80 – 120 Total Qualified Leads** |

---

*KD CREATIONS Performance Marketing Master Playbook — Version 1.0.0*
