import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
}

export function Alert({
  children,
  className,
  variant = "info",
  ...props
}: AlertProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        {
          "border-primary-200 bg-primary-50 text-primary-800": variant === "info",
          "border-green-200 bg-green-50 text-green-800": variant === "success",
          "border-amber-200 bg-amber-50 text-amber-800": variant === "warning",
          "border-red-200 bg-red-50 text-red-800": variant === "error",
        },
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3">{children}</div>
    </div>
  );
}
