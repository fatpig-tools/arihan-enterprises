import { getClients, getPage, getProjects, getSettings, getTestimonials } from "@/lib/data";
import { pageMeta } from "@/lib/meta";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { Cta } from "@/components/Cta";

export const generateMetadata = () => pageMeta("projects", "/projects");

export default async function Projects() {
  const [page, projects, clients, testimonials, settings] = await Promise.all([
    getPage("projects"),
    getProjects(),
    getClients(),
    getTestimonials(),
    getSettings(),
  ]);

  return (
    <>
      <PageHero index="06" label="Projects" image="/media/earthwork-aerial.jpg" headline={page.headline} intro={page.intro} />

      <section className="bg-ink py-20 md:py-28">
        <div className="wrap">
          {projects.length > 0 ? (
            <Reveal stagger className="grid gap-6 lg:grid-cols-2">
              {projects.map((project, i) => (
                <article key={project.title} className="border border-mist/15 bg-ink-2 p-8 md:p-10">
                  <p className="tag text-accent-soft">
                    Case {String(i + 1).padStart(2, "0")} · {project.location}
                  </p>
                  <h2 className="display h-card mt-5">{project.title}</h2>
                  <p className="mt-1 text-mist/60">{project.client}</p>
                  <dl className="mt-8 border-t border-mist/15">
                    {[
                      ["Scope", project.scope],
                      ["Equipment deployed", project.equipment],
                      ["Contract model", project.contractModel],
                      ["Duration", project.duration],
                    ].map(([term, detail]) => (
                      <div key={term} className="grid gap-1 border-b border-mist/15 py-4 sm:grid-cols-[11rem_1fr]">
                        <dt className="tag pt-1 text-mist/50">{term}</dt>
                        <dd className="text-mist/85">{detail}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-6 border-l-2 border-accent pl-4 font-display text-2xl font-semibold leading-tight">
                    {project.outcome}
                  </p>
                </article>
              ))}
            </Reveal>
          ) : (
            <Reveal className="relative overflow-hidden border border-mist/15 bg-ink-2 p-10 md:p-16">
              <div className="blueprint absolute inset-0 text-mist opacity-60" aria-hidden="true" />
              <div className="relative max-w-2xl">
                <p className="tag text-accent-soft">Case studies</p>
                <h2 className="display h-section mt-5">References on request</h2>
                <p className="lede mt-6 text-mist/75">
                  We are documenting our project record for publication. Until then, ask us for references relevant to
                  your scope and sector, and we will share them directly.
                </p>
                <div className="mt-9">
                  <Button href="/contact">Ask for references</Button>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {clients.length > 0 && (
        <section className="on-light py-24">
          <div className="wrap">
            <SectionHead light tag="Clients" title="Clients we have worked with" />
            <ul className="flex flex-wrap gap-x-12 gap-y-5">
              {clients.map((client) => (
                <li key={client.name} className="display text-3xl text-ink/70 md:text-5xl">
                  {client.name}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="bg-ink py-24 md:py-36">
          <div className="wrap grid gap-12 lg:grid-cols-2">
            {testimonials.map((t) => (
              <figure key={t.quote} className="border-l-2 border-accent pl-8">
                <blockquote className="font-display text-3xl font-medium leading-tight md:text-4xl">
                  “{t.quote}”
                </blockquote>
                <figcaption className="tag mt-6 text-mist/60">
                  {t.name}, {t.designation}, {t.company}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <Cta settings={settings} />
    </>
  );
}
