import Image from "next/image";
import Navbar from "./_components/shared/navbar";
import ToggleTheme from "./_components/shared/toggleTheme";

export default function Home() {
  return (
    <div className="relative flex flex-col h-dvh bg-bg-dark">
      <Navbar />
      <div className="absolute bottom-2 right-2">
        <ToggleTheme />
      </div>
    </div>
  );
}
