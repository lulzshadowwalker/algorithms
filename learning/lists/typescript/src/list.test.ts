import { describe, it, expect, beforeEach } from "vitest";
import { DynamicArray } from "./list.ts";

describe("dynamic arrays", () => {
  let list: DynamicArray;

  beforeEach(() => {
    list = new DynamicArray();
  });

  it("should initialize with a default capacity of 10", () => {
    expect(list.size()).toBe(0);
    expect(list.capacity()).toBe(10);
    expect(list.toArray()).toEqual([]);
  });

  it("should add elements and increase size", () => {
    list.add(100);
    list.add(200);
    expect(list.size()).toBe(2);
    expect(list.get(0)).toBe(100);
    expect(list.get(1)).toBe(200);
  });

  it("should throw an error when getting or setting out of bounds", () => {
    list.add(10);
    expect(() => list.get(5)).toThrow(); 
    expect(() => list.set(5, 50)).toThrow();
    expect(() => list.set(-1, 50)).toThrow();
  });

  it("should update values using set", () => {
    list.add(10);
    list.set(0, 20);
    expect(list.get(0)).toBe(20);
  });

  it("should insert elements and shift existing ones", () => {
    list.add(1);
    list.add(3);
    list.insert(1, 2);
    expect(list.toArray()).toEqual([1, 2, 3]);
    expect(list.size()).toBe(3);
  });

  it("should remove elements and shift remaining ones", () => {
    list.add(10);
    list.add(20);
    list.add(30);
    list.remove(1);
    expect(list.toArray()).toEqual([10, 30]);
    expect(list.size()).toBe(2);
  });

  it("should double capacity when limit is reached", () => {
    for (let i = 0; i < 10; i++) {
      list.add(i);
    }
    expect(list.capacity()).toBe(10);
    
    list.add(10); // Triggers resize
    expect(list.size()).toBe(11);
    expect(list.capacity()).toBe(20);
  });

  it("should handle insertion at capacity by resizing", () => {
    for (let i = 0; i < 10; i++) {
      list.add(i);
    }
    list.insert(0, 99);
    expect(list.get(0)).toBe(99);
    expect(list.capacity()).toBe(20);
  });
});