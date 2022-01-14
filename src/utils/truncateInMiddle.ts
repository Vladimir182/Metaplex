export function truncateInMiddle(
  address: string,
  opts: { chars?: number; sep?: string } | number = 4
): string {
  const chars = typeof opts === "number" ? opts : opts?.chars ?? 4;
  const sep = (typeof opts === "object" ? opts?.sep : null) ?? "...";
  if (chars > 0 && address.length >= chars * 2 + sep.length - 1) {
    return `${address.slice(0, chars)}${sep}${address.slice(-chars)}`;
  }
  return address;
}
