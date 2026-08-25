import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bot, Loader2, Send, User } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { ResponsibleAi } from "@/components/ResponsibleAi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

export const Route = createFileRoute("/chatbot")({
  head: () => ({
    meta: [
      { title: "AI Customer Chatbot | ALG Collections" },
      {
        name: "description",
        content:
          "A boutique chatbot that answers customer questions using only ALG Collections' own product and business information.",
      },
      { property: "og:title", content: "ALG Collections AI Chatbot" },
      {
        property: "og:description",
        content: "Answer product, price, size, delivery and order questions safely.",
      },
    ],
  }),
  component: ChatbotPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Do you have the satin midi dress in size L?",
  "How much is the linen blazer?",
  "How long does delivery take?",
  "What payment methods do you accept?",
];

function ChatbotPage() {
  const [products] = useLocalState<Product[]>("alg.products", SAMPLE_PRODUCTS);
  const [info] = useLocalState<BusinessInfo>("alg.business", DEFAULT_BUSINESS);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi, welcome to ALG Collections. Ask me about our products, sizes, colours, prices, stock, orders or delivery.",
    },
  ]);
  const [input, setInput] = useState("");
  const { run, loading } = useAi();

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || loading) return;
    const history = [...messages, { role: "user" as const, content: question }];
    setMessages(history);
    setInput("");

    const transcript = history
      .map((m) => `${m.role === "user" ? "Customer" : "Assistant"}: ${m.content}`)
      .join("\n");

    const reply = await run(
      `${GUARDRAILS}
You are the customer-facing chatbot on the ALG Collections storefront. Answer in 1–4 short sentences. If the answer is not in the information below, say clearly that ALG Collections needs to confirm it and offer to pass the question on.`,
      `${businessContext(products, info)}

CONVERSATION SO FAR:
${transcript}

Reply as the Assistant only.`,
    );

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          reply ??
          "Sorry, I couldn't answer that right now. Please allow ALG Collections to confirm and come back to you.",
      },
    ]);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title="AI Customer Chatbot"
        description="Answers come strictly from your catalogue and business settings."
      />
      <ResponsibleAi compact />

      <Card className="card-elegant">
        <CardContent className="space-y-4 p-5">
          <div className="max-h-[55vh] space-y-3 overflow-y-auto pr-1">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border ${
                    m.role === "user"
                      ? "border-border bg-beige"
                      : "border-gold/60 bg-primary text-primary-foreground"
                  }`}
                >
                  {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </span>
                <p
                  className={`max-w-[80%] whitespace-pre-wrap rounded-lg px-4 py-2.5 text-sm ${
                    m.role === "user"
                      ? "bg-beige text-foreground"
                      : "border border-border bg-card text-foreground"
                  }`}
                >
                  {m.content}
                </p>
              </div>
            ))}
            {loading && (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin text-gold" /> Typing…
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-gold/50 bg-beige/60 px-3 py-1 text-xs transition-colors hover:bg-beige"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
            <Input
              value={input}
              placeholder="Ask a question…"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
            />
            <Button onClick={() => send(input)} disabled={loading} className="shrink-0">
              <Send className="h-4 w-4" /> Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
