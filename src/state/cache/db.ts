import Dexie, { Table } from "dexie";

interface StoreRelated<T> {
  expireTime?: number;
  value: T;
}

export class CacheDb extends Dexie {
  cache!: Table<StoreRelated<unknown>>;

  constructor() {
    super("CacheDB");

    this.version(1).stores({
      cache: "",
    });
  }
}

export const cacheDb = new CacheDb();
