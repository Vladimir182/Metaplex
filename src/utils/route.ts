export interface IVariableF1<TRoot extends string, TName extends string> {
  (): `${TRoot}/${TName}`;
  (name: string): `${TRoot}/${string}`;
}

export function combineRoute<TRoot extends string, TName extends string>(
  root: TRoot,
  varName: TName
) {
  const getName = (n?: string) => (n ? `${root}/${n}` : `${root}/${varName}`);

  return getName as IVariableF1<TRoot, TName>;
}

export type ExtractName<
  R extends string,
  T extends string
> = T extends `${R}/${infer U}` ? U : null;

export function extractName<R extends string, T extends string>(
  r: R,
  t: T
): ExtractName<R, T> {
  const ret = t.indexOf(r + "/") === 0 ? t.slice(r.length + 1) : null;
  return ret as ExtractName<R, T>;
}

import { List } from "ts-toolbelt";

export class Var<T extends string> {
  constructor(public path: T) {}
  toString() {
    return this.path;
  }
}

type Unify<T extends string | Var<string>> = T extends Var<infer U> ? U : T;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UnifyToString<T extends string | Var<string>> = T extends Var<infer U>
  ? string
  : T;

type Convert<T extends (string | Var<string>)[]> = List.Head<T> extends never
  ? ""
  : `/${Unify<List.Head<T>>}${Convert<List.Tail<T>>}`;
type ConvertToString<T extends (string | Var<string>)[]> =
  List.Head<T> extends never
    ? ""
    : `/${UnifyToString<List.Head<T>>}${ConvertToString<List.Tail<T>>}`;

type ExtractToRecord<T extends (string | Var<string>)[]> =
  List.Head<T> extends never
    ? // eslint-disable-next-line @typescript-eslint/ban-types
      {}
    : List.Head<T> extends string
    ? ExtractToRecord<List.Tail<T>>
    : Record<Unify<List.Head<T>>, string | number> &
        ExtractToRecord<List.Tail<T>>;

export function variable<T extends string>(val: T) {
  return new Var(val);
}

type Shadow<T extends Record<string, unknown>> = keyof T extends never
  ? void
  : T;

export interface IRouteResult<T extends (string | Var<string>)[]> {
  args: T;
  path: Convert<T>;
  (params: Shadow<ExtractToRecord<T>>): ConvertToString<T>;
}

export function route<T extends (string | Var<string>)[]>(
  ...args: T
): IRouteResult<T> {
  const path = ("/" + args.join("/")) as Convert<T>;
  const fn = (params: Shadow<ExtractToRecord<T>>) => {
    const paramsT = (params ?? {}) as Record<string, number | string>;
    return Object.keys(paramsT).reduce((urlPath, key) => {
      const rx = new RegExp(key, "g");
      return urlPath.replace(rx, `${paramsT[key]}`);
    }, path) as ConvertToString<T>;
  };
  const ret = fn as IRouteResult<T>;
  ret.args = args;
  ret.path = path;
  return ret;
}

export function routeFromRoot<TRoot extends (string | Var<string>)[]>(
  root: IRouteResult<TRoot>
) {
  return <T extends (string | Var<string>)[]>(...params: T) => {
    const newParams = [...root.args, ...params] as const;
    const r = route(...newParams);
    const name = extractName(root.path, r.path);
    const result = r as typeof r & { routeName: typeof name };
    result.routeName = name;
    return result;
  };
}
