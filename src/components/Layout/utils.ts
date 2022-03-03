export const getPadding = (
  mdUp: boolean,
  noPadding: boolean
): number | "unset" => {
  if (noPadding) {
    return "unset";
  }

  return mdUp ? 12 : 6;
};
