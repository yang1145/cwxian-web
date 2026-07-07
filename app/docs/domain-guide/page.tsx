import type { Metadata } from "next";
import { DocPageLayout } from "@/components/docs/DocPageLayout";

export const metadata: Metadata = {
  title: "域名解析教程",
  description: "如何在 user.cwxian.com 添加解析记录，以及常见 DNS 问题排查。",
};

export default function DomainGuidePage() {
  return (
    <DocPageLayout
      slug="domain-guide"
      description="如何在 user.cwxian.com 添加解析记录，以及常见 DNS 问题排查。"
    />
  );
}
