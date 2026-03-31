export type Node = {
  value: number
  next: Node | null
}

// insert
export function insert(node: Node, value: number): void {
  const n: Node = { value, next: node.next }
  node.next = n
}

// access 
export function access(head: Node, index: number): Node | null {
  for (let i = 0; i < index; i++) {
    if (head.next == null) return null
    head = head.next
  }

  return head
}

// find
export function find(head: Node, value: number): number | null {
  let index = 0
  let curr: Node | null = head

  while (curr != null) {
    if (curr.value === value) {
      return index
    }
    index++
    curr = curr.next
  }

  return null
}

// remove removes the first node after `node`
export function remove(node: Node): void {
  if (node.next == null) return
  node.next = node.next.next
}

