import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { getSettings } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <SmoothScroll />
      <Nav phone={settings.phone} email={settings.email} />
      <main id="main">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
