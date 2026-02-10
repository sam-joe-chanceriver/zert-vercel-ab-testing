"use client";

import { VercelToolbar } from "@vercel/toolbar/next";

/**
 * Vercel Toolbar (Flags Explorer, Comments, etc.).
 *
 * - Localhost: always shown in development.
 * - Hosted (preview/production): hidden by default so visitors aren't prompted to log in.
 *
 * To show the toolbar on your hosted deployment, use one of these:
 *
 * 1. Env var (e.g. for your own testing): set NEXT_PUBLIC_VERCEL_TOOLBAR=1 in your
 *    Vercel project env (Settings → Environment Variables) for Preview and/or Production.
 * 2. Dashboard: Vercel Dashboard → Project → Visit dropdown → "Visit with Toolbar".
 * 3. Browser extension: install the Vercel extension, enable toolbar for production
 *    in Settings → General → Vercel Toolbar, then visit your production URL while logged in.
 */
export function VercelToolbarInjector() {
  const isDev = process.env.NODE_ENV === "development";
  const enableInProduction =
    process.env.NEXT_PUBLIC_VERCEL_TOOLBAR === "1" ||
    process.env.NEXT_PUBLIC_VERCEL_TOOLBAR === "true";

  if (!isDev && !enableInProduction) return null;
  return <VercelToolbar />;
}
