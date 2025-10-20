"use client";
import GaugeComponent from "react-gauge-component";

export default function Skill() {
  const skills = [
    {
      type: "programming languages",
      skills: [
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Python", level: 80 },
        { name: "PHP", level: 80 },
        { name: "C++", level: 70 },
      ],
    },
    {
      type: "frameworks",
      skills: [
        { name: "Laravel", level: 90 },
        { name: "Nest.js", level: 85 },
        { name: "FastAPI", level: 80 },
        { name: "React.js", level: 90 },
        { name: "Expo", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Vue.js", level: 80 },
        { name: "Flutter", level: 80 },
      ],
    },
    {
      type: "databases",
      skills: [
        { name: "PostgreSQL", level: 90 },
        { name: "SQLite", level: 85 },
        { name: "MongoDB", level: 80 },
      ],
    },
  ];
  return (
    <section className="flex flex-col p-6 gap-6">
      <h1 className="text-4xl text-primary font-bold text-center">My Skills</h1>
      {skills.map((skillCategory) => {
        return (
          <div
            key={skillCategory.type}
            className="relative flex flex-col bg-bg rounded-xl shadow-shadow-sm p-6"
          >
            <div>
              <h2 className="absolute text-text -top-4 left-4 px-2 p-1 bg-bg-light text-md font-semibold rounded-xl shadow-shadow-sm">
                {skillCategory.type}
              </h2>
              <div className="flex flex-wrap gap-2">
                {skillCategory.skills.map((skill) => {
                  return (
                    <div
                      key={skill.name}
                      className="md:w-50 w-[48%] rounded-lg shadow-shadow-sm bg-bg-light"
                    >
                      <div className="relative aspect-video bg-bg-dark back">
                        <div className="absolute top-0 left-0 w-full h-full z-10 p-6 shadow-2xl bg-white/10 backdrop-blur-[0.5px] border border-white/20" />
                        <GaugeComponent
                          id="simple-gauge"
                          className="w-full text-text"
                          value={skill.level}
                          labels={{
                            valueLabel: {
                              formatTextValue(value) {
                                return `${Math.round(value)}%`;
                              },
                            },
                          }}
                          pointer={{ elastic: true }}
                        />
                      </div>
                      <h3 className="text-sm md:text-md font-semibold text-center text-accent p-2">
                        {skill.name}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
