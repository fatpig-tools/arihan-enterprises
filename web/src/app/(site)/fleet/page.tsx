import * as content from "@/content/site";
import { getCranes, getPage, getSettings } from "@/lib/data";
import { pageMeta } from "@/lib/meta";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { FleetLadder } from "@/components/FleetLadder";
import { RangeDiagram } from "@/components/RangeDiagram";
import { Reveal } from "@/components/Reveal";
import { Rich } from "@/components/Rich";
import { Cta } from "@/components/Cta";

export const generateMetadata = () => pageMeta("fleet", "/fleet");

export default async function Fleet() {
  const [page, cranes, settings] = await Promise.all([getPage("fleet"), getCranes(), getSettings()]);

  return (
    <>
      <PageHero index="03" label="Our fleet" image="/media/booms-sky.jpg" headline={page.headline} intro={page.intro} />


      <section className="on-light rounded-[2rem] py-24 md:py-32">
        <div className="wrap">
          <SectionHead tag="Capacity" title="The crane fleet, *to scale*" />
          <FleetLadder cranes={cranes} />
          <p className="muted mt-6 max-w-3xl text-sm">{content.fleetNote}</p>
        </div>
      </section>

      <section className="bg-ink py-24 md:py-36">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead tag="Reading a rating" title="Capacity depends on radius" />
            <p className="lede max-w-xl text-mist/75">{content.fleetNote}</p>
          </div>
          <div className="card p-6 text-mist md:p-10">
            <RangeDiagram />
            <p className="tag mt-4 text-mist/45">Schematic only — not a load chart</p>
          </div>
        </div>
      </section>

      <section className="on-light py-24 md:py-36">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <SectionHead light tag="Hire terms" title="Hire terms at a glance" className="!mb-0" />
          <Reveal as="dl" stagger className="rule border-t">
            {content.hireTerms.map((row) => (
              <div key={row.term} className="rule grid gap-2 border-b py-6 sm:grid-cols-[13rem_1fr]">
                <dt className="display text-xl">{row.term}</dt>
                <dd className="muted text-lg">
                  <Rich>{row.detail}</Rich>
                </dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <Cta
        settings={settings}
        heading="Need a specific machine or model?"
        body="Tell us the lift, the site and the dates, and we'll confirm availability."
      />
    </>
  );
}
