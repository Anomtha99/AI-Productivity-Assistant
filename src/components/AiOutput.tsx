import { Copy, Eraser, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function AiOutput({
  label,
  value,
  onChange,
  onRegenerate,
  loading = false,
  rows = 6,
  placeholder = "AI output will appear here. You can edit it before using it.",
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  onRegenerate?: () => void;
  loading?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  const copy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Copy failed — please select the text and copy manually.");
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
        <h3 className="min-w-0 truncate text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
          {label}
        </h3>
        <div className="flex shrink-0 items-center gap-1">
          {onRegenerate && (
            <Button variant="ghost" size="sm" onClick={onRegenerate} disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Regenerate</span>
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={copy} disabled={!value}>
            <Copy className="h-4 w-4" />
            <span className="hidden sm:inline">Copy</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onChange("")} disabled={!value}>
            <Eraser className="h-4 w-4" />
            <span className="hidden sm:inline">Clear</span>
          </Button>
        </div>
      </div>
      <Textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 resize-y bg-background"
      />
      <p className="mt-2 text-[11px] text-muted-foreground">Editable — review before use.</p>
    </div>
  );
}
