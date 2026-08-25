import logo from "@/assets/alg-logo.png.asset.json";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="ALG Collections — Style for Every You"
      className={cn("h-12 w-12 shrink-0 rounded-full object-cover", className)}
    />
  );
}

export function LogoLockup({ subtitle = "AI Business Assistant" }: { subtitle?: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Logo className="h-11 w-11" />
      <div className="min-w-0">
        <p className="brand-title truncate text-lg leading-tight">ALG Collections</p>
        <p className="truncate text-[11px] uppercase tracking-[0.22em] text-gold">{subtitle}</p>
      </div>
    </div>
  );
}
