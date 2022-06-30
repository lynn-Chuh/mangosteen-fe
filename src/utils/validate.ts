export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function';

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object';

export const isArray = (val: unknown): val is Array<any> =>
  val !== null && typeof val === 'object' && toString.call(val) === '[object Array]';

export const isPromise = <T = any>(val: unknown): val is Promise<T> =>
  isObject(val) && isFunction(val.then) && isFunction(val.catch);

export type Numeric = number | string;

export const isNumeric = (val: Numeric): val is string => typeof val === 'number' || /^\d+(\.\d+)?$/.test(val);