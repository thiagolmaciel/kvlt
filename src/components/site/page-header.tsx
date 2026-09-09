import type { LucideIcon } from "lucide-react";

export function PageHeader({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 px-6 py-7 md:px-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-[28px]">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-3">
        {children}
        {Icon && (
          <span className="hidden shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-accent-vivid sm:flex sm:size-14 md:size-16">
            <Icon className="size-6 md:size-7" strokeWidth={1.75} />
          </span>
        )}
      </div>
    </div>
  );
}
