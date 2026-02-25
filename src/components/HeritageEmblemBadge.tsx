import { cn } from "@/lib/utils";

type EmblemKind = "rhino" | "xaroi" | "jaapi";

interface HeritageEmblemBadgeProps {
  emblem: EmblemKind;
  label: string;
  className?: string;
}

const emblemSvg = (emblem: EmblemKind) => {
  if (emblem === "rhino") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-7 w-7">
        <path
          d="M10 38c3-8 11-13 20-13h8l6-6 6 2-4 5c5 2 8 6 8 12v8H20c-6 0-10-4-10-8Zm18 8v-7h8v7m7-7h6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (emblem === "xaroi") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-7 w-7">
        <path
          d="M14 30h36c-4-11-13-16-18-16s-14 5-18 16Zm18 0v18m-9 0h18M28 48v6m8-6v6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path d="M22 26c3 2 6 3 10 3s7-1 10-3" fill="none" stroke="currentColor" strokeWidth="2" opacity=".75" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-7 w-7">
      <circle cx="32" cy="32" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="32" r="15" fill="none" stroke="currentColor" strokeWidth="2" opacity=".9" />
      <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="2" opacity=".75" />
      <path
        d="M32 7 57 32 32 57 7 32Z M32 15 49 32 32 49 15 32Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        opacity=".85"
      />
    </svg>
  );
};

const HeritageEmblemBadge = ({ emblem, label, className }: HeritageEmblemBadgeProps) => {
  return (
    <div
      className={cn(
        "heritage-emblem-badge relative flex h-12 w-12 items-center justify-center rounded-2xl",
        className
      )}
      aria-label={label}
      title={label}
    >
      {emblemSvg(emblem)}
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default HeritageEmblemBadge;
