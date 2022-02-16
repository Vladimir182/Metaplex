export const chunks = <T>(array: T[], size: number): T[][] => {
  if (size <= 0) {
    throw new Error("Chunk size can't be smaller than 1");
  }

  return Array.apply<number, T[], T[][]>(
    0,
    new Array<T>(Math.ceil(array.length / size))
  ).map((_, index) => array.slice(index * size, (index + 1) * size));
};
