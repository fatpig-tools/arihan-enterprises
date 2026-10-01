import { getIndustries, getPage, getSettings } from "@/lib/data";
import { pageMeta } from "@/lib/meta";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";

export const generateMetadata = () => pageMeta("industries", "/industries");

export default async function Industries() {
  const [page, industries, settings] = await Promise.all([getPage("industries"), getIndustries(), getSettings()]);

  return (
    <>
      <PageHero index="04" label="Industries" image="/media/bridge-aerial.jpg" headline={page.headline} intro={page.intro} />
      <section className="bg-ink py-20 md:py-28">
        <Reveal stagger className="wrap grid gap-px bg-mist/15 p-px sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, i) => (
            <article
              key={industry.title}
              className="group relative flex min-h-80 flex-col overflow-hidden bg-ink p-8 transition-colors duration-300 hover:bg-steel"
            >
              <p className="tag text-accent-soft">{String(i + 1).padStart(2, "0")}</p>
              <p
                className="display pointer-events-none absolute -bottom-6 -right-2 text-[10rem] leading-none text-ink-2 transition-all duration-500 group-hover:-translate-y-3 group-hover:text-ink/40"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="display h-card relative mt-auto">{industry.title}</h2>
              <p className="relative mt-3 text-mist/70">{industry.summary}</p>
            </article>
          ))}
        </Reveal>
      </section>
      <Cta settings={settings} />
    </>
  );
}
