// Loads the website's fallback content into Sanity as published documents.
// Run once after the project exists:  npm run seed
// Safe to re-run: it skips any type that already has documents.
import { getCliClient } from "sanity/cli";
import * as content from "../../web/src/content/site";

const client = getCliClient({ apiVersion: "2026-10-01" });
const slug = (current: string) => ({ _type: "slug", current });
const key = (i: number) => `k${i}`;

async function seedType(type: string, docs: Array<Record<string, unknown>>) {
  const existing = await client.fetch<number>(`count(*[_type == $type])`, { type });
  if (existing > 0) {
    console.log(`skip ${type}: ${existing} already present`);
    return;
  }
  const tx = client.transaction();
  for (const doc of docs) tx.create({ _type: type, ...doc });
  await tx.commit();
  console.log(`created ${docs.length} × ${type}`);
}

async function main() {
  // Bracketed placeholders are left out, so the site keeps flagging them until real values are entered.
  const confirmed = Object.fromEntries(
    Object.entries(content.settings).filter(([, v]) => typeof v !== "string" || !v.includes("[")),
  );
  await client.createIfNotExists({
    _id: "siteSettings",
    _type: "siteSettings",
    ...confirmed,
    stats: content.settings.stats.map((s, i) => ({ _type: "stat", _key: key(i), ...s })),
  });
  console.log("site settings ready");

  await seedType(
    "page",
    content.pages.map((p) => ({ ...p, title: p.slug, slug: slug(p.slug) })),
  );
  await seedType(
    "crane",
    content.cranes.map((c) => ({ ...c, slug: slug(c.slug) })),
  );
  await seedType(
    "service",
    content.services.map((s, i) => ({ ...s, slug: slug(s.slug), order: (i + 1) * 10 })),
  );
  await seedType(
    "industry",
    content.industries.map((x, i) => ({ ...x, order: (i + 1) * 10 })),
  );
  await seedType(
    "faq",
    content.faqs.map((x, i) => ({ ...x, order: (i + 1) * 10 })),
  );
  await seedType(
    "jobRole",
    content.careers.roles.map((x, i) => ({ ...x, order: (i + 1) * 10 })),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
