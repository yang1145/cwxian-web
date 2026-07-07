import type { Metadata } from "next";
import { DocPageLayout } from "@/components/docs/DocPageLayout";

export const metadata: Metadata = {
  title: "子站使用说明",
  description: "user.cwxian.com 与 user.cwxian.com 的功能介绍与使用说明。",
};

export default function SubSitesPage() {
  return (
    <DocPageLayout
      slug="sub-sites"
      description="user.cwxian.com 与 user.cwxian.com 的功能介绍与使用说明。"
    />
  );
}
