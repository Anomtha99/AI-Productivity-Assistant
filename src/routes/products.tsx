import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SAMPLE_PRODUCTS, uid, useLocalState, type Product } from "@/lib/store";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Product Catalogue | ALG Collections AI Assistant" },
      {
        name: "description",
        content:
          "Add, edit and remove ALG Collections products with flexible sizes, colours, pricing and stock.",
      },
      { property: "og:title", content: "ALG Collections Product Catalogue" },
      {
        property: "og:description",
        content: "Manage boutique product information that powers every AI tool.",
      },
    ],
  }),
  component: ProductsPage,
});

const empty: Product = {
  id: "",
  name: "",
  category: "",
  price: "",
  sizes: "",
  colours: "",
  material: "",
  stock: 0,
  description: "",
  image: "",
  notes: "",
};

function ProductsPage() {
  const [products, setProducts] = useLocalState<Product[]>("alg.products", SAMPLE_PRODUCTS);
  const [draft, setDraft] = useState<Product | null>(null);

  const save = () => {
    if (!draft) return;
    if (!draft.name.trim() || !draft.category.trim() || !draft.price.trim()) {
      toast.error("Name, category and price are required.");
      return;
    }
    if (draft.id) {
      setProducts((prev) => prev.map((p) => (p.id === draft.id ? draft : p)));
      toast.success("Product updated");
    } else {
      setProducts((prev) => [{ ...draft, id: uid() }, ...prev]);
      toast.success("Product added");
    }
    setDraft(null);
  };

  const field = (key: keyof Product, label: string, placeholder = "") => (
    <div className="space-y-1.5">
      <Label htmlFor={key}>{label}</Label>
      <Input
        id={key}
        value={String(draft?.[key] ?? "")}
        placeholder={placeholder}
        onChange={(e) =>
          setDraft((d) =>
            d ? { ...d, [key]: key === "stock" ? Number(e.target.value) || 0 : e.target.value } : d,
          )
        }
      />
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title="Product Catalogue"
        description="This information is the single source of truth for every AI tool."
        action={
          <Button onClick={() => setDraft({ ...empty })} className="shrink-0">
            <Plus className="h-4 w-4" /> Add product
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((p) => (
          <Card key={p.id} className="card-elegant overflow-hidden">
            {p.image ? (
              <img src={p.image} alt={p.name} className="h-44 w-full object-cover" />
            ) : (
              <div className="grid h-44 w-full place-items-center bg-beige">
                <span className="brand-title text-2xl text-gold">ALG</span>
              </div>
            )}
            <CardContent className="space-y-2 p-4">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                <h2 className="min-w-0 truncate text-base font-semibold">{p.name}</h2>
                <span className="shrink-0 text-sm font-semibold text-gold">{p.price}</span>
              </div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {p.category}
              </p>
              <p className="line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <Badge variant="outline" className="border-gold/50">
                  Sizes: {p.sizes || "—"}
                </Badge>
                <Badge variant="outline" className="border-gold/50">
                  {p.colours || "—"}
                </Badge>
                <Badge variant={p.stock <= 5 ? "destructive" : "secondary"}>
                  Stock: {p.stock}
                </Badge>
                {p.demo && <Badge className="bg-blush text-primary">Demo data</Badge>}
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => setDraft(p)}>
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setProducts((prev) => prev.filter((x) => x.id !== p.id));
                    toast.success("Product removed");
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!draft} onOpenChange={(open) => !open && setDraft(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="brand-title text-xl">
              {draft?.id ? "Edit product" : "Add product"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            {field("name", "Product name", "Satin Midi Slip Dress")}
            {field("category", "Category", "Dresses")}
            {field("price", "Price", "R899")}
            {field("stock", "Stock quantity", "10")}
            {field("sizes", "Sizes", "XS, S, M, L, XL")}
            {field("colours", "Colours", "Black, Cream, Blush")}
            {field("material", "Material / fabric", "Satin polyester")}
            {field("image", "Product image URL", "https://…")}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="description">Product description</Label>
            <Textarea
              id="description"
              rows={3}
              value={draft?.description ?? ""}
              onChange={(e) => setDraft((d) => (d ? { ...d, description: e.target.value } : d))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              rows={2}
              value={draft?.notes ?? ""}
              onChange={(e) => setDraft((d) => (d ? { ...d, notes: e.target.value } : d))}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDraft(null)}>
              Cancel
            </Button>
            <Button onClick={save}>Save product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
