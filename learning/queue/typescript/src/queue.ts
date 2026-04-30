export class ListNode {
  value: number;
  next: ListNode | null;

  constructor(val: number, next: ListNode | null = null) {
    this.value = val;
    this.next = next;
  }
}

export class LinkedListQueue {
  protected __front: ListNode | null = null;
  protected __rear: ListNode | null = null;
  protected __size: number = 0;

  size(): number {
    return this.__size;
  }

  isEmpty(): boolean {
    return this.__size === 0
  }

  push(value: number): void {
    let node = new ListNode(value);
    if (this.__size === 0) {
      this.__front = this.__rear = node;
      this.__size++;
      return;
    }

    this.__rear!.next = node;
    this.__size++;
  }

  pop(): number {
    if (this.isEmpty()) throw new Error('Queue is empty');

    let value = this.peek();
    this.__front = this.__front!.next;
    this.__size--;
    return value;
  }

  peek(): number {
    if (this.isEmpty()) throw new Error('Queue is empty');
    return this.__front!.value;
  }

  toArray(): number[] {
    let arr = new Array(this.__size);
    let ptr = this.__front;
    for (let i = 0; i < this.__size; i++) {
      arr[i] = ptr!.value;
      ptr = ptr!.next;
    }

    return arr;
  }
}

export class ArrayQueue {
  protected __array: number[];
  protected __front: number = 0;
  protected __size: number = 0;

  constructor(capacity: number) {
    this.__array = new Array(capacity);
  }

  capacity(): number {
    return this.__array.length;
  }

  size(): number {
    return this.__size;
  }

  isEmpty(): boolean {
    return this.__size === 0;
  }

  push(value: number): void {
    if (this.__size === this.capacity()) {
      throw new Error('Queue is full');
    }
  }

  pop(): number {
    if (this.isEmpty()) throw new Error('Queue is empty');
    
  }

  peek(): number {
    return 0; // TODO
  }

  toArray(): number[] {
    return []; // TODO
  }
}