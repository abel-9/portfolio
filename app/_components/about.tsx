import React from "react";

const About = () => {
  const skills = [
    { name: "Clients", count: 1, additionalInfo: "+" },
    { name: "Projects", count: 5, additionalInfo: "+" },
    { name: "Work Experience", count: 2, additionalInfo: "years" },
  ];

  return (
    <section className="p-2 bg-primary">
      <div className="flex flex-col items-center">
        <h1 className="text-text text-4xl font-bold">About Me</h1>
        <p className="max-w-3xl text-center text-white">
          I am a passionate developer with experience in building web
          applications using modern technologies. I enjoy learning new skills
          and taking on challenging projects.
        </p>

        <div className="flex flex-col justify-center md:flex-row mt-6 w-full gap-2">
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
    </section>
  );
};

export default About;
