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
    gsap.to(element, {
      x: (event.clientX - rect.left - rect.width / 2) * 0.18,
      y: (event.clientY - rect.top - rect.height / 2) * 0.18,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.35)" });
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
