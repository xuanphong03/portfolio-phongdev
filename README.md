# Phong Nguyen — Creative Developer Portfolio

Premium one-page portfolio built with Next.js App Router, TypeScript, Tailwind CSS, GSAP + ScrollTrigger and Lenis.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If that port is occupied, Next.js prints the available port in the terminal.

Production validation:

```bash
npm run lint
npm run build
```

## Customize content

All portfolio copy and links are centralized in [`data/portfolio.ts`](data/portfolio.ts):

- Name, role, location and email: `portfolio.person`
- Hero and about copy: `portfolio.hero` / `portfolio.about`
- Skills: `portfolio.skills`
- Projects, demo links and GitHub links: `portfolio.projects`
- Work history: `portfolio.experience`
- Social links: `portfolio.socials`

Replace project artwork in [`public/projects`](public/projects) and keep the corresponding `image` paths in `data/portfolio.ts` in sync. Update `metadataBase` and SEO fields in [`app/layout.tsx`](app/layout.tsx) before deploying to your own domain.

## Motion and accessibility

- GSAP effects use `useGSAP`/scoped contexts for automatic cleanup.
- Desktop projects use a pinned horizontal ScrollTrigger experience; screens below 900px use a vertical list.
- `prefers-reduced-motion` disables the intro, smooth scrolling, cursor and motion timelines while retaining all content.
- Focus states, skip navigation, semantic landmarks, keyboard-operable mobile navigation and meaningful image alt text are included.
