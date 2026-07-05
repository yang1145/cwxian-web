import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SubSiteLink } from "@/components/shared/SubSiteLink";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Check, X, ArrowRight, Globe, Server, Shield, AlertTriangle } from "lucide-react";
import { getServices, getEligibility } from "@/lib/data";

export const metadata: Metadata = {
  title: "服务介绍",
  description: "了解创无限提供的免费二级域名与免费托管空间服务，包括服务规格、申请条件与使用限制。",
};

export default async function ServicesPage() {
  const [services, eligibilityRaw] = await Promise.all([
    getServices(),
    getEligibility(),
  ]);
  const eligibility = eligibilityRaw as {
    passConditions: string[];
    rejectReasons: string[];
  };

  const serviceList = Object.values(services);

  return (
    <>
      <PageHeader
        title="服务介绍"
        description="创无限为早期创业项目提供免费的互联网基础资源。请在主站充分了解规则后，再前往子站完成实际注册与开通。"
      />

      <section className="section-padding bg-white">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {serviceList.map((service) => {
              const Icon = service.id === "domain" ? Globe : Server;
              return (
                <Card key={service.id} className="relative overflow-hidden">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <CardTitle className="mt-4">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-neutral-600">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <SubSiteLink href={service.cta.href} size="md" showIcon>
                        {service.cta.text}
                      </SubSiteLink>
                      <Link
                        href={`/services/${service.id}/`}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                      >
                        了解详情
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <SectionHeader
            title="服务规格对比"
            description="清晰了解两项免费服务的核心规格，帮助你根据项目需求选择合适的资源。"
          />

          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-neutral-900">对比项</th>
                    <th className="px-6 py-4 font-semibold text-primary-700">免费二级域名</th>
                    <th className="px-6 py-4 font-semibold text-accent-700">免费托管空间</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr>
                    <td className="px-6 py-4 font-medium text-neutral-900">服务入口</td>
                    <td className="px-6 py-4 text-neutral-600">dns.cwxian.com</td>
                    <td className="px-6 py-4 text-neutral-600">free-host.cwxian.com</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-neutral-900">核心能力</td>
                    <td className="px-6 py-4 text-neutral-600">*.cwxian.com 二级域名解析</td>
                    <td className="px-6 py-4 text-neutral-600">静态网站托管与有限动态脚本</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-neutral-900">费用</td>
                    <td className="px-6 py-4 text-neutral-600">完全免费</td>
                    <td className="px-6 py-4 text-neutral-600">完全免费</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-neutral-900">审核周期</td>
                    <td className="px-6 py-4 text-neutral-600">1-3 个工作日</td>
                    <td className="px-6 py-4 text-neutral-600">1-3 个工作日</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-neutral-900">申请数量</td>
                    <td className="px-6 py-4 text-neutral-600">每个项目 1 个主域名</td>
                    <td className="px-6 py-4 text-neutral-600">每个项目固定额度</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-neutral-900">限制</td>
                    <td className="px-6 py-4 text-neutral-600">禁止侵权、违法、敏感前缀</td>
                    <td className="px-6 py-4 text-neutral-600">禁止网盘、下载站、挖矿等</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <Card variant="bordered">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                  <Shield className="h-5 w-5" aria-hidden="true" />
                </div>
                <CardTitle className="mt-3">申请条件</CardTitle>
                <CardDescription>符合以下条件的项目更容易通过审核</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {eligibility.passConditions.slice(0, 5).map((condition, index) => (
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
                  <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                </div>
                <CardTitle className="mt-3">常见拒绝原因</CardTitle>
                <CardDescription>以下情况可能导致申请无法通过</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {eligibility.rejectReasons.slice(0, 5).map((reason, index) => (
                    <li key={index} className="flex items-start gap-3 text-neutral-700">
                      <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" aria-hidden="true" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl bg-primary-600 p-8 text-center text-white sm:flex-row sm:p-10">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white">准备好开始了吗？</h3>
              <p className="mt-2 text-primary-100">
                阅读完整开通指引与审核标准，确认符合条件后再前往子站提交申请。
              </p>
            </div>
            <Link
              href="/get-started/"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-primary-700 hover:bg-primary-50"
            >
              查看开通指引
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
