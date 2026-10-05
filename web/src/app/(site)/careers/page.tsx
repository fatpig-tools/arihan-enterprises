import * as content from "@/content/site";
import { getPage, getRoles, getSettings } from "@/lib/data";
import { pageMeta } from "@/lib/meta";
import { digits } from "@/lib/utils";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { Rich } from "@/components/Rich";

export const generateMetadata = () => pageMeta("careers", "/careers");

export default async function Careers() {
  const [page, roles, settings] = await Promise.all([getPage("careers"), getRoles(), getSettings()]);
  const mail = settings.careersEmail.includes("[") ? "" : settings.careersEmail;
  const wa = digits(settings.whatsapp).replace("+", "");

  return (
    <>
      <PageHero index="08" label="Careers" image="/media/site-walk.jpg" headline={page.headline} intro={page.intro} />

      <section className="on-light py-24 md:py-36">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <SectionHead light tag="Why work with Arihan" title="Paid on time. Machines that run." className="!mb-0" />
          <Reveal stagger as="ul" className="rule border-t">
            {content.careers.why.map((item, i) => (
              <li key={item} className="rule grid grid-cols-[4rem_1fr] items-baseline border-b py-6">
                <span className="display text-4xl text-ink/25">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-xl">
                  <Rich>{item}</Rich>
                </span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-24 md:py-36">
        <div className="wrap">
          <SectionHead tag="Open roles" title="Roles we hire for" />
          <Reveal stagger className="border-t border-mist/15">
            {roles.map((role) => (
              <div
                key={role.title}
                className="group grid gap-x-10 gap-y-2 border-b border-mist/15 py-7 transition-colors hover:bg-ink-2 md:grid-cols-[1fr_1.4fr] md:px-4"
              >
                <h3 className="display h-card transition-colors group-hover:text-accent-soft">{role.title}</h3>
                <p className="text-lg text-mist/70">
                  <Rich>{role.requirement}</Rich>
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="on-light border-t border-ink/10 py-24 md:py-32">
        <div className="wrap">
          <h2 className="display h-section">How to apply</h2>
          <p className="lede mt-6 max-w-2xl">
            Send your CV and licence copy to{" "}
            {mail ? (
              <a href={`mailto:${mail}`} className="font-semibold text-accent-ink underline underline-offset-4">
                {mail}
              </a>
            ) : (
              <Rich>{settings.careersEmail}</Rich>
            )}{" "}
            or WhatsApp{" "}
            {wa ? (
              <a href={`https://wa.me/${wa}`} className="font-semibold text-accent-ink underline underline-offset-4">
                {settings.whatsapp}
              </a>
            ) : (
              <Rich>{settings.whatsapp}</Rich>
            )}
            .
          </p>
        </div>
      </section>
    </>
  );
}
