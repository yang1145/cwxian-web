import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "outline" | "success" | "warning" | "error";
}

export function Badge({
  children,
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-primary-100 text-primary-700": variant === "primary",
          "bg-accent-100 text-accent-700": variant === "secondary",
          "bg-neutral-100 text-neutral-700": variant === "default",
          "border border-neutral-300 text-neutral-700": variant === "outline",
          "bg-green-100 text-green-700": variant === "success",
          "bg-amber-100 text-amber-700": variant === "warning",
          "bg-red-100 text-red-700": variant === "error",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
