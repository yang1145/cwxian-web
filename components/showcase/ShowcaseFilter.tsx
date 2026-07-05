"use client";

import { cn } from "@/lib/utils";

interface ShowcaseFilterProps {
  categories: string[];
  stages: string[];
  selectedCategory: string | null;
  selectedStage: string | null;
  onCategoryChange: (category: string | null) => void;
  onStageChange: (stage: string | null) => void;
}

export function ShowcaseFilter({
  categories,
  stages,
  selectedCategory,
  selectedStage,
  onCategoryChange,
  onStageChange,
}: ShowcaseFilterProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-neutral-500">领域：</span>
        <button
          type="button"
          onClick={() => onCategoryChange(null)}
          className={cn(
            "rounded-full px-3 py-1 text-sm font-medium transition-colors",
            selectedCategory === null
              ? "bg-primary-600 text-white"
              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
          )}
        >
          全部
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={cn(
              "rounded-full px-3 py-1 text-sm font-medium transition-colors",
              selectedCategory === category
                ? "bg-primary-600 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-neutral-500">阶段：</span>
        <button
          type="button"
          onClick={() => onStageChange(null)}
          className={cn(
            "rounded-full px-3 py-1 text-sm font-medium transition-colors",
            selectedStage === null
              ? "bg-accent-600 text-white"
              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
          )}
        >
          全部
        </button>
        {stages.map((stage) => (
          <button
            key={stage}
            type="button"
            onClick={() => onStageChange(stage)}
            className={cn(
              "rounded-full px-3 py-1 text-sm font-medium transition-colors",
              selectedStage === stage
                ? "bg-accent-600 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            )}
          >
            {stage}
          </button>
        ))}
      </div>
    </div>
  );
}
