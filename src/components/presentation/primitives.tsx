import type { ReactNode } from "react";

import logo from "@/assets/alg-logo.png.asset.json";
import { cn } from "@/lib/utils";

export type Tone = "light" | "dark";

/** Full-bleed slide surface. Everything inside sizes itself with cq units. */
export function SlideFrame({
  tone = "light",
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden p-[5cqw]",
        tone === "dark" ? "bg-foreground text-cream" : "bg-cream text-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SlideHeader({
  kicker,
  title,
  tone = "light",
}: {
  kicker?: string;
  title: string;
  tone?: Tone;
}) {
  return (
    <div className="flex items-start justify-between gap-[3cqw]">
      <div className="min-w-0">
        {kicker ? (
          <p className={cn("s-kicker", tone === "dark" ? "text-gold" : "text-gold")}>{kicker}</p>
        ) : null}
        <h2 className="brand-title s-title mt-[0.8cqw] leading-[1.02]">{title}</h2>
        <div className="gold-rule mt-[1.4cqw] w-[14cqw]" />
      </div>
      <img
        src={logo.url}
        alt=""
        aria-hidden
        className="h-[6cqw] w-[6cqw] shrink-0 rounded-full object-cover opacity-90 ring-1 ring-gold/50"
      />
    </div>
  );
}

export function SlideBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mt-[3cqw] min-h-0 flex-1", className)}>{children}</div>;
}

export function Panel({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.2cqw] border p-[2cqw]",
        tone === "dark" ? "border-gold/25 bg-cream/5" : "border-gold/30 bg-card",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Pill({ children, tone = "light" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={cn(
        "s-chrome inline-flex items-center whitespace-nowrap rounded-full px-[1.4cqw] py-[0.6cqw] font-medium uppercase tracking-[0.18em]",
        tone === "dark" ? "bg-gold text-foreground" : "border border-gold/50 bg-gold/12 text-foreground",
      )}
    >
      {children}
    </span>
  );
}

/** Vertical arrow-connected flow. */
export function FlowStack({
  steps,
  tone = "light",
  dense = false,
}: {
  steps: string[];
  tone?: Tone;
  dense?: boolean;
}) {
  return (
    <div className={cn("flex flex-col items-center", dense ? "gap-[0.4cqw]" : "gap-[0.9cqw]")}>
      {steps.map((s, i) => (
        <div
          key={s}
          className={cn(
            "flex w-full flex-col items-center",
            dense ? "gap-[0.4cqw]" : "gap-[0.9cqw]",
          )}
        >
          <div
            className={cn(
              "s-body w-full rounded-[0.9cqw] px-[1.6cqw] text-center font-medium",
              dense ? "py-[0.7cqw]" : "py-[1.2cqw]",
              i === steps.length - 1
                ? "bg-gold text-foreground"
                : tone === "dark"
                  ? "border border-gold/30 bg-cream/5"
                  : "border border-gold/35 bg-beige/60",
            )}
          >
            {s}
          </div>
          {i < steps.length - 1 ? <span className="s-body leading-none text-gold">&darr;</span> : null}
        </div>
      ))}
    </div>
  );
}

export function Bullets({
  items,
  tone = "light",
  icon,
}: {
  items: ReactNode[];
  tone?: Tone;
  icon?: ReactNode;
}) {
  return (
    <ul className="space-y-[1.2cqw]">
      {items.map((item, i) => (
        <li key={i} className="s-body flex items-start gap-[1.2cqw] leading-snug">
          <span className="mt-[0.55cqw] text-gold">{icon ?? "\u25C6"}</span>
          <span className={tone === "dark" ? "text-cream/90" : "text-foreground/85"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Real screenshot of the running application, framed like a browser window. */
export function AppShot({
  src,
  caption,
  className,
}: {
  src: string;
  caption: string;
  className?: string;
}) {
  return (
    <figure className={cn("flex min-h-0 flex-col", className)}>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1cqw] border border-gold/40 bg-card shadow-[0_1.2cqw_3cqw_rgba(17,17,17,0.18)]">
        <div className="flex items-center gap-[0.5cqw] border-b border-gold/25 bg-beige/70 px-[1cqw] py-[0.7cqw]">
          <span className="block h-[0.7cqw] w-[0.7cqw] rounded-full bg-foreground/25" />
          <span className="block h-[0.7cqw] w-[0.7cqw] rounded-full bg-foreground/25" />
          <span className="block h-[0.7cqw] w-[0.7cqw] rounded-full bg-foreground/25" />
        </div>
        <img src={src} alt={caption} className="min-h-0 w-full flex-1 object-cover object-top" />
      </div>
      <figcaption className="s-chrome mt-[0.9cqw] uppercase tracking-[0.18em] text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
