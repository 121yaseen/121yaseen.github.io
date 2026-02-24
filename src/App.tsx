import { useEffect } from "react";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

import { BackgroundAccent } from "./components/BackgroundAccent";
import { Navbar } from "./components/Navbar";
import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  HeroSection,
  ProjectsSection,
  SiteFooter,
  SkillsSection
} from "./components/sections";
import { navSections, siteContent } from "./content/siteContent";
import { useActiveSection } from "./hooks/useActiveSection";
import { useTheme } from "./hooks/useTheme";

const SECTION_IDS = navSections.map((section) => section.id);

function setMetaByName(name: string, content: string) {
  const element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (element) {
    element.content = content;
  }
}

function setMetaByProperty(property: string, content: string) {
  const element = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (element) {
    element.content = content;
  }
}

function setCanonical(url: string) {
  const element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (element) {
    element.href = url;
  }
}

function toAbsoluteUrl(siteUrl: string, path: string) {
  try {
    return new URL(path, siteUrl).toString();
  } catch {
    return "";
  }
}

export default function App() {
  const activeSectionId = useActiveSection(SECTION_IDS);
  const { preference, resolvedTheme, cyclePreference } = useTheme();

  useEffect(() => {
    const { seo } = siteContent;
    document.title = seo.title;
    setMetaByName("description", seo.description);
    setMetaByProperty("og:title", seo.title);
    setMetaByProperty("og:description", seo.description);
    setMetaByProperty("og:type", "website");
    setMetaByName("twitter:title", seo.title);
    setMetaByName("twitter:description", seo.description);

    if (!seo.siteUrl.startsWith("http")) {
      return;
    }

    setCanonical(seo.siteUrl);
    setMetaByProperty("og:url", seo.siteUrl);
    const ogImageUrl = toAbsoluteUrl(seo.siteUrl, seo.ogImagePath);
    if (ogImageUrl) {
      setMetaByProperty("og:image", ogImageUrl);
      setMetaByName("twitter:image", ogImageUrl);
    }
    if (seo.twitterHandle) {
      setMetaByName("twitter:site", seo.twitterHandle);
    }
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen text-text">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-bg focus:px-3 focus:py-2 focus:text-sm focus:text-text focus:ring-2 focus:ring-accent"
          >
            Skip to content
          </a>

          <BackgroundAccent />

          <Navbar
            name={siteContent.profile.name}
            sections={navSections}
            activeSectionId={activeSectionId}
            themePreference={preference}
            resolvedTheme={resolvedTheme}
            onCycleTheme={cyclePreference}
          />

          <main id="main-content">
            <HeroSection content={siteContent} />
            <AboutSection content={siteContent} />
            <SkillsSection content={siteContent} />
            <ExperienceSection content={siteContent} />
            <ProjectsSection content={siteContent} />
            <ContactSection content={siteContent} />
          </main>

          <SiteFooter content={siteContent} />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}

