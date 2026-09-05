import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * One mark used everywhere — landing, auth, sidebar — so the product reads as a
 * single system rather than three separately designed surfaces.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm",
        className
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-[18px]">
        <path
          d="M4 16.5 9 11l3.5 3.5L20 6"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 11V6h-5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Logo({
  href = "/",
  className,
  showWordmark = true,
}: {
  href?: string;
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50",
        className
      )}
    >
      <LogoMark />
      {showWordmark && (
        <span className="text-[15px] font-semibold tracking-tight text-neutral-900">
          ChurnRate
        </span>
      )}
    </Link>
  );
}
