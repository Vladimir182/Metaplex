import { combine, createEvent, createStore, Effect, sample } from "effector";

interface Props<T, A = void> {
  checkEmpty?: (v: T) => boolean;
  defaultValue: T;
  fetchFx: Effect<A, T>;
  readCacheFx: Effect<A, T>;
  writeCacheFx: Effect<T, void>;
}

export const createCachedStore = <T, A = void>({
  checkEmpty = (v) => v && !!v,
  defaultValue,
  fetchFx,
  readCacheFx,
  writeCacheFx,
}: Props<T, A>) => {
  const init = createEvent<A>();
  const upgrade = createEvent<T>();

  const $store = createStore<T>(defaultValue)
    // use cached value only if store is empty
    .on(readCacheFx.doneData, (prev, next) => (checkEmpty(prev) ? prev : next))
    // replace store with loaded items
    .on(upgrade, (_, next) => next);

  const $pending = combine(
    $store,
    readCacheFx.pending,
    fetchFx.pending,
    (sales, pending1, pending2) =>
      checkEmpty(sales) ? false : pending1 || pending2
  );

  sample({
    clock: init,
    target: [readCacheFx, fetchFx],
  });

  sample({
    clock: fetchFx.doneData,
    target: upgrade,
  });

  // after changed store - update cache
  sample({
    clock: upgrade,
    target: writeCacheFx,
  });

  return {
    $store,
    $pending,
    init,
    upgrade,
  };
};
