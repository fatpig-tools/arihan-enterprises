import Image from "next/image";
import type { Settings } from "@/content/site";
import { digits } from "@/lib/utils";
import { Button } from "./Button";
import { Rich } from "./Rich";
import { SplitHeading } from "./SplitHeading";

export function Cta({
  settings,
  heading = "Have a project *starting soon?*",
  body = "Tell us the work, site location and duration. We'll send a quote with equipment and rates within [24 hours].",
}: {
  settings: Settings;
  heading?: string;
  body?: string;
}) {
  const tel = digits(settings.phone);
  const wa = digits(settings.whatsapp).replace("+", "");
  return (
    <section className="bg-ink py-6 md:py-10">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-ink-2 text-mist">
          <Image src="/media/sunset.jpg" alt="" fill sizes="(min-width: 1360px) 1264px, 92vw" className="object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" aria-hidden="true" />
          <div className="relative flex flex-col items-center px-6 py-24 text-center md:py-36">
            <p className="chip mb-7">Get a quote</p>
            <SplitHeading text={heading} className="h-page max-w-[15ch]" />
            <p className="lede mt-7 max-w-xl text-mist/80">
              <Rich>{body}</Rich>
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact">Request a Quote</Button>
              {tel ? (
                <Button href={`tel:${tel}`} variant="outline" external>
                  Call {settings.phone}
                </Button>
              ) : (
                <p className="text-sm text-mist/70">
                  or call <Rich>{settings.phone}</Rich>
                </p>
              )}
              {wa && (
                <Button href={`https://wa.me/${wa}`} variant="outline" external>
                  WhatsApp Us
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
