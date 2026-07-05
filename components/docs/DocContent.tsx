"use client";

import { cn } from "@/lib/utils";

interface DocContentProps {
  title: string;
  content: string;
  className?: string;
}

export function DocContent({ title, content, className }: DocContentProps) {
  return (
    <article className={cn("prose prose-neutral max-w-none", className)}>
      {title ? (
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          {title}
        </h1>
      ) : null}
      <div
        className="prose-h2:mt-10 prose-h2:text-2xl prose-h2:font-bold prose-h2:text-neutral-900 prose-h3:mt-8 prose-h3:text-xl prose-h3:font-semibold prose-h3:text-neutral-900 prose-p:mt-4 prose-p:text-neutral-700 prose-p:leading-relaxed prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-ul:mt-4 prose-ul:list-disc prose-ul:pl-6 prose-ol:mt-4 prose-ol:list-decimal prose-ol:pl-6 prose-li:mt-2 prose-li:text-neutral-700 prose-strong:font-semibold prose-strong:text-neutral-900 prose-table:mt-6 prose-table:w-full prose-table:text-left prose-table:text-sm prose-th:border prose-th:border-neutral-200 prose-th:bg-neutral-50 prose-th:p-3 prose-th:font-semibold prose-td:border prose-td:border-neutral-200 prose-td:p-3 prose-code:rounded prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:text-neutral-800 prose-pre:mt-4 prose-pre:rounded-xl prose-pre:bg-neutral-900 prose-pre:p-4 prose-pre:text-sm prose-pre:text-white"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
