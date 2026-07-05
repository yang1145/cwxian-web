import { Container } from "@/components/layout/Container";
import { formatNumber } from "@/lib/utils";
import type { Stat } from "@/types";

interface StatsProps {
  stats: Stat[];
}

export function Stats({ stats }: StatsProps) {
  return (
    <section className="border-y border-neutral-200 bg-white py-12">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-3xl font-bold tracking-tight text-primary-600 md:text-4xl">
                {formatNumber(stat.value)}
                <span className="text-accent-500">{stat.suffix}</span>
              </div>
              <div className="mt-1 text-sm font-medium text-neutral-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
