import { icons, Circle, type LucideIcon } from "lucide-react";

export function getIcon(iconName: string): LucideIcon {
  return (icons as Record<string, LucideIcon>)[iconName] ?? Circle;
}
