"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { SubSiteLink } from "@/components/shared/SubSiteLink";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const MobileNav = dynamic(() => import("./MobileNav").then((mod) => mod.MobileNav), {
  ssr: false,
});

const mainNavItems = [
  { label: "首页", href: "/" },
  { label: "服务介绍", href: "/services/" },
  { label: "开通指引", href: "/get-started/" },
  { label: "成功案例", href: "/showcase/" },
  { label: "帮助中心", href: "/docs/" },
  { label: "关于我们", href: "/about/" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/80 backdrop-blur-md">
      <Container>
        <nav
          className="flex h-16 items-center justify-between"
          aria-label="主导航"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-neutral-900 hover:text-primary-700"
          >
            <Globe className="h-6 w-6 text-primary-600" aria-hidden="true" />
            <span>创无限</span>
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary-600"
                      : "text-neutral-600 hover:text-primary-600"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <SubSiteLink
              href="https://user.cwxian.com"
              variant="outline"
              size="sm"
            >
              域名服务
            </SubSiteLink>
            <SubSiteLink
              href="https://user.cwxian.com"
              variant="primary"
              size="sm"
            >
              开通空间
            </SubSiteLink>
          </div>

          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </nav>
      </Container>

      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={mainNavItems}
      />
    </header>
  );
}
