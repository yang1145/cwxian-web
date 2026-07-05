import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { DocContent } from "@/components/docs/DocContent";
import { getMarkdownContent } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "用户协议",
  description: "创无限用户协议，明确平台与用户之间的权利义务。",
};

export default async function TermsPage() {
  const { title, content } = await getMarkdownContent("about", "terms.md");

  return (
    <>
      <PageHeader title={title} description="请在使用创无限服务前仔细阅读本协议。" />

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
