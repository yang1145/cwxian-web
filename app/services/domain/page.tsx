import type { Metadata } from "next";
import { ServiceCard } from "@/components/services/ServiceCard";
import { getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "免费二级域名",
  description: "了解创无限免费二级域名服务的规格、申请条件、命名规范与使用限制，然后前往 dns.cwxian.com 注册账号并向 domain_apply@cwxian.com 发送申请邮件。",
};

export default async function DomainServicePage() {
  const services = await getServices();
  return <ServiceCard service={services.domain} />;
}
