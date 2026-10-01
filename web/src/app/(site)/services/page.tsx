import { getPage, getServices, getSettings } from "@/lib/data";
import { pageMeta } from "@/lib/meta";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Rich } from "@/components/Rich";
import { Cta } from "@/components/Cta";
import { LottieIcon, type LottieName } from "@/components/LottieIcon";

export const generateMetadata = () => pageMeta("services", "/services");

const icons: Record<string, LottieName> = {
  "equipment-hire": "hook",
  "contract-work": "report",
  "operators-crew": "agreement",
  maintenance: "gear",
  transport: "mobilise",
  "dedicated-fleet": "assessment",
};

export default async function Services() {
  const [page, services, settings] = await Promise.all([getPage("services"), getServices(), getSettings()]);

  return (
    <>
      <PageHero index="02" label="Services" image="/media/tipper.jpg" headline={page.headline} intro={page.intro} />

      <div className="bg-ink">
        {services.map((service, i) => (
          <section key={service.slug} id={service.slug} className="scroll-mt-20 border-b border-mist/10">
            <div className="wrap grid gap-10 py-20 md:py-28 lg:grid-cols-[8rem_1fr_1fr] lg:gap-16">
              <div className="flex items-start justify-between lg:flex-col lg:justify-start lg:gap-8">
                <span className="display text-7xl text-steel-2 lg:text-8xl">{String(i + 1).padStart(2, "0")}</span>
                <LottieIcon name={icons[service.slug] ?? "gear"} className="size-24" />
              </div>
              <Reveal>
                <h2 className="display h-section max-w-[12ch]">{service.title}</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="lede text-mist/80">
                  <Rich>{service.body}</Rich>
                </p>
                {service.points.length > 0 && (
                  <ul className="mt-8 border-t border-mist/15">
                    {service.points.map((point) => (
                      <li key={point} className="flex gap-4 border-b border-mist/15 py-4 text-mist/75">
                        <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        <span>
                          <Rich>{point}</Rich>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <Cta
        settings={settings}
        heading="Not sure what you need?"
        body="Share your scope and we'll recommend the right equipment mix."
      />
    </>
  );
}
