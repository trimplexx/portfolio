import crypto from "crypto";

const CSRF_SECRET =
  process.env.CSRF_SECRET || crypto.randomBytes(32).toString("hex");

export function generateCSRFToken(): string {
  return crypto
    .createHash("sha256")
    .update(CSRF_SECRET + Date.now())
    .digest("hex");
}

export function validateCSRFToken(token: string): boolean {
  return typeof token === "string" && token.length === 64;
}
