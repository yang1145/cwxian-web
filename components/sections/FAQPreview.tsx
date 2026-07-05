import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ArrowRight } from "lucide-react";
import type { FAQ } from "@/types";

interface FAQPreviewProps {
  faq: FAQ[];
}

export function FAQPreview({ faq }: FAQPreviewProps) {
  const previewFAQ = faq.slice(0, 5);

  return (
    <section className="section-padding bg-neutral-50">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              常见问题
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              关于创无限服务的最常见问题解答。
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {previewFAQ.map((item) => (
              <div
                key={item.id}
                className="rounded-xl bg-white p-6 shadow-card"
              >
                <h3 className="text-lg font-semibold text-neutral-900">
                  {item.question}
                </h3>
                <p className="mt-2 text-neutral-600">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/docs/faq/"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              查看全部常见问题
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
