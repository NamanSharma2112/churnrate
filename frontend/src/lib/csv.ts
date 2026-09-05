/**
 * Minimal RFC 4180 CSV reader.
 *
 * A naive `split(",")` corrupts every export containing a quoted company name
 * with a comma in it ("Acme, Inc."), which is most real ones.
 */
export function parseCsv(text: string): Record<string, string>[] {
  const rows = parseRows(text);
  if (rows.length < 2) return [];

  const headers = rows[0].map((h, index) => h.trim() || `Column ${index + 1}`);

  return rows
    .slice(1)
    .filter((row) => row.some((cell) => cell.trim() !== ""))
    .map((row) => {
      const record: Record<string, string> = {};
      headers.forEach((header, index) => {
        record[header] = (row[index] ?? "").trim();
      });
      return record;
    });
}

function parseRows(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  // Normalise line endings so CRLF files do not leave stray \r in values.
  const input = text.replace(/\r\n?/g, "\n");

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (inQuotes) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

/** Detects the delimiter so tab- and semicolon-separated exports also work. */
export function parseDelimited(text: string): Record<string, string>[] {
  const firstLine = text.split(/\r?\n/, 1)[0] ?? "";
  const counts = {
    ",": (firstLine.match(/,/g) ?? []).length,
    "\t": (firstLine.match(/\t/g) ?? []).length,
    ";": (firstLine.match(/;/g) ?? []).length,
  };

  const delimiter = (Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    ",") as string;

  // Reuse the quote-aware reader by normalising to commas first.
  if (delimiter === ",") return parseCsv(text);
  return parseCsv(
    text
      .split("\n")
      .map((line) => line.split(delimiter).map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
      .join("\n")
  );
}
