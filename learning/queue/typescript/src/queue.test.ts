import { describe, it, expect, beforeEach } from "vitest";
import { LinkedListQueue, ArrayQueue } from "./queue.ts";

describe("Queue Implementations", () => {
  describe("LinkedListQueue", () => {
    let queue: LinkedListQueue;

    beforeEach(() => {
      queue = new LinkedListQueue();
    });

    it("should enqueue and dequeue in FIFO order", () => {
      queue.push(10);
      queue.push(20);
      queue.push(30);
      expect(queue.pop()).toBe(10);
      expect(queue.pop()).toBe(20);
      expect(queue.size()).toBe(1);
    });

    it("should return the front element with peek", () => {
      queue.push(1);
      expect(queue.peek()).toBe(1);
      queue.push(2);
      expect(queue.peek()).toBe(1);
    });

    it("should throw error when popping from empty queue", () => {
      expect(() => queue.pop()).toThrow();
    });

    it("should convert to array in correct order", () => {
      queue.push(1);
      queue.push(2);
      queue.push(3);
      expect(queue.toArray()).toEqual([1, 2, 3]);
    });
  });

  describe("ArrayQueue (Circular)", () => {
    let queue: ArrayQueue;
    const CAP = 5;

    beforeEach(() => {
      queue = new ArrayQueue(CAP);
    });

    it("should handle wrap-around (circular logic)", () => {
      // Fill up the queue
      for (let i = 1; i <= CAP; i++) queue.push(i);
      
      // Remove two elements
      queue.pop(); // removes 1
      queue.pop(); // removes 2
      
      // Push two more (these should wrap around to the start of the array)
      queue.push(6);
      queue.push(7);
      
      expect(queue.toArray()).toEqual([3, 4, 5, 6, 7]);
      expect(queue.size()).toBe(5);
    });

    it("should throw error when pushing to a full queue", () => {
      for (let i = 0; i < CAP; i++) queue.push(i);
      expect(() => queue.push(99)).toThrow("Queue is full");
    });

    it("should correctly report size and empty status", () => {
      expect(queue.isEmpty()).toBe(true);
      queue.push(100);
      expect(queue.isEmpty()).toBe(false);
      expect(queue.size()).toBe(1);
    });
  });
});