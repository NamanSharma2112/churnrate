/**
 * Symmetric encryption for third-party credentials at rest.
 *
 * Integration API keys can move money, so they are never stored in plain text
 * and never returned to the client — only a masked hint is.
 */
import crypto from "crypto";
import { config } from "../config/index.js";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;

/**
 * A 32-byte key. ENCRYPTION_KEY is preferred; otherwise we derive one from the
 * JWT secret so local development works without extra setup.
 */
function getKey(): Buffer {
  const raw = process.env.ENCRYPTION_KEY;
  if (raw) {
    // Accept either a 64-char hex key or an arbitrary passphrase.
    if (/^[0-9a-f]{64}$/i.test(raw)) return Buffer.from(raw, "hex");
    return crypto.createHash("sha256").update(raw).digest();
  }
  return crypto.createHash("sha256").update(`churnrate:${config.jwt.secret}`).digest();
}

export function encrypt(plaintext: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv.toString("base64"), tag.toString("base64"), encrypted.toString("base64")].join(":");
}

export function decrypt(payload: string): string {
  const [ivB64, tagB64, dataB64] = payload.split(":");
  if (!ivB64 || !tagB64 || !dataB64) {
    throw new Error("Stored credential is malformed");
  }
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    getKey(),
    Buffer.from(ivB64, "base64")
  );
  decipher.setAuthTag(Buffer.from(tagB64, "base64"));
  return Buffer.concat([
    decipher.update(Buffer.from(dataB64, "base64")),
    decipher.final(),
  ]).toString("utf8");
}

/** "sk_live_51Hx…9kQ" -> "sk_live_…9kQ" for display. */
export function maskSecret(secret: string): string {
  if (secret.length <= 12) return "••••";
  const prefix = secret.slice(0, secret.startsWith("sk_") || secret.startsWith("rk_") ? 8 : 4);
  return `${prefix}••••${secret.slice(-4)}`;
}
