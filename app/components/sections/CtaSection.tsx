import Image from "next/image";
import Link from "next/link";
import type { CtaSectionContent } from "@/lib/feature-flag-config";
import { SectionActionButton } from "../SectionActionButton";

type CtaSectionProps = {
  variant: "a" | "b";
  content: CtaSectionContent;
  page: "home" | "about";
};

function isInternal(href: string) {
  return href.startsWith("/");
}

function PrimaryButton({
  content,
  variant,
}: {
  content: CtaSectionContent;
  variant: "a" | "b";
}) {
  const isVariantB = variant === "b";
  const baseClass =
    "flex h-12 w-full max-w-[180px] items-center justify-center gap-2 rounded-full px-5 transition-colors md:w-[180px]";
  const variantAClass =
    "bg-foreground text-background hover:opacity-90";
  const variantBClass =
    "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200";

  const className = `${baseClass} ${isVariantB ? variantBClass : variantAClass}`;
  const label = content.primaryLabel;
  const href = content.primaryHref;

  if (isInternal(href)) {
    return (
      <Link href={href} className={className}>
        <Image
          className="dark:invert"
          src="/vercel.svg"
          alt=""
          width={16}
          height={16}
        />
        {label}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      <Image
        className="dark:invert"
        src="/vercel.svg"
        alt=""
        width={16}
        height={16}
      />
      {label}
    </a>
  );
}

function SecondaryButton({ content }: { content: CtaSectionContent }) {
  if (content.secondaryLabel == null || content.secondaryHref == null)
    return null;
  const href = content.secondaryHref;
  const label = content.secondaryLabel;
  const className =
    "flex h-12 w-full items-center justify-center rounded-full border border-zinc-300 px-5 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 md:w-[180px]";
  const classNameB =
    "flex h-12 w-full items-center justify-center rounded-full border-2 border-zinc-900 px-5 transition-colors hover:bg-zinc-100 dark:border-white dark:hover:bg-zinc-800 md:w-[180px]";

  if (isInternal(href)) {
    return (
      <Link href={href} className={classNameB}>
        {label}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {label}
    </a>
  );
}

export function CtaSection({ variant, content, page }: CtaSectionProps) {
  return (
    <section className="flex flex-col gap-4 border-t border-zinc-200 py-16 text-base font-medium sm:flex-row dark:border-zinc-800">
      <PrimaryButton content={content} variant={variant} />
      <SecondaryButton content={content} />
      <SectionActionButton
        page={page}
        section="cta"
        variant={variant}
        label="Track CTA"
      />
    </section>
  );
}
