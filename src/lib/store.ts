import { useCallback, useEffect, useState } from "react";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  sizes: string;
  colours: string;
  material: string;
  stock: number;
  description: string;
  image: string;
  notes: string;
  demo?: boolean;
};

export type Task = {
  id: string;
  title: string;
  priority: "Urgent" | "High" | "Normal" | "Low";
  time: string;
  done: boolean;
  demo?: boolean;
};

export type Enquiry = {
  id: string;
  customer: string;
  type: string;
  message: string;
  at: string;
  demo?: boolean;
};

export type BusinessInfo = {
  name: string;
  about: string;
  delivery: string;
  payment: string;
  hours: string;
  contact: string;
};

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Satin Midi Slip Dress",
    category: "Dresses",
    price: "R899",
    sizes: "XS, S, M, L, XL",
    colours: "Black, Champagne, Blush",
    material: "Satin polyester blend",
    stock: 14,
    description: "Bias-cut satin slip dress with adjustable straps and a soft drape.",
    image: "",
    notes: "Bestseller for evening occasions.",
    demo: true,
  },
  {
    id: "p2",
    name: "Tailored Linen Blazer",
    category: "Outerwear",
    price: "R1 299",
    sizes: "S, M, L, XL, XXL",
    colours: "Cream, Beige, Black",
    material: "Linen / viscose",
    stock: 4,
    description: "Relaxed single-button blazer with structured shoulders.",
    image: "",
    notes: "Low stock — restock from supplier.",
    demo: true,
  },
  {
    id: "p3",
    name: "High-Waist Wide Leg Jeans",
    category: "Denim",
    price: "R749",
    sizes: "26, 28, 30, 32, 34",
    colours: "Mid Blue, Washed Black",
    material: "Cotton denim with stretch",
    stock: 22,
    description: "Full-length wide leg denim with a flattering high waist.",
    image: "",
    notes: "",
    demo: true,
  },
  {
    id: "p4",
    name: "Ribbed Knit Cardigan",
    category: "Knitwear",
    price: "R599",
    sizes: "S, M, L",
    colours: "Blush Nude, Cream",
    material: "Soft acrylic knit",
    stock: 2,
    description: "Cropped ribbed cardigan with gold-tone buttons.",
    image: "",
    notes: "Winter capsule item.",
    demo: true,
  },
  {
    id: "p5",
    name: "Nude Pointed Court Heels",
    category: "Footwear",
    price: "R849",
    sizes: "3, 4, 5, 6, 7, 8",
    colours: "Nude, Black",
    material: "Vegan leather",
    stock: 9,
    description: "Classic 8cm pointed court heel that goes with everything.",
    image: "",
    notes: "",
    demo: true,
  },
];

export const SAMPLE_TASKS: Task[] = [
  { id: "t1", title: "Reply to overnight WhatsApp enquiries", priority: "Urgent", time: "08:00 – 08:45", done: false, demo: true },
  { id: "t2", title: "Post new arrivals reel on Instagram", priority: "High", time: "10:00 – 10:30", done: false, demo: true },
  { id: "t3", title: "Check low-stock items and place supplier order", priority: "High", time: "11:00 – 12:00", done: false, demo: true },
  { id: "t4", title: "Pack and dispatch today's orders", priority: "Urgent", time: "13:00 – 14:30", done: true, demo: true },
  { id: "t5", title: "Update product pricing sheet", priority: "Normal", time: "15:00 – 15:30", done: false, demo: true },
];

export const SAMPLE_ENQUIRIES: Enquiry[] = [
  { id: "e1", customer: "Nomsa M.", type: "Size enquiry", message: "Hi, do you have the satin midi dress in a size L?", at: "10 min ago", demo: true },
  { id: "e2", customer: "Lerato K.", type: "Delivery enquiry", message: "How long does delivery take to Durban?", at: "1 hr ago", demo: true },
  { id: "e3", customer: "Aisha P.", type: "Stock availability", message: "Is the ribbed cardigan back in stock in cream?", at: "3 hrs ago", demo: true },
  { id: "e4", customer: "Thandi S.", type: "Price enquiry", message: "What is the price of the linen blazer?", at: "Yesterday", demo: true },
];

export const DEFAULT_BUSINESS: BusinessInfo = {
  name: "ALG Collections",
  about: "ALG Collections is a modern boutique offering elegant, everyday-luxury clothing, footwear and accessories. Style for Every You.",
  delivery: "Nationwide courier delivery in 2–4 working days. Free delivery on orders over R1 000. Local collection available by appointment.",
  payment: "EFT, card payment on delivery and instant payment links.",
  hours: "Monday to Friday 09:00 – 17:00, Saturday 09:00 – 13:00.",
  contact: "WhatsApp / Instagram DM: @algcollections",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function useLocalState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setValue(read<T>(key, initial));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          /* ignore */
        }
        return resolved;
      });
    },
    [key],
  );

  return [value, update, hydrated] as const;
}

export const uid = () => Math.random().toString(36).slice(2, 10);

export function businessContext(products: Product[], info: BusinessInfo) {
  const lines = products.map(
    (p) =>
      `- ${p.name} | Category: ${p.category} | Price: ${p.price} | Sizes: ${p.sizes} | Colours: ${p.colours} | Material: ${p.material || "not specified"} | Stock: ${p.stock} | Description: ${p.description}`,
  );
  return `BUSINESS: ${info.name}
About: ${info.about}
Delivery: ${info.delivery}
Payment: ${info.payment}
Hours: ${info.hours}
Contact: ${info.contact}

PRODUCT CATALOGUE:
${lines.length ? lines.join("\n") : "No products captured yet."}`;
}

export const GUARDRAILS = `You are the AI business assistant for ALG Collections, a clothing boutique.
STRICT RULES:
- Never invent prices, sizes, colours, stock levels, delivery times, materials or policies.
- Only use facts explicitly provided to you.
- If a needed detail is missing, say clearly that ALG Collections must confirm it.
- Never make misleading claims. Keep the business owner in control.
- Write in clear, warm, professional South African English.`;
