export const truncateDecimals = (num: number | null, fixed = 1) => {
  if (num === null) return 0;

  const reg = new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed}})?`, "g");
  const match = num.toString().match(reg);

  if (match === null) return 0;

  return +match[0];
};
