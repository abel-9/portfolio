import { FaEnvelope, FaLinkedin, FaPhone, FaTelegram } from "react-icons/fa6";

export default function Hero() {
  const socialMedia = [
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/abel-girmay-08b231267/",
      icon: FaLinkedin,
    },
    {
      name: "Email",
      link: "mailto:abelgirmay37@gmail.com",
      icon: FaEnvelope,
    },
    {
      name: "Telegram",
      link: "https://t.me/Ab3l9",
      icon: FaTelegram,
    },
    {
      name: "Phone",
      link: "tel:+251912345678",
      icon: FaPhone,
    },
  ];
  return (
    <section
      className="bg-bg-dark h-screen flex justify-center items-center"
      id="home"
    >
      <div className="flex md:flex-row flex-col h-full">
        <div className="flex-1 flex flex-col justify-center items-start p-4 md:p-8 lg:p-16">
          {/* <p className="text-xl text-text font-bold">Hi</p> */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="mt-4 text-3xl md:text-5xl font-bold text-text">
              I&apos;m{" "}
              <span className="text-primary text-4xl md:text-6xl">Abel</span>, a
              Software Developer.
            </h1>
            <p className="mt-4 text-base text-text-muted">
              I&apos;m passionate about turning ideas into impactful solutions.
              With a focus on clarity, creativity, and scalability, I build
              projects that connect people, simplify processes, and inspire
              growth. My portfolio reflects a commitment to learning,
              problem-solving, and creating work that makes a difference.
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
        <div className="flex-1 flex flex-col justify-center items-center p-4 md:p-8 lg:p-16 relative"></div>
      </div>
    </section>
  );
}
