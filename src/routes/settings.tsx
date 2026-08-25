import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { RotateCcw } from "lucide-react";

import { Logo } from "@/components/Logo";
import { PageHeader } from "@/components/PageHeader";
import { ResponsibleAi } from "@/components/ResponsibleAi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DEFAULT_BUSINESS,
  SAMPLE_PRODUCTS,
  SAMPLE_TASKS,
  useLocalState,
  type BusinessInfo,
  type Product,
  type Task,
} from "@/lib/store";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings | ALG Collections AI Assistant" },
      {
        name: "description",
        content:
          "Manage ALG Collections business details, delivery and payment information used by every AI tool.",
      },
      { property: "og:title", content: "ALG Collections Assistant Settings" },
      {
        property: "og:description",
        content: "Business facts the AI is allowed to use when replying to customers.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [info, setInfo] = useLocalState<BusinessInfo>("alg.business", DEFAULT_BUSINESS);
  const [, setProducts] = useLocalState<Product[]>("alg.products", SAMPLE_PRODUCTS);
  const [, setTasks] = useLocalState<Task[]>("alg.tasks", SAMPLE_TASKS);

  const update = (key: keyof BusinessInfo, value: string) => setInfo({ ...info, [key]: value });

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title="Settings"
        description="These facts are the only information the AI may share with customers."
      />

      <Card className="card-elegant">
        <CardContent className="flex flex-wrap items-center gap-4 p-5">
          <Logo className="h-20 w-20 ring-1 ring-gold" />
          <div className="min-w-0">
            <p className="brand-title text-xl">ALG Collections</p>
            <p className="text-sm text-muted-foreground">Style for Every You</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Official brand logo — used across the dashboard, sidebar and header.
            </p>
          </div>
        </CardContent>
      </Card>

      <ResponsibleAi />

      <Card className="card-elegant">
        <CardHeader>
          <CardTitle className="text-lg">Business information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Business name</Label>
            <Input id="name" value={info.name} onChange={(e) => update("name", e.target.value)} />
          </div>
          {(
            [
              ["about", "About the business"],
              ["delivery", "Delivery information"],
              ["payment", "Payment methods"],
              ["hours", "Business hours"],
              ["contact", "Contact details"],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="space-y-1.5">
              <Label htmlFor={key}>{label}</Label>
              <Textarea
                id={key}
                rows={2}
                value={info[key]}
                onChange={(e) => update(key, e.target.value)}
              />
            </div>
          ))}
          <p className="text-xs text-muted-foreground">Changes save automatically.</p>
        </CardContent>
      </Card>

      <Card className="card-elegant">
        <CardHeader>
          <CardTitle className="text-lg">Demo data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            The catalogue and task list ship with realistic sample data for demonstration purposes.
            Reset at any time.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setProducts(SAMPLE_PRODUCTS);
              setTasks(SAMPLE_TASKS);
              setInfo(DEFAULT_BUSINESS);
              toast.success("Sample data restored");
            }}
          >
            <RotateCcw className="h-4 w-4" /> Restore sample data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
