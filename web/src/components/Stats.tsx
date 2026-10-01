import type { Stat } from "@/content/site";
import { Counter } from "./Counter";
import { Reveal } from "./Reveal";

/** Key figures as a row of tiles. */
export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <Reveal stagger as="dl" className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="card flex flex-col justify-between gap-8 p-6 md:p-7">
          <dt className="text-sm opacity-60">{stat.label}</dt>
          <dd className="display text-[clamp(2.2rem,4vw,3.5rem)]">
            <Counter value={stat.value} />
          </dd>
        </div>
      ))}
    </Reveal>
  );
}
