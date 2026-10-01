import Image from "next/image";
import { Rich } from "./Rich";
import { Reveal } from "./Reveal";
import { SplitHeading } from "./SplitHeading";

/** Inner-page header: centred title over a wide, rounded photograph. */
export function PageHero({
  label,
  headline,
  intro,
  image,
}: {
  /** Kept for callers; no longer shown. */
  index?: string;
  label: string;
  headline: string;
  intro: string;
  image: string;
}) {
  return (
    <section className="bg-ink pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="wrap flex flex-col items-center text-center">
        <p className="chip mb-7">{label}</p>
        <SplitHeading as="h1" text={headline} delay={0.5} className="h-page max-w-[17ch]" />
        <Reveal delay={0.9}>
          <p className="lede mx-auto mt-8 max-w-2xl text-mist/80">
            <Rich>{intro}</Rich>
          </p>
        </Reveal>
      </div>
      <Reveal delay={0.6} className="wrap mt-14 md:mt-20">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-steel md:aspect-[21/8]">
          <Image src={image} alt="" fill priority sizes="(min-width: 1360px) 1264px, 92vw" className="object-cover saturate-[0.8]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/10" aria-hidden="true" />
        </div>
      </Reveal>
    </section>
  );
}
