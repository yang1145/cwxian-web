import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink } from "lucide-react";
import type { Showcase } from "@/types";

interface ShowcaseCardProps {
  showcase: Showcase;
}

export function ShowcaseCard({ showcase }: ShowcaseCardProps) {
  return (
    <Link
      href={`/showcase/${showcase.slug}/`}
      className="group block"
    >
      <Card className="h-full transition-shadow hover:shadow-elevated">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-xl font-bold text-primary-600">
                {showcase.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                  {showcase.name}
                </h3>
                <p className="text-sm text-neutral-500">{showcase.domain}</p>
              </div>
            </div>
            <Badge variant="primary">{showcase.category}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600">{showcase.tagline}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-primary-600">
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-medium">访问项目</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
