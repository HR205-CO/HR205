import { SITE } from "../config/site";
// Logo
export const LOGO_URL = 'https://res.cloudinary.com/dptzwxncr/image/upload/q_auto/f_auto/v1777878516/IMG_1193_ysom0i.png';

// Company Info (legacy — prefer SITE config for new components)
export const COMPANY_INFO = {
  name: 'HR205 LLC Communications',
  phone: '',
  email: 'info@hr205.org',
  address: '1711 Bessemer Rd, Birmingham, Alabama 35208',
  serviceAreas: 'Nationwide',
  tagline: 'Expert telecom consulting at no cost to you'
};

// US States for dropdown
export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
  "Wisconsin", "Wyoming"
];

// Referral Sources for booking form
export const REFERRAL_SOURCES = [
  { id: 'friend', label: 'Friend or Family', icon: 'Users' },
  { id: 'customer', label: 'Current Customer', icon: 'UserCheck' },
  { id: 'affiliate', label: 'Affiliate Partner', icon: 'Hand' },
  { id: 'social', label: 'Social Media', icon: 'Share2' },
  { id: 'search', label: 'Search Engine', icon: 'Search' },
  { id: 'ad', label: 'Advertisement', icon: 'Megaphone' },
  { id: 'other', label: 'Other', icon: 'Plus' }
];

// Services offered
export const SERVICES = [
  {
    title: 'High-Speed Internet',
    description: 'Find the fastest, most reliable internet at the best price for your home or business.',
    icon: 'Wifi'
  },
  {
    title: 'Premium Cable & Streaming',
    description: 'Get all your favorite channels and streaming services bundled for maximum savings.',
    icon: 'Tv'
  },
  {
    title: 'Cellular & Mobile Plans',
    description: 'Compare top carriers and find the perfect mobile plan for your family.',
    icon: 'Smartphone'
  },
  {
    title: 'Home & Business Security',
    description: 'Protect what matters most with state-of-the-art security systems.',
    icon: 'Shield'
  }
];

// Service interests for booking form
export const SERVICE_INTERESTS = [
  'High-Speed Internet',
  'Premium Cable & Streaming',
  'Cellular & Mobile Plans',
  'Home & Business Security',
  'Bundle Packages',
  'Other'
];

// FAQs
export const FAQS = [
  {
    question: 'Is the consultation really free?',
    answer: 'Yes! Our consultations are 100% free with no obligation. We get paid by the providers when you sign up, not by you.'
  },
  {
    question: 'What areas do you serve?',
    answer: 'We currently serve Texas and Alabama, with plans to expand soon.'
  },
  {
    question: 'How long does a consultation take?',
    answer: 'Most consultations take 15-30 minutes. We respect your time and get straight to finding you the best deals.'
  },
  {
    question: 'What if I am locked into a contract?',
    answer: 'No problem! We can analyze your current contract and show you when its best to switch or renegotiate.'
  },
  {
    question: 'Do you work with all providers?',
    answer: 'We work with all major telecom providers including AT&T, Spectrum, Verizon, DIRECTV, Brightspeed, C-Spire, Optimum, Frontier, EarthLink, and many more.'
  }
];

// Testimonials
export const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    location: 'Birmingham, AL',
    rating: 5,
    text: 'HR 205 saved my family over $200/month on our internet and cable bills. Super easy process!'
  },
  {
    name: 'Michael Rodriguez',
    location: 'Houston, TX',
    rating: 5,
    text: 'Best telecom consultant I have ever worked with. Honest, fast, and saved my business thousands.'
  },
  {
    name: 'Linda Thompson',
    location: 'Houston, TX',
    rating: 5,
    text: 'They found me a better internet plan with double the speed for less money. Highly recommend!'
  }
];

// Provider logos (telecom partners)
export const PROVIDERS = [
  'AT&T', 'Spectrum', 'Verizon', 'DIRECTV', 'Frontier', 'Brightspeed',
  'C-Spire', 'Optimum', 'Vivint', 'T-Fiber/Metronet', 'Gonet Speed Fiber',
  'EarthLink', 'Kinetic by Windstream'
];

// Auth — Manager and Reps
// NOTE: Fallback credentials — primary auth uses Supabase Auth (see docs/email-setup.md)
export const MANAGER_AUTH = {
  email: 'manager@hr205.org',
  password: 'Marleylove2!'
};

export const REPS = [
  { id: 1, name: 'Rep One', email: 'rep1@hr205.org', password: 'Marleylove2!' },
  { id: 2, name: 'Rep Two', email: 'rep2@hr205.org', password: 'Marleylove2!' },
];
