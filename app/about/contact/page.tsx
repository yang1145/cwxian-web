import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ExternalLink } from "@/components/shared/ExternalLink";
import { Mail, MapPin, Code, Globe } from "lucide-react";
import { getContact } from "@/lib/data";

export const metadata: Metadata = {
  title: "联系我们",
  description: "通过邮件或社交媒体与创无限团队取得联系。",
};

export default async function ContactPage() {
  const contactRaw = await getContact();
  const contact = contactRaw as {
    email: string;
    github: string;
    twitter: string;
    weibo: string;
    address: string;
  };

  return (
    <>
      <PageHeader
        title="联系我们"
        description="无论是项目咨询、合作洽谈还是问题反馈，我们都期待听到你的声音。"
      />

      <section className="section-padding bg-white">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 md:grid-cols-2">
              <Card variant="bordered">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <Mail className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <CardTitle className="mt-4">联系邮箱</CardTitle>
                </CardHeader>
                <CardContent>
                  <ExternalLink href={`mailto:${contact.email}`} showIcon={false}>
                    {contact.email}
                  </ExternalLink>
                  <p className="mt-3 text-sm text-neutral-600">
                    一般咨询将在 1-2 个工作日内回复，审核申诉将在 3 个工作日内回复。
                  </p>
                </CardContent>
              </Card>

              <Card variant="bordered">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                    <MapPin className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <CardTitle className="mt-4">运营地区</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700">{contact.address}</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12">
              <SectionHeader
                title="社交媒体"
                description="关注我们，获取最新动态"
              />
              <div className="flex flex-wrap justify-center gap-4">
                <ExternalLink
                  href={contact.github}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-3 font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  <Code className="h-5 w-5" aria-hidden="true" />
                  GitHub
                </ExternalLink>
                <ExternalLink
                  href={contact.twitter}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-3 font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  <Globe className="h-5 w-5" aria-hidden="true" />
                  Twitter
                </ExternalLink>
                <ExternalLink
                  href={contact.weibo}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-3 font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  微博
                </ExternalLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
