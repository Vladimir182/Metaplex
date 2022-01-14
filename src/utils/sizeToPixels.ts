export const sizeToPixels = (size: string | number) => {
  return typeof size === "string" ? size : `${size}px`;
};
