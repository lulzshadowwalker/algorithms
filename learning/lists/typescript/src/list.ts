// lists can be implemented either using linked lists or arrays.
// arrays can be considered as a list with a limited capacity. 
// dynamic arrays
// most programming languages implement lists using dynamic arrays which can be resized at runtime e.g. ArrayList in Java.

export class DynamicArray {
  protected __array: Array<number>;
  protected __size: number;
  protected __capacity: number;

  constructor() {
    this.__size = 0;
    this.__capacity = 10;
    this.__array = new Array(this.__capacity);
  }

  size(): number {
    return this.__size;
  }

  capacity(): number {
    return this.__capacity;
  }

  get(index: number): number | null {
    if (index < 0 || index >= this.__size) {
      throw new Error('index out of bounds');
    } 

    return this.__array[index] ?? null;
  }

  set(index: number, value: number): void {
    if (index < 0 || index >= this.__size) {
      throw new Error('index out of bounds');
    } 

    this.__array[index] = value;
  }

  add(value: number): void {
    if (this.__size === this.__capacity) {
      this.__resize();
    }

    this.__array[this.__size] = value;
    this.__size++;
  }

  insert(index: number, value: number): void {
    if (index < 0 || index >= this.__size) {
      throw new Error('index out of bounds');
    } 
  
    if (this.__size === this.__capacity) {
      this.__resize();
    }

    // need to be in reverse.
    for (let i = this.__size; i > index; i--) {
      this.__array[i] = this.__array[i-1];
    }

    this.__array[index] = value;
    this.__size++;
  }

  remove(index: number): number {
    if (index < 0 || index >= this.__size) {
      throw new Error('index out of bounds');
    } 

    let value = this.__array[index];
    for (let i = index; i < this.__size - 1; i++) {
      this.__array[i] = this.__array[i + 1];
    }

    this.__size--;
    return value;
  }

  toArray(): number[] {
    let arr = new Array(this.__size);
    for (let i = 0; i < this.__size; i++) {
      arr[i] = this.__array[i];
    }
    return arr;
  }

  protected __resize(): void {
    this.__capacity *= 2;
    let arr = new Array(this.__capacity);
    for (let i = 0; i < this.__size; i++) {
      arr[i] = this.__array[i];
    }
    this.__array = arr;
  }
} 
