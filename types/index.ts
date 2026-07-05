export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  specs: ServiceSpec[];
  restrictions: string[];
  cta: {
    text: string;
    href: string;
  };
}

export interface ServiceSpec {
  label: string;
  value: string;
}

export interface Showcase {
  id: string;
  name: string;
  slug: string;
  domain: string;
  tagline: string;
  description: string;
  category: string;
  stage: string;
  logo?: string;
  link?: string;
  story?: string;
  testimonial?: string;
}

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  project: string;
}

export interface Partner {
  id: string;
  name: string;
  logo?: string;
  link?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface Doc {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
}
