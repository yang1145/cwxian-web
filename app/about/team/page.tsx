import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { User } from "lucide-react";
import { getTeam } from "@/lib/data";

export const metadata: Metadata = {
  title: "团队介绍",
  description: "了解创无限的核心团队与运营成员。",
};

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <>
      <PageHeader
        title="团队介绍"
        description="一群相信创业力量的人，致力于为早期创业者提供免费的基础设施支持。"
      />

      <section className="section-padding bg-white">
        <Container>
          <SectionHeader
            title="核心团队"
            description="创无限由一群有创业经验、技术背景与社区运营经验的成员共同运营"
          />

          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <Card key={member.id} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                      <User className="h-8 w-8" aria-hidden="true" />
                    </div>
                    <CardTitle className="mt-4">{member.name}</CardTitle>
                    <p className="text-sm font-medium text-primary-600">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-600">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl bg-primary-600 p-8 text-center text-white sm:p-10">
            <h2 className="text-xl font-bold sm:text-2xl">加入我们</h2>
            <p className="mt-3 text-primary-100">
              如果你认同我们的使命，欢迎申请成为志愿者，与我们一起帮助更多创业者。
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
