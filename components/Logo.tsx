import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  priority?: boolean;
  onClick?: () => void;
};

export default function Logo({ className, priority, onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${siteConfig.name} home`}
      className={cn("group inline-flex items-center", className)}
    >
      <Image
        src="/logo-dermolyxa.png"
        alt={`${siteConfig.name} logo`}
        width={600}
        height={433}
        priority={priority}
        sizes="(max-width: 640px) 132px, 168px"
        className="h-11 w-auto transition-opacity duration-300 group-hover:opacity-90 sm:h-14"
      />
    </Link>
  );
}
