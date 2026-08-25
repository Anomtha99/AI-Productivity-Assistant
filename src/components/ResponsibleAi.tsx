import { ShieldCheck } from "lucide-react";

export function ResponsibleAi({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-start gap-3 rounded-md border border-gold/40 bg-beige/60 p-3">
      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
      <p className="text-xs leading-relaxed text-muted-foreground">
        <span className="font-semibold text-foreground">Responsible AI:</span> AI-generated content
        may be incomplete or inaccurate. Always review and edit before sending to customers or
        publishing.
        {!compact &&
          " The assistant only uses the product and business information you provide — it will never invent prices, sizes, colours or stock levels, and will flag anything that needs your confirmation."}
      </p>
    </div>
  );
}
