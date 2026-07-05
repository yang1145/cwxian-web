import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { DocContent } from "@/components/docs/DocContent";
import { getMarkdownContent } from "@/lib/markdown";
import { ArrowRight, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "开源与贡献",
  description: "了解创无限的开源理念与志愿者贡献方式。",
};

export default async function OpenSourcePage() {
  const { title, content } = await getMarkdownContent("about", "open-source.md");

  return (
    <>
      <PageHeader title={title} description="开放、协作、共建，与社区一起成长。" />

      <section className="section-padding bg-white">
        <Container>
          <div className="mx-auto max-w-4xl">
            <DocContent title="" content={content} />
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl bg-primary-600 p-8 text-center text-white sm:p-10">
            <Code className="mx-auto h-10 w-10 text-primary-200" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">在 GitHub 上关注我们</h2>
            <p className="mt-3 text-primary-100">
              查看开源项目、提交 Issue、参与代码贡献。
            </p>
            <Link
              href="https://github.com/cwxian"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-primary-700 hover:bg-primary-50"
            >
              前往 GitHub
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
