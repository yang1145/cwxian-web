import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SubSiteLink } from "@/components/shared/SubSiteLink";
import { Alert } from "@/components/ui/Alert";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowLeft, ArrowRight, Server, AlertTriangle, Check, X } from "lucide-react";
import { getGettingStarted, getFAQ, getEligibility } from "@/lib/data";

export const metadata: Metadata = {
  title: "空间开通指引",
  description: "详细了解如何在创无限申请免费托管空间，包括使用限制、上传方式与审核流程。",
};

export default async function HostingGuidePage() {
  const [gettingStartedRaw, eligibilityRaw, faq] = await Promise.all([
    getGettingStarted(),
    getEligibility(),
    getFAQ(),
  ]);
  const gettingStarted = gettingStartedRaw as {
    hostingSteps: { step: number; title: string; description: string }[];
    preparation: string[];
    tips: string[];
  };
  const eligibility = eligibilityRaw as {
    hostingRules: {
      allowed: string[];
      forbidden: string[];
    };
  };

  const hostingFAQ = faq.filter(
    (item) =>
      item.category === "hosting" ||
      item.question.includes("空间") ||
      item.question.includes("托管") ||
      item.question.includes("上传")
  );

  const accordionItems = hostingFAQ.slice(0, 5).map((item) => ({
    id: item.id,
    title: item.question,
    content: <p>{item.answer}</p>,
  }));

  return (
    <>
      <PageHeader
        title="空间开通指引"
        description="按照以下步骤，在充分了解规则后前往 user.cwxian.com 开通你的免费托管空间。"
      />

      <section className="section-padding bg-white">
        <Container>
          <div className="mx-auto max-w-4xl">
            <Alert variant="warning" className="mb-10">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <p>
                本页仅展示空间服务规则与说明。实际开通请前往{" "}
                <a
                  href="https://user.cwxian.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline"
                >
                  user.cwxian.com
                </a>
                完成。
              </p>
            </Alert>

            <SectionHeader
              title="开通流程"
              description="从了解规则到网站上线，只需 5 个步骤"
              centered={false}
              className="mb-8"
            />

            <div className="relative">
              <div className="absolute left-5 top-0 h-full w-0.5 bg-neutral-200 md:left-6" aria-hidden="true" />
              <ol className="space-y-8">
                {gettingStarted.hostingSteps.map((step) => (
                  <li key={step.step} className="relative flex gap-6">
                    <div className="z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent-600 text-sm font-bold text-white md:h-12 md:w-12">
                      {step.step}
                    </div>
                    <div className="flex-1 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                      <h3 className="text-lg font-semibold text-neutral-900">{step.title}</h3>
                      <p className="mt-1 text-neutral-600">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              title="空间使用规范"
              description="请在申请前确认你的项目用途符合以下规范"
            />

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-neutral-900">
                  <Check className="h-5 w-5 text-green-500" aria-hidden="true" />
                  允许用途
                </h3>
                <ul className="mt-4 space-y-2 text-neutral-700">
                  {eligibility.hostingRules.allowed.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-red-900">
                  <X className="h-5 w-5" aria-hidden="true" />
                  禁止用途
                </h3>
                <ul className="mt-4 space-y-2 text-red-800">
                  {eligibility.hostingRules.forbidden.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeader title="常见问题" description="空间开通与使用过程中可能遇到的问题" />
            <Accordion items={accordionItems} />
          </div>
        </Container>
      </section>

      <section className="section-padding bg-accent-600">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Server className="mx-auto h-12 w-12 text-white/80" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">准备好开通空间了吗？</h2>
            <p className="mt-3 text-cyan-100">确认已了解使用规范与限制后，前往 user.cwxian.com 提交申请。</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <SubSiteLink
                href="https://user.cwxian.com"
                size="lg"
                className="bg-white text-accent-700 hover:bg-cyan-50"
                showIcon
              >
                前往开通空间
              </SubSiteLink>
              <Link
                href="/get-started/domain/"
                className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/50 px-6 py-3 text-sm font-medium text-white hover:bg-accent-700"
              >
                查看域名开通指引
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <Link
              href="/get-started/"
              className="mt-6 inline-flex items-center gap-2 text-sm text-cyan-200 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              返回开通指引
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
