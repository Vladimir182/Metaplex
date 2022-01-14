export function getStorage(): Storage | null {
  if ("localStorage" in global) {
    return global.localStorage;
  }
  return null;
}
