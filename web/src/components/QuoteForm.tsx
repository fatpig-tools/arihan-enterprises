"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { quoteOptions } from "@/content/site";
import { FILE_TYPES, MAX_FILE_BYTES, fieldErrors, quoteSchema, type QuoteErrors } from "@/lib/quote";
import { cn } from "@/lib/utils";
import { LottieIcon } from "./LottieIcon";
import { Rich } from "./Rich";

type Status = "idle" | "sending" | "sent";

function Field({
  label,
  name,
  error,
  required,
  hint,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="tag block text-mist/60">
        {label}
        {required ? <span className="text-accent-soft"> *</span> : <span className="text-mist/35"> (optional)</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-2 text-sm text-mist/45">{hint}</p>}
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-2 text-sm text-[#ff8a70]">
          {error}
        </p>
      )}
    </div>
  );
}

export function QuoteForm({ phone }: { phone: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [failure, setFailure] = useState("");
  const [equipment, setEquipment] = useState<string[]>([]);
  const [fileName, setFileName] = useState("");

  const read = (data: FormData) => ({
    name: data.get("name"),
    company: data.get("company"),
    phone: data.get("phone"),
    email: data.get("email"),
    service: data.get("service"),
    equipment: data.getAll("equipment"),
    location: data.get("location"),
    startDate: data.get("startDate"),
    duration: data.get("duration"),
    scope: data.get("scope"),
  });

  const validateOne = (name: keyof QuoteErrors, form: HTMLFormElement | null) => {
    if (!form) return;
    const result = quoteSchema.safeParse(read(new FormData(form)));
    const all = result.success ? {} : fieldErrors(result.error);
    setErrors((prev) => ({ ...prev, [name]: all[name] }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFailure("");
    const target = e.currentTarget;
    const data = new FormData(target);
    const result = quoteSchema.safeParse(read(data));
    const next: QuoteErrors = result.success ? {} : fieldErrors(result.error);
    const file = data.get("file");
    if (file instanceof File && file.size > MAX_FILE_BYTES) next.file = "The file must be under 10 MB";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      target.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/quote", { method: "POST", body: data });
      const body = await response.json();
      if (body.ok) {
        setStatus("sent");
        return;
      }
      if (body.errors) setErrors(body.errors);
      setFailure(body.message ?? "Please check the highlighted fields.");
    } catch {
      setFailure("We couldn't reach the server. Check your connection and try again.");
    }
    setStatus("idle");
  };

  const aria = (name: keyof QuoteErrors) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => validateOne(name, e.currentTarget.form),
  });

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
          className="border border-mist/15 bg-ink-2 p-10 text-center md:p-16"
        >
          <LottieIcon name="success" loop={false} className="mx-auto size-32" />
          <h2 className="display h-card mt-6">Requirement received</h2>
          <p className="lede mx-auto mt-4 max-w-md text-mist/75">
            <Rich>{`Thanks — we've received your requirement. Our team will contact you within [24 hours]. For anything urgent, call ${phone}.`}</Rich>
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          noValidate
          exit={{ opacity: 0, y: -12 }}
          className="grid gap-x-8 gap-y-9 md:grid-cols-2"
        >
          <Field label="Full name" name="name" required error={errors.name}>
            <input id="name" name="name" autoComplete="name" className="field" {...aria("name")} />
          </Field>
          <Field label="Company name" name="company" required error={errors.company}>
            <input id="company" name="company" autoComplete="organization" className="field" {...aria("company")} />
          </Field>
          <Field label="Phone / WhatsApp" name="phone" required error={errors.phone}>
            <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" className="field" {...aria("phone")} />
          </Field>
          <Field label="Email" name="email" required error={errors.email}>
            <input id="email" name="email" type="email" autoComplete="email" className="field" {...aria("email")} />
          </Field>
          <Field label="Service needed" name="service" required error={errors.service}>
            <select id="service" name="service" defaultValue="" className="field" {...aria("service")}>
              <option value="" disabled>
                Select a service
              </option>
              {quoteOptions.service.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Duration" name="duration" required error={errors.duration}>
            <select id="duration" name="duration" defaultValue="" className="field" {...aria("duration")}>
              <option value="" disabled>
                Select a duration
              </option>
              {quoteOptions.duration.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>

          <fieldset className="md:col-span-2">
            <legend className="tag text-mist/60">
              Equipment required <span className="text-mist/35">(optional)</span>
            </legend>
            <div className="mt-4 flex flex-wrap gap-3">
              {quoteOptions.equipment.map((o) => {
                const on = equipment.includes(o);
                return (
                  <label
                    key={o}
                    className={cn(
                      "flex min-h-11 cursor-pointer items-center border px-5 font-display text-base font-semibold uppercase tracking-[0.06em] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent",
                      on ? "border-accent bg-accent text-white" : "border-mist/25 hover:border-accent",
                    )}
                  >
                    <input
                      type="checkbox"
                      name="equipment"
                      value={o}
                      checked={on}
                      onChange={() => setEquipment(on ? equipment.filter((x) => x !== o) : [...equipment, o])}
                      className="sr-only"
                    />
                    {o}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <Field label="Site location" name="location" required error={errors.location} hint="City and state">
            <input id="location" name="location" autoComplete="address-level2" className="field" {...aria("location")} />
          </Field>
          <Field label="Expected start date" name="startDate" required error={errors.startDate}>
            <input id="startDate" name="startDate" type="date" className="field [color-scheme:dark]" {...aria("startDate")} />
          </Field>

          <div className="md:col-span-2">
            <Field label="Scope details" name="scope" error={errors.scope} hint="Quantities, lift weights, site conditions — anything that helps us quote.">
              <textarea id="scope" name="scope" rows={4} className="field resize-y" {...aria("scope")} />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field label="Attach BOQ or drawings" name="file" error={errors.file} hint="PDF, spreadsheet, drawing or image, up to 10 MB">
              <label
                htmlFor="file"
                className="mt-3 flex min-h-14 cursor-pointer items-center justify-between gap-4 border border-dashed border-mist/30 px-5 transition-colors hover:border-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent"
              >
                <span className="truncate text-mist/70">{fileName || "Choose a file"}</span>
                <span className="tag text-accent-soft">Browse</span>
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept={FILE_TYPES.join(",")}
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                  className="sr-only"
                />
              </label>
            </Field>
          </div>

          {/* Honeypot */}
          <div className="hidden" aria-hidden="true">
            <label>
              Website <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-6 md:col-span-2">
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileTap={{ scale: 0.97 }}
              className="min-h-14 cursor-pointer bg-accent px-9 font-display text-lg font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-accent-deep disabled:cursor-wait disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Request My Quote"}
            </motion.button>
            {failure && (
              <p role="alert" className="max-w-md text-[#ff8a70]">
                {failure}
              </p>
            )}
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
