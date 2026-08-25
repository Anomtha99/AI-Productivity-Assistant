import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Megaphone } from "lucide-react";

import { AiOutput } from "@/components/AiOutput";
import { PageHeader } from "@/components/PageHeader";
import { ResponsibleAi } from "@/components/ResponsibleAi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GUARDRAILS } from "@/lib/store";
import { useAi } from "@/lib/useAi";

export const Route = createFileRoute("/social")({
  head: () => ({
    meta: [
      { title: "AI Social Media Generator | ALG Collections" },
      {
        name: "description",
        content:
          "Create Instagram, Facebook and WhatsApp content for ALG Collections with the right tone and a clear call to action.",
      },
      { property: "og:title", content: "AI Social Media Content Generator" },
      {
        property: "og:description",
        content: "Platform-ready boutique posts with hashtags and calls to action.",
      },
    ],
  }),
  component: SocialPage,
});

const PLATFORMS = ["Instagram", "Facebook", "WhatsApp"];
const TYPES = [
  "Product promotion",
  "New arrival",
  "Sale",
  "Customer appreciation",
  "Restock",
  "General brand post",
];
const TONES = ["Professional", "Friendly", "Trendy", "Persuasive"];

function SocialPage() {
  const [platform, setPlatform] = useState(PLATFORMS[0] as string);
  const [type, setType] = useState(TYPES[0] as string);
  const [tone, setTone] = useState(TONES[1] as string);
  const [details, setDetails] = useState("");
  const [output, setOutput] = useState("");
  const { run, loading } = useAi();

  const generate = async () => {
    const text = await run(
      GUARDRAILS,
      `Write ONE ${platform} post for ALG Collections.
Content type: ${type}
Tone: ${tone}
Facts provided by the owner (use only these):
"""${details || "No specific product details provided — keep the post general and do not invent products, prices or offers."}"""

Requirements: platform-appropriate length and formatting, a clear call to action, and for Instagram/Facebook a short hashtag line at the end. WhatsApp posts should be short and broadcast-friendly. Plain text only, no markdown headings.`,
    );
    if (text) setOutput(text);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="AI Social Media Generator"
        description="Boutique-ready posts for Instagram, Facebook and WhatsApp."
      />
      <ResponsibleAi compact />

      <Card className="card-elegant">
        <CardContent className="space-y-4 p-5">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Platform", value: platform, set: setPlatform, options: PLATFORMS },
              { label: "Content type", value: type, set: setType, options: TYPES },
              { label: "Tone", value: tone, set: setTone, options: TONES },
            ].map((s) => (
              <div key={s.label} className="space-y-1.5">
                <Label>{s.label}</Label>
                <Select value={s.value} onValueChange={s.set}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {s.options.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="details">Product / campaign details</Label>
            <Textarea
              id="details"
              rows={4}
              value={details}
              placeholder="Ribbed Knit Cardigan, R599, sizes S–L, blush nude and cream, 2 left in stock"
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <Button onClick={generate} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Megaphone className="h-4 w-4" />}
            Generate post
          </Button>
        </CardContent>
      </Card>

      <AiOutput
        label={`${platform} post`}
        value={output}
        rows={10}
        loading={loading}
        onRegenerate={generate}
        onChange={setOutput}
      />
    </div>
  );
}
