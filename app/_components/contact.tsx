export default function Contact() {
  return (
    <section className="flex flex-col p-6 gap-6">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
          Let&apos;s Collaborate
        </h2>
        <p className="mt-4 text-lg leading-6 text-text-muted max-w-lg mx-auto">
          Have a project in mind or just want to say hello? I&apos;d love to
          hear from you. Fill out the form below or reach out through my social
          channels.
        </p>
      </div>
      <form
        action="#"
        className="flex flex-col justify-center w-full md:w-2xl self-center gap-4"
      >
        <div className="flex md:flex-row flex-col gap-2 w-full">
          <div className="flex-1 flex flex-col gap-1">
            <label
              htmlFor="name"
              className="text-sm font-medium text-text-muted"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="px-4 py-2 border border-border-dark rounded-md bg-bg-light text-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Your Name"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-text-muted"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="px-4 py-2 border border-border-dark rounded-md bg-bg-light text-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Your Email"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label
            htmlFor="message"
            className="text-sm font-medium text-text-muted"
          >
            Message
          </label>
          <textarea
            id="message"
            className="px-4 py-2 min-h-[100px] max-h-[300px] resize-none hide-scrollbar w-full border border-border-dark rounded-md bg-bg-light text-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Your Message"
          />
        </div>
      </form>
    </section>
  );
}
