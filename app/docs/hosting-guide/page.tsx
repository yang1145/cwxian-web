import type { Metadata } from "next";
import { DocPageLayout } from "@/components/docs/DocPageLayout";

export const metadata: Metadata = {
  title: "空间上传教程",
  description: "在 free-host.cwxian.com 通过 Web 上传、Git 同步部署网站文件。",
};

export default function HostingGuidePage() {
  return (
    <DocPageLayout
      slug="hosting-guide"
      description="在 free-host.cwxian.com 通过 Web 上传、Git 同步部署网站文件。"
    />
  );
}
