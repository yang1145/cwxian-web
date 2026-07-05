"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Doc } from "@/types";

interface DocSidebarProps {
  docs: Doc[];
}

export function DocSidebar({ docs }: DocSidebarProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="文档导航" className="rounded-2xl border border-neutral-200 bg-white p-4">
      <h3 className="px-3 py-2 text-sm font-semibold text-neutral-900">帮助文档</h3>
      <ul className="mt-2 space-y-1">
        <li>
          <Link
            href="/docs/"
            className={cn(
              "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/docs/" || pathname === "/docs"
                ? "bg-primary-50 text-primary-700"
                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            )}
          >
            帮助中心首页
          </Link>
        </li>
        {docs.map((doc) => (
          <li key={doc.id}>
            <Link
              href={`/docs/${doc.slug}/`}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === `/docs/${doc.slug}/`
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
              )}
            >
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
