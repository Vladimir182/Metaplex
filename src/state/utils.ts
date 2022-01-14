import { combine, createEvent, Effect, Event, restore, Store } from "effector";

export interface IEntry<T> {
  $node: Store<T>;
  set: Event<T>;
}

export type ExtractArgsFromEvent<T> = T extends Event<infer TType>
  ? TType
  : never;

export function createEntry<T>(defVal: T): IEntry<T> {
  const set = createEvent<T>();
  const $node = restore(set, defVal);

  return {
    $node,
    set,
  };
}

export interface IPreload<TParams, TDone, TFail = Error> {
  $node: Store<readonly [TDone | null, TFail | null, boolean]>;
  effectFx: Effect<TParams, TDone, TFail>;
}

export function preload<TParams, TDone, TFail = Error>(
  effectFx: Effect<TParams, TDone, TFail>
): IPreload<TParams, TDone, TFail> {
  const $data = restore(effectFx.doneData, null);
  const $error = restore(effectFx.failData, null);
  const $node = combine(
    $data,
    $error,
    effectFx.pending,
    (state, error, pending) => [state, error, pending] as const
  );
  return {
    $node,
    effectFx,
  };
}
