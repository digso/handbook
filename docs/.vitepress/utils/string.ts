export function ensurePrefix(raw: string, prefix: string) {
  return raw.startsWith(prefix) ? raw : prefix + raw
}
