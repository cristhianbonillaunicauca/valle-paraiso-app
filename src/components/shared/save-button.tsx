"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useSaved, type SavedItem } from "@/lib/saved";
import { cn } from "@/lib/utils";

export function SaveButton({
  item,
  className,
  compact = false,
}: {
  item: Omit<SavedItem, "savedAt">;
  className?: string;
  compact?: boolean;
}) {
  const { isSaved, toggle, hydrated } = useSaved();
  const saved = hydrated && isSaved(item.kind, item.id);
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Quitar "${item.titulo}" de guardados` : `Guardar "${item.titulo}"`}
      title={saved ? "Guardado en Mis recursos" : "Guardar en Mis recursos"}
      onClick={() => toggle(item)}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border text-sm font-semibold transition-colors",
        compact ? "w-11" : "px-4",
        saved
          ? "border-transparent bg-gold/15 text-[#7A5A06]"
          : "border-line-strong text-navy hover:bg-paper-deep",
        className
      )}
    >
      {saved ? <BookmarkCheck size={17} aria-hidden /> : <Bookmark size={17} aria-hidden />}
      {!compact && <span>{saved ? "Guardado" : "Guardar"}</span>}
    </button>
  );
}
