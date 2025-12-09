import { CheckCircleIcon, TableIcon } from "lucide-react";
import { DiPostgresql } from "react-icons/di";
import { FaFlutter, FaLaravel } from "react-icons/fa6";
import { SiExpress, SiSequelize } from "react-icons/si";

export default function Experience() {
  const experiences = [
    {
      company: "Space Science and Geospatial Institute",
      role: "Backend Developer",
      duration: "Nov 2020 - Present",
      workPlace: "On-site",
      works: [
        "Collaborated to create a featurerich backend solution",
        "Created a comprehensive user and role management system",
        "Implemented secure authentication and authorization mechanisms",
        "Optimized database queries to enhance application performance",
      ],
      description:
        "Developed the backend of the institute's provided training management system",
      techStack: [
        {
          name: "expressJs",
          icon: SiExpress,
          color: "#000000",
        },
        {
          name: "PostgreSQL",
          icon: DiPostgresql,
          color: "#336791",
        },
        {
          name: "Sequelize",
          icon: SiSequelize,
          color: "#336791",
        },
      ],
    },
    {
      company: "Dart Digital Technologies",
      role: "Fullstack Developer",
      duration: "Oct 2018 - Dec 2019",
      workPlace: "Remote",
      description:
        "Developed a multilingual Content Management System (CMS) for a client in the education sector, enabling efficient content creation, management, and publishing across multiple languages.",
      works: [
        "secure authentication and authorization mechanisms",
        "Designed and implemented user-friendly interfaces for content creation and management",
        "Implemented multilingual support for diverse user base",
        "Developed a Restful API for seamless integration with frontend applications",
        "Developed a Mobile application using Flutter for on-the-go content Delivery",
      ],
      techStack: [
        {
          name: "Laravel",
          icon: FaLaravel,
          color: "#FF2D20",
        },
        {
          name: "Eloquent ORM",
          icon: TableIcon,
          color: "#336791",
        },
        {
          name: "PostgreSQL",
          icon: DiPostgresql,
          color: "#336791",
        },
        {
          name: "Flutter",
          icon: FaFlutter,
          color: "#02569B",
        },
      ],
    },
  ];
  return (
    <section className="bg-bg-dark py-16 px-4 md:px-8 lg:px-16" id="experience">
      <h2 className="text-3xl text-primary font-bold mb-6 text-center">
        Experience
      </h2>
      <div className="flex flex-col gap-12">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`border-primary border-l-2 pl-4 w-1/2 ${
              (index + 1) % 2 === 0 ? "self-end" : ""
            }`}
          >
            <h3 className="text-text text-lg font-semibold">
              {exp.role} @
              <span className="text-text-muted text-sm">{exp.company}</span>
            </h3>
            <p className="text-text-muted text-sm mb-2">
              {exp.duration} | {exp.workPlace}
            </p>
            <p className="text-text mb-2">{exp.description}</p>
            {exp.works && (
              <div className="space-y-1">
                {exp.works.map((work, idx) => (
                  <div key={idx} className="flex gap-2 ml-2">
                    <span>
                      <CheckCircleIcon className="text-primary w-4 h-4 mt-1" />
                    </span>
                    <p className="text-text-muted text-sm">{work}</p>
                  </div>
                ))}
              </div>
            )}
            {exp.techStack && (
              <div className="mt-4">
                <h4 className="text-text font-medium mb-2">Tech Stack:</h4>
                <div className="flex space-x-4">
                  {exp.techStack.map((tech, techIdx) => (
                    <div
                      key={techIdx}
                      className="flex flex-col items-center justify-center rounded-full aspect-square bg-bg-light p-2 shadow-shadow-sm"
                    >
                      <tech.icon
                        className="text-xl"
                        style={{ color: tech.color }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
