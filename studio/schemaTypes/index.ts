import { defineArrayMember, defineField, defineType } from "sanity";

const order = defineField({
  name: "order",
  type: "number",
  description: "Lower numbers appear first.",
  initialValue: 10,
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "contact", title: "Contact", default: true },
    { name: "company", title: "Company" },
    { name: "figures", title: "Key figures" },
  ],
  fields: [
    defineField({ name: "companyName", type: "string", group: "company", validation: (rule) => rule.required() }),
    defineField({ name: "tagline", type: "string", group: "company" }),
    defineField({ name: "footerAbout", title: "Footer line", type: "text", rows: 2, group: "company" }),
    defineField({ name: "legalName", type: "string", group: "company" }),
    defineField({ name: "gstin", title: "GSTIN", type: "string", group: "company" }),
    defineField({ name: "udyam", title: "MSME / Udyam number", type: "string", group: "company" }),
    defineField({ name: "regions", title: "Operating regions", type: "string", group: "company" }),
    defineField({ name: "phone", type: "string", group: "contact", description: "Include the country code, e.g. +91 98765 43210." }),
    defineField({ name: "whatsapp", title: "WhatsApp number", type: "string", group: "contact" }),
    defineField({ name: "email", type: "string", group: "contact", validation: (rule) => rule.email() }),
    defineField({ name: "careersEmail", type: "string", group: "contact", validation: (rule) => rule.email() }),
    defineField({ name: "address", title: "Head office address", type: "text", rows: 3, group: "contact" }),
    defineField({ name: "hours", title: "Working hours", type: "string", group: "contact" }),
    defineField({
      name: "stats",
      title: "Key figures",
      description: "Shown under the home page hero. Four work best.",
      type: "array",
      group: "figures",
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", type: "string", description: "e.g. 100 t, 24×7, 12+", validation: (rule) => rule.required() }),
            defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", description: "Internal name of the page.", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      description: "Must match the site route: home, about, services, fleet, industries, how-we-work, projects, safety, careers, contact.",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "headline", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "intro", type: "text", rows: 3 }),
    defineField({ name: "seoTitle", title: "Meta title", type: "string", validation: (rule) => rule.max(60).warning("Keep under 60 characters") }),
    defineField({ name: "seoDescription", title: "Meta description", type: "text", rows: 2, validation: (rule) => rule.max(155).warning("Keep under 155 characters") }),
  ],
  preview: { select: { title: "title", subtitle: "headline" } },
});

export const crane = defineType({
  name: "crane",
  title: "Crane",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (rule) => rule.required() }),
    defineField({
      name: "kind",
      title: "3D model",
      type: "string",
      options: { list: [{ title: "Truck crane", value: "truck" }, { title: "Crawler crane", value: "crawler" }], layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "type", type: "string", description: "e.g. Hydraulic truck crane", validation: (rule) => rule.required() }),
    defineField({ name: "capacityTonnes", title: "Max lifting capacity (tonnes)", type: "number", validation: (rule) => rule.required().positive() }),
    defineField({ name: "regNo", title: "Registration / serial no.", type: "string" }),
    defineField({ name: "bestFor", type: "string" }),
  ],
  preview: { select: { title: "name", subtitle: "type" } },
});

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "short", title: "Short title", type: "string", description: "Used in the home page list." }),
    defineField({ name: "summary", type: "text", rows: 2 }),
    defineField({ name: "body", type: "text", rows: 4 }),
    defineField({ name: "points", type: "array", of: [defineArrayMember({ type: "string" })] }),
    order,
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "summary" } },
});

export const industry = defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    order,
  ],
  preview: { select: { title: "title", subtitle: "summary" } },
});

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  description: "Case studies. Name clients only with their permission.",
  fields: [
    defineField({ name: "title", title: "Project name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "client", type: "string" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "scope", type: "text", rows: 2 }),
    defineField({ name: "equipment", title: "Equipment deployed", type: "string" }),
    defineField({ name: "contractModel", type: "string" }),
    defineField({ name: "duration", type: "string", description: "e.g. March 2025 – January 2026" }),
    defineField({ name: "outcome", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "title", subtitle: "client" } },
});

export const client = defineType({
  name: "client",
  title: "Client",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "approvedForPublicUse",
      title: "Approved for public use",
      description: "The client's name appears on the website only when this is on.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", approved: "approvedForPublicUse" },
    prepare: ({ title, approved }) => ({ title, subtitle: approved ? "Shown on site" : "Hidden — not approved" }),
  },
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  description: "Use only genuine, approved quotes.",
  fields: [
    defineField({ name: "quote", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "designation", type: "string" }),
    defineField({ name: "company", type: "string" }),
  ],
  preview: { select: { title: "name", subtitle: "company" } },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "answer", type: "text", rows: 4, validation: (rule) => rule.required() }),
    order,
  ],
  preview: { select: { title: "question" } },
});

export const jobRole = defineType({
  name: "jobRole",
  title: "Job role",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "requirement", type: "string" }),
    order,
  ],
  preview: { select: { title: "title", subtitle: "requirement" } },
});

export const quoteRequest = defineType({
  name: "quoteRequest",
  title: "Quote request",
  type: "document",
  description: "Submitted from the website's quote form.",
  fields: [
    defineField({
      name: "status",
      type: "string",
      options: { list: ["new", "contacted", "quoted", "won", "lost"], layout: "radio", direction: "horizontal" },
      initialValue: "new",
    }),
    defineField({ name: "name", type: "string", readOnly: true }),
    defineField({ name: "company", type: "string", readOnly: true }),
    defineField({ name: "phone", type: "string", readOnly: true }),
    defineField({ name: "email", type: "string", readOnly: true }),
    defineField({ name: "service", type: "string", readOnly: true }),
    defineField({ name: "equipment", type: "array", of: [defineArrayMember({ type: "string" })], readOnly: true }),
    defineField({ name: "location", title: "Site location", type: "string", readOnly: true }),
    defineField({ name: "startDate", title: "Expected start date", type: "date", readOnly: true }),
    defineField({ name: "duration", type: "string", readOnly: true }),
    defineField({ name: "scope", title: "Scope details", type: "text", readOnly: true }),
    defineField({ name: "attachment", title: "BOQ or drawings", type: "file", readOnly: true }),
    defineField({ name: "submittedAt", type: "datetime", readOnly: true }),
  ],
  orderings: [{ title: "Newest first", name: "newest", by: [{ field: "submittedAt", direction: "desc" }] }],
  preview: {
    select: { name: "name", company: "company", service: "service", status: "status" },
    prepare: ({ name, company, service, status }) => ({ title: `${name} — ${company}`, subtitle: `${status ?? "new"} · ${service}` }),
  },
});

export const schemaTypes = [
  siteSettings,
  page,
  crane,
  service,
  industry,
  project,
  client,
  testimonial,
  faq,
  jobRole,
  quoteRequest,
];
