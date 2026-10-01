import * as content from "@/content/site";
import { getFaqs, getPage, getSettings } from "@/lib/data";
import { pageMeta } from "@/lib/meta";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { Process } from "@/components/Process";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";

export const generateMetadata = () => pageMeta("how-we-work", "/how-we-work");

export default async function HowWeWork() {
  const [page, faqs, settings] = await Promise.all([getPage("how-we-work"), getFaqs(), getSettings()]);

  return (
    <>
      <PageHero index="05" label="How we work" image="/media/crawler.jpg" headline={page.headline} intro={page.intro} />
      <Process steps={content.processSteps} heading="Five steps, one *accountable partner*" />

      <section className="on-light py-24 md:py-36">
        <div className="wrap">
          <SectionHead light tag="Contract models" title="Pay for hours, output or a fixed scope" />
          <Reveal stagger className="rule border-t">
            <div className="tag rule muted hidden border-b py-4 md:grid md:grid-cols-[1.1fr_1.2fr_1.2fr] md:gap-8">
              <span>Model</span>
              <span>How it&apos;s billed</span>
              <span>Best for</span>
            </div>
            {content.contractModels.map((row) => (
              <div key={row.model} className="rule grid gap-x-8 gap-y-2 border-b py-7 md:grid-cols-[1.1fr_1.2fr_1.2fr] md:items-baseline">
                <h3 className="display h-card">{row.model}</h3>
                <p className="text-lg">
                  <span className="tag muted mb-1 block md:hidden">How it&apos;s billed</span>
                  {row.billed}
                </p>
                <p className="muted text-lg">
                  <span className="tag mb-1 block md:hidden">Best for</span>
                  {row.bestFor}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-24 md:py-36">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
          <SectionHead tag="FAQs" title="Questions we get asked" className="!mb-0" />
          <Faq items={faqs} />
        </div>
      </section>

      <Cta settings={settings} />
    </>
  );
}
