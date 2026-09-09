import {
  Bot,
  Code2,
  ShieldAlert,
  Banknote,
  Layers,
  Scale,
  Cpu,
  Globe,
  Zap,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import type { TrendIcon as TrendIconType } from "@/types";

export const TREND_ICONS: Record<TrendIconType, LucideIcon> = {
  bot: Bot,
  "code-2": Code2,
  "shield-alert": ShieldAlert,
  banknote: Banknote,
  layers: Layers,
  scale: Scale,
  cpu: Cpu,
  globe: Globe,
  zap: Zap,
  "graduation-cap": GraduationCap,
};

export function TrendIcon({
  icon,
  className,
}: {
  icon: TrendIconType;
  className?: string;
}) {
  const Icon = TREND_ICONS[icon];
  return <Icon className={className} strokeWidth={1.75} />;
}
