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
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
