import { insert, remove, find, expand } from "./arrays.ts";
import { describe, it, expect } from "vitest";

describe("arrays", () => {
  it("inserts an element", () => {
    let arr = [1, 2, 3, 4, 5];

    insert(arr, 2, 99)

    expect(arr).toEqual([1, 2, 99, 3, 4]);
  });

  it("removes an element", () => {
    let arr = [1, 2, 3, 4, 5];

    let removed = remove(arr, 2);

    expect(removed).toBe(3);
    expect(arr).toEqual([1, 2, 4, 5]);
  });

  it("finds an element", () => {
    let arr = [1, 2, 3, 4, 5];

    expect(find(arr, 3)).toBe(2);
    expect(find(arr, 99)).toBeNull();
  });

  it("extends an array", () => {
    let arr = [1, 2, 3];

    let enlarged = expand(arr, 2);

    expect(enlarged.length).toBe(5);
    expect(enlarged).toEqual([1, 2, 3, undefined, undefined]);
  });
});
