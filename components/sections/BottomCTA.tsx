import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

export function BottomCTA() {
  return (
    <section className="section-padding relative overflow-hidden animated-gradient-bg animation-gradient-shift">
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/[0.03] blur-3xl animation-blob"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-white/[0.03] blur-3xl animation-blob-delayed"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>免费、快速、简单</span>
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            准备好开启你的创业项目了吗？
          </h2>

          <p className="mt-4 text-lg text-primary-100">
            立即阅读开通指引，获取属于你的免费二级域名与托管空间。
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
              <Link href="/get-started/domain/">
                注册域名
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
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
        </div>
      </Container>
    </section>
  );
}
