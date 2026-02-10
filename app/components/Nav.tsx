import Link from "next/link";

export function Nav() {
  return (
    <nav className="flex w-full max-w-3xl items-center justify-between border-b border-zinc-200 py-4 dark:border-zinc-800">
      <Link
        href="/"
        className="text-lg font-semibold text-zinc-950 dark:text-zinc-50"
      >
        App
      </Link>
      <div className="flex gap-6 text-sm font-medium">
        <Link
          href="/"
          className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          About
        </Link>
      </div>
    </nav>
  );
}
