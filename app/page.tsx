import About from "./_components/about";
import Contact from "./_components/contact";
import Hero from "./_components/Hero";
import Projects from "./_components/projects";
import Navbar from "./_components/shared/navbar";
import ToggleTheme from "./_components/shared/toggleTheme";
import Skill from "./_components/Skill";
import Sparetor from "./_components/sparetor";

export default function Home() {
  return (
    <div className="relative flex flex-col bg-bg-dark">
      <Navbar />

      <div className="h-[92dvh] mt-[8dvh] flex flex-col">
        <div className="flex-1">
          <Hero />
        </div>
      </div>
      <Sparetor />
      <About />
      <Sparetor />
      <Skill />
      <Sparetor />
      <Projects />
      <Sparetor />
      <Contact />

      <div className="fixed bottom-2 right-2">
        <ToggleTheme />
      </div>
    </div>
  );
}
