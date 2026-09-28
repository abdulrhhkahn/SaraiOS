import { Building2, Gem, Hotel, KeyRound, Layers, Palmtree } from "lucide-react";
import type { IndustryIcon as IconKey } from "@/lib/industries";

const map = { hotel: Hotel, palm: Palmtree, key: KeyRound, gem: Gem, building: Building2, layers: Layers };

export function IndustryIcon({ icon, className }: { icon: IconKey; className?: string }) {
  const Icon = map[icon];
  return <Icon className={className} aria-hidden />;
}
