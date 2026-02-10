/**
 * Vercel feature flag config: single source of truth for section flags and content.
 * Change sections by editing this config; flags are evaluated by the Flags SDK.
 */

/** Section-level A/B flags (hero, cta) – used on About page */
export const SECTION_FLAG_IDS = ["hero", "cta"] as const;
export type SectionFlagId = (typeof SECTION_FLAG_IDS)[number];

/** Page-level flags – About page only (home uses HOME_PAGE_VARIANT_OPTIONS) */
export const PAGE_FLAG_IDS = ["page_about"] as const;
export type PageFlagId = (typeof PAGE_FLAG_IDS)[number];

export type SectionVariant = "a" | "b";
export type PageVariant = "control" | "variant";

/**
 * Whole-homepage variant: one Vercel flag controls the entire home page.
 * Currently A and B; extend to C…Z by adding entries here and content in HERO_CONTENT / CTA_CONTENT.
 */
export const HOME_PAGE_VARIANT_OPTIONS = [
  { value: "a" as const, label: "Variant A" },
  { value: "b" as const, label: "Variant B" },
  // e.g. { value: "c", label: "Variant C" },
];
export type HomePageVariant =
  (typeof HOME_PAGE_VARIANT_OPTIONS)[number]["value"];

export interface FlagOption<T extends string> {
  value: T;
  label: string;
}

export interface FlagDefinition<T extends string = string> {
  key: string;
  description: string;
  options: readonly FlagOption<T>[];
}

/** Section flag definitions – used by flags.ts and UI */
export const SECTION_FLAG_DEFINITIONS: Record<
  SectionFlagId,
  FlagDefinition<SectionVariant>
> = {
  hero: {
    key: "hero-variant",
    description: "Hero section: variant A or B",
    options: [
      { value: "a", label: "Variant A" },
      { value: "b", label: "Variant B" },
    ],
  },
  cta: {
    key: "cta-variant",
    description: "CTA section: variant A or B",
    options: [
      { value: "a", label: "Variant A" },
      { value: "b", label: "Variant B" },
    ],
  },
};

/** Home page: single flag for whole page (Variant A or B, extensible to Z). */
export const HOME_PAGE_FLAG_DEFINITION: FlagDefinition<HomePageVariant> = {
  key: "home-page-variant",
  description:
    "Whole homepage experience: Variant A or B (change via Vercel flag)",
  options: HOME_PAGE_VARIANT_OPTIONS,
};

/** Page flag definitions (About page only). */
export const PAGE_FLAG_DEFINITIONS: Record<
  PageFlagId,
  FlagDefinition<PageVariant>
> = {
  page_about: {
    key: "about-page-variant",
    description: "About page experience: control vs variant",
    options: [
      { value: "control", label: "Control" },
      { value: "variant", label: "Variant" },
    ],
  },
};

/** Content for a single variant of a section – change copy by editing this config */
export interface HeroSectionContent {
  title: string;
  subtitle: string;
  ctaLabel: string;
}

export interface CtaSectionContent {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

/** Section content keyed by section id and variant. Change sections by editing here. */
export const HERO_CONTENT: Record<SectionVariant, HeroSectionContent> = {
  a: {
    title: "To get started, edit the page.tsx file.",
    subtitle:
      "Looking for a starting point or more instructions? Head over to Templates or the Learning center.",
    ctaLabel: "Get started",
  },
  b: {
    title: "Build something great with Next.js",
    subtitle:
      "Get started by exploring Vercel templates or dive into the Next.js docs.",
    ctaLabel: "Explore",
  },
};

/** About page hero content */
export const ABOUT_HERO_CONTENT: Record<SectionVariant, HeroSectionContent> = {
  a: {
    title: "About us",
    subtitle:
      "This is the about page. Learn more about our project and how we use A/B testing with built-in variants.",
    ctaLabel: "Learn more",
  },
  b: {
    title: "Who we are",
    subtitle:
      "Discover how we run experiments with page-wise and section-wise variants with stable per-visitor variants.",
    ctaLabel: "Discover",
  },
};

/** CTA section content – home page (two buttons) */
export const CTA_CONTENT: Record<SectionVariant, CtaSectionContent> = {
  a: {
    primaryLabel: "Deploy Now",
    primaryHref: "https://vercel.com/new",
    secondaryLabel: "Documentation",
    secondaryHref: "https://nextjs.org/docs",
  },
  b: {
    primaryLabel: "Deploy Now",
    primaryHref: "https://vercel.com/new",
    secondaryLabel: "Documentation",
    secondaryHref: "https://nextjs.org/docs",
  },
};

/** CTA section content – about page (single “Back to home” button) */
export const ABOUT_CTA_CONTENT: Record<SectionVariant, CtaSectionContent> = {
  a: { primaryLabel: "Back to home", primaryHref: "/" },
  b: { primaryLabel: "Go to home", primaryHref: "/" },
};

/** Resolved flag values for About page (section + page variant). Home uses homePageVariant only. */
export interface PageFlagValues {
  section: Record<SectionFlagId, SectionVariant>;
  page: Record<PageFlagId, PageVariant>;
}
