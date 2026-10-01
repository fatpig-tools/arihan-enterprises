import { defineQuery } from "next-sanity";

export const SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  companyName, tagline, phone, whatsapp, email, careersEmail, address, hours,
  gstin, udyam, legalName, regions, footerAbout,
  stats[]{value, label}
}`);

export const PAGE_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  "slug": slug.current, headline, intro, seoTitle, seoDescription
}`);

export const CRANES_QUERY = defineQuery(`*[_type == "crane"] | order(capacityTonnes asc){
  "slug": slug.current, name, kind, type, capacityTonnes, regNo, bestFor
}`);

export const SERVICES_QUERY = defineQuery(`*[_type == "service"] | order(order asc){
  "slug": slug.current, title, short, summary, body, "points": coalesce(points, [])
}`);

export const INDUSTRIES_QUERY = defineQuery(`*[_type == "industry"] | order(order asc){title, summary}`);

export const PROJECTS_QUERY = defineQuery(`*[_type == "project"] | order(_createdAt desc){
  title, client, location, scope, equipment, contractModel, duration, outcome
}`);

export const CLIENTS_QUERY = defineQuery(`*[_type == "client" && approvedForPublicUse == true] | order(name asc){name}`);

export const TESTIMONIALS_QUERY = defineQuery(`*[_type == "testimonial"]{quote, name, designation, company}`);

export const FAQS_QUERY = defineQuery(`*[_type == "faq"] | order(order asc){question, answer}`);

export const ROLES_QUERY = defineQuery(`*[_type == "jobRole"] | order(order asc){title, requirement}`);
