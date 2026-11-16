"use client";

import { useId, useState } from "react";
import { ViewIcon, ViewOffSlashIcon } from "hugeicons-react";
import { cn } from "@/lib/utils";

/**
 * Field primitive shared by both auth forms, matching the input treatment used
 * across the dashboard (neutral border, indigo focus ring).
 */
export function FormField({
  label,
  type = "text",
  icon: Icon,
  optional,
  hint,
  value,
  onChange,
  placeholder,
  autoComplete,
  required = true,
  minLength,
}: {
  label: string;
  type?: string;
  icon: React.ElementType;
  optional?: boolean;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
}) {
  const id = useId();
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && revealed ? "text" : type;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-subtle"
      >
        <span>
          {label}
          {optional && <span className="ml-1 font-normal text-muted-foreground">(optional)</span>}
        </span>
      </label>

      <div className="relative">
        <Icon
          size={17}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          id={id}
          type={inputType}
          value={value}
          required={required && !optional}
          minLength={minLength}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            "h-11 w-full rounded-lg border border-border bg-card pl-10 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground",
            "focus:border-brand focus:ring-2 focus:ring-brand/20",
            isPassword ? "pr-11" : "pr-3"
          )}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed(!revealed)}
            aria-label={revealed ? "Hide password" : "Show password"}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-subtle"
          >
            {revealed ? <ViewOffSlashIcon size={17} /> : <ViewIcon size={17} />}
          </button>
        )}
      </div>

      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function FormError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-2.5 rounded-lg border border-red-500/25 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300"
    >
      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
        !
      </span>
      <span>{message}</span>
    </div>
  );
}

export function SubmitButton({
  loading,
  children,
  loadingLabel,
}: {
  loading: boolean;
  children: React.ReactNode;
  loadingLabel: string;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-hover focus-visible:ring-2 focus-visible:ring-brand/40 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading && (
        <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {loading ? loadingLabel : children}
    </button>
  );
}
