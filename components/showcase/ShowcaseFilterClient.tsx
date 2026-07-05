"use client";

import { useMemo, useState } from "react";
import type { Showcase } from "@/types";
import { ShowcaseFilter } from "./ShowcaseFilter";
import { ShowcaseCard } from "./ShowcaseCard";

interface ShowcaseFilterClientProps {
  categories: string[];
  stages: string[];
  showcases: Showcase[];
}

export function ShowcaseFilterClient({
  categories,
  stages,
  showcases,
}: ShowcaseFilterClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const filteredShowcases = useMemo(() => {
    return showcases.filter((showcase) => {
      const categoryMatch = selectedCategory ? showcase.category === selectedCategory : true;
      const stageMatch = selectedStage ? showcase.stage === selectedStage : true;
      return categoryMatch && stageMatch;
    });
  }, [showcases, selectedCategory, selectedStage]);

  return (
    <>
      <ShowcaseFilter
        categories={categories}
        stages={stages}
        selectedCategory={selectedCategory}
        selectedStage={selectedStage}
        onCategoryChange={setSelectedCategory}
        onStageChange={setSelectedStage}
      />

      {filteredShowcases.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredShowcases.map((showcase) => (
            <ShowcaseCard key={showcase.id} showcase={showcase} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-12 text-center">
          <p className="text-neutral-600">没有符合当前筛选条件的案例。</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory(null);
              setSelectedStage(null);
            }}
            className="mt-4 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            清除筛选条件
          </button>
        </div>
      )}
    </>
  );
}
