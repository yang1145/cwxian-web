import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary-600 text-white hover:bg-primary-500 hover:text-white shadow-sm": variant === "primary",
            "bg-accent-500 text-white hover:bg-accent-600 hover:text-white shadow-sm": variant === "secondary",
            "border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 hover:text-neutral-700": variant === "outline",
            "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900": variant === "ghost",
            "text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline": variant === "link",
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4 text-sm": size === "md",
            "h-12 px-6 text-base": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
