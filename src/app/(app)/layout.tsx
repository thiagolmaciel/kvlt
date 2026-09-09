import { AppHeader } from "@/components/site/app-header";
import { JaguaraProvider } from "@/components/jaguara/jaguara-provider";
import { JaguaraWidget } from "@/components/jaguara/jaguara-widget";

export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JaguaraProvider>
      <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
        <AppHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1440px]">{children}</div>
        </main>
      </div>
      <JaguaraWidget />
    </JaguaraProvider>
  );
}
