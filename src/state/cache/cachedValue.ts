import dayjs from "dayjs";
import { createEffect } from "effector";
import { Optional } from "ts-toolbelt/out/List/Optional";

import { cacheDb } from "./db";
import debug from "debug";

export const TIME_TO_LIVE = 604_800; // one week

interface GetParams {
  key: string;
}

interface SetParams<T = unknown> {
  key: string;
  value: T;
  /**
   * number of seconds
   */
  timeToLive?: number;
}

export const ERROR_EMPTY_KEY = new Error("One of keys is empty");
export const ERROR_EMPTY_VALUE = new Error("value is empty");
export const ERROR_EXPIRED_VALUE = new Error("value is expired");

export const composeKey = (params: Optional<string[]>) => {
  const hasEmpty = params.some((v) => !v);
  if (hasEmpty) throw ERROR_EMPTY_KEY;
  return params.join("-");
};

export const readCacheFx = createEffect(async ({ key }: GetParams) => {
  const instance = cacheDb;

  const entry = await instance.cache.get(key);

  if (!entry) {
    throw ERROR_EMPTY_VALUE;
  }

  const { expireTime, value } = entry;

  const isExpired = expireTime && expireTime < dayjs().unix();
  if (isExpired) {
    instance.cache.delete(key);
    throw ERROR_EXPIRED_VALUE;
  }

  return value;
});

const LOGErr = debug("error:WriteCacheFx");

export const writeCacheFx = createEffect(
  async ({ key, value, timeToLive = TIME_TO_LIVE }: SetParams) => {
    if (!value) {
      return;
    }

    const instance = cacheDb;
    const expireTime = dayjs().unix() + timeToLive;

    const entry = {
      value,
      expireTime,
    };
    try {
      await instance.cache.put(entry, key);
    } catch (e) {
      LOGErr.log(e);
    }
  }
);
