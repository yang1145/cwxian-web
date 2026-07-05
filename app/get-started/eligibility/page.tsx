import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SubSiteLink } from "@/components/shared/SubSiteLink";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Check, X, Star, ArrowRight, Mail } from "lucide-react";
import { getEligibility } from "@/lib/data";

export const metadata: Metadata = {
  title: "审核标准",
  description: "创无限免费二级域名与托管空间的完整审核标准，帮助你在申请前自我评估。",
};

export default async function EligibilityPage() {
  const eligibilityRaw = await getEligibility();
  const eligibility = eligibilityRaw as {
    scope: string;
    passConditions: string[];
    priorityFields: string[];
    rejectReasons: string[];
    domainRules: {
      length: string;
      allowedChars: string;
      forbiddenPatterns: string[];
      forbiddenWords: string[];
    };
    hostingRules: {
      allowed: string[];
      forbidden: string[];
    };
    appealProcess: string;
  };

  return (
    <>
      <PageHeader
        title="审核标准"
        description="公开、透明的审核标准，帮助你在前往子站申请前自我评估。"
      />

      <section className="section-padding bg-white">
        <Container>
          <div className="mx-auto max-w-4xl">
            <p className="text-lg text-neutral-700">{eligibility.scope}</p>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              <Card variant="bordered">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                    <Check className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="mt-3">通过条件</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {eligibility.passConditions.map((condition, index) => (
                      <li key={index} className="flex items-start gap-3 text-neutral-700">
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                        {condition}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card variant="bordered">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                    <X className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="mt-3">常见拒绝原因</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {eligibility.rejectReasons.map((reason, index) => (
                      <li key={index} className="flex items-start gap-3 text-neutral-700">
                        <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" aria-hidden="true" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              title="优先支持领域"
              description="以下类型的项目将在审核中获得优先支持"
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {eligibility.priorityFields.map((field, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl border border-primary-100 bg-white p-4 shadow-sm"
                >
                  <Star className="h-5 w-5 flex-shrink-0 text-primary-500" aria-hidden="true" />
                  <span className="font-medium text-neutral-900">{field}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader title="域名命名规范" description="申请域名前缀时必须遵守的规则" />

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">基本规则</h3>
                <dl className="mt-4 space-y-4">
                  <div className="rounded-xl bg-neutral-50 p-4">
                    <dt className="text-sm font-medium text-neutral-500">长度限制</dt>
                    <dd className="mt-1 text-neutral-900">{eligibility.domainRules.length}</dd>
                  </div>
                  <div className="rounded-xl bg-neutral-50 p-4">
                    <dt className="text-sm font-medium text-neutral-500">允许字符</dt>
                    <dd className="mt-1 text-neutral-900">{eligibility.domainRules.allowedChars}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-red-900">禁止规则</h3>
                <ul className="mt-4 space-y-3">
                  {eligibility.domainRules.forbiddenPatterns.map((pattern, index) => (
                    <li key={index} className="flex items-start gap-3 text-red-800">
                      <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" aria-hidden="true" />
                      {pattern}
                    </li>
                  ))}
                  {eligibility.domainRules.forbiddenWords.map((word, index) => (
                    <li key={`word-${index}`} className="flex items-start gap-3 text-red-800">
                      <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" aria-hidden="true" />
                      {word}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader title="空间使用限制" description="托管空间允许与禁止的用途" />

            <div className="grid gap-8 md:grid-cols-2">
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <Check className="h-5 w-5" aria-hidden="true" />
                    允许用途
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {eligibility.hostingRules.allowed.map((item, index) => (
                      <li key={index} className="text-neutral-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card variant="bordered" className="border-red-100 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-800">
                    <X className="h-5 w-5" aria-hidden="true" />
                    禁止用途
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {eligibility.hostingRules.forbidden.map((item, index) => (
                      <li key={index} className="text-red-800">
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl bg-neutral-50 p-8 text-center">
            <Mail className="mx-auto h-10 w-10 text-primary-600" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold text-neutral-900">申诉流程</h2>
            <p className="mt-3 text-neutral-600">{eligibility.appealProcess}</p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-primary-600">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">符合申请条件？</h2>
            <p className="mt-3 text-primary-100">确认符合条件后，前往对应子站提交申请。</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <SubSiteLink
                href="https://dns.cwxian.com"
                size="lg"
                className="bg-white text-primary-700 hover:bg-primary-50"
                showIcon
              >
                前往注册域名
              </SubSiteLink>
              <SubSiteLink
                href="https://free-host.cwxian.com"
                variant="outline"
                size="lg"
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                showIcon
              >
                前往开通空间
              </SubSiteLink>
            </div>
            <Link
              href="/get-started/"
              className="mt-6 inline-flex items-center gap-2 text-sm text-primary-200 hover:text-white"
            >
              返回开通指引
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
