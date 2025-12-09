// import About from "./_components/about";
// import Contact from "./_components/contact";
// import Hero from "./_components/Hero";
// import Projects from "./_components/projects";
// import Navbar from "./_components/shared/navbar";
// import ToggleTheme from "./_components/shared/toggleTheme";
// import Skill from "./_components/Skill";
// import Sparetor from "./_components/sparetor";

import Projects from "./_components/projects";
import ToggleTheme from "./_components/shared/toggleTheme";
import About from "./_comps/about";
import Contact from "./_comps/contact";
import Experience from "./_comps/experiance";
import Hero from "./_comps/hero";
import Navbar from "./_comps/navbar";
import Skills from "./_comps/skills";

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
  return (
    <div className="flex flex-col bg-bg-dark">
      <div className="fixed top-0 w-full z-10">
        <Navbar />
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
