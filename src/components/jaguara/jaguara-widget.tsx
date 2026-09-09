"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useJaguara } from "@/components/jaguara/jaguara-provider";
import { JaguarIcon } from "@/components/jaguara/jaguar-icon";

const DEFAULT_POS = { right: 24, bottom: 24 };
const BUBBLE_SIZE = 56;

function subscribeNoop() {
  return () => {};
}
function useMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
}

type Pos = { right: number; bottom: number };

function useDrag(
  pos: Pos,
  setPos: (p: Pos) => void,
  boundSize: number,
  onClick?: () => void
) {
  const dragState = useRef<{
    startX: number;
    startY: number;
    startRight: number;
    startBottom: number;
    dragged: boolean;
  } | null>(null);

  return {
    onPointerDown(e: React.PointerEvent) {
      (e.target as Element).setPointerCapture(e.pointerId);
      dragState.current = {
        startX: e.clientX,
        startY: e.clientY,
        startRight: pos.right,
        startBottom: pos.bottom,
        dragged: false,
      };
    },
    onPointerMove(e: React.PointerEvent) {
      const d = dragState.current;
      if (!d) return;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) d.dragged = true;
      setPos({
        right: Math.min(Math.max(d.startRight - dx, 12), window.innerWidth - boundSize),
        bottom: Math.min(Math.max(d.startBottom - dy, 12), window.innerHeight - boundSize),
      });
    },
    onPointerUp() {
      const d = dragState.current;
      dragState.current = null;
      if (d && !d.dragged) onClick?.();
    },
  };
}

const EXAMPLES = ["Quais tendências são mais urgentes agora?", "Resuma o roadmap do Thiago", "Busca preço do dólar hoje"];

export function JaguaraWidget() {
  const pathname = usePathname();
  const { expanded, setExpanded, messages, input, setInput, loading, send } = useJaguara();
  const listRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<Pos>(DEFAULT_POS);
  const [closing, setClosing] = useState(false);
  const mounted = useMounted();

  const bubbleDrag = useDrag(pos, setPos, BUBBLE_SIZE, () => setExpanded(true));
  const panelDrag = useDrag(pos, setPos, BUBBLE_SIZE);

  if (!mounted) return null;
  if (pathname === "/dashboard" && !expanded && !closing) return null;

  function scrollToBottom() {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    });
  }

  function minimize() {
    setClosing(true);
    setTimeout(() => {
      setExpanded(false);
      setClosing(false);
    }, 160);
  }

  function submit(text?: string) {
    send(text);
    scrollToBottom();
  }

  return createPortal(
    <>
      {!expanded && (
        <button
          {...bubbleDrag}
          style={{ right: pos.right, bottom: pos.bottom }}
          className="fixed z-50 flex size-14 touch-none items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-transform hover:scale-105 active:scale-95"
          aria-label="Abrir chat com o Jaguara"
        >
          <JaguarIcon className="size-6" />
        </button>
      )}

      {(expanded || closing) && (
        <div
          style={{ right: pos.right, bottom: pos.bottom }}
          className={cn(
            "fixed z-50 flex h-[min(560px,calc(100vh-3rem))] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-primary/40 bg-popover shadow-2xl",
            closing ? "animate-pop-out" : "animate-pop-in"
          )}
        >
          <div
            {...panelDrag}
            className="flex touch-none items-center gap-2.5 bg-primary px-4 py-3.5 text-primary-foreground"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-white/15">
              <JaguarIcon className="size-[18px]" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[14px] font-semibold leading-none">Jaguara</div>
              <div className="mt-0.5 text-[11px] text-primary-foreground/70">
                Assistente interno · KVLT
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={minimize}
              aria-label="Minimizar"
              className="text-primary-foreground hover:bg-white/15 hover:text-primary-foreground"
            >
              <X className="size-4" />
            </Button>
          </div>

          <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <JaguarIcon className="size-8 text-muted-foreground/40" />
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  Pergunte sobre tendências, roadmaps, ou peça pra buscar algo atual na web.
                </p>
                <div className="flex flex-col gap-1.5 pt-1">
                  {EXAMPLES.map((ex) => (
                    <button
                      key={ex}
                      onClick={() => submit(ex)}
                      className="rounded-full border border-border px-3 py-1.5 text-[12px] text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] rounded-xl px-3.5 py-2.5 text-[13.5px] leading-relaxed whitespace-pre-wrap",
                    m.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  )}
                >
                  {m.content || (
                    <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border/60 p-3">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit();
                  }
                }}
                placeholder="Pergunte ao Jaguara..."
                rows={1}
                className="max-h-24 min-h-9 flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2 text-[13.5px] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
              <Button
                size="icon"
                onClick={() => submit()}
                disabled={loading || !input.trim()}
                aria-label="Enviar"
              >
                <Send className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
