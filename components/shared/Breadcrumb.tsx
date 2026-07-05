import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="面包屑导航" className={cn("", className)}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-neutral-500">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-primary-600 transition-colors"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">首页</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              {isLast || !item.href ? (
                <span className={cn(isLast && "font-medium text-neutral-900")}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-primary-600 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
