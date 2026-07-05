import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SubSiteLink } from "@/components/shared/SubSiteLink";
import { Globe, Server, ArrowRight } from "lucide-react";
import type { Service } from "@/types";

interface ServiceOverviewProps {
  services: Record<string, Service>;
}

export function ServiceOverview({ services }: ServiceOverviewProps) {
  const serviceList = Object.values(services);

  return (
    <section className="section-padding bg-neutral-50">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            两大核心服务，
            <span className="gradient-text">零成本启动</span>
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            我们提供创业初期最需要的互联网基础资源，让你专注于产品与用户的验证。
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {serviceList.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-2xl bg-white p-8 shadow-card transition-shadow hover:shadow-elevated"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                {service.id === "domain" ? (
                  <Globe className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Server className="h-6 w-6" aria-hidden="true" />
                )}
              </div>

              <h3 className="mt-6 text-2xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-neutral-600">{service.description}</p>

              <ul className="mt-6 space-y-3">
                {service.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-neutral-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <SubSiteLink
                  href={service.cta.href}
                  variant={service.id === "domain" ? "outline" : "primary"}
                >
                  {service.cta.text}
                </SubSiteLink>
                <Link
                  href={`/services/${service.id}/`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  了解详情
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
