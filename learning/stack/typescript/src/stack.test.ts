import { describe, it, expect, beforeEach } from "vitest";
import { LinkedListStack, ArrayStack } from "./stack.ts";

const implementations = [
  { name: "LinkedListStack", Class: LinkedListStack, peekMethod: "peek" },
  { name: "ArrayStack", Class: ArrayStack, peekMethod: "top" },
];

implementations.forEach(({ name, Class, peekMethod }) => {
  describe(name, () => {
    let stack: any;

    beforeEach(() => {
      stack = new Class();
    });

    it("should start empty", () => {
      expect(stack.size).toBe(0);
      expect(stack.isEmpty()).toBe(true);
    });

    it("should push elements onto the stack", () => {
      stack.push(10);
      stack.push(20);
      expect(stack.size).toBe(2);
      expect(stack.isEmpty()).toBe(false);
      expect(stack[peekMethod]()).toBe(20);
    });

    it("should pop elements in LIFO order", () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      expect(stack.pop()).toBe(3);
      expect(stack.pop()).toBe(2);
      expect(stack.size).toBe(1);
    });

    it("should throw error when popping from empty stack", () => {
      expect(() => stack.pop()).toThrow("Stack is empty");
    });

    it("should throw error when peeking at empty stack", () => {
      expect(() => stack[peekMethod]()).toThrow("Stack is empty");
    });

    it("should return correct array representation", () => {
      stack.push(10);
      stack.push(20);
      stack.push(30);
      // Both should ideally represent the stack from bottom to top
      expect(stack.toArray()).toEqual([10, 20, 30]);
    });

    it("should correctly report size after multiple operations", () => {
      stack.push(1);
      stack.push(2);
      stack.pop();
      stack.push(3);
      expect(stack.size).toBe(2);
      expect(stack[peekMethod]()).toBe(3);
    });
  });
});