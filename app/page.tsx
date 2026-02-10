import Image from "next/image";
import Link from "next/link";
import { Nav } from "./components/Nav";
import { SectionActionButton } from "./components/SectionActionButton";
import { homePageVariant, heroVariant, ctaVariant } from "@/flags";

function HeroSection({ variant }: { variant: "a" | "b" }) {
  if (variant === "a") {
    return (
      <section className="flex flex-col items-center gap-6 py-16 text-center sm:items-start sm:text-left">
        <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-zinc-950 dark:text-zinc-50">
          To get started, edit the page.tsx file.
        </h1>
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Looking for a starting point or more instructions? Head over to{" "}
          <Link
            href="https://vercel.com/templates?framework=next.js"
            className="font-medium text-zinc-950 dark:text-zinc-50 underline underline-offset-4"
          >
            Templates
          </Link>{" "}
          or the{" "}
          <Link
            href="https://nextjs.org/learn"
            className="font-medium text-zinc-950 dark:text-zinc-50 underline underline-offset-4"
          >
            Learning
          </Link>{" "}
          center.
        </p>
        <SectionActionButton
          page="home"
          section="hero"
          variant="a"
          label="Get started"
        />
      </section>
    );
  }
  return (
    <section className="flex flex-col items-center gap-6 py-16 text-center sm:items-start sm:text-left">
      <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-zinc-950 dark:text-zinc-50">
        Build something great with Next.js
      </h1>
      <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Get started by exploring{" "}
        <Link
          href="https://vercel.com/templates?framework=next.js"
          className="font-medium text-zinc-950 dark:text-zinc-50 underline underline-offset-4"
        >
          Vercel templates
        </Link>{" "}
        or dive into the{" "}
        <Link
          href="https://nextjs.org/learn"
          className="font-medium text-zinc-950 dark:text-zinc-50 underline underline-offset-4"
        >
          Next.js docs
        </Link>
        .
      </p>
      <SectionActionButton
        page="home"
        section="hero"
        variant="b"
        label="Explore"
      />
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Fast by default",
      description: "Optimized builds and streaming for quick load times.",
    },
    {
      title: "Developer experience",
      description: "TypeScript, hot reload, and clear error messages.",
    },
    {
      title: "Flexible deployment",
      description: "Run on Vercel, Node, or any platform that supports Node.",
    },
  ];
  return (
    <section className="border-t border-zinc-200 py-16 dark:border-zinc-800">
      <h2 className="mb-10 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
        Why choose us
      </h2>
      <ul className="grid gap-8 sm:grid-cols-3">
        {features.map((f) => (
          <li
            key={f.title}
            className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/30"
          >
            <h3 className="mb-2 font-medium text-zinc-950 dark:text-zinc-50">
              {f.title}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {f.description}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <SectionActionButton
          page="home"
          section="features"
          label="Why choose us"
        />
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "This stack made our launch smooth and measurable.",
      author: "Alex",
      role: "Product Lead",
    },
    {
      quote: "A/B testing is finally straightforward with the right tools.",
      author: "Sam",
      role: "Engineer",
    },
  ];
  return (
    <section className="border-t border-zinc-200 py-16 dark:border-zinc-800">
      <h2 className="mb-10 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
        What people say
      </h2>
      <div className="grid gap-8 sm:grid-cols-2">
        {testimonials.map((t) => (
          <blockquote
            key={t.author}
            className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50"
          >
            <p className="mb-4 text-zinc-700 dark:text-zinc-300">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="text-sm text-zinc-500 dark:text-zinc-400">
              — {t.author}, {t.role}
            </footer>
          </blockquote>
        ))}
      </div>
      <div className="mt-6">
        <SectionActionButton
          page="home"
          section="testimonials"
          label="What people say"
        />
      </div>
    </section>
  );
}

function CtaSection({ variant }: { variant: "a" | "b" }) {
  if (variant === "a") {
    return (
      <section className="flex flex-col gap-4 border-t border-zinc-200 py-16 text-base font-medium sm:flex-row dark:border-zinc-800">
        <a
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:opacity-90 md:w-[180px]"
          href="https://vercel.com/new"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="dark:invert"
            src="/vercel.svg"
            alt="Vercel"
            width={16}
            height={16}
          />
          Deploy Now
        </a>
        <a
          className="flex h-12 w-full items-center justify-center rounded-full border border-zinc-300 px-5 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 md:w-[180px]"
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </a>
        <SectionActionButton
          page="home"
          section="cta"
          variant="a"
          label="Track CTA"
        />
      </section>
    );
  }
  return (
    <section className="flex flex-col gap-4 border-t border-zinc-200 py-16 text-base font-medium sm:flex-row dark:border-zinc-800">
      <Link
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 md:w-[180px]"
        href="https://vercel.com/new"
      >
        <Image
          className="dark:invert"
          src="/vercel.svg"
          alt="Vercel"
          width={16}
          height={16}
        />
        Deploy Now
      </Link>
      <Link
        className="flex h-12 w-full items-center justify-center rounded-full border-2 border-zinc-900 px-5 transition-colors hover:bg-zinc-100 dark:border-white dark:hover:bg-zinc-800 md:w-[180px]"
        href="https://nextjs.org/docs"
      >
        Documentation
      </Link>
      <SectionActionButton
        page="home"
        section="cta"
        variant="b"
        label="Track CTA"
      />
    </section>
  );
}

export default async function HomePage() {
  const [homeVariant, hero, cta] = await Promise.all([
    homePageVariant(),
    heroVariant(),
    ctaVariant(),
  ]);

  const intro =
    homeVariant === "control"
      ? "Welcome — you're on the home page."
      : "You're viewing the variant experience.";

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-8 sm:px-8">
        <Nav />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{intro}</p>
          <SectionActionButton
            page="home"
            section="page_intro"
            variant={homeVariant}
            label="Track page"
          />
        </div>
        <HeroSection variant={hero} />
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection variant={cta} />
      </main>
    </div>
  );
}
