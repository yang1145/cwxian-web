"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
  delay?: number;
  stagger?: number;
  direction?: "up" | "left" | "right" | "none";
  duration?: number;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ScrollReveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  stagger = 0,
  direction = "up",
  duration = 0.7,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;

    const fromVars: gsap.TweenVars = { opacity: 0 };
    if (direction === "up") fromVars.y = 40;
    else if (direction === "left") fromVars.x = -40;
    else if (direction === "right") fromVars.x = 40;

    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, fromVars, {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        stagger: stagger || undefined,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      });
    }, ref.current);

    return () => ctx.revert();
  }, [delay, stagger, direction, duration]);

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
