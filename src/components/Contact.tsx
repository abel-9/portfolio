"use client";

import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3, "Subject too short"),
  message: z.string().min(10, "Message too short").max(2000, "Too long"),
});

type ContactValues = z.infer<typeof contactSchema>;

const initialValues: ContactValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm({
  className = "",
}: {
  className?: string;
}) {
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactValues, string>>
  >({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [serverMessage, setServerMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((v: ContactValues) => ({ ...v, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setServerMessage("");
    // Client validation first
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof ContactValues, string>> = {};
      parsed.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path && typeof path === "string" && path in values) {
          fieldErrors[path as keyof ContactValues] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setStatus("error");
      setServerMessage("Please fix the highlighted fields.");
      return;
    }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data: {
        ok?: boolean;
        id?: string;
        error?: string;
        details?: unknown;
      } = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        type BackendIssue = { path: (keyof ContactValues)[]; message: string };
        const details = (data as { details?: unknown }).details;
        if (Array.isArray(details)) {
          const backendErrors: Partial<Record<keyof ContactValues, string>> =
            {};
          (details as unknown[]).forEach((d) => {
            if (
              d &&
              typeof d === "object" &&
              "path" in d &&
              Array.isArray((d as { path: unknown }).path) &&
              "message" in d &&
              typeof (d as { message: unknown }).message === "string"
            ) {
              const issue = d as BackendIssue;
              const field = issue.path[0];
              if (field) backendErrors[field] = issue.message;
            }
          });
          setErrors(backendErrors);
        }
        setServerMessage(data.error || "Failed to send. Try again later.");
        return;
      }
      setStatus("success");
      setServerMessage("Message sent successfully!");
      setValues(initialValues);
    } catch (error) {
      setStatus("error");
      setServerMessage(
        error instanceof Error ? error.message : "Unexpected error"
      );
    }
  };

  return (
    <section className={"relative max-w-3xl mx-auto " + className} id="contact">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 inline-block text-3xl md:text-4xl font-extrabold tracking-tight"
      >
        <span className="relative inline-block pr-2">
          <span
            aria-hidden
            className="absolute inset-0 blur-xl opacity-40 bg-accent-gradient"
          />
          <span className="relative bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--color-accent)_0%,color-mix(in_srgb,var(--color-accent)_55%,var(--color-foreground))_50%,var(--color-accent)_100%)] [background-size:200%_100%] animate-[gradient-move_8s_linear_infinite]">
            Contact Me
          </span>
          <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />
        </span>
      </motion.h2>
      <form
        onSubmit={handleSubmit}
        className="relative space-y-6 rounded-[var(--radius-lg)] border border-[var(--color-border)]/70 bg-[var(--color-background-alt)]/60 p-8 backdrop-blur-md shadow-lg"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Field
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Your name"
          />
          <Field
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="you@example.com"
          />
        </div>
        <Field
          label="Subject"
          name="subject"
          value={values.subject}
          onChange={handleChange}
          error={errors.subject}
          placeholder="What's this about?"
        />
        <Field
          label="Message"
          name="message"
          as="textarea"
          value={values.message}
          onChange={handleChange}
          error={errors.message}
          placeholder="Tell me more..."
          rows={7}
        />
        <div className="flex items-center gap-4 flex-wrap">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="relative inline-flex items-center gap-2 rounded-[var(--radius)] bg-accent-gradient px-6 py-3 text-sm font-semibold text-[var(--color-accent-foreground)] shadow hover:shadow-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/60 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
          {serverMessage && (
            <p
              className={`text-sm font-medium ${
                status === "error"
                  ? "text-[var(--color-danger)]"
                  : "text-[var(--color-success)]"
              }`}
            >
              {serverMessage}
            </p>
          )}
        </div>
        <p className="text-[10px] tracking-wide uppercase text-[var(--color-muted)]">
          I value privacy. Your info is only used to reply.
        </p>
        {/* Ambient decoration */}
        <span className="pointer-events-none absolute -z-10 -inset-8 rounded-[inherit] bg-[radial-gradient(circle_at_30%_20%,var(--color-accent)_0%,transparent_65%),radial-gradient(circle_at_70%_80%,color-mix(in_srgb,var(--color-accent)_70%,#000)_0%,transparent_70%)] opacity-40 blur-2xl" />
      </form>
    </section>
  );
}

interface FieldPropsBase {
  label: string;
  name: keyof ContactValues;
  error?: string;
  as?: "textarea";
  rows?: number;
}

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "value" | "onChange"
> & {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
type TextAreaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "name" | "value" | "onChange"
> & {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

type FieldProps = FieldPropsBase & (InputProps | TextAreaProps);

function Field({ label, name, error, as, rows, ...rest }: FieldProps) {
  const common = (
    <>
      <label
        htmlFor={name as string}
        className="mb-2 inline-block text-xs font-semibold tracking-wide uppercase text-[var(--color-muted)]"
      >
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={name as string}
          name={name as string}
          rows={rows}
          className="w-full resize-y rounded-[var(--radius-sm)] border border-[var(--color-border)]/60 bg-[var(--color-background)]/60 px-4 py-3 text-sm text-[var(--color-foreground)] shadow-sm outline-none focus:border-[var(--color-accent)]/70 focus:ring-2 focus:ring-[var(--color-accent)]/40 transition placeholder:text-[var(--color-muted)]/60"
          {...(rest as TextAreaProps)}
        />
      ) : (
        <input
          id={name as string}
          name={name as string}
          className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)]/60 bg-[var(--color-background)]/60 px-4 py-3 text-sm text-[var(--color-foreground)] shadow-sm outline-none focus:border-[var(--color-accent)]/70 focus:ring-2 focus:ring-[var(--color-accent)]/40 transition placeholder:text-[var(--color-muted)]/60"
          {...(rest as InputProps)}
        />
      )}
      {error && (
        <span className="mt-1 text-[11px] font-medium text-[var(--color-danger)]">
          {error}
        </span>
      )}
    </>
  );
  return <div className="flex flex-col">{common}</div>;
}
