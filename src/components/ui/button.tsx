import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export function Button({ variant = "primary", children, className = "", ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <button
      {...props}
      className={`innera-btn innera-btn-${variant} ${className}`.trim()}
    >
      {children}
    </button>
  );
}
