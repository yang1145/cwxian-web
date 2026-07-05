"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({
  items,
  defaultOpen = [],
  allowMultiple = false,
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn("divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white", className)}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div key={item.id} className="first:rounded-t-2xl last:rounded-b-2xl">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <span className="text-base font-medium text-neutral-900">{item.title}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 flex-shrink-0 text-neutral-500 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id={`accordion-content-${item.id}`}
              className={cn(
                "overflow-hidden transition-all duration-200",
                isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              )}
              aria-hidden={!isOpen}
            >
              <div className="px-5 pb-5 text-neutral-600">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
