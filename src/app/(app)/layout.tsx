import { AppHeader } from "@/components/site/app-header";

export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      <AppHeader />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[1440px]">{children}</div>
      </main>
    </div>
  );
}
