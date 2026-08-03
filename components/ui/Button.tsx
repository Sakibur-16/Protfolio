import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

type ButtonBaseProps = {
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = ButtonBaseProps &
  ComponentPropsWithoutRef<typeof Link> & { href: string };

type ButtonAsButton = ButtonBaseProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

/**
 * Pill button. `primary` carries the accent gradient and its glow;
 * `ghost` is an outline that fills faintly on hover. Both share the same
 * lift so the motion language is consistent.
 */
export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;

  const base = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium",
    size === "md" ? "px-6 py-3 text-sm" : "px-4 py-2 text-xs",
    variant === "primary" && "btn-glow",
    variant === "ghost" && "btn-ghost",
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
    <button
      className={base}
      data-cursor="interactive"
      {...(rest as ComponentPropsWithoutRef<"button">)}
    >
      {children}
    </button>
  );
}
