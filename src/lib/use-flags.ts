"use client";

import { useCallback, useEffect, useState } from "react";

export function useFlags() {
  const [flags, setFlags] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/flags")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Falha ao carregar.");
        setFlags(data.flags ?? {});
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Falha ao carregar."))
      .finally(() => setLoading(false));
  }, []);

  const setFlag = useCallback((key: string, value: unknown) => {
    setFlags((prev) => ({ ...prev, [key]: value }));
    fetch("/api/flags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    }).catch(() => {
      // optimistic update stays even if the write fails silently; next load reconciles
    });
  }, []);

  return { flags, loading, error, setFlag };
}
