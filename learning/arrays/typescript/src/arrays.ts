export function insert<T>(array: T[], index: number, value: T) {
  for (let i = array.length - 1; i > index; i--) {
    array[i] = array[i - 1];
  }

  array[index] = value;
  return array;
}

export function remove<T>(array: T[], index: number): T {
  let removed = array[index];

  for (let i = index; i < array.length - 1; i++) {
    array[i] = array[i + 1];
  }

  array.pop();

  return removed;
}

// "linear search" since arrays are a linear data structure
export function find<T>(array: T[], value: T): number | null {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return i;
    }
  }

  return null;
}

export function expand<T>(array: T[], enlarge: number): T[] {
  if (enlarge < 0) {
    throw new Error("enlarge must be a non-negative integer");
  }

  let enlarged = new Array(array.length + enlarge);

  for (let i = 0; i < array.length; i++) {
    enlarged[i] = array[i];
  }

  return enlarged;
}
