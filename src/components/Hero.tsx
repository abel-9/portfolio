"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

// Editable hero content – replace with your own data.
export const heroContent = {
  overline: "Computer Science and Engineering Student",
  name: "Abel Girmay", // <- replace with your name
  headline: "Crafting elegant solutions for complex problems.",
  subheading:
    "I build performant, accessible, design-driven web experiences with a focus on DX, scalability, and delightful micro‑interactions.",
  ctaPrimary: "Get In Touch",
  ctaPrimaryHref: "/contact",
  ctaSecondary: "Download CV",
  ctaSecondaryHref: "/cv.pdf",
};

// Re-usable spring fade/slide variants
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.6, 0.2, 0.1, 1], delay },
  },
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 150, mass: 0.4 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 150, mass: 0.4 });

  const glowTranslate = useTransform(
    [springX, springY],
    ([x, y]: number[]) => `translate(${x * 0.04}px, ${y * 0.04}px)`
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - (rect.left + rect.width / 2));
      mouseY.set(e.clientY - (rect.top + rect.height / 2));
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative w-full mx-auto max-w-6xl pt-28 md:pt-32 pb-24 md:pb-40"
    >
      {/* Ambient gradient / glow background */}
      <motion.div
        style={{ transform: glowTranslate }}
        aria-hidden
        className="pointer-events-none absolute -inset-x-32 -top-40 h-[600px] opacity-60 [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,.9),transparent_70%)]"
      >
        <div className="absolute inset-0 mix-blend-screen bg-[radial-gradient(circle_at_30%_40%,var(--color-accent)_0%,transparent_60%),radial-gradient(circle_at_70%_60%,color-mix(in_srgb,var(--color-accent)_70%,#000)_0%,transparent_65%)]" />
      </motion.div>

      {/* Content */}
      <div className="relative">
        <motion.div variants={fadeUp(0)} initial="hidden" animate="show">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)]/60 bg-[var(--color-background-alt)]/70 px-4 py-1.5 text-xs font-medium tracking-wide text-[var(--color-muted)] backdrop-blur-md shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
            {heroContent.overline}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp(0.1)}
          initial="hidden"
          animate="show"
          className="mt-8 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight"
        >
          <span className="relative inline-block pr-2">
            {/* Glow layer */}
            <span
              aria-hidden
              className="absolute inset-0 blur-xl opacity-40 bg-accent-gradient"
            />
            {/* Animated gradient name */}
            <motion.span
              className="relative bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--color-accent)_0%,color-mix(in_srgb,var(--color-accent)_65%,#ffffff)_50%,var(--color-accent)_100%)]"
              style={{ backgroundSize: "200% 100%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              {heroContent.name}
            </motion.span>
            {/* Sheen overlay */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
              style={{
                background:
                  "linear-gradient(115deg,transparent 0%,rgba(255,255,255,.9) 45%,transparent 55%)",
                backgroundSize: "250% 100%",
              }}
            />
          </span>
          <span className="block text-[var(--color-foreground)]/90 font-semibold mt-2">
            {heroContent.headline}
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp(0.2)}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-[var(--color-muted)]"
        >
          {heroContent.subheading}
        </motion.p>

        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href={heroContent.ctaPrimaryHref}
            className="group relative inline-flex items-center gap-2 rounded-[var(--radius)] bg-accent-gradient px-7 py-3 text-sm font-semibold text-[var(--color-accent-foreground)] shadow hover:shadow-lg transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/60"
          >
            {heroContent.ctaPrimary}
            <span className="inline-block translate-x-0 transition group-hover:translate-x-1">
              →
            </span>
            <span className="pointer-events-none absolute inset-0 rounded-[var(--radius)] ring-1 ring-inset ring-white/10" />
          </a>
          <a
            href={heroContent.ctaSecondaryHref}
            className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--color-border)]/70 bg-[var(--color-background-alt)]/60 px-7 py-3 text-sm font-semibold text-[var(--color-foreground)] shadow-sm hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/60"
          >
            {heroContent.ctaSecondary}
          </a>
        </motion.div>
      </div>

      {/* Decorative orbital rings */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 2.4, ease: [0.83, 0.04, 0.17, 1] }}
          className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color-mix(in_srgb,var(--color-accent)_40%,transparent)]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 3, delay: 0.3, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color-mix(in_srgb,var(--color-accent)_25%,transparent)]"
        />
      </div>
    </section>
  );
}
