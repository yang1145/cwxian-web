"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";

interface ChecklistProps {
  items: string[];
  className?: string;
}

export function Checklist({ items, className }: ChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const allChecked = checkedItems.size === items.length && items.length > 0;

  return (
    <div className={cn("rounded-2xl border border-neutral-200 bg-white p-6", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-900">条件自检清单</h3>
        <span
          className={cn(
            "text-sm font-medium",
            allChecked ? "text-green-600" : "text-neutral-500"
          )}
        >
          {checkedItems.size}/{items.length}
        </span>
      </div>

      <ul className="space-y-3">
        {items.map((item, index) => {
          const isChecked = checkedItems.has(index);
          return (
            <li key={index}>
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                  isChecked
                    ? "border-primary-200 bg-primary-50"
                    : "border-neutral-200 bg-white hover:bg-neutral-50"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors",
                    isChecked
                      ? "border-primary-600 bg-primary-600 text-white"
                      : "border-neutral-300 bg-white"
                  )}
                  aria-hidden="true"
                >
                  {isChecked ? <Check className="h-3.5 w-3.5" /> : null}
                </span>
                <span
                  className={cn(
                    "text-sm",
                    isChecked ? "text-primary-900" : "text-neutral-700"
                  )}
                >
                  {item}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {allChecked ? (
        <p className="mt-4 rounded-xl bg-green-50 p-4 text-sm text-green-800">
          太棒了！你已确认符合基本申请条件，可以继续阅读下方的开通指引。
        </p>
      ) : null}
    </div>
  );
}
