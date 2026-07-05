import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import { type AnchorHTMLAttributes } from "react";

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  showIcon?: boolean;
}

export function ExternalLink({
  children,
  className,
  showIcon = true,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 hover:underline underline-offset-4",
        className
      )}
      {...props}
    >
      {children}
      {showIcon ? <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
    </a>
  );
}
