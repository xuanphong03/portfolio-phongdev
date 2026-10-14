// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO CONTENT — Edit this file to replace all sample personal data.
// Project cover images live in /public/projects.
// ─────────────────────────────────────────────────────────────────────────────

export const portfolio = {
  copyrightYear: "2026",
  person: {
    name: "Phong Nguyen",
    shortName: "Phong.",
    role: "Frontend Developer & Creative Coder",
    location: "Ho Chi Minh City, Vietnam",
    timezone: "GMT+7",
    email: "ngxphong03@gmail.com",
    availability: "Available for selected projects",
  },
  navigation: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#projects" },
    { label: "Experience", href: "#experience" },
  ],
  hero: {
    eyebrow: "Independent developer · 2026",
    title: ["I shape ideas", "into digital", "experiences."],
    description:
      "I design and build expressive, high-performance web experiences where sharp engineering meets purposeful motion.",
  },
  about: {
    eyebrow: "The person behind the pixels",
    title: "Building with intent, not just components.",
    paragraphs: [
      "I’m a frontend developer focused on translating ambitious ideas into interfaces that feel effortless. My work lives at the intersection of thoughtful design, clean code and meaningful interaction.",
      "From early sketches to the final shipped detail, I care about the whole experience—how it looks, how it moves, how fast it loads and how naturally people can use it.",
    ],
    stats: [
      { value: "04+", label: "Years crafting for web" },
      { value: "28", label: "Products shipped" },
      { value: "12", label: "Global collaborators" },
      { value: "99", label: "Lighthouse target" },
    ],
  },
  skills: {
    marquee: [
      "Next.js",
      "TypeScript",
      "React",
      "GSAP",
      "Motion Design",
      "Design Systems",
      "WebGL",
      "Accessibility",
    ],
    groups: [
      {
        number: "01",
        title: "Frontend",
        description: "Product-grade interfaces built for clarity, speed and scale.",
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST / GraphQL"],
      },
      {
        number: "02",
        title: "Motion",
        description: "Movement that guides attention and gives interfaces a pulse.",
        items: ["GSAP", "ScrollTrigger", "Lenis", "Framer Motion", "Three.js"],
      },
      {
        number: "03",
        title: "Workflow",
        description: "A collaborative toolkit from first frame through deployment.",
        items: ["Figma", "Storybook", "Git / GitHub", "Vercel", "Playwright"],
      },
    ],
  },
  // These are realistic demo projects and public links. Replace titles, copy,
  // cover images, demoUrl and githubUrl with your own work before publishing.
  projects: [
    {
      number: "01",
      title: "Commerce / 01",
      category: "Digital flagship store",
      description:
        "A headless storefront where editorial storytelling and frictionless shopping move as one.",
      year: "2026",
      image: "/projects/commerce.svg",
      imageAlt: "Abstract lime interface for a fashion commerce experience",
      technologies: ["Next.js", "Shopify", "GSAP"],
      demoUrl: "https://demo.vercel.store",
      githubUrl: "https://github.com/vercel/commerce",
      accent: "lime",
    },
    {
      number: "02",
      title: "Interface / 02",
      category: "Design system",
      description:
        "An opinionated component language that makes complex product workflows feel calm and consistent.",
      year: "2025",
      image: "/projects/interface.svg",
      imageAlt: "Electric blue modular interface system",
      technologies: ["React", "Radix UI", "Storybook"],
      demoUrl: "https://ui.shadcn.com",
      githubUrl: "https://github.com/shadcn-ui/ui",
      accent: "blue",
    },
    {
      number: "03",
      title: "Signal / 03",
      category: "Creative portfolio",
      description:
        "A motion-led canvas for independent makers, balancing expressive transitions with instant navigation.",
      year: "2025",
      image: "/projects/signal.svg",
      imageAlt: "Orange editorial creative portfolio composition",
      technologies: ["Next.js", "GSAP", "WebGL"],
      demoUrl: "https://gsap.com/showcase/",
      githubUrl: "https://github.com/greensock/GSAP",
      accent: "orange",
    },
    {
      number: "04",
      title: "Pulse / 04",
      category: "Realtime dashboard",
      description:
        "A data-dense operations surface tuned for fast decisions, legibility and keyboard-first control.",
      year: "2024",
      image: "/projects/pulse.svg",
      imageAlt: "Purple and lime data dashboard visualization",
      technologies: ["TypeScript", "D3.js", "WebSockets"],
      demoUrl: "https://recharts.org/en-US/examples",
      githubUrl: "https://github.com/recharts/recharts",
      accent: "violet",
    },
    {
      number: "05",
      title: "Sonic / 05",
      category: "Audio experiment",
      description:
        "A playful browser instrument turning sound into tactile, generative visual compositions.",
      year: "2024",
      image: "/projects/sonic.svg",
      imageAlt: "Red and cream generative audio waveform artwork",
      technologies: ["Web Audio", "Canvas", "React"],
      demoUrl: "https://tonejs.github.io/examples/",
      githubUrl: "https://github.com/Tonejs/Tone.js",
      accent: "red",
    },
  ],
  experience: [
    {
      period: "2024 — Now",
      role: "Senior Frontend Developer",
      company: "Independent / Remote",
      description:
        "Partnering with product teams and studios to ship expressive websites, design systems and interactive product experiences.",
      current: true,
    },
    {
      period: "2022 — 2024",
      role: "Frontend Developer",
      company: "Digital Product Studio",
      description:
        "Led frontend delivery across SaaS and commerce projects, establishing reusable architecture and a motion practice.",
      current: false,
    },
    {
      period: "2020 — 2022",
      role: "UI Developer",
      company: "Creative Agency",
      description:
        "Turned visual concepts into responsive campaigns and brand sites with meticulous attention to interaction details.",
      current: false,
    },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/nguyenxuanphong" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nguyenxuanphong" },
  ],
} as const;

export type Project = (typeof portfolio.projects)[number];
