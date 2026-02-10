import type { ReadonlyRequestCookies } from "flags";
import { dedupe, flag } from "flags/next";
import type { HomePageVariant } from "@/lib/feature-flag-config";
import type { PageFlagId, SectionFlagId } from "@/lib/feature-flag-config";
import {
  HOME_PAGE_FLAG_DEFINITION,
  PAGE_FLAG_DEFINITIONS,
  SECTION_FLAG_DEFINITIONS,
} from "@/lib/feature-flag-config";

/** Evaluation context: visitor id from cookie or header (set by middleware). */
interface Entities {
  visitor?: { id: string };
}

function hashToIndex(id: string, length: number): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h << 5) - h + id.charCodeAt(i);
  return Math.abs(h) % length;
}

const identify = dedupe(
  ({
    cookies,
    headers,
  }: {
    cookies: ReadonlyRequestCookies;
    headers: Headers;
  }): Entities => {
    const id =
      cookies.get("ab-visitor-id")?.value ??
      headers.get("x-ab-visitor-id") ??
      "anonymous";
    return { visitor: { id } };
  }
);

// --- Page flags (from config) ---

/** Home page: whole page is Variant A or B (controlled by one Vercel flag). Extensible to more. */
export const homePageVariant = flag<HomePageVariant, Entities>({
  ...HOME_PAGE_FLAG_DEFINITION,
  options: [...HOME_PAGE_FLAG_DEFINITION.options],
  identify,
  decide({ entities }) {
    const id = entities?.visitor?.id ?? "anonymous";
    const opts = HOME_PAGE_FLAG_DEFINITION.options;
    return opts[hashToIndex(id, opts.length)].value;
  },
});

/** About page A/B variant (control | variant). */
export const aboutPageVariant = flag<"control" | "variant", Entities>({
  ...PAGE_FLAG_DEFINITIONS.page_about,
  options: [...PAGE_FLAG_DEFINITIONS.page_about.options],
  identify,
  decide({ entities }) {
    const id = entities?.visitor?.id ?? "anonymous";
    const opts = PAGE_FLAG_DEFINITIONS.page_about.options;
    return opts[hashToIndex(id + "about", opts.length)].value;
  },
});

// --- Section flags (from config) ---

/** Hero section A/B variant (a | b). */
export const heroVariant = flag<"a" | "b", Entities>({
  ...SECTION_FLAG_DEFINITIONS.hero,
  options: [...SECTION_FLAG_DEFINITIONS.hero.options],
  identify,
  decide({ entities }) {
    const id = entities?.visitor?.id ?? "anonymous";
    const opts = SECTION_FLAG_DEFINITIONS.hero.options;
    return opts[hashToIndex(id + "hero", opts.length)].value;
  },
});

/** CTA section A/B variant (a | b). */
export const ctaVariant = flag<"a" | "b", Entities>({
  ...SECTION_FLAG_DEFINITIONS.cta,
  options: [...SECTION_FLAG_DEFINITIONS.cta.options],
  identify,
  decide({ entities }) {
    const id = entities?.visitor?.id ?? "anonymous";
    const opts = SECTION_FLAG_DEFINITIONS.cta.options;
    return opts[hashToIndex(id + "cta", opts.length)].value;
  },
});

// --- Config-driven evaluators (use these with the flag interface) ---

export type SectionFlagValues = Record<SectionFlagId, "a" | "b">;
export type PageFlagValuesMap = Record<PageFlagId, "control" | "variant">;

const sectionGetters: Record<SectionFlagId, () => Promise<"a" | "b">> = {
  hero: heroVariant,
  cta: ctaVariant,
};

const pageGetters: Record<PageFlagId, () => Promise<"control" | "variant">> = {
  page_about: aboutPageVariant,
};

/** Evaluate all section flags from config. Use to drive sections from flag interface. */
export async function getSectionFlagValues(): Promise<SectionFlagValues> {
  const [hero, cta] = await Promise.all([
    sectionGetters.hero(),
    sectionGetters.cta(),
  ]);
  return { hero, cta };
}

/** Evaluate all page flags (About page only; home uses homePageVariant). */
export async function getPageFlagValues(): Promise<PageFlagValuesMap> {
  const page_about = await pageGetters.page_about();
  return { page_about };
}

/** Evaluate flag for the home page: one variant (A or B) for the whole page. */
export async function getFlagsForHomePage(): Promise<{
  homeVariant: HomePageVariant;
}> {
  const homeVariant = await homePageVariant();
  return { homeVariant };
}

/** Evaluate flags for the about page (page variant + section variants). */
export async function getFlagsForAboutPage(): Promise<{
  pageVariant: "control" | "variant";
  section: SectionFlagValues;
}> {
  const [pageVariant, section] = await Promise.all([
    aboutPageVariant(),
    getSectionFlagValues(),
  ]);
  return { pageVariant, section };
}
