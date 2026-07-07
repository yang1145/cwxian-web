import type { Metadata } from "next";
import { ServiceCard } from "@/components/services/ServiceCard";
import { getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "免费托管空间",
  description: "了解创无限免费托管空间服务的规格、申请条件、使用限制与禁止用途，然后前往 user.cwxian.com 注册账号并向 vhost_apply@cwxian.com 发送申请邮件。",
};

export default async function HostingServicePage() {
  const services = await getServices();
  return <ServiceCard service={services.hosting} />;
}
