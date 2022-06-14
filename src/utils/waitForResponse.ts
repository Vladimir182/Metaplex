import { sleep } from "./sleep";

const SLEEP_TIMEOUT = 300;
const REQUEST_TIMEOUT = 60_000;

export const waitForResponse = async <T>(
  fetchFn: () => Promise<T>
): Promise<T | null> => {
  let response = null;
  const startTime = +new Date();

  while (!response && +new Date() - startTime < REQUEST_TIMEOUT) {
    try {
      response = await fetchFn();
    } catch {
      //ignore
    }
    await sleep(SLEEP_TIMEOUT);
  }

  return response;
};
