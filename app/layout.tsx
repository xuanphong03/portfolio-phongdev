import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://phongdev.vercel.app"),
  title: {
    default: "Phong Nguyen — Frontend Developer & Creative Coder",
    template: "%s — Phong Nguyen",
  },
  description:
    "Portfolio of Phong Nguyen, a frontend developer crafting expressive, accessible and high-performance digital experiences.",
  keywords: ["Frontend Developer", "Creative Developer", "Next.js", "TypeScript", "GSAP", "Vietnam"],
  authors: [{ name: "Phong Nguyen" }],
  creator: "Phong Nguyen",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Phong Nguyen — Frontend Developer & Creative Coder",
    description: "Expressive digital experiences, engineered with intent.",
    siteName: "Phong Nguyen Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phong Nguyen — Frontend Developer & Creative Coder",
    description: "Expressive digital experiences, engineered with intent.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${syne.variable} h-full antialiased`}>
      <body>{children}</body>
    </html>
  );
}
