import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

interface SubSiteCTAProps {
  title?: string;
  description?: string;
}

export function SubSiteCTA({
  title = "准备好申请了吗？",
  description = "请先在本站了解全部规则，再按开通指引前往子站完成申请。",
}: SubSiteCTAProps) {
  return (
    <section className="section-padding bg-primary-600">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
          <p className="mt-3 text-primary-100">{description}</p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
              <Link href="/get-started/domain/">注册域名</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/get-started/hosting/">开通空间</Link>
            </Button>
          </div>

          <div className="mt-8 rounded-2xl bg-white p-5 text-left shadow-lg">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-50">
                <AlertTriangle className="h-4 w-4 text-amber-600" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900">子站不会展示规则说明</p>
                <p className="mt-1 text-sm text-neutral-600">
                  子站仅提供基础注册/开通功能。如果你在子站遇到困惑，请随时返回主站查看服务介绍、开通指引与帮助文档。
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
