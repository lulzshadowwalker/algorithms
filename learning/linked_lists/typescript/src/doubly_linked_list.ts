export type Node = {
    value: number;
    next: Node | null;
    prev: Node | null;
};

export function insert(node: Node, value: number): void {
    const n: Node = { value, prev: node, next: node.next }

    if (node.next?.prev) {
        node.next.prev = n
    }

    node.next = n
}

export function access(head: Node, index: number): Node | null {
    let curr: Node | null = head;
    let i = 0;

    while (curr !== null) {
        if (i === index) {
            return curr;
        }
        curr = curr.next;
        i++;
    }

    return null;
}

export function find(head: Node, value: number): number | null {
    let curr: Node | null = head;
    let i = 0;

    while (curr !== null) {
        if (curr.value === value) {
            return i;
        }
        curr = curr.next;
        i++;
    }

    return null;
}

export function remove(node: Node): void {
    if (!node.next) return

    if (node.next?.next?.prev) {
        node.next.next.prev = node
    }

    node.next = node.next.next
}
