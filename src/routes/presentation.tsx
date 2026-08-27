import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, LayoutDashboard, Maximize2, Play, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { PageHeader } from "@/components/PageHeader";
import { SLIDES } from "@/components/presentation/slides";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/presentation")({
  validateSearch: (search: Record<string, unknown>) => ({
    slide: Math.min(Math.max(Number(search["slide"]) || 1, 1), 15),
  }),
  head: () => ({
    meta: [
      { title: "Presentation | ALG Collections AI Business Assistant" },
      {
        name: "description",
        content:
          "A 15-slide pitch deck explaining the ALG Collections AI Business Assistant: the problem, the solution, the AI tools, responsible AI and business value.",
      },
      { property: "og:title", content: "ALG Collections AI Business Assistant — Presentation" },
      {
        property: "og:description",
        content: "Present the ALG Collections AI Business Assistant to clients and assessors.",
      },
    ],
  }),
  component: PresentationPage,
});

const pad = (n: number) => String(n).padStart(2, "0");

function PresentationPage() {
  const { slide } = Route.useSearch();
  const navigate = useNavigate({ from: "/presentation" });
  const index = slide - 1;
  const stageRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const go = useCallback(
    (next: number) => {
      const clamped = Math.min(Math.max(next, 0), SLIDES.length - 1);
      navigate({ search: { slide: clamped + 1 }, replace: true });
    },
    [navigate],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === "Home") go(0);
      else if (e.key === "End") go(SLIDES.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    document.title = `${pad(slide)}/${SLIDES.length} · ${SLIDES[index]!.title} | ALG Collections`;
  }, [slide, index]);

  const present = async () => {
    try {
      await stageRef.current?.requestFullscreen();
    } catch {
      setIsFullscreen(true);
    }
  };

  const exit = async () => {
    if (document.fullscreenElement) await document.exitFullscreen();
    setIsFullscreen(false);
  };

  const current = SLIDES[index]!;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Presentation"
        description="A 15-slide pitch deck for clients, business owners and assessors."
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" asChild>
              <Link to="/">
                <LayoutDashboard className="h-4 w-4" />
                Back to dashboard
              </Link>
            </Button>
            <Button onClick={present}>
              <Play className="h-4 w-4" />
              Start presentation
            </Button>
          </div>
        }
      />

      <div
        ref={stageRef}
        className={cn(
          "relative flex flex-col bg-foreground",
          isFullscreen ? "h-screen w-screen justify-center p-2 sm:p-6" : "rounded-lg p-2 sm:p-3",
        )}
      >
        <div className="slide-stage rounded-md border border-gold/30 shadow-[0_10px_40px_-15px_rgba(17,17,17,0.5)]">
          <div key={current.id} className="slide-enter h-full w-full">
            {current.render()}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => go(index + 1)}
              disabled={index === SLIDES.length - 1}
              aria-label="Next slide"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <p className="brand-title text-sm tracking-[0.3em] text-gold">
            {pad(slide)} / {pad(SLIDES.length)}
          </p>

          <div className="flex items-center gap-2">
            {isFullscreen ? (
              <Button size="sm" variant="secondary" onClick={exit}>
                <X className="h-4 w-4" />
                Exit
              </Button>
            ) : (
              <Button size="sm" variant="secondary" onClick={present}>
                <Maximize2 className="h-4 w-4" />
                Fullscreen
              </Button>
            )}
          </div>
        </div>
      </div>

      {!isFullscreen && (
        <div className="flex flex-wrap gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(i)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                i === index
                  ? "border-gold bg-gold text-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-gold/60",
              )}
            >
              {pad(i + 1)} · {s.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
