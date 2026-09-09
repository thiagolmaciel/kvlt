"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StageTracker } from "@/components/site/stage-tracker";

export default function LoginPage() {
  const router = useRouter();
  const [key, setKey] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen w-full">
      <section className="relative hidden w-1/2 shrink-0 overflow-hidden border-r border-border/60 bg-sidebar lg:flex lg:flex-col lg:justify-between lg:p-12">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none text-[13rem] font-bold leading-none tracking-tighter text-primary/[0.08] xl:text-[16rem]"
        >
          KVLT
        </span>

        <div className="relative">
          <span className="text-[15px] font-semibold tracking-widest">KVLT</span>
        </div>

        <div className="relative max-w-sm">
          <h1 className="text-[28px] font-semibold leading-tight tracking-tight">
            Painel privado de estruturação.
          </h1>
          <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
            Tendências, roadmaps e material de referência para os quatro
            estágios da empresa, de prestação de serviço a Big Tech.
          </p>
          <StageTracker currentIndex={0} orientation="horizontal" className="mt-8" />
        </div>
      </section>

      <section className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <span className="text-[15px] font-semibold tracking-widest">KVLT</span>
          </div>

          <h2 className="text-[20px] font-semibold tracking-tight">Entrar</h2>
          <p className="mt-1 text-[14px] text-muted-foreground">
            Acesso restrito aos fundadores.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="key" className="text-[14px]">
                Chave de acesso
              </Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="key"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Cole a chave gerada"
                  className="h-11 pl-9 text-[15px] font-mono tracking-wide"
                  autoComplete="off"
                />
              </div>
              <p className="text-[13px] text-muted-foreground">
                Mockup. Geração externa da chave ainda não conectada; qualquer valor entra.
              </p>
            </div>
            <Button type="submit" className="h-11 w-full text-[15px]">
              Entrar
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
