import Image from "next/image";

export default function Projects() {
  return (
    <section className="flex flex-col items-center p-4">
      <h2 className="text-3xl font-bold text-center text-primary">Projects</h2>
      <p className="text-md text-center text-text-muted max-w-2xl mt-2">
        Here are some of the projects I&apos;ve worked on recently.
      </p>
      <div className="flex flex-wrap gap-4 p-4 items-center justify-center">
        <div className="w-1/4 rounded-b-xl overflow-clip">
          <Project />
        </div>
        <div className="w-1/4 rounded-b-xl overflow-clip">
          <Project />
        </div>
        <div className="w-1/4 rounded-b-xl overflow-clip">
          <Project />
        </div>
        <div className="w-1/4 rounded-b-xl overflow-clip">
          <Project />
        </div>
      </div>
    </section>
  );
}

function Project() {
  return (
    <div className="w-full bg-bg">
      <div className="w-full">
        <Image
          src={"/project_placeholder.png"}
          alt="project placeholder"
          width={450}
          height={800}
          className="object-cover overflow-clip w-full aspect-video object-top"
        />
      </div>
      <div>hell</div>
    </div>
  );
}
