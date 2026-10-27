"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    // Trên thiết bị cảm ứng (Mobile/Tablet): sử dụng cuộn native 120Hz của phần cứng
    // Giúp loại bỏ hoàn toàn độ trễ, hiện tượng giật/lag hoặc khựng cảm ứng
    if (isTouch) {
      const onNativeScroll = () => ScrollTrigger.update();
      window.addEventListener("scroll", onNativeScroll, { passive: true });
      return () => window.removeEventListener("scroll", onNativeScroll);
    }

    // Trên Desktop: sử dụng Lenis cuộn mượt cao cấp kết hợp GSAP ticker
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.0,
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return null;
}
