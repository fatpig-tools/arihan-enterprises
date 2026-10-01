export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Digits only, for tel: and wa.me links. Empty while the number is a placeholder. */
export function digits(value: string) {
  return /\d{6,}/.test(value.replace(/\D/g, "")) && !value.includes("X") ? value.replace(/[^\d+]/g, "") : "";
}
