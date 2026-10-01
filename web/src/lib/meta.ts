import type { Metadata } from "next";
import { getPage } from "./data";

/** Page metadata from the CMS page record (meta title and description from the content brief). */
export async function pageMeta(slug: string, path: string): Promise<Metadata> {
  const page = await getPage(slug);
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: { canonical: path },
    openGraph: { title: page.seoTitle, description: page.seoDescription, url: path },
  };
}
