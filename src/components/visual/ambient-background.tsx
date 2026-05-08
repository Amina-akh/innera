"use client";

export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--bg)]">
      <div
        className="innera-bg-mesh absolute -inset-[18%]"
        style={{
          background: [
            "radial-gradient(ellipse 72% 58% at 8% -4%, rgba(200, 150, 255, 0.2), transparent 52%)",
            "radial-gradient(ellipse 65% 52% at 92% 8%, rgba(255, 130, 180, 0.14), transparent 54%)",
            "radial-gradient(ellipse 55% 42% at 48% 100%, rgba(244, 200, 220, 0.08), transparent 58%)",
            "radial-gradient(ellipse 45% 35% at 70% 45%, rgba(120, 80, 220, 0.1), transparent 50%)",
          ].join(", "),
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 255, 255, 0.035), transparent 55%)",
            "radial-gradient(ellipse 50% 35% at 100% 50%, rgba(180, 140, 255, 0.06), transparent 60%)",
          ].join(", "),
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.42) 58%, rgba(0,0,0,0.72) 100%)",
        }}
      />
      <div className="innera-noise absolute inset-0 opacity-[0.035]" />
    </div>
  );
}
