import type { Metadata } from "next";
import { DocPageLayout } from "@/components/docs/DocPageLayout";

export const metadata: Metadata = {
  title: "子站使用说明",
  description: "dns.cwxian.com 与 free-host.cwxian.com 的功能介绍与使用说明。",
};

export default function SubSitesPage() {
  return (
    <DocPageLayout
      slug="sub-sites"
      description="dns.cwxian.com 与 free-host.cwxian.com 的功能介绍与使用说明。"
    />
  );
}
