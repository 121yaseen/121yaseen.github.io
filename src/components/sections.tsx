import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Sparkles
} from "lucide-react";

import type { ProjectItem, SiteContent, SocialLink } from "../types";
import { ButtonLink, Container, Pill, Reveal, SectionHeading, SectionShell, Surface, cx } from "./common";

function socialIcon(icon: SocialLink["icon"]) {
  switch (icon) {
    case "github":
      return Github;
    case "linkedin":
      return Linkedin;
    case "website":
      return Globe;
    case "email":
      return Mail;
    default:
      return ExternalLink;
  }
}

function ExternalTextLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-sm font-medium text-text transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  return (
    <Reveal delay={index * 0.06}>
      <motion.article
        className="group relative overflow-hidden rounded-2xl border border-line bg-panel/70 p-5 shadow-panel backdrop-blur-xl transition-colors duration-300 hover:border-line/90 sm:p-6"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 15% 5%, ${project.accent.from}18, transparent 45%), radial-gradient(circle at 100% 0%, ${project.accent.to}18, transparent 45%)`
          }}
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-5">
          <div className="rounded-2xl border border-line/70 bg-bg-soft/70 p-4">
            <div
              className="relative h-40 overflow-hidden rounded-xl border border-white/10 bg-slate-950/70"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 opacity-80"
                style={{
                  background: `linear-gradient(135deg, ${project.accent.from}25, transparent 55%), linear-gradient(300deg, ${project.accent.to}25, transparent 50%)`
                }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.10),transparent_45%),linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:auto,26px_26px,26px_26px]" />
              <div className="absolute left-3 top-3 flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.18em] text-white/60">{project.subtitle}</p>
                <p className="mt-1 text-sm font-medium text-white/90">{project.title}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{project.subtitle}</p>
            <h3 className="mt-2 text-xl font-semibold text-text sm:text-2xl">{project.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{project.description}</p>
          </div>

          <ul className="grid gap-2">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-sm text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Pill key={tech}>{tech}</Pill>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.metrics.map((metric) => (
              <span
                key={metric}
                className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent"
              >
                {metric}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            {project.links.map((link) => (
              <ExternalTextLink key={link.href} href={link.href}>
                {link.label}
              </ExternalTextLink>
            ))}
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export function HeroSection({ content }: { content: SiteContent }) {
  return (
    <SectionShell id="hero" className="pt-12 sm:pt-16">
      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <Reveal className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted shadow-panel backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/70 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              {content.profile.availability}
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-muted sm:text-base">{content.profile.role}</p>
              <h1 className="max-w-3xl text-balance font-display text-4xl font-semibold leading-tight text-text sm:text-5xl lg:text-6xl">
                {content.profile.heroHeadline}
              </h1>
              <p className="max-w-2xl text-pretty text-base leading-8 text-muted sm:text-lg">
                {content.profile.heroSubheadline}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <ButtonLink href="#projects" variant="primary">
                {content.profile.primaryCtaLabel}
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary">
                {content.profile.secondaryCtaLabel}
              </ButtonLink>
              {content.profile.resumeUrl && !content.profile.resumeUrl.startsWith("TODO:") ? (
                <ButtonLink href={content.profile.resumeUrl} external variant="ghost">
                  Resume
                </ButtonLink>
              ) : (
                <Pill className="border-dashed">TODO: add resume link in `siteContent.ts`</Pill>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {content.heroStats.map((stat, index) => (
                <Reveal key={stat.label} delay={0.08 + index * 0.05}>
                  <Surface className="h-full p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">{stat.label}</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-text">{stat.value}</p>
                  </Surface>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Surface className="relative p-5 sm:p-6">
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-accent/15 via-accent-2/10 to-amber-300/10" aria-hidden="true" />
              <div className="relative space-y-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">Profile</p>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-text">{content.profile.name}</h2>
                    <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                      <MapPin className="h-4 w-4" />
                      {content.profile.location}
                    </p>
                  </div>
                  <span className="rounded-full border border-line bg-bg-soft/70 px-3 py-1 text-xs font-semibold text-muted">
                    Portfolio
                  </span>
                </div>

                <p className="text-sm leading-7 text-muted">{content.profile.shortBio}</p>

                <div className="grid gap-3">
                  <div className="rounded-xl border border-line/70 bg-bg-soft/60 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-text">
                      <Sparkles className="h-4 w-4 text-accent" />
                      Currently Building
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {content.about.currentlyBuilding.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {content.about.currentlyBuilding.tags.map((tag) => (
                        <Pill key={tag}>{tag}</Pill>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-line/70 bg-bg-soft/60 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">Links</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {content.socials.map((social) => {
                        const Icon = socialIcon(social.icon);
                        return (
                          <a
                            key={social.href}
                            href={social.href}
                            target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                            rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                            className="group inline-flex items-center justify-between rounded-lg border border-line/70 bg-panel/60 px-3 py-2 text-sm text-muted transition hover:border-line hover:text-text"
                          >
                            <span className="inline-flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              {social.label}
                            </span>
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Surface>
          </Reveal>
        </div>
      </Container>
    </SectionShell>
  );
}

export function AboutSection({ content }: { content: SiteContent }) {
  return (
    <SectionShell id="about">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="About"
            title="A product-minded frontend approach with design sensitivity."
            description="I focus on structure first, then polish. The result is a UI that feels premium while staying readable, maintainable, and fast."
          />
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <Surface className="p-5 sm:p-6">
              <div className="space-y-4 text-sm leading-7 text-muted sm:text-base">
                <p>{content.about.intro}</p>
                {content.about.details.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Surface>
          </Reveal>

          <Reveal delay={0.05}>
            <Surface className="p-5 sm:p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-text">
                <Code2 className="h-4 w-4 text-accent" />
                Working principles
              </div>
              <ul className="mt-4 grid gap-2">
                {content.about.principles.map((principle) => (
                  <li
                    key={principle}
                    className="rounded-xl border border-line/70 bg-bg-soft/50 px-3 py-3 text-sm text-muted"
                  >
                    {principle}
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-line/70 bg-gradient-to-br from-accent/8 via-transparent to-accent-2/8 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted">Current focus</p>
                <p className="mt-2 text-sm font-semibold text-text">{content.about.currentlyBuilding.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{content.about.currentlyBuilding.description}</p>
              </div>
            </Surface>
          </Reveal>
        </div>
      </Container>
    </SectionShell>
  );
}

export function SkillsSection({ content }: { content: SiteContent }) {
  return (
    <SectionShell id="skills">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Skills"
            title="Frontend depth, UX quality, and production readiness."
            description="Grouped by how I work in practice: shipping interfaces, maintaining systems, and improving quality signals across the product lifecycle."
          />
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {content.skills.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.05}>
              <Surface className="h-full p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-text">{group.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{group.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex rounded-full border border-line/80 bg-bg-soft/60 px-3 py-1.5 text-xs font-medium text-text transition hover:-translate-y-0.5 hover:border-line"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Surface>
            </Reveal>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}

export function ExperienceSection({ content }: { content: SiteContent }) {
  return (
    <SectionShell id="experience">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="Shipping UI that balances velocity, clarity, and polish."
            description="A concise timeline focused on responsibilities and outcomes that matter for product and frontend work."
          />
        </Reveal>

        <div className="mt-8 relative grid gap-5 before:absolute before:left-4 before:top-0 before:bottom-0 before:hidden before:w-px before:bg-line md:before:block">
          {content.experience.map((item, index) => (
            <Reveal key={`${item.company}-${item.period}`} delay={index * 0.05}>
              <Surface className="relative p-5 sm:p-6 md:ml-10">
                <span className="absolute -left-[2.62rem] top-6 hidden h-4 w-4 rounded-full border-4 border-bg bg-accent md:block" />
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">{item.period}</p>
                    <h3 className="mt-2 flex items-center gap-2 text-lg font-semibold text-text">
                      <Briefcase className="h-4 w-4 text-accent" />
                      {item.role}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {item.company} • {item.location}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    {item.stack.map((tech) => (
                      <Pill key={tech}>{tech}</Pill>
                    ))}
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-muted">{item.summary}</p>

                <ul className="mt-4 grid gap-2">
                  {item.achievements.map((achievement) => (
                    <li key={achievement} className="flex items-start gap-2 text-sm leading-6 text-muted">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-2" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </Surface>
            </Reveal>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}

export function ProjectsSection({ content }: { content: SiteContent }) {
  return (
    <SectionShell id="projects">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title="Selected work with strong UI fundamentals and implementation quality."
            description="Replace these placeholders with your strongest projects. Prioritize outcomes, scope, and the decisions you made over generic feature lists."
          />
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {content.projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}

export function ContactSection({ content }: { content: SiteContent }) {
  return (
    <SectionShell id="contact" className="pb-10">
      <Container>
        <Reveal>
          <Surface className="overflow-hidden p-6 sm:p-8">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(79,209,197,0.14),transparent_50%),radial-gradient(circle_at_90%_20%,rgba(96,165,250,0.12),transparent_45%),linear-gradient(to_bottom,transparent,rgba(255,255,255,0.01))]"
            />
            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-soft/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
                  Contact
                </p>
                <h2 className="mt-4 max-w-2xl text-balance font-display text-3xl font-semibold leading-tight text-text sm:text-4xl">
                  {content.contact.headline}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                  {content.contact.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href={`mailto:${content.contact.email}`} variant="primary">
                    Email Me
                  </ButtonLink>
                  {content.socials
                    .filter((social) => social.icon !== "email")
                    .slice(0, 2)
                    .map((social) => (
                      <ButtonLink key={social.href} href={social.href} external variant="secondary">
                        {social.label}
                      </ButtonLink>
                    ))}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-line/80 bg-bg-soft/60 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">Email</p>
                  <a
                    href={`mailto:${content.contact.email}`}
                    className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-text transition hover:text-accent"
                  >
                    <Mail className="h-4 w-4" />
                    {content.contact.email}
                  </a>
                </div>
                <div className="rounded-2xl border border-line/80 bg-bg-soft/60 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">Timezone</p>
                  <p className="mt-2 text-sm font-medium text-text">{content.contact.timezone}</p>
                  <p className="mt-1 text-sm text-muted">{content.contact.responseTime}</p>
                </div>
                <div className="rounded-2xl border border-line/80 bg-bg-soft/60 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">Socials</p>
                  <div className="mt-3 grid gap-2">
                    {content.socials.map((social) => {
                      const Icon = socialIcon(social.icon);
                      return (
                        <a
                          key={social.href}
                          href={social.href}
                          target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                          rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                          className="inline-flex items-center justify-between rounded-xl border border-line/70 bg-panel/50 px-3 py-2.5 text-sm text-muted transition hover:border-line hover:text-text"
                        >
                          <span className="inline-flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {social.label}
                          </span>
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Surface>
        </Reveal>
      </Container>
    </SectionShell>
  );
}

export function SiteFooter({ content }: { content: SiteContent }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/70 py-8">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted">
          <p className="font-medium text-text">{content.profile.name}</p>
          <p className="mt-1">© {year}. Built with Vite, React, Tailwind, and Framer Motion.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {content.socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
              className={cx(
                "inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-3 py-2 text-sm text-muted transition",
                "hover:-translate-y-0.5 hover:border-line/90 hover:text-text"
              )}
            >
              <span>{social.label}</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}

