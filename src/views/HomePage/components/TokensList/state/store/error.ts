import { createStore } from "effector";

export const $error = createStore<{
  error: Error;
} | null>(null);
