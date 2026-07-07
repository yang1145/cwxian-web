import { Container } from "@/components/layout/Container";
import { SubSiteLink } from "@/components/shared/SubSiteLink";
import { Alert } from "@/components/ui/Alert";
import { Globe, Server, Check, X, AlertTriangle } from "lucide-react";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.id === "domain" ? Globe : Server;

  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {service.title}
              </h1>
              <p className="mt-1 text-neutral-600">{service.description}</p>
            </div>
          </div>

          <Alert className="mt-8" variant="info">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            {service.id === "domain" ? (
              <p>
                本页仅展示服务规则与说明。实际注册请前往{" "}
                <a
                  href={service.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline"
                >
                  {service.cta.href.replace("https://", "")}
                </a>
                {" "}注册账号，并向 domain_apply@cwxian.com 发送申请邮件完成。邮件主题请注明「【域名申请】项目名 - 前缀.cwxian.com」，正文需包含项目名、面向领域、项目优势、项目简介、注册的 dns.cwxian.com 账号、期望域名前缀。
              </p>
            ) : (
              <p>
                本页仅展示服务规则与说明。实际开通请前往{" "}
                <a
                  href={service.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline"
                >
                  {service.cta.href.replace("https://", "")}
                </a>
                {" "}注册账号，并向 vhost_apply@cwxian.com 发送申请邮件完成。邮件主题请注明「【空间申请】项目名 - 前缀.cwxian.com」，正文需包含项目名、面向领域、项目优势、项目简介、注册的 user.cwxian.com 账号、期望绑定的域名/空间标识。
              </p>
            )}
          </Alert>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-neutral-50 p-6">
              <h2 className="text-xl font-semibold">服务特点</h2>
              <ul className="mt-4 space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-neutral-50 p-6">
              <h2 className="text-xl font-semibold">服务规格</h2>
              <dl className="mt-4 space-y-3">
                {service.specs.map((spec, index) => (
                  <div key={index} className="flex justify-between border-b border-neutral-200 pb-3 last:border-0 last:pb-0">
                    <dt className="text-neutral-500">{spec.label}</dt>
                    <dd className="font-medium text-neutral-900">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-red-800">
              <X className="h-5 w-5" aria-hidden="true" />
              使用限制
            </h2>
            <ul className="mt-4 space-y-2">
              {service.restrictions.map((restriction, index) => (
                <li key={index} className="text-red-700">
                  {restriction}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <SubSiteLink href={service.cta.href} size="lg">
              {service.cta.text}
            </SubSiteLink>
            <SubSiteLink
              href={service.id === "domain" ? "https://user.cwxian.com" : "https://dns.cwxian.com"}
              variant="outline"
              size="lg"
            >
              {service.id === "domain" ? "开通托管空间" : "注册二级域名"}
            </SubSiteLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
