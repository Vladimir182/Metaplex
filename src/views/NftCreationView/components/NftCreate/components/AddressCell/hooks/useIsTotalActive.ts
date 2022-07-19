export const useIsTotalActive = (id: number): boolean => {
  const totalInput = document.getElementsByName(
    `secondarySplits.${id}.total`
  )[0];

  return document.activeElement === totalInput;
};
