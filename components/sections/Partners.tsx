import { Container } from "@/components/layout/Container";
import type { Partner } from "@/types";

interface PartnersProps {
  partners: Partner[];
}

export function Partners({ partners }: PartnersProps) {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            合作伙伴与社区
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            感谢以下伙伴对创无限的支持。
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex h-16 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 px-8 text-lg font-semibold text-neutral-600"
            >
              {partner.name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
