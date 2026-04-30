export class Pair {
	public key: number;
	public val: string;

	constructor(key: number, val: string) {
		this.key = key;
		this.val = val;
	}
}

export class ArrayHashMap {
	protected __buckets: (Pair | null)[];
	protected __capacity: number = 100;

	constructor() {
		this.__buckets = new Array(this.__capacity).fill(null);
	}

	public get(key: number): string | null {
		let bucket = this.__buckets[this.__hash(key)];
		if (! bucket || bucket.key !== key) return null;

		return bucket.val;
	}

	public set(key: number, val: string): void {
		this.__buckets[this.__hash(key)] = new Pair(key, val);
	}

	public delete(key: number) {
		this.__buckets[this.__hash(key)] = null;
	}

	public entries(): (Pair | null)[] {
		return this.__buckets
			.filter((bucket): bucket is Pair => bucket !== null)
			.map((bucket) => new Pair(bucket.key, bucket.val));
	}

	public keys(): (number | undefined)[] {
		return this.__buckets
			.filter((bucket): bucket is Pair => bucket !== null)
			.map((bucket) => bucket.key);
	}

	public values(): (string | undefined)[] {
		return this.__buckets
			.filter((bucket): bucket is Pair => bucket !== null)
			.map((bucket) => bucket.val);
	}

	protected __hash(key: number): number {
		return key % this.__capacity;
	}
}
