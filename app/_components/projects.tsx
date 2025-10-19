"use client";
import { useEffect, useState } from "react";
import ImageCarousel from "./shared/imageCarousel";
import { motion, useAnimation } from "framer-motion";

interface ProjectProps {
  name: string;
  description: string;
  technologies: string[];
  images: string[];
}

export default function Projects() {
  const projects: ProjectProps[] = [
    {
      name: "Amil: Client Management System",
      description:
        "A comprehensive client management system designed to streamline client interactions, track project progress and financial situation and enhance overall productivity for businesses.",
      technologies: ["Next.js", "TypeScript", "Prisma"],
      images: ["/amil-1.png", "/amil-2.png"],
    },
  ];
  return (
    <section className="flex flex-col items-center p-4">
      <h2 className="text-3xl font-bold text-center text-primary">Projects</h2>
      <p className="text-md text-center text-text-muted max-w-2xl mt-2">
        Here are some of the projects I&apos;ve worked on recently.
      </p>
      <div className="flex flex-wrap gap-4 p-4 items-center justify-center">
        {projects.map((project) => (
          <div
            key={project.name}
            className="w-1/4 rounded-b-xl overflow-clip shadow-shadow-sm"
          >
            <Project project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Project({ project }: { project: ProjectProps }) {
  const [onHover, setOnHover] = useState(false);
  const controller = useAnimation();

  useEffect(() => {
    if (onHover) {
      controller.start({
        height: "auto",
      });
    } else {
      controller.start({ height: 0, padding: 0 });
    }
  }, [onHover, controller]);

  return (
    <motion.div
      onHoverStart={() => setOnHover(true)}
      onHoverEnd={() => setOnHover(false)}
      className="relative w-full bg-bg"
    >
      <ImageCarousel images={["/amil-1.png", "/amil-2.png"]} />
      <div className="p-4">
        <h3 className="text-text font-bold text-md">{project.name}</h3>
        <div className="w-full flex flex-wrap gap-2 flex-row mt-4">
          {project.technologies.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
      </div>
      <motion.div
        animate={controller}
        className="absolute bottom-0 w-full rounded-xl overflow-clip"
      >
        <div className="relative h-1 w-24 top-3 z-10 left-1/2 -translate-x-1/2 bg-black" />
        <div className="p-4 bg-bg-light/60 backdrop-blur-xs">
          <p className="text-text text-sm font-semibold">
            {project.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TechBadge({ name }: { name: string }) {
  return (
    <div className="bg-bg-light text-text px-4 py-1 rounded-full text-xs flex items-center gap-2 font-semibold shadow-shadow-sm">
      <span className="w-1 h-1 rounded-full bg-accent" />

      {name}
    </div>
  );
}
