export function ensurePrefix(raw: string, prefix: string) {
  return raw.startsWith(prefix) ? raw : prefix + raw
}

export function ensureSuffix(raw: string, suffix: string) {
  return raw.endsWith(suffix) ? raw : raw + suffix
}

export function removePrefix(raw: string, prefix: string) {
  return raw.startsWith(prefix) ? raw.slice(prefix.length) : raw
}

export function maybeCapitalCase(raw: string | undefined) {
  if (!raw) return undefined
  return raw.charAt(0).toUpperCase() + raw.slice(1)
}
