import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { DocSidebar } from "./DocSidebar";
import { DocContent } from "./DocContent";
import { getDocs } from "@/lib/data";
import { getDocContent } from "@/lib/markdown";

interface DocPageLayoutProps {
  slug: string;
  description?: string;
}

export async function DocPageLayout({ slug, description }: DocPageLayoutProps) {
  const [docs, { title, content }] = await Promise.all([getDocs(), getDocContent(slug)]);

  return (
    <>
      <PageHeader title={title} description={description} />

      <section className="section-padding bg-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <DocSidebar docs={docs} />
              </div>
            </div>
            <div className="lg:col-span-3">
              <DocContent title={title} content={content} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
