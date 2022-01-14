import { MutableRefObject, useEffect, useRef, useState } from "react";

const isWindow = (element: Element | Window): element is Window => {
  return "window" in globalThis && element === window;
};

interface GetTriggerOptions {
  target?: Element | Window | null;
  threshold: number;
}

const getTrigger = (
  store: MutableRefObject<number>,
  options: GetTriggerOptions
) => {
  const { target, threshold } = options;

  if (target) {
    store.current = isWindow(target) ? target.pageYOffset : target.scrollTop;
  }

  return store.current > threshold;
};

const defaultTarget = typeof window !== "undefined" ? window : null;

interface UseScrollTriggerOptions {
  threshold?: number;
  onTrigger?: (value: boolean) => void;
}

export const useScrollTrigger = (
  target: Window | Element | null = defaultTarget,
  options: UseScrollTriggerOptions = {}
) => {
  const { threshold = 24, onTrigger = () => {} } = options;
  const store = useRef(0);
  const [trigger, setTrigger] = useState(() =>
    getTrigger(store, { target, threshold })
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentTriggerValue = getTrigger(store, { target, threshold });
      setTrigger(currentTriggerValue);
      onTrigger(currentTriggerValue);
    };

    handleScroll(); // Re-evaluate trigger when dependencies change

    target?.addEventListener("scroll", handleScroll);
    return () => {
      target?.removeEventListener("scroll", handleScroll);
    };
  }, [target, onTrigger, threshold]);

  return trigger;
};
