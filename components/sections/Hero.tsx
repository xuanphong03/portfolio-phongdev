"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { MagneticLink } from "@/components/ui/MagneticLink";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const orbitFloatRef = useRef<HTMLDivElement>(null);
  const orbitRotateRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      // 1. Vòng xoay liên tục (Continuous Rotation) chạy độc lập trên layer rotator
      // Tách biệt hoàn toàn khỏi ma trận transform của Scroll và Mouse Cursor
      gsap.to(orbitRotateRef.current, {
        rotate: 360,
        duration: 38,
        ease: "none",
        repeat: -1,
        force3D: true,
      });

      // 2. Entrance timeline: dứt khoát, thanh thoát và không gây cảm giác chờ đợi
      const timeline = gsap.timeline({ delay: 1.1, defaults: { ease: "power3.out" } });
      timeline
        .from("[data-hero-line] > span", { yPercent: 110, duration: 0.95, stagger: 0.08 })
        .from("[data-hero-meta]", { y: 20, opacity: 0, duration: 0.7, stagger: 0.06 }, "<0.25")
        .from(orbitFloatRef.current, { scale: 0.5, opacity: 0, duration: 0.9, ease: "back.out(1.4)" }, "<0.1")
        .from("[data-scroll-cue]", { opacity: 0, y: 10, duration: 0.5 }, "<0.3");

      const mm = gsap.matchMedia();

      // 3. Desktop (Màn hình >= 900px và pointer chuột chuẩn xác)
      mm.add("(min-width: 900px) and (pointer: fine)", () => {
        // Tầng 0: Background Parallax
        gsap.to([gridRef.current, glowRef.current], {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // Tầng 1: Typography chuyển động thanh thoát khi cuộn
        gsap.to(".hero__line--1 > span", {
          xPercent: -8,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".hero__line--2 > span", {
          xPercent: 10,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".hero__line--3 > span", {
          xPercent: -6,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // Tầng 2: Orbit di chuyển theo scroll có trọng lượng & thu nhỏ mượt mà
        // - ease: "power1.out" giúp nhịp bắt đầu cuộn êm đềm, không bị co giật đột ngột
        // - scrub: 1.2 tạo quán tính vật lý (inertia damper) triệt tiêu khấc giật của con lăn chuột
        // - scale: 0.9 (giảm 10%) kết hợp opacity 0.72 giữ vững visual anchor và tạo chiều sâu 3D
        gsap.to(orbitRef.current, {
          yPercent: 30,
          scale: 0.9,
          opacity: 0.72,
          ease: "power1.out",
          force3D: true,
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        // Tầng tương tác chuột: Magnetic float trên orbitFloatRef (độc lập với scroll & rotate)
        const heroEl = root.current;
        if (heroEl && orbitFloatRef.current) {
          const setOrbitX = gsap.quickTo(orbitFloatRef.current, "x", { duration: 0.75, ease: "power2.out" });
          const setOrbitY = gsap.quickTo(orbitFloatRef.current, "y", { duration: 0.75, ease: "power2.out" });

          const handlePointerMove = (e: PointerEvent) => {
            const rect = heroEl.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;
            setOrbitX(relX * 22);
            setOrbitY(relY * 18);
          };

          const handlePointerLeave = () => {
            setOrbitX(0);
            setOrbitY(0);
          };

          heroEl.addEventListener("pointermove", handlePointerMove);
          heroEl.addEventListener("pointerleave", handlePointerLeave);

          return () => {
            heroEl.removeEventListener("pointermove", handlePointerMove);
            heroEl.removeEventListener("pointerleave", handlePointerLeave);
          };
        }
      });

      // 4. Tablet / Mobile: Cuộn êm ái thích ứng, không gán pointer listener
      mm.add("(max-width: 899px), (pointer: coarse)", () => {
        gsap.to(orbitRef.current, {
          yPercent: 18,
          scale: 0.93,
          opacity: 0.8,
          ease: "power1.out",
          force3D: true,
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.0,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="hero section-shell" aria-labelledby="hero-title">
      <div ref={glowRef} className="hero__glow" data-hero-glow aria-hidden="true" />
      <div ref={gridRef} className="hero__grid" aria-hidden="true" />
      <div className="hero__topline" data-hero-meta>
        <span className="eyebrow"><i /> {portfolio.hero.eyebrow}</span>
        <span className="hero__coordinates">10.8231° N / 106.6297° E</span>
      </div>

      <div className="hero__title-wrap">
        <h1 id="hero-title" className="hero__title">
          {portfolio.hero.title.map((line, index) => (
            <span key={line} className={`hero__line hero__line--${index + 1}`} data-hero-line>
              <span>{line}</span>
            </span>
          ))}
        </h1>
        <div ref={orbitRef} className="hero__orbit" data-hero-orbit aria-hidden="true">
          <div ref={orbitFloatRef} className="hero__orbit-float">
            <div className="hero__orbit-disc">
              <div ref={orbitRotateRef} className="hero__orbit-rotator">
                <svg viewBox="0 0 140 140" aria-hidden="true">
                  <defs>
                    <path id="orbit-path" d="M70,70 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" />
                  </defs>
                  <text>
                    <textPath href="#orbit-path">FRONTEND • DESIGN • MOTION • CODE • </textPath>
                  </text>
                </svg>
              </div>
              <span className="hero__orbit-icon" aria-hidden="true">↗</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__bottom">
        <div className="hero__availability" data-hero-meta>
          <span className="availability-dot" />
          <span>{portfolio.person.availability}</span>
        </div>
        <div className="hero__intro" data-hero-meta>
          <p>{portfolio.hero.description}</p>
          <div className="hero__actions">
            <MagneticLink href="#projects" variant="primary" icon="down">View projects</MagneticLink>
            <MagneticLink href={`mailto:${portfolio.person.email}`} variant="outline" icon="up">Contact me</MagneticLink>
          </div>
        </div>
      </div>

      <a href="#about" className="hero__scroll-cue" data-scroll-cue aria-label="Cuộn đến phần giới thiệu">
        <span>Scroll to discover</span>
        <ArrowDown aria-hidden="true" size={18} />
      </a>
    </section>
  );
}
