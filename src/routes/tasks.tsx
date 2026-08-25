import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks, Loader2, Plus, Trash2 } from "lucide-react";

import { AiOutput } from "@/components/AiOutput";
import { PageHeader } from "@/components/PageHeader";
import { ResponsibleAi } from "@/components/ResponsibleAi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GUARDRAILS, SAMPLE_TASKS, uid, useLocalState, type Task } from "@/lib/store";
import { useAi } from "@/lib/useAi";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | ALG Collections" },
      {
        name: "description",
        content:
          "Plan the ALG Collections day or week — priorities, realistic time blocks and a tickable task list.",
      },
      { property: "og:title", content: "AI Business Task Planner" },
      {
        property: "og:description",
        content: "Turn a messy to-do list into a prioritised boutique schedule.",
      },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  const [tasks, setTasks] = useLocalState<Task[]>("alg.tasks", SAMPLE_TASKS);
  const [raw, setRaw] = useState("");
  const [range, setRange] = useState("Daily");
  const [plan, setPlan] = useState("");
  const [newTask, setNewTask] = useState("");
  const { run, loading } = useAi();

  const generate = async () => {
    const text = await run(
      GUARDRAILS,
      `Build a ${range.toLowerCase()} schedule for the owner of ALG Collections.

Tasks the owner listed:
"""${raw || "No tasks listed — build a sensible default boutique routine and clearly label it as a suggestion."}"""

Already captured in the app:
${tasks.map((t) => `- ${t.title} (${t.priority}${t.done ? ", done" : ""})`).join("\n") || "- none"}

Organise by priority (Urgent / High / Normal / Low), flag what is urgent AND important, suggest realistic time allocations in blocks, and cover boutique essentials: replying to customers, social media posting, stock checks, order processing, marketing and admin. Plain text, one line per time block like "08:00 – 08:45 · Urgent · Reply to overnight enquiries".`,
    );
    if (text) setPlan(text);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => [
      { id: uid(), title: newTask.trim(), priority: "Normal", time: "", done: false },
      ...prev,
    ]);
    setNewTask("");
  };

  const importPlan = () => {
    const lines = plan
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 3 && /\d{1,2}[:h]\d{2}/.test(l));
    if (!lines.length) return;
    setTasks((prev) => [
      ...lines.map((line) => {
        const parts = line.split("·").map((p) => p.trim());
        const priority = (["Urgent", "High", "Normal", "Low"] as const).find((p) =>
          line.toLowerCase().includes(p.toLowerCase()),
        );
        return {
          id: uid(),
          title: parts[parts.length - 1] ?? line,
          priority: priority ?? "Normal",
          time: parts[0] ?? "",
          done: false,
        };
      }),
      ...prev,
    ]);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title="AI Business Task Planner"
        description="Prioritise the day or week and keep the boutique running smoothly."
      />
      <ResponsibleAi compact />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="card-elegant h-fit">
          <CardContent className="space-y-4 p-5">
            <div className="space-y-1.5">
              <Label>Plan for</Label>
              <Select value={range} onValueChange={setRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Daily">Today</SelectItem>
                  <SelectItem value="Weekly">This week</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="raw">Your tasks</Label>
              <Textarea
                id="raw"
                rows={7}
                value={raw}
                placeholder={"Reply to customers\nPost new arrivals\nCount stock\nPack orders"}
                onChange={(e) => setRaw(e.target.value)}
              />
            </div>
            <Button onClick={generate} disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ListChecks className="h-4 w-4" />
              )}
              Build schedule
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <AiOutput
            label={`${range} schedule`}
            value={plan}
            rows={14}
            loading={loading}
            onRegenerate={generate}
            onChange={setPlan}
          />
          <Button variant="outline" onClick={importPlan} disabled={!plan}>
            <Plus className="h-4 w-4" /> Add schedule to my task list
          </Button>
        </div>
      </div>

      <Card className="card-elegant">
        <CardHeader>
          <CardTitle className="text-lg">Task list</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
            <Input
              value={newTask}
              placeholder="Add a task…"
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <Button onClick={addTask} className="shrink-0">
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
          {tasks.map((t) => (
            <div
              key={t.id}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-md border border-border bg-card p-3"
            >
              <input
                type="checkbox"
                checked={t.done}
                onChange={() =>
                  setTasks((prev) => prev.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))
                }
                className="h-4 w-4 accent-[var(--brand-gold)]"
              />
              <div className="min-w-0">
                <p className={`truncate text-sm ${t.done ? "text-muted-foreground line-through" : ""}`}>
                  {t.title}
                </p>
                {t.time && <p className="text-[11px] text-muted-foreground">{t.time}</p>}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge
                  variant={t.priority === "Urgent" ? "destructive" : "outline"}
                  className="text-[10px]"
                >
                  {t.priority}
                </Badge>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setTasks((prev) => prev.filter((x) => x.id !== t.id))}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
