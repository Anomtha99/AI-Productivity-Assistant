import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

import { AiOutput } from "@/components/AiOutput";
import { PageHeader } from "@/components/PageHeader";
import { ResponsibleAi } from "@/components/ResponsibleAi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GUARDRAILS } from "@/lib/store";
import { useAi } from "@/lib/useAi";

export const Route = createFileRoute("/product-generator")({
  head: () => ({
    meta: [
      { title: "AI Product & Marketing Generator | ALG Collections" },
      {
        name: "description",
        content:
          "Generate product descriptions, Instagram captions, Facebook posts, WhatsApp promos, adverts and hashtags for ALG Collections.",
      },
      { property: "og:title", content: "AI Product & Marketing Generator" },
      {
        property: "og:description",
        content: "Turn product details into polished boutique marketing copy.",
      },
    ],
  }),
  component: ProductGenerator,
});

const SECTIONS = [
  "PRODUCT DESCRIPTION",
  "INSTAGRAM CAPTION",
  "FACEBOOK POST",
  "WHATSAPP MESSAGE",
  "SHORT ADVERT",
  "HASHTAGS",
] as const;

type SectionKey = (typeof SECTIONS)[number];

const emptyForm = {
  name: "",
  category: "",
  description: "",
  price: "",
  sizes: "",
  colours: "",
  material: "",
  stock: "",
  target: "",
  promo: "",
};

function parseSections(text: string) {
  const result: Partial<Record<SectionKey, string>> = {};
  SECTIONS.forEach((section, i) => {
    const next = SECTIONS[i + 1];
    const pattern = new RegExp(
      `${section}\\s*:?\\s*([\\s\\S]*?)(?=${next ? `${next}\\s*:?` : "$"})`,
      "i",
    );
    const match = text.match(pattern);
    if (match?.[1]) result[section] = match[1].replace(/^[\s#*-]+/, "").trim();
  });
  return result;
}

function ProductGenerator() {
  const [form, setForm] = useState(emptyForm);
  const [outputs, setOutputs] = useState<Partial<Record<SectionKey, string>>>({});
  const { run, loading } = useAi();

  const set = (key: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [key]: v }));

  const generate = async () => {
    const prompt = `Create marketing content for this ALG Collections product. Use ONLY these facts:
Product name: ${form.name || "not provided"}
Category: ${form.category || "not provided"}
Description from owner: ${form.description || "not provided"}
Price: ${form.price || "not provided"}
Sizes: ${form.sizes || "not provided"}
Colours: ${form.colours || "not provided"}
Material/fabric: ${form.material || "not provided"}
Stock available: ${form.stock || "not provided"}
Target customer: ${form.target || "not provided"}
Special offer/promotion: ${form.promo || "not provided"}

Return plain text using EXACTLY these headings on their own lines, in this order, with no markdown symbols:
${SECTIONS.join("\n")}

Rules: never state a price, size, colour, material or stock figure that is not listed above. Where a detail is "not provided", either omit it or write "(confirm with ALG Collections)". Hashtags must be relevant to fashion and this product.`;

    const text = await run(GUARDRAILS, prompt);
    if (text) setOutputs(parseSections(text));
  };

  const field = (key: keyof typeof form, label: string, placeholder: string, optional = false) => (
    <div className="space-y-1.5">
      <Label htmlFor={key}>
        {label} {optional && <span className="text-muted-foreground">(optional)</span>}
      </Label>
      <Input
        id={key}
        value={form[key]}
        placeholder={placeholder}
        onChange={(e) => set(key)(e.target.value)}
      />
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title="AI Product & Marketing Generator"
        description="Enter the product facts once — get descriptions, captions, posts and hashtags."
      />
      <ResponsibleAi />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <Card className="card-elegant h-fit">
          <CardContent className="space-y-4 p-5">
            {field("name", "Product name", "Satin Midi Slip Dress")}
            {field("category", "Product category", "Dresses")}
            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                value={form.description}
                placeholder="Bias-cut satin dress with adjustable straps"
                onChange={(e) => set("description")(e.target.value)}
              />
            </div>
            {field("price", "Price", "R899")}
            {field("sizes", "Available sizes", "XS, S, M, L, XL")}
            {field("colours", "Available colours", "Black, Champagne, Blush")}
            {field("material", "Material / fabric", "Satin polyester blend", true)}
            {field("stock", "Available stock", "14", true)}
            {field("target", "Target customer", "Women 25–40 who love evening elegance")}
            {field("promo", "Special offer or promotion", "10% off this weekend", true)}
            <Button onClick={generate} disabled={loading} className="w-full">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Generate content
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setForm(emptyForm)}>
              Clear form
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {SECTIONS.map((section) => (
            <AiOutput
              key={section}
              label={section}
              rows={section === "HASHTAGS" ? 3 : 5}
              value={outputs[section] ?? ""}
              loading={loading}
              onRegenerate={generate}
              onChange={(next) => setOutputs((o) => ({ ...o, [section]: next }))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
