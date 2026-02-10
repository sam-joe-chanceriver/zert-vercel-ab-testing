"use client";

import { VercelToolbar } from "@vercel/toolbar/next";

/**
 * Renders the Vercel Toolbar in development so you can use Flags Explorer
 * and other toolbar features. Requires `vercel link` and the Next.js
 * config to be wrapped with the toolbar plugin.
 */
export function VercelToolbarInjector() {
  const isDev = process.env.NODE_ENV === "development";
  if (!isDev) return null;
  return <VercelToolbar />;
}
