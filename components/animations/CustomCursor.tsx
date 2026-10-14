"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches || !dotRef.current || !followerRef.current) return;

    const dot = dotRef.current;
    const follower = followerRef.current;
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
    const followerX = gsap.quickTo(follower, "x", { duration: 0.45, ease: "power3.out" });
    const followerY = gsap.quickTo(follower, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      dotX(event.clientX);
      dotY(event.clientY);
      followerX(event.clientX);
      followerY(event.clientY);
      dot.dataset.visible = "true";
      follower.dataset.visible = "true";
    };

    const onOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor]");
      const label = target?.dataset.cursor ?? "";
      follower.dataset.active = target ? "true" : "false";
      follower.dataset.label = label;
      follower.textContent = label;
    };

    const onLeave = () => {
      dot.dataset.visible = "false";
      follower.dataset.visible = "false";
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={followerRef} className="cursor-follower" aria-hidden="true" />
    </>
  );
}
