"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Doc, FAQ } from "@/types";
import Link from "next/link";

interface DocSearchProps {
  docs: Doc[];
  faq: FAQ[];
  className?: string;
}

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  type: "doc" | "faq";
}

export function DocSearch({ docs, faq, className }: DocSearchProps) {
  const [query, setQuery] = useState("");

  const index = useMemo(() => {
    const results: SearchResult[] = [];

    docs.forEach((doc) => {
      results.push({
        id: `doc-${doc.id}`,
        title: doc.title,
        excerpt: doc.excerpt,
        href: `/docs/${doc.slug}/`,
        type: "doc",
      });
    });

    faq.forEach((item) => {
      results.push({
        id: `faq-${item.id}`,
        title: item.question,
        excerpt: item.answer.slice(0, 120) + (item.answer.length > 120 ? "..." : ""),
        href: "/docs/faq/",
        type: "faq",
      });
    });

    return results;
  }, [docs, faq]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return index.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.excerpt.toLowerCase().includes(lowerQuery)
    );
  }, [query, index]);

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索帮助文档、常见问题..."
          className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-12 pr-10 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            aria-label="清除搜索"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {query ? (
        <div className="absolute z-10 mt-2 w-full rounded-xl border border-neutral-200 bg-white shadow-elevated">
          {results.length > 0 ? (
            <ul className="max-h-96 overflow-auto py-2">
              {results.map((result) => (
                <li key={result.id}>
                  <Link
                    href={result.href}
                    className="block px-4 py-3 hover:bg-neutral-50"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "rounded px-2 py-0.5 text-xs font-medium",
                          result.type === "doc"
                            ? "bg-primary-100 text-primary-700"
                            : "bg-accent-100 text-accent-700"
                        )}
                      >
                        {result.type === "doc" ? "文档" : "FAQ"}
                      </span>
                      <span className="font-medium text-neutral-900">{result.title}</span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-neutral-600">{result.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center text-neutral-600">
              没有找到与“{query}”相关的内容
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
