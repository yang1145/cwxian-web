import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Partners } from "@/components/sections/Partners";
import { Heart, Target, Users, Globe, ArrowRight } from "lucide-react";
import { getPartners } from "@/lib/data";

export const metadata: Metadata = {
  title: "关于我们",
  description: "了解创无限的创立背景、使命愿景、运营模式与公益属性。",
};

export default async function AboutPage() {
  const partners = await getPartners();

  return (
    <>
      <PageHeader
        title="关于我们"
        description="让每一个有价值的创业想法，都能以最低成本拥有一个专业的线上起点。"
      />

      <section className="section-padding bg-white">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-2">
              <Card variant="bordered">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <Target className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <CardTitle className="mt-4">我们的使命</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700">
                    消除创业初期的基础设施门槛，让创业者将有限资源投入到产品与市场验证中，而不是被域名、服务器等成本束缚。
                  </p>
                </CardContent>
              </Card>

              <Card variant="bordered">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                    <Heart className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <CardTitle className="mt-4">我们的愿景</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700">
                    成为国内早期创业者首选的免费域名与托管服务平台，连接创业团队、志愿者、投资人与技术社区，共建创业生态。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <SectionHeader
            title="运营模式"
            description="公益属性、透明运营、可持续发展"
          />
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <Users className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-semibold text-neutral-900">公益属性</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  不以盈利为首要目标，优先服务有真实创业需求的团队。
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <Globe className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-semibold text-neutral-900">透明规则</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  审核标准、服务规则公开透明，用户可在申请前充分知情。
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                  <Heart className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-semibold text-neutral-900">社区共建</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  依靠志愿者、合作伙伴与社区力量，共同维护平台发展。
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Partners partners={partners} />

      <section className="section-padding bg-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">想要了解更多？</h2>
            <p className="mt-4 text-neutral-600">
              你可以了解我们的团队、合作伙伴、志愿者计划，或直接与我们联系。
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/about/team/"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                团队介绍
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/about/contact/"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white hover:bg-primary-700"
              >
                联系我们
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
