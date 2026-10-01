"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Muted, looping b-roll that only plays while on screen and stays on its poster under reduced motion. */
export function Loop({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className={cn("size-full object-cover", className)}
    />
  );
}

/** Photo with the navy grade used across the site. */
export function Photo({
  src,
  alt,
  className,
  sizes = "100vw",
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-steel", className)}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover saturate-[0.8]" />
      <div className="absolute inset-0 bg-ink/15 mix-blend-multiply" aria-hidden="true" />
    </div>
  );
}
