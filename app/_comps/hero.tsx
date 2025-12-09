import {
  FaEnvelope,
  FaLinkedin,
  FaMailchimp,
  FaPhone,
  FaTelegram,
  FaDownload,
} from "react-icons/fa6";
import Button from "../_components/shared/button";

export default function Hero() {
  const socialMedia = [
    {
      name: "LinkedIn",
      link: "#",
      icon: FaLinkedin,
    },
    {
      name: "Email",
      link: "mailto:abelgirmay37@gmail.com",
      icon: FaEnvelope,
    },
    {
      name: "Telegram",
      link: "#",
      icon: FaTelegram,
    },
    {
      name: "Phone",
      link: "tel:+251912345678",
      icon: FaPhone,
    },
  ];
  return (
    <section className="bg-bg-dark h-screen" id="home">
      <div className="flex h-full">
        <div className="flex-1 flex flex-col justify-center items-start p-4 md:p-8 lg:p-16">
          {/* <p className="text-xl text-text font-bold">Hi</p> */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="mt-4 text-3xl md:text-5xl font-bold text-text">
              I'm{" "}
              <span className="text-primary text-4xl md:text-6xl">Abel</span>, a
              Software Developer.
            </h1>
            <p className="mt-4 text-base text-text-muted">
              I&apos;m passionate about turning ideas into impactful solutions.
              With a focus on clarity, creativity, and scalability, I build
              projects that connect people, simplify processes, and inspire
              growth. My portfolio reflects a commitment to learning,
              problem‑solving, and creating work that makes a difference.
            </p>
          </div>
          <div className="w-full">
            <p className="text-text font-semibold">Find me with</p>
            <div className="flex space-x-4 mt-2">
              {socialMedia.map((social) => (
                <a key={social.name} href={social.link}>
                  <social.icon className="text-2xl text-text hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center p-4 md:p-8 lg:p-16 relative">
          {/* <div className="relative group max-w-md">
            <div className="absolute -inset-1 bg-gradient-to-r from-text to-primary rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative px-8 py-8 bg-bg-dark ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col items-start justify-center space-y-4">
              <h3 className="text-text font-bold text-2xl">
                Want to see more?
              </h3>
              <p className="text-text-muted text-base leading-relaxed">
                Check out my resume to get a detailed overview of my experience,
                skills, and education.
              </p>
              <a
                href="/resume.pdf"
                download="Abel_Resume.pdf"
                className="w-full"
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="!w-full flex items-center justify-center gap-3 mt-2"
                >
                  <span>Download Resume</span>
                  <FaDownload />
                </Button>
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
