"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const mm = gsap.matchMedia();

      // Xuất hiện tiêu đề
      gsap.from("[data-contact-line] > span", {
        yPercent: 110,
        duration: 0.95,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 68%", once: true },
      });

      gsap.from("[data-contact-meta]", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-contact-meta-wrap]", start: "top 88%", once: true },
      });

      // Desktop riêng biệt
      mm.add("(min-width: 900px) and (pointer: fine)", () => {
        if (orbRef.current) {
          gsap.to(orbRef.current, {
            yPercent: 20,
            scale: 1.15,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.6,
            },
          });
        }
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="contact" className="contact" aria-labelledby="contact-title">
      <div ref={orbRef} className="contact__orb" aria-hidden="true" style={{ pointerEvents: "none" }} />
      <div className="section-shell contact__inner">
        <div className="section-index section-index--light"><span>05</span><span>Contact</span></div>
        <div className="contact__availability"><i /> {portfolio.person.availability}</div>
        <h2 id="contact-title" className="contact__title">
          <span data-contact-line><span>LET&apos;S MAKE</span></span>
          <span data-contact-line><span>SOMETHING</span></span>
          <span data-contact-line><span className="contact__outline">MEMORABLE.</span></span>
        </h2>
        <div className="contact__meta" data-contact-meta-wrap>
          <p data-contact-meta>Have a project in mind, a role to discuss,<br />or just want to say hello?</p>
          <a href={`mailto:${portfolio.person.email}`} className="contact__email" data-contact-meta data-cursor="Email">
            {portfolio.person.email}<ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <footer className="footer" data-contact-meta>
          <div><span>Local time</span><p>{portfolio.person.timezone} · {portfolio.person.location}</p></div>
          <div><span>Find me</span><nav aria-label="Mạng xã hội">{portfolio.socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}<ArrowUpRight aria-hidden="true" /></a>)}</nav></div>
          <p className="footer__copyright">© {portfolio.copyrightYear} {portfolio.person.name}<br />Designed &amp; built with intention.</p>
          <a href="#top" className="footer__top" aria-label="Quay về đầu trang"><ArrowUp aria-hidden="true" /><span>Back to top</span></a>
        </footer>
      </div>
    </section>
  );
}
