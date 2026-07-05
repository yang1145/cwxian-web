import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Checklist } from "@/components/get-started/Checklist";
import { SubSiteCTA } from "@/components/get-started/SubSiteCTA";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowRight, Clock, FileText, Globe, Server, Shield, AlertTriangle } from "lucide-react";
import { getGettingStarted, getFAQ } from "@/lib/data";

export const metadata: Metadata = {
  title: "开通指引",
  description: "在前往子站注册域名或开通空间前，请先了解申请条件、使用限制与完整审核标准。",
};

export default async function GetStartedPage() {
  const [gettingStartedRaw, faq] = await Promise.all([
    getGettingStarted(),
    getFAQ(),
  ]);
  const gettingStarted = gettingStartedRaw as {
    prerequisites: string[];
    preparation: string[];
    domainSteps: { step: number; title: string; description: string }[];
    hostingSteps: { step: number; title: string; description: string }[];
    tips: string[];
  };

  const accordionItems = faq.slice(0, 5).map((item) => ({
    id: item.id,
    title: item.question,
    content: <p>{item.answer}</p>,
  }));

  return (
    <>
      <PageHeader
        title="开通指引"
        description="开通前请先了解规则。子站仅提供基础注册/开通功能，所有规则与说明均已在主站完整展示。"
      />

      <section className="section-padding bg-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SectionHeader
                title="开通前必读"
                description="在跳转子站之前，请确认你已了解以下关键信息"
                centered={false}
                className="mb-8"
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <Card variant="bordered">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                      <Shield className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <CardTitle className="mt-3">申请条件</CardTitle>
                    <CardDescription>项目需真实、合法、具有创业或创新属性</CardDescription>
                  </CardHeader>
                </Card>

                <Card variant="bordered">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                      <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <CardTitle className="mt-3">使用限制</CardTitle>
                    <CardDescription>禁止违法违规、侵权、资源滥用等用途</CardDescription>
                  </CardHeader>
                </Card>

                <Card variant="bordered">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
                      <Clock className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <CardTitle className="mt-3">审核周期</CardTitle>
                    <CardDescription>提交后 1-3 个工作日内邮件通知结果</CardDescription>
                  </CardHeader>
                </Card>

                <Card variant="bordered">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                      <FileText className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <CardTitle className="mt-3">所需材料</CardTitle>
                    <CardDescription>项目名称、简介、联系方式、期望域名</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-semibold text-neutral-900">准备材料清单</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {gettingStarted.preparation.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-neutral-700">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-medium text-primary-700">
                        {index + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Checklist items={gettingStarted.prerequisites} />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <SectionHeader
            title="选择开通服务"
            description="根据你的需求，选择域名服务或空间服务，阅读分步指引后前往子站完成操作。"
          />

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <Globe className="h-6 w-6" aria-hidden="true" />
                </div>
                <CardTitle className="mt-4">域名开通指引</CardTitle>
                <CardDescription>了解如何申请 *.cwxian.com 二级域名并完成解析配置。</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {gettingStarted.domainSteps.slice(0, 3).map((step) => (
                    <li key={step.step} className="flex items-start gap-3 text-sm text-neutral-600">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-medium text-primary-700">
                        {step.step}
                      </span>
                      <span>
                        <span className="font-medium text-neutral-900">{step.title}</span>
                        <span className="block">{step.description}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <Link
                  href="/get-started/domain/"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  查看完整指引
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                  <Server className="h-6 w-6" aria-hidden="true" />
                </div>
                <CardTitle className="mt-4">空间开通指引</CardTitle>
                <CardDescription>了解如何开通免费托管空间并上传或同步网站文件。</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {gettingStarted.hostingSteps.slice(0, 3).map((step) => (
                    <li key={step.step} className="flex items-start gap-3 text-sm text-neutral-600">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-100 text-xs font-medium text-accent-700">
                        {step.step}
                      </span>
                      <span>
                        <span className="font-medium text-neutral-900">{step.title}</span>
                        <span className="block">{step.description}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <Link
                  href="/get-started/hosting/"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-600 hover:text-accent-700"
                >
                  查看完整指引
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/get-started/eligibility/"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              查看完整审核标准
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <SectionHeader title="开通小贴士" description="这些建议可以帮助你更快通过审核" />
          <div className="mx-auto max-w-3xl">
            <ul className="space-y-4">
              {gettingStarted.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3 text-neutral-700">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-medium text-amber-700">
                    !
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <SectionHeader title="常见问题" description="开通前你可能还想知道" />
          <div className="mx-auto max-w-3xl">
            <Accordion items={accordionItems} />
          </div>
        </Container>
      </section>

      <SubSiteCTA />
    </>
  );
}
