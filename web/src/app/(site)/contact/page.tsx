import { getFaqs, getPage, getSettings } from "@/lib/data";
import { pageMeta } from "@/lib/meta";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { QuoteForm } from "@/components/QuoteForm";
import { Faq } from "@/components/Faq";
import { Rich } from "@/components/Rich";

export const generateMetadata = () => pageMeta("contact", "/contact");

export default async function Contact() {
  const [page, settings, faqs] = await Promise.all([getPage("contact"), getSettings(), getFaqs()]);
  const details = [
    ["Head office", settings.address],
    ["Phone", settings.phone],
    ["WhatsApp", settings.whatsapp],
    ["Email", settings.email],
    ["Working hours", settings.hours],
  ];

  return (
    <>
      <PageHero index="09" label="Contact / Get a quote" image="/media/sunset.jpg" headline={page.headline} intro={page.intro} />

      <section className="bg-ink py-20 md:py-28">
        <div className="wrap grid gap-16 lg:grid-cols-[1.6fr_1fr] lg:gap-24">
          <div>
            <h2 className="display h-card mb-10">Quote request</h2>
            <QuoteForm phone={settings.phone} />
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-mist/15 bg-ink-2 p-8">
              <h2 className="display h-card">Contact details</h2>
              <dl className="mt-6 border-t border-mist/15">
                {details.map(([term, detail]) => (
                  <div key={term} className="border-b border-mist/15 py-4">
                    <dt className="tag text-accent-soft">{term}</dt>
                    <dd className="mt-1.5 text-mist/85">
                      <Rich>{detail}</Rich>
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="blueprint tag mt-6 flex h-40 items-center justify-center border border-dashed border-mist/25 text-mist/50">
                <span className="ph">Map of office / yard</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="on-light py-24 md:py-36">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
          <SectionHead light tag="FAQs" title="Before you ask" className="!mb-0" />
          <Faq items={faqs} />
        </div>
      </section>
    </>
  );
}
