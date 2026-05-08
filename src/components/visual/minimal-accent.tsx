"use client";

/** One controlled line accent: composition, not decoration */
export function HorizonRule({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-px w-full max-w-md bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.12)] to-transparent ${className}`}
      aria-hidden
    />
  );
}
