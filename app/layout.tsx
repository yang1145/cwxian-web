import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { GSAPProvider } from "@/components/animations/GSAPProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "创无限 - 为创业项目提供免费二级域名与托管空间",
    template: "%s | 创无限",
  },
  description:
    "创无限（cwxian.com）为小型创业企业与个人创业者提供免费的二级域名与托管空间，助你零成本开启线上第一步。",
  keywords: ["创无限", "免费域名", "免费托管空间", "创业", "二级域名", "cwxian"],
  authors: [{ name: "创无限团队" }],
  creator: "创无限",
  metadataBase: new URL("https://cwxian.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://cwxian.com",
    siteName: "创无限",
    title: "创无限 - 为创业项目提供免费二级域名与托管空间",
    description:
      "创无限（cwxian.com）为小型创业企业与个人创业者提供免费的二级域名与托管空间。",
  },
  twitter: {
    card: "summary_large_image",
    title: "创无限 - 为创业项目提供免费二级域名与托管空间",
    description:
      "创无限（cwxian.com）为小型创业企业与个人创业者提供免费的二级域名与托管空间。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <GSAPProvider>
          <SkipLink />
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </GSAPProvider>
      </body>
    </html>
  );
}
