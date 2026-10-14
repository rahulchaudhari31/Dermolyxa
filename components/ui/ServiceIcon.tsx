import {
  Sparkles,
  Scissors,
  User,
  Eye,
  Syringe,
  Dna,
  Droplets,
  Gem,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconKey } from "@/data/services";

const iconMap: Record<ServiceIconKey, LucideIcon> = {
  sparkles: Sparkles,
  scissors: Scissors,
  user: User,
  eye: Eye,
  syringe: Syringe,
  dna: Dna,
  droplets: Droplets,
  gem: Gem,
};

type ServiceIconProps = {
  name: ServiceIconKey;
  className?: string;
};

export default function ServiceIcon({ name, className }: ServiceIconProps) {
  const Icon = iconMap[name] ?? Sparkles;
  return <Icon className={className} />;
}
