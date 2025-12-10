import { DiPostgresql } from "react-icons/di";
import { FaDocker, FaFlutter, FaLaravel } from "react-icons/fa6";
import {
  RiNextjsLine,
  RiReactjsLine,
  RiTailwindCssFill,
  RiVuejsLine,
} from "react-icons/ri";
import {
  SiExpress,
  SiFastapi,
  SiNestjs,
  SiPrisma,
  SiRedux,
  SiSqlalchemy,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

export default function Skills() {
  const skills = [
    {
      name: "Laravel",
      icon: FaLaravel,
      color: "#FF2D20",
    },
    {
      name: "expressJs",
      icon: SiExpress,
      color: "#000000",
    },
    {
      name: "NestJs",
      icon: SiNestjs,
      color: "#E0234E",
    },
    {
      name: "FastAPI",
      icon: SiFastapi,
      color: "#000000",
    },
    {
      name: "PostgreSQL",
      icon: DiPostgresql,
      color: "#336791",
    },
    {
      name: "SQLAlchemy",
      icon: SiSqlalchemy,
      color: "#336791",
    },
    {
      name: "Prisma",
      icon: SiPrisma,
      color: "#0C344B",
    },
    {
      name: "React Native",
      icon: TbBrandReactNative,
      color: "#61DAFB",
    },
    {
      name: "Flutter",
      icon: FaFlutter,
      color: "#02569B",
    },
    {
      name: "React",
      icon: RiReactjsLine,
      color: "#61DAFB",
    },
    {
      name: "NextJs",
      icon: RiNextjsLine,
      color: "#000000",
    },
    {
      name: "Redux Toolkit",
      icon: SiRedux,
      color: "#764ABC",
    },
    {
      name: "VueJs",
      icon: RiVuejsLine,
      color: "#4FC08D",
    },
    {
      name: "tailwindcss",
      icon: RiTailwindCssFill,
      color: "#38B2AC",
    },
    {
      name: "Docker",
      icon: FaDocker,
      color: "#2496ED",
    },
  ];
  return (
    <section className="bg-bg-dark py-16 px-4 md:px-8 lg:px-16" id="skills">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
          I&apos;ve worked with
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="group flex flex-col items-center justify-center p-6 rounded-xl bg-bg shadow-shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-primary/20"
            >
              <div className="transform transition-transform duration-300 group-hover:scale-110 mb-4">
                <skill.icon
                  className="text-5xl md:text-6xl"
                  style={{ color: skill.color }}
                />
              </div>
              <p className="text-text-muted font-medium text-center group-hover:text-primary transition-colors">
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
