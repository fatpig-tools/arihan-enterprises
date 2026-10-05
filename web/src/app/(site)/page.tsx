import * as content from "@/content/site";
import { getClients, getCranes, getIndustries, getPage, getServices, getSettings } from "@/lib/data";
import { pageMeta } from "@/lib/meta";
import { HomeHero } from "@/components/home/HomeHero";
import { OneContract } from "@/components/home/OneContract";
import { ServicesBento } from "@/components/home/ServicesBento";
import { WhyBento } from "@/components/home/WhyBento";
import { Sectors } from "@/components/home/Sectors";
import { Stats } from "@/components/Stats";
import { SectionHead } from "@/components/SectionHead";
import { SplitHeading } from "@/components/SplitHeading";
import { FleetLadder } from "@/components/FleetLadder";
import { Process } from "@/components/Process";
import { Cta } from "@/components/Cta";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

export const generateMetadata = () => pageMeta("home", "/");

export default async function Home() {
  const [page, settings, services, cranes, industries, clients] = await Promise.all([
    getPage("home"),
    getSettings(),
    getServices(),
    getCranes(),
    getIndustries(),
    getClients(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.companyName,
    description: settings.footerAbout,
    slogan: settings.tagline,
  };

  // "Who we are" copy: the opening and closing sentences flank the headline claim.
  const sentences = content.whoWeAre.split(/(?<=\.)\s+/);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <HomeHero headline={page.headline} intro={page.intro} />

      {/* Who we are */}
      <section className="on-light rounded-t-[2rem] py-24 md:py-32">
        <div className="wrap">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <p className="chip mb-6">Who we are</p>
              <SplitHeading
                text="We don't just rent machines — we take *responsibility* for getting the work done."
                className="text-[clamp(2.3rem,4.1vw,3.75rem)]"
              />
              <Reveal stagger className="mt-8 space-y-4">
                <p className="lede muted">{sentences[0]}</p>
                <p className="lede muted">{sentences[sentences.length - 1]}</p>
              </Reveal>
              <div className="mt-9">
                <Button href="/about" variant="ink">
                  Our story
                </Button>
              </div>
            </div>
            <div className="card p-6 md:p-9">
              <OneContract />
            </div>
          </div>
          <div className="mt-16 md:mt-20">
            <Stats stats={settings.stats} />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-ink py-24 md:py-32">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead tag="What we do" title="Machines, crew and *execution*" />
            <div className="mb-12 md:mb-16">
              <Button href="/services" variant="outline">
                Explore Services
              </Button>
            </div>
          </div>
          <ServicesBento services={services} />
        </div>
      </section>

      {/* Fleet */}
      <section className="on-light rounded-[2rem] py-24 md:py-32">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead tag="Our fleet" title="Owned cranes, *45 to 100* tonnes" />
            <div className="mb-12 md:mb-16">
              <Button href="/fleet" variant="ink">
                View Our Fleet
              </Button>
            </div>
          </div>
          <FleetLadder cranes={cranes} />
          <p className="muted mt-6 max-w-3xl text-sm">{content.fleetNote}</p>

          <div className="mt-24 md:mt-32">
            <SectionHead centered tag="Why Arihan" title="Why project teams *choose Arihan*" />
            <WhyBento items={content.whyArihan} />
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-ink py-24 md:py-32">
        <div className="wrap">
          <SectionHead tag="Industries" title="Choose your *sector*" />
          <Sectors industries={industries} />
        </div>
      </section>

      <Process steps={content.processSteps} heading="From enquiry to execution in *five steps*" />

      {clients.length > 0 && (
        <section className="bg-ink pb-24">
          <div className="wrap">
            <p className="chip mb-8">Trusted by</p>
            <ul className="flex flex-wrap gap-x-12 gap-y-5">
              {clients.map((client) => (
                <li key={client.name} className="display text-3xl text-mist/70 md:text-4xl">
                  {client.name}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Cta settings={settings} />
    </>
  );
}
