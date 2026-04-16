export class ListNode {
  value: number;
  next: ListNode | null;

  constructor(val: number, next: ListNode | null = null) {
    this.value = val;
    this.next = next;
  }
}

export class LinkedListStack {
  protected __peek: ListNode | null;
  protected __size: number = 0;

  constructor() {
    this.__peek = null;
  }

  get size(): number {
    return this.__size;
  }

  isEmpty(): boolean {
    return this.__size === 0;
  }

  push(value: number): void {
    let node = new ListNode(value, this.__peek);
    this.__peek = node;
    this.__size++;
  }

  pop(): number {
    if (this.isEmpty()) throw new Error('Stack is empty');
    let value = this.peek();
    this.__peek = this.__peek!.next ?? null;
    this.__size--;

    return value;
  }

  peek(): number {
    if (this.isEmpty()) throw new Error('Stack is empty');
    return this.__peek!.value;
  }

  toArray(): number[] {
    let ptr = this.__peek;
    let arr = new Array(this.__size);
    for (let i = this.__size - 1; i >= 0; i--) {
      arr[i] = ptr!.value;
      ptr = ptr!.next;
    }
    return arr;
  }
}

export class ArrayStack {
  private stack: number[];

  constructor() {
    this.stack = [];
  }

  get size(): number {
    return this.stack.length;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  push(value: number): void {
    this.stack.push(value);
  }

  pop(): number | undefined {
    if (this.isEmpty()) throw new Error('Stack is empty');
    return this.stack.pop();
  }

  top(): number | undefined {
    if (this.isEmpty()) throw new Error('Stack is empty');
    return this.stack.at(this.size - 1);
  }

  toArray(): number[] {
    return [...this.stack];
  }
}