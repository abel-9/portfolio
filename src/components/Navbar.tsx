"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const THEMES = ["light", "dark", "brand"] as const;
type Theme = (typeof THEMES)[number];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const highlightRef = useRef<HTMLSpanElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  // Position highlight under the active or hovered link.
  const moveHighlight = useCallback((el?: HTMLElement | null) => {
    const highlight = highlightRef.current;
    const list = listRef.current;
    if (!highlight || !list) return;
    const target =
      el || list.querySelector<HTMLElement>(`a[data-active="true"]`);
    if (!target) {
      highlight.style.opacity = "0";
      return;
    }
    const listRect = list.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    highlight.style.opacity = "1";
    highlight.style.width = rect.width + "px";
    highlight.style.transform = `translateX(${rect.left - listRect.left}px)`;
  }, []);

  // Theme handling
  useEffect(() => {
    setMounted(true);
    const stored = (typeof window !== "undefined" &&
      localStorage.getItem("theme-preference")) as Theme | null;
    let initial: Theme = stored || "light";
    if (!stored) {
      // System preference for first load
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      initial = prefersDark ? "dark" : "light";
    }
    applyTheme(initial, false);
  }, []);

  const applyTheme = (t: Theme, animate = true) => {
    setTheme(t);
    if (animate) {
      document.documentElement.classList.add("theme-transition");
      setTimeout(
        () => document.documentElement.classList.remove("theme-transition"),
        500
      );
    }
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("theme-preference", t);
  };

  const cycleTheme = () => {
    const idx = THEMES.indexOf(theme);
    const next = THEMES[(idx + 1) % THEMES.length];
    applyTheme(next);
  };

  // Recalculate highlight on route change & resize
  useEffect(() => {
    if (!mounted) return;
    const active = listRef.current?.querySelector<HTMLElement>(
      `a[data-active="true"]`
    );
    moveHighlight(active || undefined);
    const onResize = () => moveHighlight(active || undefined);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pathname, mounted, moveHighlight]);

  // Close mobile drawer on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[var(--color-border)]/70 bg-[color-mix(in_srgb,var(--color-background)_80%,transparent)]"
      aria-label="Main"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="relative group flex items-center gap-2 font-semibold text-sm tracking-wide"
            >
              <span className="inline-grid place-items-center h-9 w-9 rounded-[var(--radius)] bg-accent-gradient shadow-sm">
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-[var(--color-accent-foreground)]"
                >
                  <path
                    fill="currentColor"
                    d="M12 2.5 3 7v10l9 4.5 9-4.5V7L12 2.5Zm0 2.2 6.5 3.25v1.1L12 8.2 5.5 9.05v-1.1L12 4.7Zm0 14.6-6.5-3.25v-6.1L12 10.8l6.5-.85v6.1L12 19.3Z"
                  />
                </svg>
              </span>
              <span className="relative z-10 bg-clip-text text-transparent bg-[linear-gradient(110deg,var(--color-accent)_0%,color-mix(in_srgb,var(--color-accent)_60%,var(--color-foreground))_50%,var(--color-accent)_100%)] [background-size:180%_100%] animate-[gradient-move_9s_linear_infinite]">
                Portfolio
              </span>
              <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center">
            <ul
              ref={listRef}
              onMouseLeave={() => moveHighlight()}
              className="relative flex items-center gap-1 text-sm font-medium"
            >
              <span
                ref={highlightRef}
                aria-hidden
                className="pointer-events-none absolute -bottom-1 h-[2px] rounded-full bg-[var(--color-accent)] transition-all duration-300 ease-out will-change-transform opacity-0"
                style={{ left: 0 }}
              />
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      data-active={active || undefined}
                      href={item.href}
                      onMouseEnter={(e) => moveHighlight(e.currentTarget)}
                      className={`relative px-3 py-2 rounded-[var(--radius-sm)] tracking-wide transition duration-300 hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/60 ${
                        active
                          ? "text-[var(--color-accent)]"
                          : "text-[var(--color-muted)]"
                      }`}
                    >
                      {item.label}
                      <span className="absolute inset-0 rounded-[var(--radius-sm)] opacity-0 bg-[color-mix(in_srgb,var(--color-accent)_15%,transparent)] transition group-hover:opacity-100 peer-[[data-active]]:opacity-100" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={cycleTheme}
              className="relative h-9 w-9 grid place-items-center rounded-[var(--radius-sm)] border border-[var(--color-border)]/70 bg-[var(--color-background-alt)] text-[var(--color-foreground)] shadow-sm hover:border-[var(--color-accent)]/60 hover:text-[var(--color-accent)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/50"
              aria-label="Toggle theme"
              title={`Theme: ${theme}`}
            >
              {/* Simple theme icon based on current theme */}
              {theme === "light" && (
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1.05a1 1 0 1 1 2 0V21a1 1 0 0 1-1 1Zm8-9a1 1 0 0 1 1 1v.05a1 1 0 1 1-2 0V14a1 1 0 0 1 1-1ZM4 13a1 1 0 0 1 1 1v.05a1 1 0 1 1-2 0V14a1 1 0 0 1 1-1Zm13.66 6.24.74.74a1 1 0 0 1-1.42 1.42l-.74-.74a1 1 0 0 1 1.42-1.42Zm-12.74.74.74-.74a1 1 0 0 1 1.42 1.42l-.74.74A1 1 0 0 1 4.92 20ZM17.66 4.34a1 1 0 0 1 0 1.42l-.74.74a1 1 0 1 1-1.42-1.42l.74-.74a1 1 0 0 1 1.42 0ZM6.34 4.34l.74.74A1 1 0 0 1 5.66 6.5l-.74-.74A1 1 0 0 1 6.34 4.34ZM12 2a1 1 0 0 1 1 1v1.05a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Z" />
                </svg>
              )}
              {theme === "dark" && (
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M11.05 2.53a1 1 0 0 1 .9-.23A10 10 0 1 1 4.7 19.3a1 1 0 0 1-.23-.9 8 8 0 0 0 6.58-15.87Z" />
                </svg>
              )}
              {theme === "brand" && (
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                  <defs>
                    <linearGradient id="brandGrad" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-accent)" />
                      <stop
                        offset="100%"
                        stopColor="var(--color-accent-foreground)"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#brandGrad)"
                    d="M12 3c-4.97 0-9 4.03-9 9 0 3.98 2.56 7.36 6.1 8.53.48.12.9-.34.74-.81A6.99 6.99 0 0 1 18.5 12a6.99 6.99 0 0 1-6.72-8.66c-.15-.47-.66-.68-1.04-.34A8.96 8.96 0 0 0 12 3Z"
                  />
                </svg>
              )}
            </button>
            <button
              type="button"
              className="md:hidden relative h-10 w-10 grid place-items-center rounded-[var(--radius-sm)] border border-[var(--color-border)]/70 bg-[var(--color-background-alt)] text-[var(--color-foreground)] hover:border-[var(--color-accent)]/60 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/50"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <div className="relative w-5 h-5">
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-full bg-current transition ${
                    mobileOpen ? "rotate-45" : "-translate-y-1.5"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-full bg-current transition ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-full bg-current transition ${
                    mobileOpen ? "-rotate-45" : "translate-y-1.5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
        {/* Mobile drawer */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(.6,.2,.1,1)] ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1 pt-2 pb-6 text-sm font-medium">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-active={active || undefined}
                    className={`block w-full rounded-[var(--radius-sm)] px-4 py-3 transition hover:bg-[color-mix(in_srgb,var(--color-accent)_15%,transparent)] hover:text-[var(--color-accent)] ${
                      active
                        ? "text-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)]"
                        : "text-[var(--color-muted)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
