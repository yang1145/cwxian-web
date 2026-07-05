import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface SubSiteLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  showIcon?: boolean;
}

export function SubSiteLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  showIcon = true,
}: SubSiteLinkProps) {
  return (
    <Button variant={variant} size={size} className={cn(className)} asChild>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2"
      >
        {children}
        {showIcon ? <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /> : null}
      </a>
    </Button>
  );
}
