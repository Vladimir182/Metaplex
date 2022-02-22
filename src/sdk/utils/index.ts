export const SLEEP_TIMEOUT = 300;
export const REQUEST_TIMEOUT = 20000;

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
