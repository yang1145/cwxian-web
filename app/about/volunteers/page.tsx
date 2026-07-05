import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Check, Mail, Users, ClipboardList, MessageCircle, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "志愿者计划",
  description: "加入创无限志愿者团队，参与项目审核、文档维护与社区支持。",
};

const volunteerRoles = [
  {
    icon: <ClipboardList className="h-6 w-6" aria-hidden="true" />,
    title: "项目审核志愿者",
    description: "协助审核域名与空间申请，帮助平台筛选优质创业项目。",
  },
  {
    icon: <Code className="h-6 w-6" aria-hidden="true" />,
    title: "技术志愿者",
    description: "参与平台工具开发、文档站点维护与开源项目贡献。",
  },
  {
    icon: <MessageCircle className="h-6 w-6" aria-hidden="true" />,
    title: "社区支持志愿者",
    description: "解答用户疑问，维护社区氛围，收集用户反馈。",
  },
];

export default function VolunteersPage() {
  return (
    <>
      <PageHeader
        title="志愿者计划"
        description="与我们一起，帮助更多创业者以最低成本开启线上第一步。"
      />

      <section className="section-padding bg-white">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              title="为什么加入"
              description="成为创无限志愿者，你将获得"
              className="mb-8"
            />
            <ul className="grid gap-4 sm:grid-cols-2">
              {[
                "参与一个真实且有意义的项目",
                "结识志同道合的创业者与开发者",
                "提升技术、运营或社区管理能力",
                "获得平台认证与感谢名单展示",
              ].map((benefit, index) => (
                <li key={index} className="flex items-start gap-3 text-neutral-700">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <SectionHeader title="志愿者岗位" description="选择适合你的方向参与贡献" />

          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 md:grid-cols-3">
              {volunteerRoles.map((role, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      {role.icon}
                    </div>
                    <CardTitle className="mt-4">{role.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-600">{role.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl bg-primary-600 p-8 text-center text-white sm:p-10">
            <Users className="mx-auto h-10 w-10 text-primary-200" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">成为志愿者</h2>
            <p className="mt-3 text-primary-100">
              发送邮件至 contact@cwxian.com，主题注明【志愿者申请】，并简单介绍你的背景与希望参与的岗位。
            </p>
            <Link
              href="mailto:contact@cwxian.com?subject=志愿者申请"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-primary-700 hover:bg-primary-50"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              发送申请邮件
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
