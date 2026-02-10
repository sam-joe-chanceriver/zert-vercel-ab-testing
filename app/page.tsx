import { CtaSection } from "./components/sections/CtaSection";
import { FlagController } from "./components/FlagController";
import { HeroSection } from "./components/sections/HeroSection";
import { Nav } from "./components/Nav";
import { SectionActionButton } from "./components/SectionActionButton";
import { CTA_CONTENT, HERO_CONTENT } from "@/lib/feature-flag-config";
import { getFlagsForHomePage } from "@/flags";

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

export default async function HomePage() {
  const { homeVariant } = await getFlagsForHomePage();

  const intro =
    homeVariant === "a"
      ? "You're viewing the homepage — Variant A."
      : "You're viewing the homepage — Variant B.";

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
        <HeroSection
          variant={homeVariant}
          content={HERO_CONTENT[homeVariant]}
          page="home"
        />
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection
          variant={homeVariant}
          content={CTA_CONTENT[homeVariant]}
          page="home"
        />
      </main>
      <FlagController
        flags={{
          Home: homeVariant,
        }}
      />
    </div>
  );
}
