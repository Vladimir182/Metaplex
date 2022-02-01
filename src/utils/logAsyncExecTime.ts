export const logAsyncExecTime = async (
  logLabel: string,
  fn: () => Promise<unknown>
) => {
  // TODO: enable logging only for dev env
  const start = window.performance.now();

  await fn();

  // eslint-disable-next-line no-console
  console.log(logLabel, window.performance.now() - start);
};
