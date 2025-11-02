// Portfolio data types
import type { Translation, TranslationArray } from './language';

export interface ContactInfo {
  email: string;
  phone: string;
  location: Translation;
  professionalId?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface Experience {
  id: string;
  company: string; // Always in original language (no translation)
  position: Translation;
  period: string;
  description: TranslationArray;
  technologies: string[];
  logoUrl?: string;
}

export interface Achievement {
  id: string;
  category: Translation;
  title: Translation;
  items: TranslationArray;
}

export interface Skill {
  id: string;
  category: Translation;
  items: TranslationArray;
}

export interface Education {
  id: string;
  degree: Translation;
  institution: string; // Always in original language
  period: string;
  details?: Translation;
}

export interface PortfolioData {
  name: string;
  title: Translation;
  summary: Translation;
  contact: ContactInfo;
  primarySkills: string[];
  experiences: Experience[];
  achievements: Achievement[];
  skills: Skill[];
  education: Education[];
}

// Component prop types
export interface SectionProps {
  id: string;
  className?: string;
  'aria-label'?: string;
}

export interface CardProps {
  className?: string;
  gradient?: {
    position: string;
    intensity?: number;
  };
  children: React.ReactNode;
}
