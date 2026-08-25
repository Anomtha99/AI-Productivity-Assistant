import { useCallback, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

import { generateAi } from "@/lib/ai.functions";

export function useAi() {
  const call = useServerFn(generateAi);
  const [loading, setLoading] = useState(false);

  const run = useCallback(
    async (system: string, prompt: string): Promise<string | null> => {
      setLoading(true);
      try {
        const result = await call({ data: { system, prompt } });
        const text = result.text?.trim();
        if (!text) {
          toast.error("The assistant returned an empty response. Please try again.");
          return null;
        }
        return text;
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Something went wrong.");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [call],
  );

  return { run, loading };
}
