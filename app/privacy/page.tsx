import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { DocContent } from "@/components/docs/DocContent";
import { getMarkdownContent } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "隐私政策",
  description: "创无限隐私政策，说明我们如何收集、使用和保护用户信息。",
};

export default async function PrivacyPage() {
  const { title, content } = await getMarkdownContent("about", "privacy.md");

  return (
    <>
      <PageHeader title={title} description="我们重视你的隐私，请阅读本政策了解详情。" />

      <section className="section-padding bg-white">
        <Container>
          <div className="mx-auto max-w-4xl">
            <DocContent title="" content={content} />
          </div>
        </Container>
      </section>
    </>
  );
}
