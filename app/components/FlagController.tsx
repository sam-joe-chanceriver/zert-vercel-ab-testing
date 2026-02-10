"use client";

import { useState } from "react";

export type FlagControllerProps = {
  /** Current flag key-value pairs to display (e.g. { "Home": "control", "Hero": "a" }) */
  flags: Record<string, string>;
};

export function FlagController({ flags }: FlagControllerProps) {
  const [open, setOpen] = useState(true);
  const entries = Object.entries(flags);

  if (entries.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 w-72 rounded-lg border border-zinc-200 bg-white/95 shadow-lg backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/95"
      aria-label="Flag controller"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm font-semibold text-zinc-800 dark:text-zinc-100"
      >
        <span>Flags</span>
        <span className="text-zinc-500 dark:text-zinc-400" aria-hidden>
          {open ? "▼" : "▶"}
        </span>
      </button>
      {open && (
        <div className="border-t border-zinc-200 px-3 py-2 dark:border-zinc-700">
          <dl className="space-y-1.5 text-sm">
            {entries.map(([key, value]) => (
              <div key={key} className="flex justify-between gap-4">
                <dt className="text-zinc-600 dark:text-zinc-400">{key}</dt>
                <dd className="font-medium text-zinc-900 dark:text-zinc-50">
                  <span className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
                    {value}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            Override with Vercel Toolbar → Flags Explorer
          </p>
        </div>
      )}
    </div>
  );
}
