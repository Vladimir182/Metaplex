export const getShortAddress = (str: string) =>
  str.substring(0, 4) + "..." + str.substring(str.length - 4);
