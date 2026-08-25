import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, MessageSquareText } from "lucide-react";

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
import {
  DEFAULT_BUSINESS,
  GUARDRAILS,
  SAMPLE_PRODUCTS,
  businessContext,
  useLocalState,
  type BusinessInfo,
  type Product,
} from "@/lib/store";
import { useAi } from "@/lib/useAi";

export const Route = createFileRoute("/responses")({
  head: () => ({
    meta: [
      { title: "AI Customer Responses | ALG Collections" },
      {
        name: "description",
        content:
          "Paste a customer message and draft a warm, accurate ALG Collections reply based only on your own product information.",
      },
      { property: "og:title", content: "AI Customer Response Generator" },
      {
        property: "og:description",
        content: "Reply to boutique customers quickly without inventing details.",
      },
    ],
  }),
  component: ResponsesPage,
});

const TYPES = [
  "Product enquiry",
  "Price enquiry",
  "Size enquiry",
  "Colour enquiry",
  "Stock availability",
  "Delivery enquiry",
  "Order enquiry",
  "Complaint",
  "General enquiry",
];

function ResponsesPage() {
  const [products] = useLocalState<Product[]>("alg.products", SAMPLE_PRODUCTS);
  const [info] = useLocalState<BusinessInfo>("alg.business", DEFAULT_BUSINESS);
  const [message, setMessage] = useState("");
  const [type, setType] = useState(TYPES[0] as string);
  const [reply, setReply] = useState("");
  const { run, loading } = useAi();

  const generate = async () => {
    if (!message.trim()) return;
    const text = await run(
      GUARDRAILS,
      `${businessContext(products, info)}

ENQUIRY TYPE: ${type}
CUSTOMER MESSAGE:
"""${message}"""

Write a single friendly, professional and concise reply (under 120 words) that ALG Collections can send as-is. Only use facts from the catalogue and business info above. If a required detail is missing, politely say ALG Collections will confirm it. No headings, no markdown.`,
    );
    if (text) setReply(text);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="AI Customer Response Generator"
        description="Draft accurate boutique replies in seconds — then edit before sending."
      />
      <ResponsibleAi />

      <Card className="card-elegant">
        <CardContent className="space-y-4 p-5">
          <div className="space-y-1.5">
            <Label>Response type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="msg">Customer message</Label>
            <Textarea
              id="msg"
              rows={5}
              value={message}
              placeholder="Hi, do you have the satin midi dress in a size L?"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <Button onClick={generate} disabled={loading || !message.trim()}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MessageSquareText className="h-4 w-4" />
            )}
            Generate reply
          </Button>
        </CardContent>
      </Card>

      <AiOutput
        label="Suggested reply"
        value={reply}
        rows={8}
        loading={loading}
        onRegenerate={generate}
        onChange={setReply}
      />
    </div>
  );
}
