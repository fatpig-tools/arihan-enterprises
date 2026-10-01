import * as content from "@/content/site";
import { getPage, getSettings } from "@/lib/data";
import { pageMeta } from "@/lib/meta";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { Rich } from "@/components/Rich";
import { Cta } from "@/components/Cta";

export const generateMetadata = () => pageMeta("about", "/about");

export default async function About() {
  const [page, settings] = await Promise.all([getPage("about"), getSettings()]);
  const { about } = content;
  const details = [
    ["Legal name", settings.legalName],
    ["Registered office", settings.address],
    ["GSTIN", settings.gstin],
    ["MSME / Udyam", settings.udyam],
    ["Operating regions", settings.regions],
  ];

  return (
    <>
      <PageHero index="01" label="About us" image="/media/engineers.jpg" headline={page.headline} intro={page.intro} />

      <section className="on-light py-24 md:py-36">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <SectionHead light tag="Our story" title="Show up on time. Keep the work moving." className="!mb-0" />
          <Reveal stagger className="space-y-7">
            {about.story.map((p) => (
              <p key={p} className="lede">
                <Rich>{p}</Rich>
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-24 md:py-36">
        <div className="wrap">
          <p className="tag mb-8 text-accent-soft">What makes us different</p>
          <Reveal>
            <p className="font-display text-[clamp(1.6rem,2.9vw,2.9rem)] font-medium leading-[1.15] tracking-tight">
              <Rich>{about.different}</Rich>
            </p>
          </Reveal>
          <Reveal stagger className="mt-20 grid gap-px bg-mist/15 md:grid-cols-2">
            {[
              ["Mission", about.mission],
              ["Vision", about.vision],
            ].map(([title, body]) => (
              <div key={title} className="bg-ink p-8 md:p-12">
                <h2 className="display h-card text-accent-soft">{title}</h2>
                <p className="lede mt-5 text-mist/80">{body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="on-light py-24 md:py-36">
        <div className="wrap">
          <SectionHead light tag="Our values" title="What we hold ourselves to" />
          <Reveal stagger className="grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value, i) => (
              <div key={value.title} className="bg-mist p-8">
                <p className="tag text-accent-deep">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="display h-card mt-10">{value.title}</h3>
                <p className="muted mt-3">{value.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-24 md:py-36">
        <div className="wrap grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHead tag="Leadership" title="The people answerable" />
            <Reveal stagger className="space-y-10">
              {about.leadership.map((person) => (
                <div key={person.role} className="border-l-2 border-accent pl-6">
                  <h3 className="display h-card">
                    <Rich>{person.name}</Rich>
                  </h3>
                  <p className="tag mt-2 text-accent-soft">{person.role}</p>
                  <p className="mt-4 text-mist/70">
                    <Rich>{person.bio}</Rich>
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
          <div>
            <SectionHead tag="Company details" title="On record" />
            <Reveal as="dl" stagger className="border-t border-mist/15">
              {details.map(([term, detail]) => (
                <div key={term} className="grid gap-2 border-b border-mist/15 py-5 sm:grid-cols-[12rem_1fr]">
                  <dt className="tag pt-1 text-mist/50">{term}</dt>
                  <dd>
                    <Rich>{detail}</Rich>
                  </dd>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <Cta settings={settings} />
    </>
  );
}
