export function isObject<T extends object>(value: T) {
  const type = typeof value;
  return value !== null && (type === "object" || type === "function");
}

export const omit = <T>(obj: T, keys: (keyof T)[]): T => {
  const result = { ...obj };

  keys.forEach((key) => {
    delete result[key];
  });

  return result;
};
