export function toNumber(s: string, def = 0): number {
  const val = parseFloat(s);
  if (Number.isNaN(val)) {
    return def;
  }
  return val;
}
