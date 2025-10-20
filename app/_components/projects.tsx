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

const projects: ProjectProps[] = [
  {
    name: "Amil: Client Management System",
    description:
      "A comprehensive client management system designed to streamline client interactions, track project progress and financial situation and enhance overall productivity for businesses.",
    technologies: [
      "ElectronJS",
      "TypeScript",
      "ReactJS",
      "TailwindCSS",
      "SQLite",
    ],
    images: ["/amil-1.png", "/amil-2.png"],
  },
  {
    name: "kelem",
    description:
      "an app that lets kids enjoy learning there culture and history in an interactive way through coloring various cultural and historical figures.",
    technologies: ["React Native", "Expo", "TypeScript"],
    images: ["/project_placeholder.png"],
  },
  {
    name: "Portfolio Website",
    description:
      "A personal portfolio website to showcase my projects and skills.",
    technologies: ["NextJS", "TypeScript", "TailwindCSS", "Framer Motion"],
    images: ["/portfolio.png"],
  },
  {
    name: "story",
    description:
      "A social app that lets users create and share short stories with friends and followers.",
    technologies: [
      "NestJS",
      "React Native",
      "Expo",
      "TypeScript",
      "RESTapi",
      "prisma",
      "PostgreSQL",
    ],
    images: ["/project_placeholder.png"],
  },
  {
    name: "NEXTstep",
    description:
      "an AI web app that lets students find scholarships matching their CV",
    technologies: [
      "FastAPI",
      "ReactJS",
      "TypeScript",
      "TailwindCSS",
      "PostgreSQL",
      "SQLAlchemy",
      "TensorFlow",
    ],
    images: ["/project_placeholder.png"],
  },
  {
    name: "RARA media",
    description: "a news media website covering local and international news.",
    technologies: ["Frontend", "vueJS", "JavaScript", "CSS"],
    images: ["/project_placeholder.png"],
  },
];

export default function Projects() {
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState<number>(-1);

  return (
    <section id="projects" className="flex flex-col items-center p-4">
      <h2 className="text-3xl font-bold text-center text-primary">Projects</h2>
      <p className="text-md text-center text-text-muted max-w-2xl mt-2">
        Here are some of the projects I&apos;ve worked on recently.
      </p>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-6 w-full mt-8 justify-center">
        {projects.map((project, index) => (
          <Project
            project={project}
            key={index}
            index={index}
            setCurrentSubjectIndex={setCurrentSubjectIndex}
            currentIndex={currentSubjectIndex}
          />
        ))}
      </div>
    </section>
  );
}

function Project({
  project,
  index,
  setCurrentSubjectIndex,
  currentIndex,
}: {
  project: ProjectProps;
  index: number;
  setCurrentSubjectIndex: (index: number) => void;
  currentIndex: number;
}) {
  const [onHover, setOnHover] = useState(false);
  const controller = useAnimation();

  useEffect(() => {
    if (onHover || currentIndex === index) {
      controller.start({
        height: "auto",
      });
    } else {
      controller.start({ height: 0, padding: 0 });
    }
  }, [onHover, controller, currentIndex, index]);

  return (
    <motion.div
      onHoverStart={() => setOnHover(true)}
      onHoverEnd={() => setOnHover(false)}
      initial={{ scale: 1 }}
      animate={{ scale: currentIndex === index ? 1.03 : 1 }}
      onTap={() => {
        setCurrentSubjectIndex(index === currentIndex ? -1 : index);
      }}
      className="relative bg-bg rounded-b-xl shadow-shadow-sm overflow-clip cursor-pointer"
    >
      <div className="w-full aspect-video">
        <ImageCarousel images={project.images} />
      </div>
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
