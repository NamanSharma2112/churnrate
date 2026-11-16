/** Display formats shared by stats, tables and charts. */

export function money(value: number) {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

/** $980 / $12.9k / $4.2M - for stat tiles and axis ticks. */
export function moneyCompact(value: number) {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 1_000_000) return `${sign}$${trim(abs / 1_000_000)}M`;
  if (abs >= 10_000) return `${sign}$${Math.round(abs / 1000)}k`;
  if (abs >= 1000) return `${sign}$${trim(abs / 1000)}k`;
  return `${sign}$${Math.round(abs)}`;
}

export function count(value: number) {
  return Math.round(value).toLocaleString("en-US");
}

export function percent(value: number, digits = 1) {
  const fixed = value.toFixed(digits);
  return `${fixed.endsWith(".0") ? fixed.slice(0, -2) : fixed}%`;
}

function trim(value: number) {
  const fixed = value.toFixed(1);
  return fixed.endsWith(".0") ? fixed.slice(0, -2) : fixed;
}

/** "2026-06-15T…" -> "3d ago" / "2mo ago". */
export function ago(value?: string | null) {
  if (!value) return "—";
  const time = new Date(value).getTime();
  if (Number.isNaN(time)) return "—";
  const minutes = Math.round((Date.now() - time) / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.round(months / 12)}y ago`;
}
