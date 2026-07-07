import Link from "next/link";
import { Container } from "./Container";
import { SubSiteLink } from "@/components/shared/SubSiteLink";
import { Globe, Heart } from "lucide-react";

const footerLinks = {
  about: [
    { label: "关于我们", href: "/about/" },
    { label: "团队介绍", href: "/about/team/" },
    { label: "合作伙伴", href: "/about/partners/" },
    { label: "志愿者计划", href: "/about/volunteers/" },
    { label: "联系我们", href: "/about/contact/" },
  ],
  services: [
    { label: "服务介绍", href: "/services/" },
    { label: "免费二级域名", href: "/services/domain/" },
    { label: "免费托管空间", href: "/services/hosting/" },
    { label: "开通指引", href: "/get-started/" },
  ],
  support: [
    { label: "帮助中心", href: "/docs/" },
    { label: "常见问题", href: "/docs/faq/" },
    { label: "使用指南", href: "/docs/guides/" },
    { label: "审核标准", href: "/get-started/eligibility/" },
  ],
  legal: [
    { label: "用户协议", href: "/terms/" },
    { label: "隐私政策", href: "/privacy/" },
    { label: "开源与贡献", href: "/open-source/" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800 bg-neutral-900 text-neutral-300">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-bold text-white hover:text-primary-400"
              >
                <Globe className="h-6 w-6 text-primary-400" aria-hidden="true" />
                <span>创无限</span>
              </Link>
              <p className="mt-4 text-sm text-neutral-400 max-w-xs">
                让每一个有价值的创业想法，都能以最低成本拥有一个专业的线上起点。
              </p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <SubSiteLink
                  href="https://user.cwxian.com"
                  variant="outline"
                  className="border-neutral-600 bg-transparent text-neutral-200 hover:bg-neutral-800 hover:text-white"
                >
                  域名服务
                </SubSiteLink>
                <SubSiteLink
                  href="https://user.cwxian.com"
                  variant="primary"
                >
                  开通空间
                </SubSiteLink>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">关于</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.about.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">服务</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">支持</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">法律</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-500">
              &copy; {currentYear} 创无限（cwxian.com）. 保留所有权利.
            </p>
            <p className="text-sm text-neutral-500 flex items-center gap-1">
              用 <Heart className="h-3.5 w-3.5 text-red-500" aria-hidden="true" /> 为创业者构建
            </p>
            <p className="text-sm text-neutral-500">
              ICP备案号：京ICP备XXXXXXXX号-X
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
