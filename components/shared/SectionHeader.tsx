import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  centered?: boolean;
}

export function SectionHeader({
  title,
  description,
  children,
  className,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-10", centered && "text-center", className)}>
      <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base text-neutral-600 max-w-2xl mx-auto">
          {description}
        </p>
      ) : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}
