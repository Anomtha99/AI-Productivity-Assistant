import type { ReactNode } from "react";
import {
  Bot,
  Boxes,
  CalendarClock,
  CheckCircle2,
  Clock,
  Copy,
  Instagram,
  ListChecks,
  MessageCircle,
  MessageSquareText,
  Megaphone,
  Pencil,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Timer,
  XCircle,
} from "lucide-react";

import logo from "@/assets/alg-logo.png.asset.json";
import {
  AppShot,
  Bullets,
  FlowStack,
  Panel,
  Pill,
  SlideBody,
  SlideFrame,
  SlideHeader,
  type Tone,
} from "./primitives";

export type SlideDef = {
  id: string;
  title: string;
  tone: Tone;
  render: () => ReactNode;
};

const ICON = "h-[2.4cqw] w-[2.4cqw] text-gold";

/* ------------------------------------------------------------------ 01 */
function TitleSlide() {
  return (
    <SlideFrame tone="dark" className="items-center justify-center text-center">
      <div className="pointer-events-none absolute -right-[12cqw] -top-[16cqw] h-[46cqw] w-[46cqw] rounded-full bg-gold/10 blur-[3cqw]" />
      <div className="pointer-events-none absolute -bottom-[18cqw] -left-[10cqw] h-[38cqw] w-[38cqw] rounded-full bg-blush/10 blur-[3cqw]" />
      <div className="relative flex flex-col items-center px-[8cqw]">
        <img
          src={logo.url}
          alt="ALG Collections"
          className="h-[13cqw] w-[13cqw] rounded-full object-cover ring-1 ring-gold/60"
        />
        <p className="s-kicker mt-[2.4cqw] text-gold">ALG Collections</p>
        <h1 className="brand-title s-hero mt-[1.2cqw] leading-[1]">AI Business Assistant</h1>
        <div className="gold-rule mt-[2.2cqw] w-[26cqw]" />
        <p className="s-subtitle mt-[2.2cqw] italic text-gold-soft">
          “More time for customers. More time for growth.”
        </p>
        <p className="s-body mt-[1.6cqw] max-w-[58cqw] text-cream/75">
          An AI-powered assistant designed to simplify everyday tasks for a clothing business.
        </p>
        <p className="s-chrome mt-[3.4cqw] uppercase tracking-[0.28em] text-cream/60">
          Presented by Anesipho Getsengana
        </p>
      </div>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ 02 */
const CHALLENGES = [
  { icon: MessageSquareText, label: "Responding to customer enquiries" },
  { icon: Sparkles, label: "Writing product descriptions" },
  { icon: Megaphone, label: "Creating social media content" },
  { icon: Boxes, label: "Managing product information" },
  { icon: CalendarClock, label: "Planning daily business activities" },
];

function ProblemSlide() {
  return (
    <SlideFrame>
      <SlideHeader kicker="Slide 02" title="The Business Challenge" />
      <SlideBody className="flex flex-col justify-between">
        <div className="grid grid-cols-5 gap-[1.4cqw]">
          {CHALLENGES.map(({ icon: Icon, label }) => (
            <Panel key={label} className="flex flex-col items-start gap-[1.2cqw]">
              <Icon className={ICON} />
              <p className="s-body leading-snug">{label}</p>
            </Panel>
          ))}
        </div>
        <div className="mt-[3cqw] flex items-center gap-[2cqw] rounded-[1.2cqw] bg-foreground px-[3cqw] py-[2.4cqw] text-cream">
          <Clock className="h-[3.4cqw] w-[3.4cqw] shrink-0 text-gold" />
          <p className="s-subtitle brand-title">
            Small tasks take time. AI can help make them faster and easier.
          </p>
        </div>
      </SlideBody>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ 03 */
const BENEFITS = ["Save time", "Respond faster", "Create content", "Stay organised", "Better service"];

function SolutionSlide() {
  return (
    <SlideFrame>
      <SlideHeader kicker="Slide 03" title="Our Solution" />
      <SlideBody className="grid grid-cols-[1.15fr_0.85fr] gap-[3cqw]">
        <div className="flex flex-col justify-between">
          <p className="s-body-lg leading-snug text-foreground/85">
            ALG Collections AI Business Assistant is a{" "}
            <span className="font-semibold">web-based AI assistant</span> that helps a clothing
            business manage everyday tasks more efficiently.
          </p>
          <div className="mt-[2cqw] grid grid-cols-2 gap-[1.2cqw]">
            {BENEFITS.map((b) => (
              <Panel key={b} className="flex items-center gap-[1.2cqw]">
                <CheckCircle2 className={ICON} />
                <span className="s-body font-medium uppercase tracking-[0.1em]">{b}</span>
              </Panel>
            ))}
          </div>
        </div>
        <Panel className="flex flex-col justify-center">
          <FlowStack steps={["Business information", "AI Assistant", "Useful business outputs"]} />
        </Panel>
      </SlideBody>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ 04 */
const STEPS = [
  { n: "01", t: "Enter", d: "The business owner enters accurate product or business information." },
  { n: "02", t: "Generate", d: "The AI processes the information using structured prompts." },
  { n: "03", t: "Review", d: "The business owner reviews and edits the AI output." },
  { n: "04", t: "Use", d: "The final approved content is copied and used." },
];

function HowItWorksSlide() {
  return (
    <SlideFrame tone="dark">
      <SlideHeader kicker="Slide 04" title="How It Works" tone="dark" />
      <SlideBody className="flex flex-col justify-between">
        <div className="grid grid-cols-4 gap-[1.6cqw]">
          {STEPS.map((s) => (
            <Panel key={s.n} tone="dark" className="flex flex-col gap-[1cqw]">
              <span className="brand-title s-num text-gold">{s.n}</span>
              <p className="s-subtitle brand-title">{s.t}</p>
              <p className="s-body leading-snug text-cream/75">{s.d}</p>
            </Panel>
          ))}
        </div>
        <p className="s-subtitle brand-title mt-[3cqw] border-l-[0.4cqw] border-gold pl-[2cqw] italic text-gold-soft">
          AI assists the business owner — it does not replace human judgement.
        </p>
      </SlideBody>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ 05 */
const FIELDS = [
  "Product name",
  "Category",
  "Price",
  "Sizes",
  "Colours",
  "Material",
  "Stock quantity",
  "Description",
  "Product image",
];

function CatalogueSlide() {
  return (
    <SlideFrame>
      <SlideHeader kicker="Slide 05" title="Product Catalogue" />
      <SlideBody className="grid grid-cols-[0.95fr_1.05fr] gap-[3cqw]">
        <div className="flex min-h-0 flex-col">
          <p className="s-body leading-snug text-foreground/85">
            All ALG Collections product information lives in one place.
          </p>
          <div className="mt-[1.6cqw] flex flex-wrap gap-[0.8cqw]">
            {FIELDS.map((f) => (
              <Pill key={f}>{f}</Pill>
            ))}
          </div>
          <Panel className="mt-[2cqw]">
            <p className="s-kicker text-gold">Example</p>
            <p className="brand-title s-subtitle mt-[0.6cqw]">Elegant Midi Dress — R450</p>
            <p className="s-body mt-[0.6cqw] text-foreground/80">
              Sizes: S, M, L, XL &nbsp;·&nbsp; Colours: Black, Cream
            </p>
          </Panel>
          <p className="s-body mt-[2cqw] leading-snug text-muted-foreground">
            The AI tools then use this information to generate accurate content and customer
            responses.
          </p>
        </div>
        <AppShot src="/shots/products.png" caption="Live app — Product Catalogue" />
      </SlideBody>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ 06 */
const OUTPUTS = [
  "Product description",
  "Instagram caption",
  "Facebook post",
  "WhatsApp message",
  "Advertisement",
  "Hashtags",
];

function ProductGeneratorSlide() {
  return (
    <SlideFrame>
      <SlideHeader kicker="Slide 06" title="AI Product Generator" />
      <SlideBody className="grid grid-cols-[0.95fr_1.05fr] gap-[3cqw]">
        <div className="flex min-h-0 flex-col justify-between">
          <p className="s-body leading-snug text-foreground/85">
            Enter product information once — generate multiple pieces of marketing content.
          </p>
          <div className="mt-[1.4cqw] grid grid-cols-[auto_1fr] items-center gap-x-[1.6cqw] gap-y-[0.6cqw]">
            <Pill>Input</Pill>
            <span className="s-body">Product details</span>
            <Pill>AI</Pill>
            <span className="s-body text-muted-foreground">Structured prompt</span>
          </div>
          <div className="mt-[1.4cqw] grid grid-cols-2 gap-[0.7cqw]">
            {OUTPUTS.map((o) => (
              <Panel key={o} className="flex items-center gap-[0.9cqw] px-[1.2cqw] py-[0.7cqw]">
                <Sparkles className="h-[1.8cqw] w-[1.8cqw] shrink-0 text-gold" />
                <span className="whitespace-nowrap text-[1.45cqw]">{o}</span>
              </Panel>
            ))}
          </div>
          <div className="mt-[1.4cqw] flex gap-[1cqw]">
            {[
              { icon: Pencil, label: "Edit" },
              { icon: Copy, label: "Copy" },
              { icon: RefreshCw, label: "Regenerate" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="s-body inline-flex items-center gap-[0.8cqw] rounded-full bg-foreground px-[1.6cqw] py-[0.7cqw] text-cream"
              >
                <Icon className="h-[1.8cqw] w-[1.8cqw] text-gold" />
                {label}
              </span>
            ))}
          </div>
        </div>
        <AppShot src="/shots/product-generator.png" caption="Live app — AI Product Generator" />
      </SlideBody>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ 07 */
function ResponsesSlide() {
  return (
    <SlideFrame>
      <SlideHeader kicker="Slide 07" title="Customer Response Generator" />
      <SlideBody className="grid grid-cols-[1fr_1fr] gap-[3cqw]">
        <div className="flex min-h-0 flex-col">
          <p className="s-body leading-snug text-foreground/85">
            Reply to customer enquiries quickly and professionally.
          </p>
          <Panel className="mt-[1.6cqw] border-l-[0.4cqw] border-l-gold">
            <p className="s-kicker text-gold">Customer</p>
            <p className="s-body mt-[0.6cqw] italic">
              “Hi, do you still have the Elegant Midi Dress in size L?”
            </p>
          </Panel>
          <Panel className="mt-[1.2cqw] bg-beige/60">
            <p className="s-kicker text-gold">AI Assistant</p>
            <p className="s-body mt-[0.6cqw]">
              Drafts a friendly, professional reply using only the saved business information.
            </p>
          </Panel>
          <p className="s-body mt-[1.6cqw] flex items-start gap-[1cqw] leading-snug text-muted-foreground">
            <ShieldCheck className={ICON} />
            The AI must not invent prices, sizes, colours, stock or delivery information.
          </p>
        </div>
        <div className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-[1.4cqw]">
          <FlowStack
            direction="row"
            steps={["Customer message", "AI response", "Human review", "Send"]}
          />
          <AppShot
            className="min-h-0"
            src="/shots/responses.png"
            caption="Live app — Customer Responses"
          />
        </div>
      </SlideBody>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ 08 */
function SocialSlide() {
  return (
    <SlideFrame>
      <SlideHeader kicker="Slide 08" title="Social Media Generator" />
      <SlideBody className="grid grid-cols-[1fr_1fr] gap-[3cqw]">
        <div className="flex min-h-0 flex-col justify-between">
          <p className="s-body-lg leading-snug text-foreground/85">
            Create platform-specific marketing content without starting from scratch.
          </p>
          <div className="mt-[1.6cqw] grid grid-cols-3 gap-[1cqw]">
            {[
              { icon: Instagram, label: "Instagram" },
              { icon: Megaphone, label: "Facebook" },
              { icon: MessageCircle, label: "WhatsApp" },
            ].map(({ icon: Icon, label }) => (
              <Panel key={label} className="flex flex-col items-center gap-[0.8cqw] py-[1.4cqw]">
                <Icon className={ICON} />
                <span className="s-body">{label}</span>
              </Panel>
            ))}
          </div>
          <div className="mt-[1.8cqw]">
            <p className="s-kicker text-gold">Content types</p>
            <div className="mt-[1cqw] flex flex-wrap gap-[0.8cqw]">
              {["New arrivals", "Promotions", "Sales", "Restocks", "Customer appreciation"].map(
                (c) => (
                  <Pill key={c}>{c}</Pill>
                ),
              )}
            </div>
          </div>
          <div className="mt-[1.8cqw]">
            <p className="s-kicker text-gold">Tone</p>
            <div className="mt-[1cqw] flex flex-wrap gap-[0.8cqw]">
              {["Professional", "Friendly", "Trendy", "Persuasive"].map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
          </div>
        </div>
        <AppShot src="/shots/social.png" caption="Live app — Social Media Generator" />
      </SlideBody>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ 09 */
function TasksSlide() {
  return (
    <SlideFrame>
      <SlideHeader kicker="Slide 09" title="AI Task Planner" />
      <SlideBody className="grid grid-cols-[1fr_1fr] gap-[3cqw]">
        <div className="flex min-h-0 flex-col justify-between">
          <p className="s-body-lg leading-snug text-foreground/85">
            Organise and prioritise daily and weekly business activities.
          </p>
          <Bullets
            items={[
              "Respond to customers",
              "Process orders and check stock",
              "Create social media content",
              "Update products and admin tasks",
            ]}
          />
          <div className="flex gap-[1cqw]">
            {[
              { label: "Urgent", cls: "bg-foreground text-cream" },
              { label: "Important", cls: "bg-gold text-foreground" },
              { label: "Normal", cls: "bg-beige text-foreground" },
            ].map((p) => (
              <span
                key={p.label}
                className={`s-body flex-1 rounded-[0.9cqw] px-[1.4cqw] py-[1.1cqw] text-center font-medium uppercase tracking-[0.14em] ${p.cls}`}
              >
                {p.label}
              </span>
            ))}
          </div>
          <p className="s-body leading-snug text-muted-foreground">
            AI organises the work so the most important tasks come first.
          </p>
        </div>
        <AppShot src="/shots/tasks.png" caption="Live app — Task Planner" />
      </SlideBody>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ 10 */
function ChatbotSlide() {
  return (
    <SlideFrame>
      <SlideHeader kicker="Slide 10" title="AI Customer Chatbot" />
      <SlideBody className="grid grid-cols-[1fr_1fr] gap-[3cqw]">
        <div className="flex min-h-0 flex-col justify-between">
          <p className="s-body-lg leading-snug text-foreground/85">
            An interactive way for customers to ask questions.
          </p>
          <div className="space-y-[0.9cqw]">
            {[
              "What sizes are available?",
              "How much is this dress?",
              "What colours do you have?",
              "Is this item in stock?",
              "What are the delivery options?",
            ].map((q) => (
              <p
                key={q}
                className="s-body w-fit rounded-full border border-gold/40 bg-beige/60 px-[1.6cqw] py-[0.8cqw]"
              >
                {q}
              </p>
            ))}
          </div>
          <p className="s-body flex items-start gap-[1cqw] leading-snug text-muted-foreground">
            <Bot className={ICON} />
            The chatbot answers only from approved business information.
          </p>
        </div>
        <div className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-[1.4cqw]">
          <FlowStack
            direction="row"
            steps={["Customer question", "AI chatbot", "Business info", "Helpful response"]}
          />
          <AppShot className="min-h-0" src="/shots/chatbot.png" caption="Live app — AI Chatbot" />
        </div>
      </SlideBody>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ 11 */
function ResponsibleSlide() {
  return (
    <SlideFrame tone="dark">
      <SlideHeader kicker="Slide 11" title="Responsible AI" tone="dark" />
      <SlideBody className="grid grid-cols-[1fr_1fr] gap-[3cqw]">
        <Panel tone="dark" className="flex flex-col justify-center">
          <FlowStack
            tone="dark"
            steps={["AI generates", "Human reviews", "Human approves", "Customer receives"]}
          />
        </Panel>
        <div className="flex flex-col justify-between">
          <div>
            <p className="s-kicker text-gold">The AI must never</p>
            <div className="mt-[1.2cqw] space-y-[0.9cqw]">
              {[
                "Invent prices",
                "Invent stock availability",
                "Invent sizes or colours",
                "Invent delivery information",
                "Provide misleading information",
              ].map((x) => (
                <p key={x} className="s-body flex items-center gap-[1cqw] text-cream/85">
                  <XCircle className={ICON} />
                  {x}
                </p>
              ))}
            </div>
          </div>
          <p className="brand-title s-subtitle mt-[2cqw] italic text-gold-soft">
            Human oversight keeps the business owner in control.
          </p>
        </div>
      </SlideBody>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ 12 */
const BEFORE = [
  "Manual customer responses",
  "Manual content creation",
  "Manual task planning",
  "Product information kept separately",
  "More time on repetitive work",
];
const AFTER = [
  "Faster response drafts",
  "Multiple marketing outputs",
  "Organised, prioritised tasks",
  "Centralised product information",
  "More time for customers and growth",
];

function ValueSlide() {
  return (
    <SlideFrame>
      <SlideHeader kicker="Slide 12" title="Why ALG Collections Would Use It" />
      <SlideBody className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-[2cqw]">
        <Panel className="bg-beige/50">
          <p className="s-kicker flex items-center gap-[0.8cqw] text-muted-foreground">
            <Timer className={ICON} /> Before
          </p>
          <div className="mt-[1.4cqw]">
            <Bullets items={BEFORE} icon={<XCircle className="h-[1.8cqw] w-[1.8cqw]" />} />
          </div>
        </Panel>
        <div className="flex items-center">
          <span className="brand-title s-num text-gold">&rarr;</span>
        </div>
        <Panel className="border-gold bg-card">
          <p className="s-kicker flex items-center gap-[0.8cqw] text-gold">
            <Sparkles className={ICON} /> After
          </p>
          <div className="mt-[1.4cqw]">
            <Bullets items={AFTER} icon={<CheckCircle2 className="h-[1.8cqw] w-[1.8cqw]" />} />
          </div>
        </Panel>
      </SlideBody>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ 13 */
function DifferentSlide() {
  return (
    <SlideFrame>
      <SlideHeader kicker="Slide 13" title="Why ALG Collections AI Assistant?" />
      <SlideBody className="grid grid-cols-[1fr_1fr] gap-[3cqw]">
        <div className="flex flex-col justify-between">
          <p className="s-body-lg leading-snug text-foreground/85">
            Instead of separate tools for different tasks, ALG Collections brings practical AI
            assistance into one business-focused application.
          </p>
          <div className="grid grid-cols-1 gap-[1cqw]">
            {[
              { icon: Boxes, label: "One platform" },
              { icon: Sparkles, label: "Multiple AI tools" },
              { icon: ListChecks, label: "Business-specific information" },
              { icon: ShieldCheck, label: "Human oversight" },
              { icon: CheckCircle2, label: "Easy to use" },
            ].map(({ icon: Icon, label }) => (
              <Panel key={label} className="flex items-center gap-[1.2cqw] py-[1.1cqw]">
                <Icon className={ICON} />
                <span className="s-body font-medium uppercase tracking-[0.12em]">{label}</span>
              </Panel>
            ))}
          </div>
          <p className="brand-title s-subtitle italic text-foreground/80">
            Built specifically around the needs of a clothing business.
          </p>
        </div>
        <AppShot src="/shots/dashboard.png" caption="Live app — Dashboard" />
      </SlideBody>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ 14 */
function FutureSlide() {
  return (
    <SlideFrame tone="dark">
      <SlideHeader kicker="Slide 14" title="Future Improvements" tone="dark" />
      <SlideBody className="flex flex-col justify-between">
        <div>
          <Pill tone="dark">Future development opportunities — not yet built</Pill>
        </div>
        <div className="mt-[2cqw] grid grid-cols-3 gap-[1.4cqw]">
          {[
            "Online customer ordering",
            "Automated inventory alerts",
            "Customer order tracking",
            "Sales analytics",
            "More advanced chatbot integration",
            "Social media scheduling",
            "Customer database integration",
          ].map((f) => (
            <Panel key={f} tone="dark" className="flex items-center gap-[1.2cqw] py-[1.4cqw]">
              <span className="s-body text-gold">+</span>
              <span className="s-body text-cream/85">{f}</span>
            </Panel>
          ))}
        </div>
        <p className="s-body mt-[2cqw] text-cream/60">
          These are planned ideas. The current application delivers the five AI tools and the
          product catalogue shown in this deck.
        </p>
      </SlideBody>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ 15 */
function ConclusionSlide() {
  return (
    <SlideFrame tone="dark" className="items-center justify-center text-center">
      <div className="pointer-events-none absolute -bottom-[20cqw] right-[-10cqw] h-[46cqw] w-[46cqw] rounded-full bg-gold/10 blur-[3cqw]" />
      <div className="relative flex flex-col items-center px-[8cqw]">
        <img
          src={logo.url}
          alt=""
          aria-hidden
          className="h-[9cqw] w-[9cqw] rounded-full object-cover ring-1 ring-gold/60"
        />
        <h2 className="brand-title mt-[2cqw] text-[3.8cqw] leading-[1.1]">
          ALG Collections AI Business Assistant
        </h2>
        <p className="s-subtitle mt-[1.6cqw] italic text-gold">
          “AI should make business simpler — not more complicated.”
        </p>
        <div className="mt-[2.6cqw] flex flex-wrap justify-center gap-[1cqw]">
          {["Save time", "Work smarter", "Respond faster", "Create content", "Stay organised"].map(
            (x) => (
              <Pill key={x} tone="dark">
                {x}
              </Pill>
            ),
          )}
        </div>
        <div className="gold-rule mt-[3cqw] w-[26cqw]" />
        <p className="brand-title s-subtitle mt-[2.4cqw] text-cream">
          More time for customers. More time for growth.
        </p>
      </div>
    </SlideFrame>
  );
}

export const SLIDES: SlideDef[] = [
  { id: "title", title: "Title", tone: "dark", render: () => <TitleSlide /> },
  { id: "problem", title: "The Business Challenge", tone: "light", render: () => <ProblemSlide /> },
  { id: "solution", title: "Our Solution", tone: "light", render: () => <SolutionSlide /> },
  { id: "how", title: "How It Works", tone: "dark", render: () => <HowItWorksSlide /> },
  { id: "catalogue", title: "Product Catalogue", tone: "light", render: () => <CatalogueSlide /> },
  {
    id: "generator",
    title: "AI Product Generator",
    tone: "light",
    render: () => <ProductGeneratorSlide />,
  },
  {
    id: "responses",
    title: "Customer Response Generator",
    tone: "light",
    render: () => <ResponsesSlide />,
  },
  { id: "social", title: "Social Media Generator", tone: "light", render: () => <SocialSlide /> },
  { id: "tasks", title: "AI Task Planner", tone: "light", render: () => <TasksSlide /> },
  { id: "chatbot", title: "AI Customer Chatbot", tone: "light", render: () => <ChatbotSlide /> },
  { id: "responsible", title: "Responsible AI", tone: "dark", render: () => <ResponsibleSlide /> },
  { id: "value", title: "Business Value", tone: "light", render: () => <ValueSlide /> },
  { id: "different", title: "Why This Solution", tone: "light", render: () => <DifferentSlide /> },
  { id: "future", title: "Future Improvements", tone: "dark", render: () => <FutureSlide /> },
  { id: "conclusion", title: "Conclusion", tone: "dark", render: () => <ConclusionSlide /> },
];
