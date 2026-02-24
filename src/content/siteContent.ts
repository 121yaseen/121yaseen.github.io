import type { SiteContent } from "../types";

export const siteContent: SiteContent = {
  seo: {
    title: "TODO: Your Name | Frontend Engineer Portfolio",
    description:
      "TODO: Replace with a concise portfolio summary highlighting your role, strengths, and the type of work you do.",
    siteUrl: "https://TODO-USERNAME.github.io",
    ogImagePath: "/social-preview.svg",
    twitterHandle: "@TODO_handle"
  },
  profile: {
    name: "TODO: Your Name",
    role: "Frontend Engineer • Product-minded Builder",
    location: "TODO: City, Country (or Remote)",
    availability: "Open to select freelance + full-time opportunities",
    shortBio:
      "I build polished, fast interfaces with strong UX fundamentals, clean architecture, and a bias for practical outcomes.",
    heroHeadline: "Design-forward web experiences with engineering rigor.",
    heroSubheadline:
      "I focus on product UI, interaction quality, and frontend systems that feel premium without sacrificing accessibility or performance.",
    resumeUrl: "TODO: Add a public resume URL (PDF/Drive/Notion)",
    primaryCtaLabel: "View Projects",
    secondaryCtaLabel: "Start a Conversation"
  },
  heroStats: [
    { label: "Core Focus", value: "Frontend + UX Engineering" },
    { label: "Preferred Stack", value: "React, TypeScript, Tailwind" },
    { label: "Workflow", value: "Design systems, performance, polish" }
  ],
  about: {
    intro:
      "I enjoy turning rough ideas into interfaces that feel intentional and production-ready. My process usually starts with structure and UX, then moves into motion, states, and implementation details that improve perceived quality.",
    details: [
      "I care about readability, responsive behavior, and predictable component APIs. The goal is not just a good-looking UI, but a maintainable one.",
      "I work comfortably across product design collaboration, UI implementation, and frontend architecture decisions. I prefer measured motion and visual restraint over novelty."
    ],
    principles: [
      "Clarity over decoration",
      "Motion should explain, not distract",
      "Accessibility is a quality baseline",
      "Performance is part of the design"
    ],
    currentlyBuilding: {
      title: "Now Building",
      description:
        "TODO: Replace with your current project, learning focus, or product experiment. Example: an AI-assisted learning platform with voice interaction and progress tracking.",
      tags: ["TODO: Add tag", "React", "TypeScript", "Product UI"]
    }
  },
  skills: [
    {
      title: "Frontend Engineering",
      description: "Production UI implementation and application architecture.",
      items: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Framer Motion",
        "Next.js",
        "State Management",
        "Component Architecture"
      ]
    },
    {
      title: "Design Systems + UX",
      description: "Reusable UI patterns with strong hierarchy and consistency.",
      items: [
        "Design Tokens",
        "Accessible Components",
        "Interaction Design",
        "Responsive Layouts",
        "Prototyping",
        "UX Writing",
        "Visual QA",
        "Design Handoff"
      ]
    },
    {
      title: "Performance + Quality",
      description: "Shipping stable experiences that remain fast and maintainable.",
      items: [
        "Web Performance",
        "A11y Audits",
        "SEO Basics",
        "Lighthouse Optimization",
        "Testing Strategy",
        "CI/CD",
        "GitHub Actions",
        "Monitoring"
      ]
    }
  ],
  experience: [
    {
      company: "TODO Company / Client",
      role: "Senior Frontend Engineer",
      location: "Remote",
      period: "2024 - Present",
      summary:
        "Led implementation of premium product UI surfaces and reusable frontend primitives for a fast-moving web application.",
      achievements: [
        "Built reusable page and card systems that reduced UI duplication across core product flows.",
        "Improved interaction quality with motion patterns that respected reduced-motion preferences.",
        "Partnered with design to refine component states, spacing rhythm, and responsive behavior before release."
      ],
      stack: ["React", "TypeScript", "Tailwind", "Framer Motion", "GitHub Actions"]
    },
    {
      company: "TODO Previous Company",
      role: "Frontend Engineer",
      location: "Hybrid",
      period: "2022 - 2024",
      summary:
        "Delivered product features and dashboards with a focus on accessibility, maintainability, and release reliability.",
      achievements: [
        "Introduced a shared component structure that improved consistency across internal tools and customer-facing pages.",
        "Addressed UI regressions early with better state coverage and implementation standards.",
        "Collaborated on performance improvements to reduce layout shifts and interaction jank."
      ],
      stack: ["React", "CSS", "TypeScript", "REST APIs", "Testing"]
    },
    {
      company: "TODO Early Experience / Freelance",
      role: "UI Developer / Product Builder",
      location: "Remote",
      period: "2020 - 2022",
      summary:
        "Worked on marketing sites and web products, translating brand direction into responsive interfaces with practical CMS/editor workflows.",
      achievements: [
        "Built responsive portfolio/landing experiences with improved visual polish and faster page loads.",
        "Created reusable content sections to make client updates easier after handoff.",
        "Balanced motion and design flair with readability and performance constraints."
      ],
      stack: ["HTML/CSS", "JavaScript", "CMS", "Animation", "SEO"]
    }
  ],
  projects: [
    {
      title: "Premium Learning Experience",
      subtitle: "Product UI / Dashboard / Progress Flows",
      description:
        "A polished, content-rich web experience focused on onboarding, lesson progression, and strong visual hierarchy across desktop and mobile.",
      highlights: [
        "Modular card layout and section composition for fast feature iteration",
        "Accessible interaction states and keyboard navigation patterns",
        "Measured motion system for reveals, transitions, and feedback"
      ],
      stack: ["React", "TypeScript", "Tailwind", "Framer Motion", "Charts"],
      links: [
        { label: "Live Demo", href: "https://TODO-demo.example.com" },
        { label: "Case Study", href: "https://TODO-case-study.example.com" }
      ],
      metrics: ["UX refresh", "Mobile-first", "A11y-focused"],
      accent: { from: "#4fd1c5", to: "#60a5fa" }
    },
    {
      title: "AI Workflow Interface",
      subtitle: "Interactive Tooling / Multi-step UX",
      description:
        "An interface for complex user workflows that emphasizes clarity, state visibility, and a premium-feeling interaction model.",
      highlights: [
        "Reusable status and feedback components for async operations",
        "Clean information architecture for advanced controls",
        "High-contrast visual system tuned for dark mode"
      ],
      stack: ["React", "Vite", "TypeScript", "Design Tokens", "GitHub Actions"],
      links: [
        { label: "GitHub", href: "https://github.com/TODO/project" },
        { label: "Product Notes", href: "https://TODO-notes.example.com" }
      ],
      metrics: ["Tooling UI", "Scalable components", "Fast iteration"],
      accent: { from: "#f59e0b", to: "#fb7185" }
    },
    {
      title: "Portfolio System Template",
      subtitle: "Static Deployment / Content-driven UI",
      description:
        "A GitHub Pages-friendly portfolio foundation with reusable components, theme support, and motion patterns that can be customized quickly.",
      highlights: [
        "Content config approach for low-friction edits",
        "Static deployment workflow with base-path handling",
        "Animation patterns that respect reduced motion"
      ],
      stack: ["Vite", "React", "Tailwind", "Framer Motion", "GitHub Pages"],
      links: [
        { label: "Source", href: "https://github.com/TODO/portfolio" },
        { label: "Live Site", href: "https://TODO.github.io/" }
      ],
      metrics: ["Static-first", "Responsive", "Easy to customize"],
      accent: { from: "#a78bfa", to: "#22d3ee" }
    }
  ],
  contact: {
    email: "TODO:you@example.com",
    headline: "Let’s build something clear, useful, and visually sharp.",
    description:
      "I’m available for frontend engineering, design-system work, and product UI collaborations. Send a short brief and I’ll respond with scope thoughts and next steps.",
    timezone: "TODO: UTC+X / City",
    responseTime: "Usually within 24-48 hours"
  },
  socials: [
    { label: "GitHub", href: "https://github.com/TODO", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/TODO", icon: "linkedin" },
    { label: "Website", href: "https://TODO.dev", icon: "website" },
    { label: "Email", href: "mailto:TODO:you@example.com", icon: "email" }
  ]
};

export const navSections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" }
] as const;

