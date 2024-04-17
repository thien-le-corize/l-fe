export function last<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}

export function first<T>(array: T[]): T | undefined {
  return array[0];
}

/** Sums number value of object in array */
export function sumNumericProperty<T>(
  array: T[],
  propertyName: keyof T,
): number {
  return array.reduce((acc, obj) => {
    const value = obj[propertyName];
    if (typeof value === "number") {
      return acc + value;
    }
    return acc;
  }, 0);
}
