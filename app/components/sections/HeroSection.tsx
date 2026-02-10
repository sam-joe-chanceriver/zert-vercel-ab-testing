import Link from "next/link";
import type { HeroSectionContent } from "@/lib/feature-flag-config";
import { SectionActionButton } from "../SectionActionButton";

type HeroSectionProps = {
  /** Resolved from flag; content from config for this variant */
  variant: "a" | "b";
  content: HeroSectionContent;
  /** Page context for analytics */
  page: "home" | "about";
};

export function HeroSection({ variant, content, page }: HeroSectionProps) {
  return (
    <section className="flex flex-col items-center gap-6 py-16 text-center sm:items-start sm:text-left">
      <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-zinc-950 dark:text-zinc-50">
        {content.title}
      </h1>
      <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        {content.subtitle}
      </p>
      <SectionActionButton
        page={page}
        section="hero"
        variant={variant}
        label={content.ctaLabel}
      />
    </section>
  );
}
