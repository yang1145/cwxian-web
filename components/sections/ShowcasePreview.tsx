import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Showcase } from "@/types";

interface ShowcasePreviewProps {
  showcases: Showcase[];
}

export function ShowcasePreview({ showcases }: ShowcasePreviewProps) {
  const previewShowcases = showcases.slice(0, 3);

  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              他们选择了<span className="gradient-text">创无限</span>
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              看看已入驻的创业项目如何通过创无限开启线上第一步。
            </p>
          </div>
          <Link
            href="/showcase/"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            查看全部案例
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {previewShowcases.map((showcase) => (
            <Link
              key={showcase.id}
              href={`/showcase/${showcase.slug}/`}
              className="group relative rounded-2xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-elevated"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-lg font-bold text-primary-600">
                  {showcase.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                    {showcase.name}
                  </h3>
                  <p className="text-sm text-neutral-500">{showcase.category}</p>
                </div>
              </div>

              <p className="mt-4 text-sm text-neutral-600">
                {showcase.tagline}
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm text-primary-600">
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="font-medium">{showcase.domain}</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
