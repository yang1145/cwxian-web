import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { DocSearchSkeleton } from "@/components/docs/DocSearchSkeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowRight, FileText, Globe, Server, HelpCircle, Layers } from "lucide-react";
import { getDocs, getFAQ } from "@/lib/data";

const DocSearch = dynamic(
  () => import("@/components/docs/DocSearch").then((mod) => mod.DocSearch),
  { loading: () => <DocSearchSkeleton /> }
);

export const metadata: Metadata = {
  title: "帮助中心",
  description: "创无限帮助中心，提供常见问题解答、使用指南、域名解析教程、空间上传教程与子站使用说明。",
};

export default async function DocsPage() {
  const [docs, faq] = await Promise.all([getDocs(), getFAQ()]);

  const iconMap: Record<string, React.ReactNode> = {
    "入门": <HelpCircle className="h-6 w-6" aria-hidden="true" />,
    "域名": <Globe className="h-6 w-6" aria-hidden="true" />,
    "空间": <Server className="h-6 w-6" aria-hidden="true" />,
    "开通": <Layers className="h-6 w-6" aria-hidden="true" />,
  };

  const featuredFAQ = faq.slice(0, 5).map((item) => ({
    id: item.id,
    title: item.question,
    content: <p>{item.answer}</p>,
  }));

  return (
    <>
      <PageHeader
        title="帮助中心"
        description="查找常见问题解答、阅读使用指南，快速解决你在使用创无限服务过程中遇到的问题。"
      >
        <div className="mx-auto max-w-2xl">
          <DocSearch docs={docs} faq={faq} />
        </div>
      </PageHeader>

      <section className="section-padding bg-white">
        <Container>
          <SectionHeader
            title="文档分类"
            description="按主题浏览帮助文档"
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {docs.map((doc) => (
              <Link key={doc.id} href={`/docs/${doc.slug}/`} className="group block">
                <Card className="h-full transition-shadow hover:shadow-elevated">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      {iconMap[doc.category] || <FileText className="h-6 w-6" aria-hidden="true" />}
                    </div>
                    <CardTitle className="mt-4 group-hover:text-primary-600 transition-colors">
                      {doc.title}
                    </CardTitle>
                    <CardDescription>{doc.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-600">
                      阅读文档
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <SectionHeader
            title="热门问题"
            description="最常见的问题与解答"
          />
          <div className="mx-auto max-w-3xl">
            <Accordion items={featuredFAQ} />
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/docs/faq/"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              查看全部常见问题
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
