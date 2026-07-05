export function ShowcaseFilterSkeleton() {
  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-3">
        <div className="h-10 w-24 animate-pulse rounded-full bg-neutral-100" />
        <div className="h-10 w-28 animate-pulse rounded-full bg-neutral-100" />
        <div className="h-10 w-20 animate-pulse rounded-full bg-neutral-100" />
        <div className="h-10 w-32 animate-pulse rounded-full bg-neutral-100" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-48 animate-pulse rounded-2xl border border-neutral-200 bg-neutral-100"
          />
        ))}
      </div>
    </div>
  );
}
