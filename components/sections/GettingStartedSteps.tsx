import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, BookOpen, MousePointer, FileCheck, Rocket } from "lucide-react";

const steps = [
  {
    icon: BookOpen,
    title: "阅读规则",
    description: "了解服务条件、申请资格与使用限制",
  },
  {
    icon: MousePointer,
    title: "点击跳转",
    description: "前往 dns.cwxian.com 或 free-host.cwxian.com",
  },
  {
    icon: FileCheck,
    title: "子站开通",
    description: "填写项目信息并提交审核",
  },
  {
    icon: Rocket,
    title: "上线运行",
    description: "审核通过后配置域名解析或上传网站",
  },
];

export function GettingStartedSteps() {
  return (
    <section className="section-padding bg-neutral-50">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            四步开启你的<span className="gradient-text">线上项目</span>
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            简单清晰的流程，让你快速获得属于自己的二级域名与托管空间。
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="rounded-2xl bg-white p-6 shadow-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                </div>
                <p className="mt-2 text-sm text-neutral-600">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 ? (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="h-5 w-5 text-neutral-300" aria-hidden="true" />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild size="lg">
            <Link href="/get-started/">
              查看开通指引
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
