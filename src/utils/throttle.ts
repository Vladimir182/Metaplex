export function throttle<T>(fn: (payload: T) => void, timeout: number) {
  let time = 0;
  let timer: number | null = null;
  const apply = (payload: T) => {
    const now = new Date().valueOf();
    const diff = now - time;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (diff > timeout) {
      fn(payload);
      time = now;
    } else {
      timer = setTimeout(() => {
        timer = null;
        apply(payload);
      }, diff) as unknown as number;
    }
  };
  return apply;
}
