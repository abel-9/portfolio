export default function Contact() {
  return (
    <section className="flex flex-col p-6 gap-6">
      <h1 className="text-4xl text-primary font-bold text-center">
        Contact Me
      </h1>
      <p className="text-md text-center text-text-muted max-w-2xl mx-auto">
        I&apos;m always open to discussing new projects, creative ideas, or
        opportunities to be part of your visions. Feel free to reach out to me
        via email or through my social media channels.
      </p>
      <div className="flex flex-col items-center gap-4">
        <a
          href="mailto:your-email@example.com"
          className="text-accent hover:underline"
        >
          your-email@example.com
        </a>
      </div>
    </section>
  );
}
