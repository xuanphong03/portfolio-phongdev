"use client";

import { type MouseEvent, type ReactNode, useRef } from "react";
import gsap from "gsap";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type MagneticLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "text";
  external?: boolean;
  icon?: "down" | "up" | "none";
  className?: string;
  cursorLabel?: string;
};

export function MagneticLink({
  href,
  children,
  variant = "outline",
  external = false,
  icon = "none",
  className = "",
  cursorLabel,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * 0.24,
      y: y * 0.24,
      duration: 0.35,
      ease: "power2.out",
    });

    const inner = element.querySelector("span");
    if (inner) {
      gsap.to(inner, {
        x: x * 0.1,
        y: y * 0.1,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  };

  const onLeave = () => {
    if (!ref.current) return;
    const inner = ref.current.querySelector("span");
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.75, ease: "elastic.out(1, 0.35)" });
    if (inner) {
      gsap.to(inner, { x: 0, y: 0, duration: 0.75, ease: "elastic.out(1, 0.35)" });
    }
  };

  return (
    <a
      ref={ref}
      href={href}
      className={`magnetic-link magnetic-link--${variant} ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      data-cursor={cursorLabel}
    >
      <span>{children}</span>
      {icon === "down" && <ArrowDownRight aria-hidden="true" size={19} strokeWidth={1.7} />}
      {icon === "up" && <ArrowUpRight aria-hidden="true" size={19} strokeWidth={1.7} />}
    </a>
  );
}
