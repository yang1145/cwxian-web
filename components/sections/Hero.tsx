import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SubSiteLink } from "@/components/shared/SubSiteLink";
import { HeroEntrance } from "@/components/animations/HeroEntrance";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-bg py-20 md:py-28 lg:py-36">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />
      <Container className="relative">
        <HeroEntrance>
          <div className="mx-auto max-w-3xl text-center">
            <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>为早期创业者提供免费互联网基础资源</span>
            </div>

            <h1 className="hero-title mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              让创业从一个
              <span className="text-primary-200">好的域名</span>
              开始
            </h1>

            <p className="hero-description mx-auto mt-6 max-w-2xl text-lg text-primary-100 md:text-xl">
              创无限为早期创业团队、独立开发者与学生团队提供免费的二级域名与托管空间，
              助你零成本开启线上第一步。
            </p>

            <div className="hero-actions mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                <Link href="/get-started/">
                  立即开通
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <SubSiteLink
                href="https://user.cwxian.com"
                variant="outline"
                size="lg"
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                注册二级域名
              </SubSiteLink>
            </div>

            <p className="hero-trust mt-6 text-sm text-primary-300">
              已有 128+ 个创业项目的信任选择
            </p>
          </div>
        </HeroEntrance>
      </Container>

    </section>
  );
}
