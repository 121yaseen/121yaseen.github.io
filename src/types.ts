export type ThemePreference = "system" | "light" | "dark";

export type SocialIcon = "github" | "linkedin" | "x" | "website" | "email";

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
}

export interface HeroStat {
  label: string;
  value: string;
}

export interface SkillGroup {
  title: string;
  description: string;
  items: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  achievements: string[];
  stack: string[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectItem {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  stack: string[];
  links: ProjectLink[];
  metrics: string[];
  accent: {
    from: string;
    to: string;
  };
}

export interface SiteContent {
  seo: {
    title: string;
    description: string;
    siteUrl: string;
    ogImagePath: string;
    twitterHandle?: string;
  };
  profile: {
    name: string;
    role: string;
    location: string;
    availability: string;
    shortBio: string;
    heroHeadline: string;
    heroSubheadline: string;
    resumeUrl?: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  heroStats: HeroStat[];
  about: {
    intro: string;
    details: string[];
    principles: string[];
    currentlyBuilding: {
      title: string;
      description: string;
      tags: string[];
    };
  };
  skills: SkillGroup[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  contact: {
    email: string;
    headline: string;
    description: string;
    timezone: string;
    responseTime: string;
  };
  socials: SocialLink[];
}

