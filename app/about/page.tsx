import Link from "next/link";
import { CtaSection } from "../components/sections/CtaSection";
import { FlagController } from "../components/FlagController";
import { HeroSection } from "../components/sections/HeroSection";
import { Nav } from "../components/Nav";
import { SectionActionButton } from "../components/SectionActionButton";
import {
  ABOUT_CTA_CONTENT,
  ABOUT_HERO_CONTENT,
} from "@/lib/feature-flag-config";
import { getFlagsForAboutPage } from "@/flags";

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

export default async function AboutPage() {
  const { pageVariant, section } = await getFlagsForAboutPage();

  const tagline =
    pageVariant === "control"
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
            variant={pageVariant}
            label="Track page"
          />
        </div>
        <HeroSection
          variant={section.hero}
          content={ABOUT_HERO_CONTENT[section.hero]}
          page="about"
        />
        <MissionSection />
        <ValuesSection />
        <CtaSection
          variant={section.cta}
          content={ABOUT_CTA_CONTENT[section.cta]}
          page="about"
        />
      </main>
      <FlagController
        flags={{
          "Page variant": pageVariant,
          Hero: section.hero,
          CTA: section.cta,
        }}
      />
    </div>
  );
}
