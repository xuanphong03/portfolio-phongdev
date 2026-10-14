"use client";

import Image from "next/image";
import { type MouseEvent, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Code2 } from "lucide-react";
import { portfolio, type Project } from "@/data/portfolio";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null);

  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 3;
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -3;
    gsap.to(card.querySelector(".project-card__visual"), {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    const visual = cardRef.current?.querySelector(".project-card__visual");
    if (visual) gsap.to(visual, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out" });
  };

  return (
    <article ref={cardRef} className={`project-card project-card--${project.accent}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      <a
        href={project.demoUrl}
        target="_blank"
        rel="noreferrer"
        className="project-card__visual"
        data-cursor="View"
        aria-label={`Xem demo ${project.title}`}
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 767px) 92vw, 64vw"
          className="project-card__image"
        />
        <span className="project-card__number">{project.number}</span>
        <span className="project-card__view">View project <ArrowUpRight aria-hidden="true" /></span>
      </a>
      <div className="project-card__info">
        <div>
          <p>{project.category}</p>
          <h3>{project.title}</h3>
        </div>
        <p className="project-card__description">{project.description}</p>
        <div className="project-card__meta">
          <ul>{project.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>
          <div className="project-card__links">
            <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`GitHub của ${project.title}`}><Code2 aria-hidden="true" /></a>
            <a href={project.demoUrl} target="_blank" rel="noreferrer" aria-label={`Demo của ${project.title}`}><ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        if (!track.current) return;
        const horizontal = gsap.to(track.current, {
          x: () => -(track.current!.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${track.current!.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>(".project-card__image").forEach((image) => {
          gsap.fromTo(image, { xPercent: -5 }, {
            xPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              containerAnimation: horizontal,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          });
        });
      });
      mm.add("(max-width: 899px)", () => {
        gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
          gsap.from(card, {
            y: 55,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 84%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="projects" className="projects" aria-labelledby="projects-title">
      <div ref={track} className="projects__track">
        <div className="projects__intro section-shell">
          <div className="section-index"><span>03</span><span>Selected work</span></div>
          <div>
            <p className="eyebrow">A few things I&apos;ve helped bring to life</p>
            <h2 id="projects-title" className="projects__title">SELECTED<br /><span>PRO</span>JECTS</h2>
            <div className="projects__hint"><span>Scroll to explore</span><i>→</i></div>
          </div>
        </div>
        {portfolio.projects.map((project) => <ProjectCard key={project.title} project={project} />)}
        <div className="projects__outro">
          <span>05 / 05</span>
          <p>Have an idea that<br />deserves better?</p>
          <a href="#contact">Let&apos;s build it <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
