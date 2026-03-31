import { insert, access, find, remove } from "./circular_singly_linked_list.ts";
import type { Node } from "./circular_singly_linked_list.ts";
import { describe, it, expect } from "vitest";

describe("circular singly linked lists", () => {
    describe("insert", () => {
        it("should insert a new node after the given node", () => {
            const node: Node = { value: 1, next: (null as unknown as Node) };
            node.next = node;
            insert(node, 2);
            expect(node.next.value).toBe(2);
            expect(node.next.next).toBe(node);
        });

        it("should maintain existing chain when inserting", () => {
            const node: Node = { value: 1, next: (null as unknown as Node) };
            node.next = node;
            insert(node, 2);
            expect(node.next.value).toBe(2);
            expect(node.next.next).toBe(node);
        });
    });

    describe("access", () => {
        it("should return the head node at index 0", () => {
            const node2: Node = { value: 2, next: (null as unknown as Node) };
            const head: Node = { value: 1, next: node2 };
            node2.next = head;

            expect(access(head, 0)).toBe(head);
        });

        it("should return node at given index with wrap-around", () => {
            const node3: Node = { value: 3, next: (null as unknown as Node) };
            const node2: Node = { value: 2, next: node3 };
            const head: Node = { value: 1, next: node2 };
            node3.next = head;

            expect(access(head, 1)?.value).toBe(2); // Access second node
            expect(access(head, 2)?.value).toBe(3); // Access third node
        });

        it("should return null for out of bounds index", () => {
            const head: Node = { value: 1, next: (null as unknown as Node) };
            head.next = head;
            expect(access(head, 10)).toBeNull();
        });
    });

    describe("find", () => {
        it("should return 0 when value is at head", () => {
            const node2: Node = { value: 2, next: (null as unknown as Node) };
            const head: Node = { value: 1, next: node2 };
            node2.next = head;

            expect(find(head, 2)).toBe(1);
        });

        it("should return correct index for value in list", () => {
            const node2: Node = { value: 2, next: (null as unknown as Node) };
            const head: Node = { value: 1, next: node2 };
            node2.next = head;

            expect(find(head, 2)).toBe(1);
        });

        it("should return null when value not found", () => {
            const head: Node = { value: 1, next: (null as unknown as Node) };
            head.next = head;
            expect(find(head, 10)).toBeNull();
        });
    });

    describe("remove", () => {
        it("should remove the next node", () => {
            const node3: Node = { value: 3, next: (null as unknown as Node) };
            const node2: Node = { value: 2, next: node3 };
            const node1: Node = { value: 1, next: node2 };
            node3.next = node1;

            remove(node1);
            expect(node1.next).toBe(node3);
        });

        it("should maintain chain after removal", () => {
            const node3: Node = { value: 3, next: (null as unknown as Node) };
            const node2: Node = { value: 2, next: node3 };
            const node1: Node = { value: 1, next: node2 };
            node3.next = node1;

            remove(node1);
            expect(node1.next).toBe(node3);
        });
    });
});
