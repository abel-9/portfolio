import React from "react";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const skills = [
  { name: "Clients", count: 1, additionalInfo: "+" },
  { name: "Projects", count: 5, additionalInfo: "+" },
  { name: "Work Experience", count: 2, additionalInfo: "years" },
];

const Socials = [
  {
    name: "Email",
    icon: Mail,
    color: "red",
    link: "mailto:abelgirmay37@gmail.com",
  },
  {
    name: "Github",
    icon: FaGithub,
    color: "black",
    link: "https://github.com/abel-9",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    color: "blue",
    link: "https://www.linkedin.com/in/abel-girmay-08b231267/",
  },
];
const About = () => {
  return (
    <section id="about" className="p-2 bg-bg-dark">
      <div className="flex flex-col items-center">
        <h1 className="text-text text-4xl font-bold">About Me</h1>
        <p className="max-w-3xl text-center text-text-muted">
          I am a passionate developer with experience in building web
          applications using modern technologies. I enjoy learning new skills
          and taking on challenging projects.
        </p>

        <div className="flex flex-col-reverse md:flex-row gap-4 w-full p-6 justify-around">
          <div className="flex flex-col gap-2">
            <h2 className="text-text font-semibold text-xl">Socials</h2>
            {Socials.map((social) => (
              <a
                href={social.link}
                key={social.name}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <div className="flex flex-row items-center gap-2">
                  <span className="w-10 aspect-square p-2 rounded-full bg-bg-light shadow-shadow-sm">
                    <social.icon size={24} color={social.color} />
                  </span>
                  <a className="text-text font-semibold">{social.name}</a>
                </div>
              </a>
            ))}
          </div>

          <div className="flex flex-col justify-center md:flex-row mt-6 gap-2">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="rounded-xl bg-bg p-4 flex flex-col items-start md:m-4 shadow-shadow-sm md:aspect-square w-full md:w-32"
              >
                <h1 className="text-2xl text-text font-semibold flex-1">
                  {skill.count}
                  {skill.additionalInfo && (
                    <span className="text-text-muted font-semibold text-sm ml-1">
                      {skill.additionalInfo}
                    </span>
                  )}
                </h1>
                <p className="text-text-muted font-semibold">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
