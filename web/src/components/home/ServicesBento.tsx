import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/site";
import { cn } from "@/lib/utils";
import { Loop } from "@/components/Media";
import { LottieIcon, type LottieName } from "@/components/LottieIcon";
import { Reveal } from "@/components/Reveal";

type Tile = { span: string; video?: string; image?: string; icon?: LottieName };

// Tile size and media per service; unknown services fall back to an icon tile.
const tiles: Record<string, Tile> = {
  "equipment-hire": { span: "lg:col-span-3 min-h-[26rem]", video: "/media/lifting.mp4", image: "/media/lifting-poster.jpg" },
  "contract-work": { span: "lg:col-span-3 min-h-[26rem]", video: "/media/earthwork.mp4", image: "/media/earthwork-poster.jpg" },
  "operators-crew": { span: "lg:col-span-2 min-h-[20rem]", image: "/media/engineers.jpg" },
  maintenance: { span: "lg:col-span-2 min-h-[20rem]", icon: "gear" },
  transport: { span: "lg:col-span-2 min-h-[20rem]", image: "/media/tipper.jpg" },
  "dedicated-fleet": { span: "lg:col-span-6 min-h-[16rem]", image: "/media/earthwork-aerial.jpg" },
};

/** Services as a bento grid of footage, photo and icon tiles. */
export function ServicesBento({ services }: { services: Service[] }) {
  return (
    <Reveal stagger className="grid gap-3 md:gap-4 lg:grid-cols-6">
      {services.map((service) => {
        const tile = tiles[service.slug] ?? { span: "lg:col-span-2 min-h-[20rem]", icon: "gear" as const };
        const media = Boolean(tile.video || tile.image);
        return (
          <Link
            key={service.slug}
            href={`/services#${service.slug}`}
            className={cn("card group relative flex flex-col justify-end overflow-hidden p-6 md:p-8", tile.span)}
          >
            {media && (
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105" aria-hidden="true">
                {tile.video ? (
                  <Loop src={tile.video} poster={tile.image!} />
                ) : (
                  <Image src={tile.image!} alt="" fill sizes="(min-width: 1024px) 50vw, 92vw" className="object-cover saturate-[0.8]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
              </div>
            )}
            {tile.icon && <LottieIcon name={tile.icon} className="absolute left-6 top-6 size-20 md:left-8 md:top-8" />}
            <span className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-mist/12 backdrop-blur transition-all duration-300 group-hover:rotate-45 group-hover:bg-accent group-hover:text-ink">
              <ArrowUpRight aria-hidden="true" className="size-5" />
            </span>
            <div className="relative">
              <h3 className="display h-card">{service.short}</h3>
              <p className="mt-2 max-w-md text-mist/75">{service.summary}</p>
            </div>
          </Link>
        );
      })}
    </Reveal>
  );
}
