import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SubSiteLink } from "@/components/shared/SubSiteLink";
import { Alert } from "@/components/ui/Alert";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowLeft, Globe, AlertTriangle, Check } from "lucide-react";
import { getGettingStarted, getFAQ, getEligibility } from "@/lib/data";

export const metadata: Metadata = {
  title: "域名开通指引",
  description: "详细了解如何在创无限申请免费二级域名，包括准备材料、命名规范、审核流程与解析配置。",
};

export default async function DomainGuidePage() {
  const [gettingStartedRaw, eligibilityRaw, faq] = await Promise.all([
    getGettingStarted(),
    getEligibility(),
    getFAQ(),
  ]);
  const gettingStarted = gettingStartedRaw as {
    domainSteps: { step: number; title: string; description: string }[];
    preparation: string[];
    tips: string[];
  };
  const eligibility = eligibilityRaw as {
    domainRules: {
      length: string;
      allowedChars: string;
      forbiddenPatterns: string[];
      forbiddenWords: string[];
    };
  };

  const domainFAQ = faq.filter(
    (item) =>
      item.category === "domain" ||
      item.question.includes("域名") ||
      item.question.includes("审核")
  );

  const accordionItems = domainFAQ.slice(0, 5).map((item) => ({
    id: item.id,
    title: item.question,
    content: <p>{item.answer}</p>,
  }));

  return (
    <>
      <PageHeader
        title="域名开通指引"
        description="按照以下步骤申请免费二级域名：先在 dns.cwxian.com 注册账号，再向 domain_apply@cwxian.com 发送申请邮件。"
      />

      <section className="section-padding bg-white">
        <Container>
          <div className="mx-auto max-w-4xl">
            <Alert variant="warning" className="mb-10">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <p>
                本页仅展示域名服务规则与说明。实际申请请先前往{" "}
                <a
                  href="https://dns.cwxian.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline"
                >
                  dns.cwxian.com
                </a>
                {" "}注册账号，再向 domain_apply@cwxian.com 发送申请邮件。邮件主题请注明「【域名申请】项目名 - 前缀.cwxian.com」，正文需包含项目名、面向领域、项目优势、项目简介、注册的 dns.cwxian.com 账号、期望域名前缀。
              </p>
            </Alert>

            <SectionHeader
              title="开通流程"
              description="从了解规则到完成域名解析，只需 5 个步骤"
              centered={false}
              className="mb-8"
            />

            <div className="relative">
              <div className="absolute left-5 top-0 h-full w-0.5 bg-neutral-200 md:left-6" aria-hidden="true" />
              <ol className="space-y-8">
                {gettingStarted.domainSteps.map((step) => (
                  <li key={step.step} className="relative flex gap-6">
                    <div className="z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white md:h-12 md:w-12">
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
              title="域名命名规范"
              description="请在申请前确认你的域名前缀符合以下规范"
            />

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-neutral-900">
                  <Check className="h-5 w-5 text-green-500" aria-hidden="true" />
                  允许规则
                </h3>
                <ul className="mt-4 space-y-3 text-neutral-700">
                  <li>
                    <span className="font-medium">长度：</span>
                    {eligibility.domainRules.length}
                  </li>
                  <li>
                    <span className="font-medium">字符：</span>
                    {eligibility.domainRules.allowedChars}
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-red-900">
                  <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                  禁止规则
                </h3>
                <ul className="mt-4 space-y-2 text-red-800">
                  {eligibility.domainRules.forbiddenPatterns.map((pattern, index) => (
                    <li key={index}>{pattern}</li>
                  ))}
                  {eligibility.domainRules.forbiddenWords.map((word, index) => (
                    <li key={`word-${index}`}>{word}</li>
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
            <SectionHeader title="常见问题" description="域名申请与解析过程中可能遇到的问题" />
            <Accordion items={accordionItems} />
          </div>
        </Container>
      </section>

      <section className="section-padding bg-primary-600">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Globe className="mx-auto h-12 w-12 text-white/80" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">准备好注册域名了吗？</h2>
            <p className="mt-3 text-primary-100">
              确认已了解命名规范与使用限制后，请先前往 dns.cwxian.com 注册账号，再发送申请邮件至 domain_apply@cwxian.com。
            </p>
            <p className="mt-3 text-primary-100">
              邮件主题：「【域名申请】项目名 - 前缀.cwxian.com」；正文需包含项目名、面向领域、项目优势、项目简介、注册的 dns.cwxian.com 账号、期望域名前缀。
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <SubSiteLink
                href="https://dns.cwxian.com"
                size="lg"
                className="bg-white text-primary-700 hover:bg-primary-50"
                showIcon
              >
                前往注册域名
              </SubSiteLink>
            </div>
            <Link
              href="/get-started/"
              className="mt-6 inline-flex items-center gap-2 text-sm text-primary-200 hover:text-white"
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
