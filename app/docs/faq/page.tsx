import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { DocSidebar } from "@/components/docs/DocSidebar";
import { Accordion } from "@/components/ui/Accordion";
import { getDocs, getFAQ } from "@/lib/data";

export const metadata: Metadata = {
  title: "常见问题",
  description: "创无限常见问题解答，涵盖服务、申请、审核、域名、空间等各个方面。",
};

export default async function FAQPage() {
  const [docs, faq] = await Promise.all([getDocs(), getFAQ()]);

  const accordionItems = faq.map((item) => ({
    id: item.id,
    title: item.question,
    content: <p>{item.answer}</p>,
  }));

  return (
    <>
      <PageHeader
        title="常见问题"
        description="关于创无限服务、申请条件、审核周期、域名空间使用等最常见问题的解答。"
      />

      <section className="section-padding bg-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <DocSidebar docs={docs} />
              </div>
            </div>
            <div className="lg:col-span-3">
              <Accordion items={accordionItems} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
