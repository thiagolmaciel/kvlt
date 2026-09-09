"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [key, setKey] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-xl font-semibold tracking-widest">KVLT</h1>
          <p className="text-[15px] text-muted-foreground">
            Acesso restrito aos fundadores
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="key" className="text-[15px]">
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
    </main>
  );
}
