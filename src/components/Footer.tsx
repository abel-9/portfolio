"use client";

import React from "react";
import { motion } from "framer-motion";

// Editable footer configuration – replace with your own values.
export interface SocialLink {
  label: string;
  href: string;
  icon?: React.ReactNode; // Provide custom icon if desired
}

export interface FooterConfig {
  brand: string;
  tagline?: string;
  year?: number;
  location?: string;
  email?: string;
  socials: SocialLink[];
  nav?: { label: string; href: string }[];
  copyrightOwner?: string;
}

export const defaultFooter: FooterConfig = {
  brand: "Abel Girmay",
  tagline: "Building thoughtful digital experiences.",
  year: new Date().getFullYear(),
  location: "Mekelle, Ethiopia",
  email: "abelgirmay37@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/abel-9" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/abel-girmay-08b231267/",
    },
    { label: "Email", href: "mailto:abelgirmay37@gmail.com" },
  ],
  nav: [
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  copyrightOwner: "Abel Girmay",
};

interface FooterProps {
  config?: Partial<FooterConfig>;
  className?: string;
}

// Simple icon fallback (first letter) if no icon provided
const FallbackIcon = ({ label }: { label: string }) => (
  <span className="inline-grid h-5 w-5 place-items-center rounded-[var(--radius-sm)] bg-[var(--color-background-alt)] text-[10px] font-semibold text-[var(--color-accent)] border border-[var(--color-border)]/60">
    {label.slice(0, 1).toUpperCase()}
  </span>
);

export const Footer: React.FC<FooterProps> = ({ config, className = "" }) => {
  const cfg: FooterConfig = {
    ...defaultFooter,
    ...config,
    socials: config?.socials || defaultFooter.socials,
    nav: config?.nav || defaultFooter.nav,
    year: config?.year || defaultFooter.year || new Date().getFullYear(),
  } as FooterConfig;

  return (
    <footer
      className={`relative mt-32 border-t border-[var(--color-border)]/60 bg-[color-mix(in_srgb,var(--color-background)_88%,transparent)] backdrop-blur-xl ${className}`}
    >
      {/* top subtle gradient line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand / tagline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-4"
          >
            <div className="inline-flex items-center gap-3">
              <span className="relative inline-grid h-11 w-11 place-items-center rounded-[var(--radius)] bg-accent-gradient shadow">
                <span className="text-sm font-bold tracking-tight text-[var(--color-accent-foreground)]">
                  {cfg.brand.slice(0, 1)}
                </span>
              </span>
              <div className="font-semibold text-base tracking-tight text-[var(--color-foreground)]">
                {cfg.brand}
              </div>
            </div>
            {cfg.tagline && (
              <p className="max-w-xs text-sm leading-relaxed text-[var(--color-muted)]">
                {cfg.tagline}
              </p>
            )}
            <ul className="flex flex-wrap gap-3 pt-2">
              {cfg.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      s.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-border)]/60 bg-[var(--color-background-alt)]/60 px-3 py-1.5 text-xs font-medium tracking-wide text-[var(--color-muted)] transition hover:border-[var(--color-accent)]/60 hover:text-[var(--color-accent)]"
                  >
                    {s.icon || <FallbackIcon label={s.label} />}
                    <span>{s.label}</span>
                    <span className="sr-only">social link</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            aria-label="Footer"
            className="flex flex-col gap-4 text-sm"
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
              Explore
            </h3>
            <ul className="grid auto-rows-max gap-2">
              {cfg.nav?.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1 text-[var(--color-foreground)]/85 hover:text-[var(--color-accent)] transition"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-border)] group-hover:bg-[var(--color-accent)] transition" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-4 text-sm"
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
              Info
            </h3>
            <ul className="space-y-2">
              {cfg.location && (
                <li className="text-[var(--color-muted)] flex gap-2">
                  <span className="text-[var(--color-accent)]">•</span>
                  {cfg.location}
                </li>
              )}
              {cfg.email && (
                <li className="text-[var(--color-muted)] flex gap-2">
                  <span className="text-[var(--color-accent)]">•</span>
                  <a
                    href={`mailto:${cfg.email}`}
                    className="hover:text-[var(--color-accent)] transition"
                  >
                    {cfg.email}
                  </a>
                </li>
              )}
              <li className="text-[var(--color-muted)] flex gap-2">
                <span className="text-[var(--color-accent)]">•</span>©{" "}
                {cfg.year} {cfg.copyrightOwner || cfg.brand}
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
      {/* Background decorative gradient */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(ellipse_at_bottom,var(--color-accent)_0%,transparent_70%)] opacity-25"
      />
      {/* Bottom copyright bar */}
      <div className="relative z-10 border-t border-[var(--color-border)]/50 bg-[color-mix(in_srgb,var(--color-background)_92%,transparent)]/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <p className="text-center text-[11px] tracking-wide text-[var(--color-muted)]">
            © {cfg.year} {cfg.copyrightOwner || cfg.brand}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
