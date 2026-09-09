"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface JaguaraContextValue {
  expanded: boolean;
  setExpanded: (v: boolean) => void;
  messages: ChatMessage[];
  input: string;
  setInput: (v: string) => void;
  loading: boolean;
  send: (overrideText?: string) => void;
}

const JaguaraContext = createContext<JaguaraContextValue | null>(null);

export function JaguaraProvider({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(input);
  inputRef.current = input;
  const messagesRef = useRef(messages);
  messagesRef.current = messages;
  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  const send = useCallback(async (overrideText?: string) => {
    const text = (overrideText ?? inputRef.current).trim();
    if (!text || loadingRef.current) return;

    const history: ChatMessage[] = [...messagesRef.current, { role: "user", content: text }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/jaguara", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.body) throw new Error("Sem resposta do servidor.");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          copy[copy.length - 1] = { ...last, content: last.content + chunk };
          return copy;
        });
      }
    } catch {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Não consegui responder agora. Verifique a conexão e a configuração da API.",
        };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <JaguaraContext.Provider
      value={{ expanded, setExpanded, messages, input, setInput, loading, send }}
    >
      {children}
    </JaguaraContext.Provider>
  );
}

export function useJaguara() {
  const ctx = useContext(JaguaraContext);
  if (!ctx) throw new Error("useJaguara must be used within JaguaraProvider");
  return ctx;
}
