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
        { name: "Java", level: 70 },
      ],
    },
    {
      type: "frameworks",
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Node.js", level: 80 },
        { name: "Django", level: 70 },
      ],
    },
    {
      type: "databases",
      skills: [
        { name: "PostgreSQL", level: 80 },
        { name: "MongoDB", level: 75 },
        { name: "MySQL", level: 70 },
        { name: "SQLite", level: 65 },
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
                            tickLabels: {
                              ticks: [
                                { value: 20 },
                                { value: 50 },
                                { value: 80 },
                                { value: 100 },
                              ],
                            },
                          }}
                          pointer={{ elastic: true }}
                        />
                      </div>
                      <h3 className="text-sm md:text-lg font-semibold text-center text-accent">
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
