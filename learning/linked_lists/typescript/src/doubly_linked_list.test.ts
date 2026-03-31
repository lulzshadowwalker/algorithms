import { insert, access, find, remove } from "./doubly_linked_list.ts";
import type { Node } from "./doubly_linked_list.ts";
import { describe, it, expect } from "vitest";

describe("doubly linked lists", () => {
    describe("insert", () => {
        it("should insert a new node after the given node", () => {
            const node: Node = { value: 1, next: null, prev: null };
            insert(node, 2);
            expect(node.next).not.toBeNull();
            expect(node.next?.value).toBe(2);
        });

        it("should maintain existing chain when inserting", () => {
            const node1: Node = { value: 1, next: null, prev: null };
            const node2: Node = { value: 3, next: null, prev: node1 };
            node1.next = node2;
            insert(node1, 2);
            expect(node1.next?.value).toBe(2);
            expect(node1.next?.next?.value).toBe(3);
            expect(node2.prev?.value).toBe(2);
        });
    });

    describe("access", () => {
        it("should return the head node at index 0", () => {
            const head: Node = { value: 1, next: null, prev: null };
            expect(access(head, 0)).toBe(head);
        });

        it("should return node at given index", () => {
            const node3: Node = { value: 3, next: null, prev: null };
            const node2: Node = { value: 2, next: node3, prev: null };
            const head: Node = { value: 1, next: node2, prev: null };
            node3.prev = node2;
            node2.prev = head;
            expect(access(head, 2)?.value).toBe(3);
        });

        it("should return null for out of bounds index", () => {
            const head: Node = { value: 1, next: null, prev: null };
            expect(access(head, 5)).toBeNull();
        });
    });

    describe("find", () => {
        it("should return 0 when value is at head", () => {
            const head: Node = { value: 1, next: null, prev: null };
            expect(find(head, 1)).toBe(0);
        });

        it("should return correct index for value in list", () => {
            const node3: Node = { value: 3, next: null, prev: null };
            const node2: Node = { value: 2, next: node3, prev: null };
            const head: Node = { value: 1, next: node2, prev: null };
            node3.prev = node2;
            node2.prev = head;
            expect(find(head, 2)).toBe(1);
        });

        it("should return null when value not found", () => {
            const head: Node = { value: 1, next: null, prev: null };
            expect(find(head, 99)).toBeNull();
        });
    });

    describe("remove", () => {
        it("should remove the next node", () => {
            const node2: Node = { value: 2, next: null, prev: null };
            const node1: Node = { value: 1, next: node2, prev: null };
            node2.prev = node1;
            remove(node1);
            expect(node1.next).toBeNull();
        });

        it("should maintain chain after removal", () => {
            const node3: Node = { value: 3, next: null, prev: null };
            const node2: Node = { value: 2, next: node3, prev: null };
            const node1: Node = { value: 1, next: node2, prev: null };
            node3.prev = node2;
            node2.prev = node1;
            remove(node1);
            expect(node1.next).toBe(node3);
            expect(node3.prev).toBe(node1);
        });
    });
});
