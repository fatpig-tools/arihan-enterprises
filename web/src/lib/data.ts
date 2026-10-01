import "server-only";
import { client } from "@/sanity/client";
import * as q from "@/sanity/queries";
import * as fallback from "@/content/site";
import type {
  Client,
  Crane,
  Faq,
  Industry,
  JobRole,
  PageCopy,
  Project,
  Service,
  Settings,
  Testimonial,
} from "@/content/site";

const options = { next: { revalidate: 60 } };

/** Fetch from Sanity; use the bundled content when Sanity is absent, empty or failing. */
async function load<T>(query: string, fb: T, params: Record<string, string> = {}): Promise<T> {
  if (!client) return fb;
  try {
    const result = await client.fetch<T | null>(query, params, options);
    if (result == null || (Array.isArray(result) && result.length === 0)) return fb;
    return result;
  } catch (error) {
    console.error("Sanity fetch failed, using fallback content", error);
    return fb;
  }
}

export async function getSettings(): Promise<Settings> {
  const remote = await load<Partial<Settings>>(q.SETTINGS_QUERY, {});
  const filled = Object.fromEntries(
    Object.entries(remote).filter(([, v]) => v != null && v !== "" && !(Array.isArray(v) && !v.length)),
  );
  return { ...fallback.settings, ...filled };
}

export async function getPage(slug: string): Promise<PageCopy> {
  const fb = fallback.pages.find((p) => p.slug === slug)!;
  const remote = await load<Partial<PageCopy>>(q.PAGE_QUERY, {}, { slug });
  const filled = Object.fromEntries(Object.entries(remote).filter(([, v]) => v != null && v !== ""));
  return { ...fb, ...filled };
}

export const getCranes = () => load<Crane[]>(q.CRANES_QUERY, fallback.cranes);
export const getServices = () => load<Service[]>(q.SERVICES_QUERY, fallback.services);
export const getIndustries = () => load<Industry[]>(q.INDUSTRIES_QUERY, fallback.industries);
export const getProjects = () => load<Project[]>(q.PROJECTS_QUERY, fallback.projects);
export const getClients = () => load<Client[]>(q.CLIENTS_QUERY, fallback.clients);
export const getTestimonials = () => load<Testimonial[]>(q.TESTIMONIALS_QUERY, fallback.testimonials);
export const getFaqs = () => load<Faq[]>(q.FAQS_QUERY, fallback.faqs);
export const getRoles = () => load<JobRole[]>(q.ROLES_QUERY, fallback.careers.roles);
