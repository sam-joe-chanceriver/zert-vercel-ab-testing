import type { ReadonlyRequestCookies } from "flags";
import { dedupe, flag } from "flags/next";

/** Evaluation context: visitor id from cookie or header (set by middleware). */
interface Entities {
  visitor?: { id: string };
}

function hashToIndex(id: string, length: number): number {
  let h = 0;
  for (let i = 0; i < id.length; i++)
    h = (h << 5) - h + id.charCodeAt(i);
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

const variantOptions = [
  { value: "control" as const, label: "Control" },
  { value: "variant" as const, label: "Variant" },
];

const sectionOptions = [
  { value: "a" as const, label: "Variant A" },
  { value: "b" as const, label: "Variant B" },
];

/** Home page A/B variant (control | variant). */
export const homePageVariant = flag<"control" | "variant", Entities>({
  key: "home-page-variant",
  description: "Home page experience: control vs variant",
  options: variantOptions,
  identify,
  decide({ entities }) {
    const id = entities?.visitor?.id ?? "anonymous";
    return variantOptions[hashToIndex(id, variantOptions.length)].value;
  },
});

/** About page A/B variant (control | variant). */
export const aboutPageVariant = flag<"control" | "variant", Entities>({
  key: "about-page-variant",
  description: "About page experience: control vs variant",
  options: variantOptions,
  identify,
  decide({ entities }) {
    const id = entities?.visitor?.id ?? "anonymous";
    return variantOptions[
      hashToIndex(id + "about", variantOptions.length)
    ].value;
  },
});

/** Hero section A/B variant (a | b). */
export const heroVariant = flag<"a" | "b", Entities>({
  key: "hero-variant",
  description: "Hero section: variant A or B",
  options: sectionOptions,
  identify,
  decide({ entities }) {
    const id = entities?.visitor?.id ?? "anonymous";
    return sectionOptions[hashToIndex(id + "hero", sectionOptions.length)]
      .value;
  },
});

/** CTA section A/B variant (a | b). */
export const ctaVariant = flag<"a" | "b", Entities>({
  key: "cta-variant",
  description: "CTA section: variant A or B",
  options: sectionOptions,
  identify,
  decide({ entities }) {
    const id = entities?.visitor?.id ?? "anonymous";
    return sectionOptions[hashToIndex(id + "cta", sectionOptions.length)].value;
  },
});
