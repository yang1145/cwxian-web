import type { Metadata } from "next";
import { DocPageLayout } from "@/components/docs/DocPageLayout";

export const metadata: Metadata = {
  title: "新手指南",
  description: "从了解规则到在子站完成开通的完整流程指南。",
};

export default function GuidesPage() {
  return (
    <DocPageLayout
      slug="guides"
      description="从了解规则到在子站完成开通的完整流程指南。"
    />
  );
}
