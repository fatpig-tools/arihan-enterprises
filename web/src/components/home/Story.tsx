"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, reducedMotion } from "@/lib/gsap";
import { Button } from "@/components/Button";

// Timings of /media/story/story.mp4 (see CREDITS.md for how the film is made).
// Each chapter is on screen while the camera rests on its scene.
const DURATION = 18.75;
const chapters = [
  { start: 3.0, end: 4.79, label: "01 · Enquiry", title: "Tell us the job.", body: "Scope, site and dates. A call, a WhatsApp message or the form is enough to start.", still: 1, alt: "Model of an empty plot being marked out beside a site office" },
  { start: 6.42, end: 8.29, label: "02 · Mobilisation", title: "The machines come to you.", body: "Trailers bring the equipment to your gate, with the papers for every unit.", still: 2, alt: "Model of a low-bed trailer delivering an excavator to a site gate" },
  { start: 9.92, end: 11.46, label: "03 · Crew", title: "Operators come with them.", body: "Licensed operators, riggers and a supervisor who answers to your site engineer.", still: 3, alt: "Model of a truck crane with an operator, a rigger and a supervisor" },
  { start: 13.08, end: 14.63, label: "04 · Earthwork", title: "The earth gets moved.", body: "Billed by the hour, the month or the cubic metre. You choose what suits the job.", still: 4, alt: "Model of an excavator loading a tipper truck in a cutting" },
  { start: 16.42, end: 18.75, label: "05 · Lifting", title: "And the steel goes up.", body: "Cranes from 45 to 100 tonnes, with a log sheet signed on site at the end of every shift.", still: 5, alt: "Model of a crawler crane lifting a steel beam into place" },
];
const HERO_END = 1.375;
const FADE = 0.55; // seconds of film over which copy fades in and out

const clamp01 = gsap.utils.clamp(0, 1);

/**
 * Scroll story. The stage is pinned and scrolling plays an animated film of a
 * job from enquiry to lift: the camera flies between five model scenes while
 * the chapter copy changes beside it.
 */
export function Story({ headline, intro }: { headline: string; intro: string }) {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  const texts = useRef<Array<HTMLDivElement | null>>([]);
  const rail = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const film = video.current;
      if (!film || reducedMotion()) return;

      let target = 0;
      let current = 0;

      const show = (el: HTMLElement | null, amount: number, drift: number) => {
        if (!el) return;
        el.style.opacity = String(amount);
        el.style.transform = `translate3d(0, ${drift}px, 0)`;
        el.style.visibility = amount > 0.02 ? "visible" : "hidden";
      };

      const layout = (t: number) => {
        const out = clamp01((t - HERO_END) / FADE);
        show(hero.current, 1 - out, out * -40);
        chapters.forEach((chapter, i) => {
          const fadeIn = clamp01((t - (chapter.start - FADE)) / FADE);
          const fadeOut = i === chapters.length - 1 ? 0 : clamp01((t - chapter.end) / FADE);
          show(texts.current[i], fadeIn * (1 - fadeOut), (1 - fadeIn) * 40 - fadeOut * 40);
        });
        if (rail.current) rail.current.style.transform = `scaleY(${t / DURATION})`;
      };

      // Ease the film toward the scroll position so scrubbing stays smooth.
      const tick = () => {
        current += (target - current) * 0.16;
        if (Math.abs(target - current) < 0.004) current = target;
        if (film.readyState >= 2 && !film.seeking && Math.abs(film.currentTime - current) > 0.02) {
          film.currentTime = current;
        }
        layout(current);
      };

      layout(0);
      film.pause();
      gsap.ticker.add(tick);
      const trigger = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          target = self.progress * (DURATION - 0.05);
        },
      });
      return () => {
        gsap.ticker.remove(tick);
        trigger.kill();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[720svh] bg-[#e5e5e5] text-ink motion-reduce:h-auto">
      <div className="sticky top-0 flex h-svh min-h-[640px] flex-col overflow-hidden motion-reduce:relative motion-reduce:h-auto motion-reduce:overflow-visible lg:block">
        {/* Film */}
        <div
          className="relative mt-24 aspect-[4/3] w-full shrink-0 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] motion-reduce:hidden lg:absolute lg:inset-0 lg:mt-0 lg:aspect-auto lg:[mask-image:none]"
          aria-hidden="true"
        >
          <video
            ref={video}
            src="/media/story/story.mp4"
            poster="/media/story/story-poster.jpg"
            muted
            playsInline
            preload="auto"
            className="size-full object-cover object-[70%_50%] lg:object-center"
          />
          {/* Keeps the copy clear of whatever passes behind it */}
          <div className="absolute inset-0 hidden bg-gradient-to-r from-[#e5e5e5] via-[#e5e5e5]/75 via-25% to-transparent to-50% lg:block" />
        </div>

        {/* Copy */}
        <div className="wrap relative flex-1 motion-reduce:py-32 lg:h-full">
          <div
            ref={hero}
            className="absolute inset-x-[clamp(1.25rem,4vw,3rem)] top-0 flex flex-col motion-reduce:static lg:top-1/2 lg:-translate-y-1/2"
          >
            <p className="chip mb-5 w-fit lg:mb-7">Machinery hire · Contract execution</p>
            <h1 className="display max-w-[9em] text-[clamp(2.3rem,min(5.2vw,9.5svh),5rem)]">
              Heavy machinery on <span className="em">hire.</span> Project work on <span className="em">contract.</span>
            </h1>
            <p className="sr-only">{headline}</p>
            <p className="lede muted mt-5 hidden max-w-md sm:block lg:mt-7">{intro}</p>
            <div className="mt-6 flex flex-wrap gap-3 lg:mt-9">
              <Button href="/contact">Get a Quote</Button>
              <Button href="/fleet" variant="ink">
                View Our Fleet
              </Button>
            </div>
            <p className="tag muted mt-8 motion-reduce:hidden lg:mt-12">Scroll to follow a job ↓</p>
          </div>

          {chapters.map((chapter, i) => (
            <div
              key={chapter.label}
              ref={(el) => {
                texts.current[i] = el;
              }}
              className="invisible absolute inset-x-[clamp(1.25rem,4vw,3rem)] top-0 max-w-md opacity-0 motion-reduce:visible motion-reduce:static motion-reduce:mt-20 motion-reduce:opacity-100 lg:top-1/2 lg:-translate-y-1/2"
            >
              <div className="relative mb-8 hidden aspect-video overflow-hidden rounded-[var(--radius-card)] motion-reduce:block">
                <Image src={`/media/story/${chapter.still}.jpg`} alt={chapter.alt} fill sizes="92vw" className="object-cover" />
              </div>
              <p className="chip mb-5 lg:mb-6">{chapter.label}</p>
              <h2 className="display text-[clamp(2.3rem,4.6vw,4.4rem)]">{chapter.title}</h2>
              <p className="lede muted mt-4 lg:mt-5">{chapter.body}</p>
            </div>
          ))}
        </div>

        {/* Progress rail */}
        <div
          className="absolute bottom-[18%] right-[clamp(1.25rem,3vw,2.5rem)] top-[18%] hidden w-px bg-ink/15 motion-reduce:hidden md:block"
          aria-hidden="true"
        >
          <div ref={rail} className="size-full origin-top scale-y-0 bg-accent" />
        </div>
      </div>
    </section>
  );
}
