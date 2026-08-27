import { Download, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { SLIDES } from "./slides";

const SLIDE_W = 1600;
const SLIDE_H = 900;

export function ExportPdfButton() {
  const [busy, setBusy] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const exportPdf = async () => {
    if (busy) return;
    setBusy(true);
    const toastId = toast.loading("Building your PDF deck…");
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);

      // Let the offscreen stage paint (fonts + images).
      await document.fonts?.ready;
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

      const nodes = Array.from(
        stageRef.current?.querySelectorAll<HTMLElement>("[data-pdf-slide]") ?? [],
      );

      const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: [SLIDE_W, SLIDE_H] });

      for (let i = 0; i < nodes.length; i++) {
        toast.loading(`Rendering slide ${i + 1} of ${nodes.length}…`, { id: toastId });
        const canvas = await html2canvas(nodes[i]!, {
          scale: 1.5,
          backgroundColor: null,
          useCORS: true,
          logging: false,
          width: SLIDE_W,
          height: SLIDE_H,
        });
        const img = canvas.toDataURL("image/jpeg", 0.92);
        if (i > 0) pdf.addPage([SLIDE_W, SLIDE_H], "landscape");
        pdf.addImage(img, "JPEG", 0, 0, SLIDE_W, SLIDE_H);
      }

      pdf.save("ALG-Collections-AI-Business-Assistant.pdf");
      toast.success("PDF deck downloaded", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Could not export the PDF. Please try again.", { id: toastId });
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Button variant="outline" onClick={exportPdf} disabled={busy}>
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {busy ? "Exporting…" : "Download PDF"}
      </Button>

      {/* Offscreen full-size render target used only for PDF capture. */}
      <div
        ref={stageRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 -z-50 opacity-0"
        style={{ width: SLIDE_W, height: SLIDE_H, overflow: "hidden" }}
      >
        {SLIDES.map((s) => (
          <div
            key={s.id}
            data-pdf-slide
            style={{
              width: SLIDE_W,
              height: SLIDE_H,
              containerType: "inline-size",
              overflow: "hidden",
            }}
          >
            {s.render()}
          </div>
        ))}
      </div>
    </>
  );
}
