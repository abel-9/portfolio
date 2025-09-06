"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

// Replace this array with your real projects. Keep the shape.
export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  /**
   * Preferred: supply an array of images for carousel.
   */
  images?: ProjectImage[];
  /**
   * Backwards compatibility: single image (will be promoted to images[] internally).
   */
  image?: ProjectImage;
  href?: string;
  featured?: boolean;
  tags?: string[];
}

export const defaultProjects: ProjectItem[] = [
  {
    id: "p1",
    title: "Kelem",
    description:
      "An app that brings the fun of coloring books to mobile and helps kids learn to draw while exploring culture.",
    images: [
      {
        src: "/image_0.jpg",
        alt: "Kelem - globe icon",
        width: 400,
        height: 400,
      },
      {
        src: "/image_1.jpg",
        alt: "Kelem - UI window",
        width: 400,
        height: 400,
      },
      {
        src: "/image_2.jpg",
        alt: "Kelem - stack logo",
        width: 400,
        height: 400,
      },
    ],
    tags: ["React Native (Expo)"],
    featured: true,
  },
  {
    id: "p2",
    title: "CMS",
    description: "a desktop app that lets businesses manage their clients",
    images: [
      { src: "/client_0.png", alt: "Dashboard base", width: 400, height: 400 },
    ],
    tags: ["Electron"],
  },
  {
    id: "p3",
    title: "story",
    description:
      "Social app that lets individuals share short, ephemeral stories with followers.",
    images: [
      { src: "/story_0.png", alt: "story app image", width: 400, height: 400 },
      { src: "/story_1.png", alt: "story app image", width: 400, height: 400 },
      { src: "/story_2.png", alt: "story app image", width: 400, height: 400 },
    ],
    tags: ["Nestjs", "React Native (Expo)"],
  },
  {
    id: "p4",
    title: "My Portfolio",
    description:
      "My own Portfolio site to share my projects and skills with the world.",
    images: [
      {
        src: "/portfolio.png",
        alt: "Portfolio",
        width: 400,
        height: 400,
      },
    ],
    tags: ["NextJS"],
  },
];

interface ProjectsProps {
  projects?: ProjectItem[];
  heading?: string;
  subheading?: string;
  id?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.6, 0.2, 0.1, 1], delay: i * 0.06 },
  }),
};

export const Projects: React.FC<ProjectsProps> = ({
  projects = defaultProjects,
  heading = "Selected Projects",
  subheading = "A snapshot of things I've been building recently.",
  id = "projects",
}) => {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative mx-auto max-w-6xl pt-8 md:pt-10 pb-28"
    >
      {/* subtle top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)]/60 to-transparent" />

      <div className="mb-12 flex flex-col gap-4">
        <h2
          id={`${id}-title`}
          className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-foreground)]"
        >
          <span className="relative inline-block">
            <span className="relative z-10 bg-clip-text text-transparent bg-[linear-gradient(110deg,var(--color-accent)_0%,color-mix(in_srgb,var(--color-accent)_60%,var(--color-foreground))_50%,var(--color-accent)_100%)] [background-size:180%_100%] animate-[gradient-move_9s_linear_infinite]">
              {heading}
            </span>
            {/* Soft glow behind text for contrast */}
            <span
              aria-hidden
              className="absolute inset-0 -z-0 rounded-lg opacity-25 blur-2xl bg-[radial-gradient(circle_at_center,var(--color-accent)_0%,transparent_70%)]"
            />
          </span>
        </h2>
        {subheading && (
          <p className="max-w-2xl text-sm md:text-base leading-relaxed text-[var(--color-muted)]">
            {subheading}
          </p>
        )}
      </div>

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((p, i) => (
          <motion.li
            key={p.id}
            custom={i}
            variants={cardVariants}
            className="group relative overflow-hidden rounded-[calc(var(--radius)+2px)] border border-[var(--color-border)]/60 bg-[var(--color-background-alt)]/50 backdrop-blur-md shadow-sm transition duration-500 hover:border-[var(--color-accent)]/60 hover:shadow-lg focus-within:border-[var(--color-accent)]/70"
          >
            <Card project={p} />
          </motion.li>
        ))}
      </motion.ul>

      {/* Decorative gradient aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full opacity-30 blur-3xl bg-[radial-gradient(circle_at_center,var(--color-accent)_0%,transparent_70%)]"
      />
    </section>
  );
};

import { useState, useCallback, useEffect } from "react";

const Card: React.FC<{ project: ProjectItem }> = ({ project }) => {
  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) =>
    project.href ? (
      <a
        href={project.href}
        className="block focus:outline-none"
        rel={
          project.href.startsWith("http") ? "noopener noreferrer" : undefined
        }
        target={project.href.startsWith("http") ? "_blank" : undefined}
      >
        {children}
      </a>
    ) : (
      <>{children}</>
    );

  const imgs: ProjectImage[] =
    project.images && project.images.length
      ? project.images
      : project.image
      ? [project.image]
      : [];

  const [index, setIndex] = useState(0);
  const total = imgs.length;

  // Clamp index on images change
  useEffect(() => {
    if (index > total - 1) setIndex(0);
  }, [total, index]);

  const next = useCallback(
    () => setIndex((i) => (total ? (i + 1) % total : 0)),
    [total]
  );
  const prev = useCallback(
    () => setIndex((i) => (total ? (i - 1 + total) % total : 0)),
    [total]
  );
  const goTo = useCallback((i: number) => setIndex(i), []);

  return (
    <Wrapper>
      <div className="relative isolate">
        {project.featured && (
          <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-2 ring-inset ring-[var(--color-accent)]/40 group-hover:ring-[var(--color-accent)]/70 transition" />
        )}
        <div className="relative aspect-[16/11] w-full overflow-hidden rounded-t-[inherit]">
          {total > 1 && (
            <>
              {/* Slides wrapper */}
              <div
                className="absolute inset-0 flex transition-transform duration-700 ease-[cubic-bezier(.6,.2,.1,1)]"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {imgs.map((img, i) => (
                  <div
                    key={i}
                    className="relative h-full w-full shrink-0 grow-0 basis-full"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      className="h-full w-full object-contain p-6"
                      priority={project.featured && i === 0}
                    />
                  </div>
                ))}
              </div>
              {/* Controls */}
              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-[var(--color-background)]/70 text-[var(--color-foreground)] shadow backdrop-blur-md ring-1 ring-[var(--color-border)]/60 hover:text-[var(--color-accent)] transition"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-[var(--color-background)]/70 text-[var(--color-foreground)] shadow backdrop-blur-md ring-1 ring-[var(--color-border)]/60 hover:text-[var(--color-accent)] transition"
              >
                ›
              </button>
              {/* Indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {imgs.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === index
                        ? "w-5 bg-[var(--color-accent)]"
                        : "w-2 bg-[var(--color-border)]/70 hover:bg-[var(--color-accent)]/60"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          {total === 1 && imgs[0] && (
            <Image
              src={imgs[0].src}
              alt={imgs[0].alt}
              width={imgs[0].width}
              height={imgs[0].height}
              className="h-full w-full object-contain p-6 transition duration-500 group-hover:scale-105 group-focus-visible:scale-105"
              priority={project.featured}
            />
          )}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_70%_30%,rgba(0,0,0,.4)_0%,transparent_60%)]" />
        </div>
        <div className="relative px-5 pb-5 pt-4">
          <h3 className="text-sm font-semibold tracking-wide text-[var(--color-foreground)] flex items-center gap-2">
            <span className="relative inline-block">
              {project.title}
              <span className="absolute -inset-0.5 rounded bg-accent-gradient opacity-0 blur transition group-hover:opacity-30" />
            </span>
            {project.tags && (
              <span className="ml-auto flex gap-1">
                {project.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[var(--color-background)]/60 border border-[var(--color-border)]/60 px-2 py-0.5 text-[10px] font-medium tracking-wide text-[var(--color-muted)] group-hover:border-[var(--color-accent)]/50 group-hover:text-[var(--color-accent)] transition"
                  >
                    {t}
                  </span>
                ))}
              </span>
            )}
          </h3>
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-end rounded-[inherit] bg-[linear-gradient(to_top,rgba(0,0,0,.65)_0%,rgba(0,0,0,.3)_35%,transparent_65%)] opacity-0 backdrop-blur-sm transition duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
            <p className="px-5 pb-5 text-xs leading-relaxed text-white/85">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Projects;
