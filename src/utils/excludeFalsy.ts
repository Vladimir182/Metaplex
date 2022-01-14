type Falsy = false | 0 | "" | null | undefined;
export const excludesFalsy = Boolean as never as <T>(x: T | Falsy) => x is T;
