import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

type ButtonBaseProps = {
  variant?: "primary" | "ghost";
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = ButtonBaseProps &
  ComponentPropsWithoutRef<typeof Link> & { href: string };

type ButtonAsButton = ButtonBaseProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", className, children, ...rest } = props;

  const base = cn(
    "group relative inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-sm tracking-wide transition-colors duration-200",
    variant === "primary" && "bg-ink text-bg hover:bg-cyan",
    variant === "ghost" && "border border-line-strong text-ink hover:border-cyan hover:text-cyan",
    className
  );

  if ("href" in props && props.href) {
    const { href, ...linkRest } = rest as ComponentPropsWithoutRef<typeof Link>;
    return (
      <Link href={href} className={base} data-cursor="interactive" {...linkRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={base} data-cursor="interactive" {...(rest as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
