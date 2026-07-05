import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ExternalLink, Heart } from "lucide-react";
import { getPartners } from "@/lib/data";

export const metadata: Metadata = {
  title: "合作伙伴",
  description: "感谢为创无限提供资源支持的厂商、社区与机构。",
};

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <>
      <PageHeader
        title="合作伙伴"
        description="创无限的发展离不开合作伙伴的支持。感谢他们与我们一起服务创业者。"
      />

      <section className="section-padding bg-white">
        <Container>
          <SectionHeader
            title="合作方"
            description="提供技术、流量与社区资源支持的伙伴"
          />

          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {partners.map((partner) => (
                <Card key={partner.id} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-lg font-bold text-primary-600">
                      {partner.name.charAt(0)}
                    </div>
                    <CardTitle className="mt-4 text-base">{partner.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {partner.link ? (
                      <Link
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
                      >
                        访问官网
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    ) : (
                      <span className="text-sm text-neutral-500">合作伙伴</span>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Heart className="mx-auto h-10 w-10 text-primary-600" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">希望成为合作伙伴？</h2>
            <p className="mt-4 text-neutral-600">
              如果你是云服务厂商、开源社区、投资机构或创业服务机构，欢迎与我们联系，探讨合作可能。
            </p>
            <Link
              href="/about/contact/"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white hover:bg-primary-700"
            >
              联系我们
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
