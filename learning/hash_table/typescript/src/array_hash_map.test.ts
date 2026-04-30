import { describe, it, expect, beforeEach } from "vitest";
import { Pair, ArrayHashMap } from "./array_hash_map.ts";

describe("Pair", () => {
    it("stores key and val", () => {
        const p = new Pair(1, "one");
        expect(p.key).toBe(1);
        expect(p.val).toBe("one");
    });
});

describe("ArrayHashMap", () => {
    let map: ArrayHashMap;

    beforeEach(() => {
        map = new ArrayHashMap();
    });

    it("returns null for a missing key", () => {
        expect(map.get(42)).toBeNull();
    });

    it("stores and retrieves a value", () => {
        map.set(1, "alpha");
        expect(map.get(1)).toBe("alpha");
    });

    it("overwrites an existing key", () => {
        map.set(1, "alpha");
        map.set(1, "beta");
        expect(map.get(1)).toBe("beta");
    });

    it("deletes a key so it returns null afterwards", () => {
        map.set(5, "five");
        map.delete(5);
        expect(map.get(5)).toBeNull();
    });

    it("deleting a non-existent key does not throw", () => {
        expect(() => map.delete(999)).not.toThrow();
    });

    it("keys that collide via hash overwrite each other", () => {
        map.set(1, "one");
        map.set(101, "one-oh-one");
        expect(map.get(1)).toBeNull();
        expect(map.get(101)).toBe("one-oh-one");
    });

    it("entries returns only non-null pairs", () => {
        map.set(10, "ten");
        map.set(20, "twenty");
        const result = map.entries();
        expect(result).toHaveLength(2);
        expect(result.every((p) => p !== null)).toBe(true);
    });

    it("entries reflects a deletion", () => {
        map.set(10, "ten");
        map.set(20, "twenty");
        map.delete(10);
        expect(map.entries()).toHaveLength(1);
    });

    it("keys returns all stored keys", () => {
        map.set(3, "three");
        map.set(7, "seven");
        expect(map.keys()).toEqual(expect.arrayContaining([3, 7]));
        expect(map.keys()).toHaveLength(2);
    });

    it("values returns all stored values", () => {
        map.set(3, "three");
        map.set(7, "seven");
        expect(map.values()).toEqual(expect.arrayContaining(["three", "seven"]));
        expect(map.values()).toHaveLength(2);
    });

    it("entries, keys and values are all empty on a fresh map", () => {
        expect(map.entries()).toHaveLength(0);
        expect(map.keys()).toHaveLength(0);
        expect(map.values()).toHaveLength(0);
    });

    it("handles multiple distinct keys without interference", () => {
        for (let i = 0; i < 5; i++) map.set(i, String(i));
        for (let i = 0; i < 5; i++) expect(map.get(i)).toBe(String(i));
    });
});
