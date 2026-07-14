import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variants = {
  primary: "bg-electric-green text-ink hover:bg-acid-yellow shadow-glow border-electric-green",
  secondary: "bg-white/[0.06] text-white hover:bg-white/[0.1] border-white/15",
  ghost: "bg-transparent text-white hover:bg-white/[0.08] border-white/10"
};

export function ActionButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-5 py-2.5 text-sm font-black uppercase tracking-normal transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ActionLink({
  children,
  variant = "primary",
  className = "",
  ...props
}: BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-5 py-2.5 text-sm font-black uppercase tracking-normal transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
