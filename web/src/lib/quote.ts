import { z } from "zod";
import { quoteOptions } from "@/content/site";

export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const FILE_TYPES = [".pdf", ".xls", ".xlsx", ".csv", ".doc", ".docx", ".dwg", ".dxf", ".jpg", ".jpeg", ".png"];

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  company: z.string().trim().min(2, "Enter your company name"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s-]{10,15}$/, "Enter a valid phone number, e.g. +91 98765 43210"),
  email: z.string().trim().email("Enter a valid email address"),
  service: z.enum(quoteOptions.service as [string, ...string[]], { message: "Choose a service" }),
  equipment: z.array(z.enum(quoteOptions.equipment as [string, ...string[]])).default([]),
  location: z.string().trim().min(2, "Enter the site city and state"),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose an expected start date"),
  duration: z.enum(quoteOptions.duration as [string, ...string[]], { message: "Choose a duration" }),
  scope: z.string().trim().max(4000, "Keep the scope under 4,000 characters").default(""),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
export type QuoteErrors = Partial<Record<keyof QuoteInput | "file", string>>;

export function fieldErrors(error: z.ZodError): QuoteErrors {
  const out: QuoteErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof QuoteInput;
    out[key] ??= issue.message;
  }
  return out;
}
