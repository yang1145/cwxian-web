import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { SubSiteLink } from "@/components/shared/SubSiteLink";
import { ShowcaseFilterSkeleton } from "@/components/showcase/ShowcaseFilterSkeleton";
import { getShowcases } from "@/lib/data";

const ShowcaseFilterClient = dynamic(
  () => import("@/components/showcase/ShowcaseFilterClient").then((mod) => mod.ShowcaseFilterClient),
  { loading: () => <ShowcaseFilterSkeleton /> }
);

export const metadata: Metadata = {
  title: "成功案例",
  description: "看看已入驻创无限的创业项目如何通过免费二级域名与托管空间开启线上第一步。",
};

export default async function ShowcasePage() {
  const showcases = await getShowcases();
  const categories = Array.from(new Set(showcases.map((s) => s.category)));
  const stages = Array.from(new Set(showcases.map((s) => s.stage)));

  return (
    <>
      <PageHeader
        title="成功案例"
        description="他们选择了创无限，用最低成本开启了专业的线上起点。每一个案例都是真实的创业故事。"
      />

      <section className="section-padding bg-white">
        <Container>
          <ShowcaseFilterClient categories={categories} stages={stages} showcases={showcases} />
        </Container>
      </section>

      <section className="section-padding bg-primary-600">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">也想展示你的项目？</h2>
            <p className="mt-3 text-primary-100">
              通过创无限开通服务并成功上线后，你的项目也有机会出现在这里，获得更多曝光。
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/get-started/"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-primary-700 hover:bg-primary-50"
              >
                了解开通流程
              </Link>
              <SubSiteLink
                href="https://user.cwxian.com"
                variant="outline"
                size="lg"
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                showIcon
              >
                前往注册域名
              </SubSiteLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
