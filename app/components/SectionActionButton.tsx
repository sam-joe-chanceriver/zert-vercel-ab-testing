"use client";

import { track } from "@vercel/analytics";

export type SectionActionButtonProps = {
  /** Page name for analytics (e.g. "home", "about") */
  page: string;
  /** Section name for analytics (e.g. "hero", "features", "cta") */
  section: string;
  /** A/B variant when relevant (e.g. "a", "b", "control", "variant") */
  variant?: string;
  /** Button label */
  label: string;
  /** Optional extra data (flat key-value; strings, numbers, booleans only) */
  data?: Record<string, string | number | boolean | null>;
  /** Optional className for the button */
  className?: string;
};

export function SectionActionButton({
  page,
  section,
  variant,
  label,
  data = {},
  className,
}: SectionActionButtonProps) {
  const handleClick = () => {
    track("section_action", {
      page,
      section,
      ...(variant != null && { variant }),
      ...data,
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        className ??
        "rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
      }
    >
      {label}
    </button>
  );
}
