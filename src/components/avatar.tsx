"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { colorHex } from "@/lib/colors";

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function Avatar({
  name,
  color,
  photoUrl,
  size = 64,
  className,
}: {
  name: string;
  color?: string | null;
  photoUrl?: string | null;
  size?: number;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);

  if (photoUrl && !errored) {
    return (
      <Image
        src={photoUrl}
        alt={`Foto de ${name}`}
        width={size}
        height={size}
        onError={() => setErrored(true)}
        className={cn("rounded-full object-cover ring-4 ring-white shadow-md", className)}
        style={{ width: size, height: size }}
        unoptimized
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-display font-semibold text-white ring-4 ring-white shadow-md",
        className
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.34,
        background: `linear-gradient(135deg, ${colorHex(color)}, ${colorHex("navy")})`,
      }}
    >
      {initials(name)}
    </div>
  );
}
