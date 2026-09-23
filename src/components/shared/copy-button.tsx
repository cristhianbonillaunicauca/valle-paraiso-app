"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Respaldo para navegadores sin API de portapapeles.
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  }
}

export function CopyButton({
  text,
  label = "Copiar prompt",
  doneLabel = "Prompt copiado",
  onCopied,
  className,
  variant = "solid",
}: {
  text: string;
  label?: string;
  doneLabel?: string;
  onCopied?: () => void;
  className?: string;
  variant?: "solid" | "ghost";
}) {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <button
      type="button"
      onClick={async () => {
        if (await copyText(text)) {
          setDone(true);
          onCopied?.();
          clearTimeout(timer.current);
          timer.current = setTimeout(() => setDone(false), 2200);
        }
      }}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition-all",
        variant === "solid"
          ? done
            ? "bg-teal-ink text-white"
            : "bg-navy text-white hover:bg-navy-deep"
          : "border border-line-strong text-navy hover:bg-paper-deep",
        className
      )}
    >
      {done ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
      <span aria-live="polite">{done ? `${doneLabel} ✓` : label}</span>
    </button>
  );
}
