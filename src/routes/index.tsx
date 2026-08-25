import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bot,
  ListChecks,
  Megaphone,
  MessageSquareText,
  PackageSearch,
  Shirt,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { ResponsibleAi } from "@/components/ResponsibleAi";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  SAMPLE_ENQUIRIES,
  SAMPLE_PRODUCTS,
  SAMPLE_TASKS,
  useLocalState,
  type Product,
  type Task,
} from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard | ALG Collections AI Business Assistant" },
      {
        name: "description",
        content:
          "Overview of ALG Collections stock levels, customer enquiries, today's tasks and quick access to the AI tools.",
      },
      { property: "og:title", content: "ALG Collections AI Business Assistant" },
      {
        property: "og:description",
        content: "An AI productivity workspace for the ALG Collections boutique.",
      },
    ],
  }),
  component: Dashboard,
});

const quickLinks = [
  { to: "/product-generator", label: "AI Product Generator", icon: Sparkles },
  { to: "/responses", label: "Customer Responses", icon: MessageSquareText },
  { to: "/social", label: "Social Media Content", icon: Megaphone },
  { to: "/chatbot", label: "AI Chatbot", icon: Bot },
] as const;

function Dashboard() {
  const [products] = useLocalState<Product[]>("alg.products", SAMPLE_PRODUCTS);
  const [tasks, setTasks] = useLocalState<Task[]>("alg.tasks", SAMPLE_TASKS);

  const inStock = products.filter((p) => p.stock > 0).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5);
  const openTasks = tasks.filter((t) => !t.done);

  const stats = [
    { label: "Total products", value: products.length, icon: Shirt },
    { label: "Products in stock", value: inStock, icon: PackageSearch },
    { label: "Low stock (≤5)", value: lowStock.length, icon: TriangleAlert },
    { label: "Open tasks today", value: openTasks.length, icon: ListChecks },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title="Boutique Dashboard"
        description="Your daily overview — stock, enquiries, tasks and AI tools in one place."
        action={<Badge className="bg-gold text-primary hover:bg-gold">Sample / demo data</Badge>}
      />

      <ResponsibleAi />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="card-elegant">
            <CardContent className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-5">
              <div className="min-w-0">
                <p className="truncate text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {s.label}
                </p>
                <p className="brand-title mt-1 text-3xl">{s.value}</p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/50 bg-beige">
                <s.icon className="h-5 w-5 text-gold" />
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="text-lg">Recent customer enquiries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {SAMPLE_ENQUIRIES.map((e) => (
              <div key={e.id} className="rounded-md border border-border bg-beige/50 p-3">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                  <p className="truncate text-sm font-medium">{e.customer}</p>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{e.at}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{e.message}</p>
                <Badge variant="outline" className="mt-2 border-gold/60 text-[10px] text-foreground">
                  {e.type}
                </Badge>
              </div>
            ))}
            <Link
              to="/responses"
              className="inline-block text-sm font-medium text-gold underline-offset-4 hover:underline"
            >
              Draft replies with AI →
            </Link>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="text-lg">Today's tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {tasks.slice(0, 6).map((t) => (
              <label
                key={t.id}
                className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-card p-3"
              >
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() =>
                    setTasks((prev) =>
                      prev.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)),
                    )
                  }
                  className="mt-1 h-4 w-4 shrink-0 accent-[var(--brand-gold)]"
                />
                <span className="min-w-0">
                  <span
                    className={`block text-sm ${t.done ? "text-muted-foreground line-through" : "text-foreground"}`}
                  >
                    {t.title}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {t.time} · {t.priority}
                  </span>
                </span>
              </label>
            ))}
            <Link
              to="/tasks"
              className="inline-block pt-1 text-sm font-medium text-gold underline-offset-4 hover:underline"
            >
              Open the AI task planner →
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="card-elegant">
        <CardHeader>
          <CardTitle className="text-lg">Quick access</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((q) => (
            <Link
              key={q.to}
              to={q.to}
              className="flex items-center gap-3 rounded-md border border-gold/40 bg-beige/60 p-4 transition-colors hover:bg-beige"
            >
              <q.icon className="h-5 w-5 shrink-0 text-gold" />
              <span className="min-w-0 truncate text-sm font-medium">{q.label}</span>
            </Link>
          ))}
        </CardContent>
      </Card>

      {lowStock.length > 0 && (
        <Card className="card-elegant border-gold/60">
          <CardHeader>
            <CardTitle className="text-lg">Low stock alerts</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {lowStock.map((p) => (
              <Badge key={p.id} variant="outline" className="border-gold text-foreground">
                {p.name} — {p.stock} left
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
