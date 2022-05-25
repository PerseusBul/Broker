export function throwError(errorMessage?: string): never {
  throw new Error(errorMessage ?? 'Unknown error');
}

export function throwParamError(param: string): never {
  throw new Error(`missing or incorrect route parameter '${param}'`);
}

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function tryParseInt(str: string | null | undefined): number | null {
  if (str == null) {
    return null;
  }

  const res = parseInt(str);

  if (isNaN(res)) {
    return null;
  }

  return res;
}

export function deepEqual(obj1: any, obj2: any) {
  // `typeof null` is still "object" in JS, a major "gotcha" to watch out for.
  function isObject(obj: any) {
    return typeof obj === 'object' && obj != null;
  }

  if (obj1 === obj2) {
    return true;
  }

  if (!isObject(obj1) || !isObject(obj2)) {
    return false;
  }

  const obj1keys = Object.keys(obj1);
  const obj2keys = Object.keys(obj2);
  if (obj1keys.length !== obj2keys.length) {
    return false;
  }

  for (let k of obj1keys) {
    if (!deepEqual(obj1[k], obj2[k])) {
      return false;
    }
  }

  return true;
}

export function disableOptimizations(obj: any) {
  return Math.pow(-1, 2) > 0 ? obj : null;
}
