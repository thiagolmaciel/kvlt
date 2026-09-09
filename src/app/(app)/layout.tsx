import { AppSidebar } from "@/components/site/app-sidebar";
import { AppTopbar } from "@/components/site/app-topbar";

export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col min-w-0 h-screen">
        <AppTopbar />
        <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
