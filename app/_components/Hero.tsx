import { ArrowRight, Computer } from "lucide-react";
import Image from "next/image";
import Button from "./shared/button";

export default function Hero() {
  return (
    <div
      id="home"
      className="h-full flex flex-col-reverse md:flex-row items-center p-4 gap-5"
    >
      <div className="flex-1 flex flex-col justify-center p-4 md:p-16 h-full">
        <h1 className="text-text text-2xl md:text-4xl font-bold mb-4">
          Hey! It&apos;s{" "}
          <span className="text-accent text-3xl md:text-5xl">Abel Girmay</span>
        </h1>
        <h3 className="text-text text-lg md:text-xl font-semibold mb-2 flex items-center gap-2">
          <Computer /> <span>Computer Science and Engineering</span>
        </h3>
        <p className="text-text-muted">
          I&apos;m a software engineer specializing in building (and
          occasionally designing) exceptional digital experiences. Currently,
          I&apos;m focused on building accessible, human-centered products.
        </p>
        <div className="flex gap-2.5 mt-10 md:items-center">
          <a href="/Cv.pdf" target="_blank" rel="noopener noreferrer">
            <Button
              size="md"
              variant="primary"
              className="flex w-fit items-center gap-1"
            >
              View CV
            </Button>
          </a>
          <a href="#projects">
            <Button
              size="md"
              variant="outline"
              className="flex w-fit items-center gap-1"
            >
              Get Started <ArrowRight />
            </Button>
          </a>
        </div>
      </div>
      <div className="relative h-[87dvh] w-full flex-1 rounded-xl bg-bg shadow-shadow-sm">
        <div className="h-full aspect-square bg-accent rounded-full absolute left-1/2 -translate-x-1/2" />
        <div className="h-2/3 aspect-square bg-bg rounded-full absolute left-1/2 bottom-0 -translate-x-1/2" />
        <Image
          src="/headshot-2.png"
          alt="Hero Image"
          width={500}
          height={500}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-auto w-4/9 rounded-full object-cover shadow-shadow-md backdrop-blur-xs"
        />
      </div>
    </div>
  );
}
