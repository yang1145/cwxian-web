"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  items: { label: string; href: string }[];
}

export function MobileNav({ isOpen, onClose, items }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      className="lg:hidden absolute top-full left-0 right-0 border-b border-neutral-200 bg-white shadow-elevated"
    >
      <div className="space-y-1 px-4 py-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="block rounded-lg px-3 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-primary-600"
          >
            {item.label}
          </Link>
        ))}
        <div className="mt-4 flex flex-col gap-2 border-t border-neutral-100 pt-4">
          <Button asChild variant="primary" className="justify-center">
            <Link href="/get-started/domain/">注册域名</Link>
          </Button>
          <Button asChild variant="outline" className="justify-center">
            <Link href="/get-started/hosting/">开通空间</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
