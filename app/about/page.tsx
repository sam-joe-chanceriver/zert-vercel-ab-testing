import Link from "next/link";
import { Nav } from "../components/Nav";
import { SectionActionButton } from "../components/SectionActionButton";
import { aboutPageVariant, heroVariant, ctaVariant } from "@/flags";

function AboutHeroSection({ variant }: { variant: "a" | "b" }) {
  if (variant === "a") {
    return (
      <section className="flex flex-col items-center gap-6 py-16 text-center sm:items-start sm:text-left">
        <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-zinc-950 dark:text-zinc-50">
          About us
        </h1>
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          This is the about page. Learn more about our project and how we use
          A/B testing with built-in variants.
        </p>
        <SectionActionButton
          page="about"
          section="hero"
          variant="a"
          label="Learn more"
        />
      </section>
    );
  }
  return (
    <section className="flex flex-col items-center gap-6 py-16 text-center sm:items-start sm:text-left">
      <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-zinc-950 dark:text-zinc-50">
        Who we are
      </h1>
      <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Discover how we run experiments with page-wise and section-wise variants
        with stable per-visitor variants.
      </p>
      <SectionActionButton
        page="about"
        section="hero"
        variant="b"
        label="Discover"
      />
    </section>
  );
}

function MissionSection() {
  return (
    <section className="border-t border-zinc-200 py-16 dark:border-zinc-800">
      <h2 className="mb-6 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
        Our mission
      </h2>
      <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        We build tools that help teams ship faster and learn from real user
        behavior. Every decision we make is informed by data and
        experimentation.
      </p>
      <div className="mt-6">
        <SectionActionButton
          page="about"
          section="mission"
          label="Our mission"
        />
      </div>
    </section>
  );
}

function ValuesSection() {
  const values = [
    { name: "Transparency", desc: "Open metrics and clear reporting." },
    { name: "Iteration", desc: "Ship, measure, and improve continuously." },
    { name: "Quality", desc: "Reliable infrastructure and clean APIs." },
  ];
  return (
    <section className="border-t border-zinc-200 py-16 dark:border-zinc-800">
      <h2 className="mb-10 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
        Our values
      </h2>
      <ul className="grid gap-6 sm:grid-cols-3">
        {values.map((v) => (
          <li
            key={v.name}
            className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/30"
          >
            <h3 className="mb-2 font-medium text-zinc-950 dark:text-zinc-50">
              {v.name}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{v.desc}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <SectionActionButton page="about" section="values" label="Our values" />
      </div>
    </section>
  );
}

function AboutCtaSection({ variant }: { variant: "a" | "b" }) {
  if (variant === "a") {
    return (
      <section className="flex flex-col gap-4 border-t border-zinc-200 py-16 dark:border-zinc-800">
        <Link
          className="flex h-12 w-full max-w-[180px] items-center justify-center rounded-full bg-foreground px-5 text-background transition-colors hover:opacity-90"
          href="/"
        >
          Back to home
        </Link>
        <SectionActionButton
          page="about"
          section="cta"
          variant="a"
          label="Track CTA"
        />
      </section>
    );
  }
  return (
    <section className="flex flex-col gap-4 border-t border-zinc-200 py-16 dark:border-zinc-800">
      <Link
        className="flex h-12 w-full max-w-[180px] items-center justify-center rounded-full border-2 border-zinc-900 px-5 transition-colors hover:bg-zinc-100 dark:border-white dark:hover:bg-zinc-800"
        href="/"
      >
        Go to home
      </Link>
      <SectionActionButton
        page="about"
        section="cta"
        variant="b"
        label="Track CTA"
      />
    </section>
  );
}

export default async function AboutPage() {
  const [aboutVariant, hero, cta] = await Promise.all([
    aboutPageVariant(),
    heroVariant(),
    ctaVariant(),
  ]);

  const tagline =
    aboutVariant === "control"
      ? "You're viewing the control variant of the about page."
      : "You're viewing the variant experience of the about page.";

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-8 sm:px-8">
        <Nav />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{tagline}</p>
          <SectionActionButton
            page="about"
            section="page_intro"
            variant={aboutVariant}
            label="Track page"
          />
        </div>
        <AboutHeroSection variant={hero} />
        <MissionSection />
        <ValuesSection />
        <AboutCtaSection variant={cta} />
      </main>
    </div>
  );
}
