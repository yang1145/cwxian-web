import { Container } from "@/components/layout/Container";
import { SubSiteLink } from "@/components/shared/SubSiteLink";
import { Alert } from "@/components/ui/Alert";
import { AlertTriangle } from "lucide-react";

interface SubSiteCTAProps {
  title?: string;
  description?: string;
}

export function SubSiteCTA({
  title = "准备好申请了吗？",
  description = "子站仅提供基础注册/开通功能，请确认已在本站了解全部规则。",
}: SubSiteCTAProps) {
  return (
    <section className="section-padding bg-primary-600">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
          <p className="mt-3 text-primary-100">{description}</p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <SubSiteLink
              href="https://dns.cwxian.com"
              size="lg"
              className="bg-white text-primary-700 hover:bg-primary-50"
              showIcon
            >
              前往注册域名
            </SubSiteLink>
            <SubSiteLink
              href="https://user.cwxian.com"
              variant="outline"
              size="lg"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              showIcon
            >
              前往开通空间
            </SubSiteLink>
          </div>

          <Alert className="mt-8 border-white/20 bg-white/10 text-white" variant="info">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <p className="text-left text-sm">
              子站仅提供基础功能，不会展示规则说明。如果你在子站遇到困惑，请随时返回主站查看服务介绍、开通指引与帮助文档。
            </p>
          </Alert>
        </div>
      </Container>
    </section>
  );
}
