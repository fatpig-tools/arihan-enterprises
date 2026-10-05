import * as content from "@/content/site";
import { getPage, getSettings } from "@/lib/data";
import { pageMeta } from "@/lib/meta";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { Rich } from "@/components/Rich";
import { Cta } from "@/components/Cta";
import { Photo } from "@/components/Media";

export const generateMetadata = () => pageMeta("safety", "/safety");

export default async function Safety() {
  const [page, settings] = await Promise.all([getPage("safety"), getSettings()]);
  const { safety } = content;

  return (
    <>
      <PageHero index="07" label="Safety & compliance" image="/media/site-walk.jpg" headline={page.headline} intro={page.intro} />

      <section className="on-light py-24 md:py-32">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <p className="tag mb-6 text-accent-ink">Our rule</p>
            <Reveal>
              <p className="display text-[clamp(2.6rem,5.6vw,5.25rem)]">No deadline is worth an accident.</p>
            </Reveal>
          </div>
          <Photo
            src="/media/engineers.jpg"
            alt="Two site engineers in helmets and high-visibility vests reviewing a drawing"
            sizes="(min-width: 1024px) 40vw, 92vw"
            className="aspect-[4/3]"
          />
        </div>
      </section>

      <section className="bg-ink py-24 md:py-36">
        <div className="wrap">
          <SectionHead tag="Built into every deployment" title="Seven standing checks" />
          <Reveal stagger as="ol" className="grid gap-px bg-mist/15 p-px md:grid-cols-2 lg:grid-cols-3">
            {safety.items.map((item, i) => (
              <li key={item.title} className="flex min-h-64 flex-col bg-ink p-8">
                <span className="display text-6xl text-steel-2">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display h-card mt-auto pt-8">{item.title}</h3>
                <p className="mt-3 text-mist/70">{item.body}</p>
              </li>
            ))}
            <li className="hidden bg-ink lg:col-span-2 lg:block" aria-hidden="true" />
          </Reveal>
        </div>
      </section>

      <section className="on-light py-24 md:py-36">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <SectionHead light tag="Paperwork" title="Documents available on request" className="!mb-0" />
          <Reveal stagger as="ul" className="rule border-t">
            {safety.documents.map((doc) => (
              <li key={doc} className="rule display flex items-center gap-5 border-b py-5 text-2xl">
                <span className="size-1.5 shrink-0 rounded-full bg-accent-ink" aria-hidden="true" />
                <span>
                  <Rich>{doc}</Rich>
                </span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <Cta settings={settings} />
    </>
  );
}
