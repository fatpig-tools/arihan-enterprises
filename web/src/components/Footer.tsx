import Link from "next/link";
import { nav } from "@/content/site";
import type { Settings } from "@/content/site";
import { Rich } from "./Rich";
import { Logo } from "./Logo";

export function Footer({ settings }: { settings: Settings }) {
  return (
    <footer className="relative mt-6 border-t border-mist/10 bg-ink text-mist">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-w-md space-y-5">
          <Logo />
          <p className="muted">{settings.footerAbout}</p>
        </div>
        <nav aria-label="Footer">
          <p className="tag mb-4 text-accent-soft">Quick links</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            {[{ href: "/", label: "Home" }, ...nav, { href: "/contact", label: "Contact" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="muted transition-colors hover:text-accent-soft">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="tag mb-4 text-accent-soft">Contact</p>
          <ul className="muted space-y-2.5">
            <li><Rich>{settings.address}</Rich></li>
            <li><Rich>{settings.phone}</Rich></li>
            <li><Rich>{settings.email}</Rich></li>
            <li>{settings.hours}</li>
          </ul>
        </div>
      </div>
      <div className="overflow-hidden" aria-hidden="true">
        <p className="display select-none whitespace-nowrap text-center text-[23vw] leading-[0.74] text-steel">Arihan</p>
      </div>
      <div className="wrap tag flex flex-col gap-3 border-t border-mist/10 py-6 text-mist/50 md:flex-row md:justify-between">
        <p>© 2026 Arihan Enterprises. All rights reserved.</p>
        <p>
          GSTIN: <Rich>{settings.gstin}</Rich> · Privacy Policy · Terms of Hire ·{" "}
          <Link href="/credits" className="hover:text-accent">
            Credits
          </Link>
        </p>
      </div>
    </footer>
  );
}
