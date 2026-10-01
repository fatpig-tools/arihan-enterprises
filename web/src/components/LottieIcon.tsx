"use client";
import { useEffect, useRef, useState } from "react";
import { LottieLight, type LottieHandle } from "lottie-react";
import enquiry from "@/lottie/enquiry.json";
import assessment from "@/lottie/assessment.json";
import agreement from "@/lottie/agreement.json";
import mobilise from "@/lottie/mobilise.json";
import report from "@/lottie/report.json";
import gear from "@/lottie/gear.json";
import hook from "@/lottie/hook.json";
import success from "@/lottie/success.json";
import shield from "@/lottie/shield.json";

const files = { enquiry, assessment, agreement, mobilise, report, gear, hook, success, shield };
export type LottieName = keyof typeof files;

/** Decorative Lottie icon. Plays only while on screen; holds a still frame under reduced motion. */
export function LottieIcon({ name, className, loop = true }: { name: LottieName; className?: string; loop?: boolean }) {
  const lottie = useRef<LottieHandle>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!wrap.current) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!ready || !lottie.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lottie.current.seek(loop ? 40 : 59);
      lottie.current.pause();
    } else if (inView) lottie.current.play();
    else lottie.current.pause();
  }, [ready, inView, loop]);

  return (
    <div ref={wrap} className={className} aria-hidden="true">
      <LottieLight
        lottieRef={lottie}
        src={files[name]}
        loop={loop}
        autoplay={false}
        className="size-full"
        subscriptions={{ ready: () => setReady(true) }}
      />
    </div>
  );
}
