import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  centered?: boolean;
}

export function PageHeader({
  title,
  description,
  children,
  className,
  centered = true,
}: PageHeaderProps) {
  return (
    <section className={cn("section-padding bg-neutral-50", className)}>
      <Container>
        <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 text-lg text-neutral-600">{description}</p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
