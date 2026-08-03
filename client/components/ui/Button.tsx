import { ButtonHTMLAttributes } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

export default function Button({
  children,
  loading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        w-full
        rounded-xl
        bg-emerald-600
        px-4
        py-3
        font-medium
        text-white
        transition-colors
        hover:bg-emerald-700
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}