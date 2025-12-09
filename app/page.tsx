// import About from "./_components/about";
// import Contact from "./_components/contact";
// import Hero from "./_components/Hero";
// import Projects from "./_components/projects";
// import Navbar from "./_components/shared/navbar";
// import ToggleTheme from "./_components/shared/toggleTheme";
// import Skill from "./_components/Skill";
// import Sparetor from "./_components/sparetor";
"use client";
import Projects from "./_components/projects";
import ToggleTheme from "./_components/shared/toggleTheme";
import About from "./_comps/about";
import Contact from "./_comps/contact";
import Experience from "./_comps/experiance";
import Hero from "./_comps/hero";
import Navbar from "./_comps/navbar";
import Skills from "./_comps/skills";
import useActiveTab from "./hooks/useActiveTab";
import { useEffect } from "react";

// export default function Home() {
//   return (
//     <div className="relative flex flex-col bg-bg-dark">
//       <Navbar />

//       <div className="h-[92dvh] mt-[8dvh] flex flex-col">
//         <div className="flex-1">
//           <Hero />
//         </div>
//       </div>
//       <Sparetor />
//       <About />
//       <Sparetor />
//       <Skill />
//       <Sparetor />
//       <Projects />
//       <Sparetor />
//       <Contact />

//       <div className="fixed bottom-2 right-2">
//         <ToggleTheme />
//       </div>
//     </div>
//   );
// }

export default function Portfolio() {
  const { activeTab, setActiveTab } = useActiveTab();

  useEffect(() => {
    const sections = [
      "home",
      "about",
      "skills",
      "experience",
      "projects",
      "contact",
    ];
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [setActiveTab]);

  return (
    <div className="flex flex-col bg-bg-dark">
      <div className="fixed top-0 w-full z-10">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <div className="fixed bottom-2 right-2">
        <ToggleTheme />
      </div>
    </div>
  );
}
