import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credits | Arihan Enterprises",
  description: "Licences and credits for the 3D model, footage, photographs and fonts used on this site.",
  alternates: { canonical: "/credits" },
};

const groups = [
  {
    title: "3D model",
    items: [
      {
        name: "Japanese Dump Truck",
        by: "Pavel Gorbachev",
        licence: "CC BY 4.0",
        url: "https://sketchfab.com/3d-models/bdd68dcc73be430dbffff61017c95fb8",
        note: "Re-skinned as a clay model with the dump body in signal yellow, and animated.",
      },
    ],
  },
  {
    title: "Footage and photographs",
    items: [
      {
        name: "Stock video and photographs",
        by: "Pexels contributors",
        licence: "Pexels License",
        url: "https://www.pexels.com/license/",
        note: "Individual clips and photographs are listed in /media/CREDITS.md.",
      },
    ],
  },
  {
    title: "Typefaces",
    items: [
      { name: "Panchang and Switzer", by: "Indian Type Foundry", licence: "ITF Free Font License", url: "https://www.fontshare.com/licenses/itf-ffl", note: "Self-hosted." },
    ],
  },
];

export default function Credits() {
  return (
    <section className="bg-ink pb-24 pt-40 md:pt-48">
      <div className="wrap max-w-4xl">
        <p className="chip mb-6">Credits</p>
        <h1 className="display h-page">Credits and licences</h1>
        <div className="mt-16 space-y-14">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="tag mb-5 text-accent">{group.title}</h2>
              <ul className="border-t border-mist/15">
                {group.items.map((item) => (
                  <li key={item.name} className="grid gap-2 border-b border-mist/15 py-6 md:grid-cols-[1fr_1.2fr]">
                    <p>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-accent">
                        {item.name}
                      </a>
                      <span className="block text-sm text-mist/60">
                        {item.by} · {item.licence}
                      </span>
                    </p>
                    <p className="text-mist/70">{item.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
