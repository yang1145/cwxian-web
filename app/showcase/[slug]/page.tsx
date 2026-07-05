import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { SubSiteLink } from "@/components/shared/SubSiteLink";
import { ArrowLeft, Globe, Quote } from "lucide-react";
import { getShowcases, getShowcaseBySlug } from "@/lib/data";

export async function generateStaticParams() {
  const showcases = await getShowcases();
  return showcases.map((showcase) => ({
    slug: showcase.slug,
  }));
}

interface ShowcaseDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ShowcaseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const showcase = await getShowcaseBySlug(slug);

  if (!showcase) {
    return {
      title: "案例未找到",
    };
  }

  return {
    title: showcase.name,
    description: showcase.tagline,
  };
}

export default async function ShowcaseDetailPage({ params }: ShowcaseDetailPageProps) {
  const { slug } = await params;
  const showcase = await getShowcaseBySlug(slug);

  if (!showcase) {
    notFound();
  }

  return (
    <>
      <section className="section-padding bg-neutral-50">
        <Container>
          <Breadcrumb
            items={[
              { label: "成功案例", href: "/showcase/" },
              { label: showcase.name },
            ]}
          />

          <div className="mt-8">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-600 text-3xl font-bold text-white">
                {showcase.name.charAt(0)}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                    {showcase.name}
                  </h1>
                  <Badge variant="primary">{showcase.category}</Badge>
                  <Badge variant="outline">{showcase.stage}</Badge>
                </div>
                <p className="mt-2 text-lg text-neutral-600">{showcase.tagline}</p>
                <div className="mt-3 flex items-center gap-2 text-primary-600">
                  <Globe className="h-4 w-4" aria-hidden="true" />
                  <span className="font-medium">{showcase.domain}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">项目介绍</h2>
                  <p className="mt-4 text-lg leading-relaxed text-neutral-700">
                    {showcase.description}
                  </p>
                </div>

                {showcase.story ? (
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900">创业故事</h2>
                    <p className="mt-4 leading-relaxed text-neutral-700">{showcase.story}</p>
                  </div>
                ) : null}

                {showcase.testimonial ? (
                  <Card className="border-primary-100 bg-primary-50">
                    <CardContent className="pt-6">
                      <Quote className="h-8 w-8 text-primary-300" aria-hidden="true" />
                      <blockquote className="mt-4 text-lg font-medium text-primary-900">
                        {showcase.testimonial}
                      </blockquote>
                      <p className="mt-4 text-sm text-primary-700">— {showcase.name} 团队</p>
                    </CardContent>
                  </Card>
                ) : null}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <h3 className="font-semibold text-neutral-900">项目信息</h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-neutral-500">所属领域</dt>
                      <dd className="mt-1 font-medium text-neutral-900">{showcase.category}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-500">项目阶段</dt>
                      <dd className="mt-1 font-medium text-neutral-900">{showcase.stage}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-500">项目域名</dt>
                      <dd className="mt-1 font-medium text-primary-600">{showcase.domain}</dd>
                    </div>
                  </dl>
                  <div className="pt-4">
                    <SubSiteLink
                      href={`https://${showcase.domain}`}
                      size="md"
                      className="w-full"
                      showIcon
                    >
                      访问项目
                    </SubSiteLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-primary-600 p-8 sm:flex-row sm:p-10">
            <div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">也想让你的项目被看见？</h2>
              <p className="mt-2 text-primary-100">开通创无限服务，开启你的线上第一步。</p>
            </div>
            <Link
              href="/get-started/"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-primary-700 hover:bg-primary-50"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              查看开通指引
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
