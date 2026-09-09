"use client";

import { MessageCircle, ArrowUpRight } from "lucide-react";
import { useJaguara } from "@/components/jaguara/jaguara-provider";
import { JaguarIcon } from "@/components/jaguara/jaguar-icon";

const EXAMPLES = [
  "Quais tendências são mais urgentes agora?",
  "Vai sobrar algo pro beta?",
  "Por que eu escolhi TI?",
];

export function JaguaraInvite() {
  const { setExpanded, send } = useJaguara();

  return (
    <div className="hidden max-w-[480px] flex-1 shrink-0 flex-col overflow-hidden rounded-2xl border border-white/15 bg-primary text-primary-foreground shadow-xl shadow-primary/20 lg:flex">
      <button
        onClick={() => setExpanded(true)}
        className="flex items-center gap-2.5 px-4 py-3 text-left hover:bg-white/5"
      >
        <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-white/15">
          <JaguarIcon className="size-4" />
        </span>
        <span className="flex-1 text-[15px] font-semibold">Fale com o Jaguara</span>
        <MessageCircle className="size-4 shrink-0 opacity-70" />
      </button>

      <div className="flex flex-col gap-1 bg-black/55 p-1.5 backdrop-blur-sm">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => {
              setExpanded(true);
              send(ex);
            }}
            className="group flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-left text-[13px] text-primary-foreground/75 hover:bg-white/10 hover:text-primary-foreground"
          >
            <span className="flex-1 truncate">{ex}</span>
            <ArrowUpRight className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-70" />
          </button>
        ))}
      </div>
    </div>
  );
}
