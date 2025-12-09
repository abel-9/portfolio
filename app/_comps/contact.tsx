import { BsEnvelope, BsGithub, BsLinkedin, BsTelegram } from "react-icons/bs";
import { CiCoffeeCup } from "react-icons/ci";
import {
  LiaHandPointDownSolid,
  LiaHandPointLeftSolid,
  LiaHandPointRightSolid,
} from "react-icons/lia";

export default function Contact() {
  return (
    <section
      id="contact"
      className="flex flex-col items-center p-4 py-16 px-4 md:px-8 lg:px-16"
    >
      <h2 className="text-3xl font-bold text-center text-primary flex items-center">
        Lets Collaborate
        <span>
          <CiCoffeeCup className="inline-block w-6 h-6 ml-2 text-primary" />
        </span>
      </h2>
      <p className="text-md text-center text-text-muted max-w-2xl mt-2">
        I&apos;m always open to discussing new projects, creative ideas, or
        opportunities to be part of your visions. Feel free to reach out to me
        through any of the platforms listed below.
      </p>
      <span className="mt-8 mb-2">
        <LiaHandPointDownSolid className="text-2xl text-text" />
      </span>
      <div className="flex items-center gap-2">
        <span>
          <LiaHandPointRightSolid className="text-2xl text-text" />
        </span>
        <a
          href="https://www.linkedin.com/in/abel-girmay-08b231267/"
          target="_blank"
          className="rounded-full aspect-square shadow-shadow-sm p-2 flex items-center justify-center border-2 border-primary hover:bg-primary/10 transition-colors cursor-pointer"
        >
          <BsLinkedin className="text-2xl text-primary" />
        </a>
        <a
          href="https://t.me/Ab3l9"
          target="_blank"
          className="rounded-full aspect-square shadow-shadow-sm p-2 flex items-center justify-center border-2 border-primary hover:bg-primary/10 transition-colors cursor-pointer"
        >
          <BsTelegram className="text-2xl text-primary" />
        </a>
        <a
          href="mailto:abelgirmay37@gmail.com"
          target="_blank"
          className="rounded-full aspect-square shadow-shadow-sm p-2 flex items-center justify-center border-2 border-primary hover:bg-primary/10 transition-colors cursor-pointer"
        >
          <BsEnvelope className="text-2xl text-primary" />
        </a>
        <span>
          <LiaHandPointLeftSolid className="text-2xl text-text" />
        </span>
      </div>
    </section>
  );
}
