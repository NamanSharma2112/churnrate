"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CloudUploadIcon,
  File02Icon,
  CheckmarkCircle01Icon,
  Loading01Icon,
  Alert01Icon,
  ArrowLeft01Icon,
  CreditCardIcon,
} from "hugeicons-react";
import { useAuthStore } from "@/store/auth";
import { useDashboardStore } from "@/store/dashboard";
import { API_BASE } from "@/lib/api";
import { parseDelimited } from "@/lib/csv";
import { PageContainer, PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

interface FieldSpec {
  field: string;
  label: string;
  description: string;
  type: string;
  required: boolean;
}

interface ColumnMatch {
  column: string;
  field: string | null;
  confidence: number;
  reason: string;
}

interface Analysis {
  rowCount: number;
  columns: string[];
  mapping: Record<string, string>;
  matches: ColumnMatch[];
  unmapped: string[];
  missingRequired: string[];
  canImport: boolean;
  validRows: number;
  invalidRows: number;
  errors: { row: number; email?: string; error: string }[];
  preview: Record<string, unknown>[];
}

interface ImportBatch {
  id: string;
  source: string;
  fileName: string | null;
  rowCount: number;
  imported: number;
  updated: number;
  skipped: number;
  createdAt: string;
}

type Stage = "upload" | "review" | "done";

export default function ImportPage() {
  const { token } = useAuthStore();
  const { fetchCustomers, fetchDashboard } = useDashboardStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [stage, setStage] = useState<Stage>("upload");
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [fileName, setFileName] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [fields, setFields] = useState<FieldSpec[]>([]);
  const [history, setHistory] = useState<ImportBatch[]>([]);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    imported: number;
    updated: number;
    skipped: number;
    scored: number;
  } | null>(null);

  const authHeaders = useCallback(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
    [token]
  );

  const loadHistory = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/data/imports`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setHistory(data.imports ?? []);
      }
    } catch {
      // History is supplementary; failing to load it should not block importing.
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    loadHistory();
    fetch(`${API_BASE}/api/data/schema`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : { fields: [] }))
      .then((data) => setFields(data.fields ?? []))
      .catch(() => setFields([]));
  }, [token, loadHistory]);

  const handleFile = async (file: File) => {
    setError("");
    setResult(null);
    setBusy(true);

    try {
      const text = await file.text();
      const parsed = parseDelimited(text);

      if (parsed.length === 0) {
        throw new Error("That file has no data rows.");
      }

      setRows(parsed);
      setFileName(file.name);

      // Dry run: the server works out the mapping and shows what it would write.
      const res = await fetch(`${API_BASE}/api/data/analyze`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ rows: parsed, fileName: file.name }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not read that file");

      setAnalysis(data);
      setMapping(data.mapping);
      setStage("review");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not read that file");
    } finally {
      setBusy(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const runImport = async () => {
    setBusy(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/data/import`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ rows, mapping, fileName, predict: true }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Import failed");

      setResult(data);
      setStage("done");
      await Promise.all([fetchCustomers(), fetchDashboard(), loadHistory()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed");
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    setStage("upload");
    setRows([]);
    setAnalysis(null);
    setMapping({});
    setResult(null);
    setError("");
    setFileName("");
  };

  /** Assigning a column to a field releases it from whatever field held it. */
  const assign = (field: string, column: string) => {
    setMapping((current) => {
      const next = { ...current };
      for (const [key, value] of Object.entries(next)) {
        if (value === column && key !== field) delete next[key];
      }
      if (column === "") delete next[field];
      else next[field] = column;
      return next;
    });
  };

  const emailMapped = Boolean(mapping.email);

  return (
    <PageContainer>
      <PageHeader
        title="Data Import"
        description="Upload any customer export — columns are detected and mapped for you"
      >
        <Link
          href="/integrations"
          className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-subtle shadow-sm transition-colors hover:bg-muted"
        >
          <CreditCardIcon size={16} />
          Connect Stripe instead
        </Link>
      </PageHeader>

      <Stepper stage={stage} />

      {error && (
        <div className="mb-6 flex items-start gap-2.5 rounded-lg border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300">
          <Alert01Icon size={18} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {stage === "upload" && (
        <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
          <div className="panel p-6 sm:p-8">
            <div
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => {
                event.preventDefault();
                setDragging(false);
                const file = event.dataTransfer.files?.[0];
                if (file) handleFile(file);
              }}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 text-center transition-colors",
                dragging
                  ? "border-brand bg-brand-muted/60"
                  : "border-border bg-muted hover:border-brand-border hover:bg-brand-muted/40"
              )}
            >
              <span className="mb-4 flex size-14 items-center justify-center rounded-full bg-brand-muted text-brand">
                {busy ? (
                  <Loading01Icon size={26} className="animate-spin" />
                ) : (
                  <CloudUploadIcon size={26} />
                )}
              </span>
              <h3 className="text-base font-semibold text-foreground">
                {busy ? "Reading your file…" : "Drop a CSV here"}
              </h3>
              <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
                Or click to browse. CSV, TSV and semicolon-separated files all work.
              </p>
              <span className="mt-5 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-sm">
                Select file
              </span>
            </div>

            <input
              type="file"
              accept=".csv,.tsv,.txt,text/csv"
              className="hidden"
              ref={fileInputRef}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) handleFile(file);
              }}
            />

            <div className="mt-6 rounded-lg border border-border bg-[#FCFCFC] p-4">
              <p className="text-xs font-medium text-subtle">
                Only an email column is required.
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Everything else is optional — the more signals you include (last login,
                health score, support tickets, NPS), the sharper the predictions. Columns we
                don&apos;t recognise are kept on the record rather than discarded.
              </p>
            </div>
          </div>

          <RecentImports history={history} />
        </div>
      )}

      {stage === "review" && analysis && (
        <div className="space-y-4 sm:space-y-6">
          <div className="panel p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-muted-foreground">
                  <File02Icon size={20} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{fileName}</p>
                  <p className="text-xs text-muted-foreground">
                    {analysis.rowCount.toLocaleString()} rows ·{" "}
                    {analysis.columns.length} columns · {analysis.validRows} importable
                    {analysis.invalidRows > 0 && ` · ${analysis.invalidRows} skipped`}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={reset}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-subtle transition-colors hover:bg-muted"
              >
                <ArrowLeft01Icon size={15} />
                Choose another file
              </button>
            </div>
          </div>

          <div className="panel">
            <div className="border-b border-border p-4 sm:p-5">
              <h3 className="text-base font-semibold text-foreground">Review the mapping</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                We matched your columns to our fields. Change anything that looks wrong before
                importing.
              </p>
            </div>

            <div className="divide-y divide-border">
              {fields.map((spec) => {
                const match = analysis.matches.find((m) => m.field === spec.field);
                const current = mapping[spec.field] ?? "";

                return (
                  <div
                    key={spec.field}
                    className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
                  >
                    <div className="min-w-0 sm:w-1/2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {spec.label}
                        </span>
                        {spec.required && (
                          <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-red-600 dark:text-red-400">
                            Required
                          </span>
                        )}
                        {current && match && match.confidence >= 0.9 && (
                          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                            High confidence
                          </span>
                        )}
                        {current && match && match.confidence < 0.9 && (
                          <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400">
                            Please verify
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{spec.description}</p>
                    </div>

                    <select
                      value={current}
                      onChange={(event) => assign(spec.field, event.target.value)}
                      aria-label={`Column for ${spec.label}`}
                      className={cn(
                        "w-full rounded-lg border bg-card px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20 sm:w-64",
                        spec.required && !current
                          ? "border-red-500/25"
                          : "border-border"
                      )}
                    >
                      <option value="">
                        {spec.required ? "— Select a column —" : "— Not mapped —"}
                      </option>
                      {analysis.columns.map((column) => (
                        <option key={column} value={column}>
                          {column}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>

            {analysis.unmapped.length > 0 && (
              <div className="border-t border-border bg-[#FCFCFC] p-4 sm:px-5">
                <p className="text-xs text-subtle">
                  <span className="font-medium">Kept as custom attributes:</span>{" "}
                  {analysis.unmapped.join(", ")}
                </p>
              </div>
            )}
          </div>

          {analysis.preview.length > 0 && <PreviewTable preview={analysis.preview} />}

          {analysis.errors.length > 0 && (
            <div className="panel p-4 sm:p-5">
              <h3 className="text-sm font-semibold text-foreground">
                {analysis.invalidRows} row{analysis.invalidRows === 1 ? "" : "s"} will be
                skipped
              </h3>
              <ul className="mt-3 space-y-1.5">
                {analysis.errors.slice(0, 8).map((rowError, index) => (
                  <li key={index} className="text-xs text-subtle">
                    <span className="font-medium">Row {rowError.row}:</span> {rowError.error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {emailMapped
                ? `${analysis.validRows.toLocaleString()} customers will be imported and scored.`
                : "Map a column to Email before importing."}
            </p>
            <button
              type="button"
              onClick={runImport}
              disabled={busy || !emailMapped}
              className="flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy && <Loading01Icon size={16} className="animate-spin" />}
              {busy ? "Importing…" : "Import and score"}
            </button>
          </div>
        </div>
      )}

      {stage === "done" && result && (
        <div className="panel p-8 text-center sm:p-12">
          <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckmarkCircle01Icon size={28} />
          </span>
          <h3 className="text-xl font-semibold text-foreground">Import complete</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            {result.imported} new customer{result.imported === 1 ? "" : "s"} added
            {result.updated > 0 && `, ${result.updated} updated`}
            {result.skipped > 0 && `, ${result.skipped} skipped`}. {result.scored} account
            {result.scored === 1 ? " was" : "s were"} scored by the model.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-hover"
            >
              View dashboard
            </Link>
            <Link
              href="/at-risk"
              className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-subtle shadow-sm transition-colors hover:bg-muted"
            >
              See at-risk accounts
            </Link>
            <button
              type="button"
              onClick={reset}
              className="rounded-lg px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Import another file
            </button>
          </div>
        </div>
      )}
    </PageContainer>
  );
}

function Stepper({ stage }: { stage: Stage }) {
  const steps: { key: Stage; label: string }[] = [
    { key: "upload", label: "Upload" },
    { key: "review", label: "Review mapping" },
    { key: "done", label: "Import" },
  ];
  const activeIndex = steps.findIndex((step) => step.key === stage);

  return (
    <div className="mb-6 flex items-center gap-2 overflow-x-auto">
      {steps.map((step, index) => (
        <div key={step.key} className="flex shrink-0 items-center gap-2">
          <span
            className={cn(
              "flex size-6 items-center justify-center rounded-full text-xs font-medium",
              index < activeIndex
                ? "bg-emerald-500 text-white"
                : index === activeIndex
                  ? "bg-brand text-white"
                  : "bg-border text-muted-foreground"
            )}
          >
            {index < activeIndex ? "✓" : index + 1}
          </span>
          <span
            className={cn(
              "whitespace-nowrap text-sm",
              index === activeIndex ? "font-medium text-foreground" : "text-muted-foreground"
            )}
          >
            {step.label}
          </span>
          {index < steps.length - 1 && (
            <span className="mx-1 h-px w-6 shrink-0 bg-border sm:w-10" />
          )}
        </div>
      ))}
    </div>
  );
}

const PREVIEW_COLUMNS = [
  { key: "company", label: "Company" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "plan", label: "Plan" },
  { key: "mrr", label: "MRR" },
  { key: "healthScore", label: "Health" },
];

function PreviewTable({ preview }: { preview: Record<string, unknown>[] }) {
  return (
    <div className="panel">
      <div className="border-b border-border p-4 sm:p-5">
        <h3 className="text-base font-semibold text-foreground">Preview</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          The first {preview.length} rows, as they will be stored.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              {PREVIEW_COLUMNS.map((column) => (
                <th key={column.key} className="whitespace-nowrap px-4 py-3 font-medium">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {preview.map((row, index) => (
              <tr key={index} className="border-b border-border last:border-0">
                {PREVIEW_COLUMNS.map((column) => {
                  const value = row[column.key];
                  return (
                    <td
                      key={column.key}
                      className="whitespace-nowrap px-4 py-2.5 text-sm text-subtle"
                    >
                      {value === null || value === undefined || value === ""
                        ? <span className="text-muted-foreground/60">—</span>
                        : column.key === "mrr"
                          ? `$${Number(value).toLocaleString()}`
                          : String(value)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RecentImports({ history }: { history: ImportBatch[] }) {
  return (
    <div className="panel flex flex-col">
      <div className="border-b border-border p-4 sm:p-5">
        <h3 className="text-base font-semibold text-foreground">Recent imports</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">Your latest data syncs</p>
      </div>

      {history.length === 0 ? (
        <EmptyState
          compact
          icon={File02Icon}
          title="No imports yet"
          description="Your import history will appear here."
          className="flex-1"
        />
      ) : (
        <div className="flex-1 divide-y divide-border overflow-auto">
          {history.map((batch) => (
            <div key={batch.id} className="flex items-center justify-between gap-3 p-4 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-muted-foreground">
                  {batch.source === "stripe" ? (
                    <CreditCardIcon size={18} />
                  ) : (
                    <File02Icon size={18} />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {batch.fileName || `${batch.source} sync`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(batch.createdAt).toLocaleString()} · {batch.imported} added
                    {batch.updated > 0 && `, ${batch.updated} updated`}
                  </p>
                </div>
              </div>
              <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <CheckmarkCircle01Icon size={13} />
                Done
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
