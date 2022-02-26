
/**
 * A Priority Queue implementation using the Binary Heap data structure.
 * The maximum key is always at the root of the tree (index 1).
 */
class MaxPQ {

	/**
	 * Initialize the priority queue using an array.
	 * @param {!Array<*>} keys The array of keys to initialize the priority queue with.
	 */
	constructor(keys) {
		this.n = keys.length;
		this.pq = new Array(this.n + 1);

		for (let i = 0; i < this.n; i++) {
			this.pq[i + 1] = keys[i];
		}

		for (let j = Math.floor(this.n/2); j >= 1; j--) {
			this.sink(j);
		}
	}

	size() {
		return this.n;
	}

	isEmpty() {
		return this.n === 0;
	}

	max() {
		return this.pq[1];
	}

	insert(k) {
		this.n++;
		this.pq[this.n] = k;
		this.swim(this.n);
	}

	delMax() {
		let max = this.pq[1];
		this.exch(1, this.n);
		this.n--;
		this.pq[this.n + 1] = null;
		this.sink(1);
		return max;
	}

	swim(k) {
		let prv = Math.floor(k / 2);
		while (k > 1 && this.less(prv, k)) {
			this.exch(prv, k);
			k = prv;
			prv = Math.floor(k / 2);
		}
	}

	sink(k) {
		while (2*k <= this.n) {
			// Get child nodes (j & j+1)
			let j = 2 * k;
			// Select the larger node
			if (j < this.n && this.less(j, j+1)) {
				j++;
			}
			if (!this.less(k, j)) {
				break;
			}
			this.exch(k, j);
			k = j;
		}
	}


	less(p, q) {
		return this.pq[p] < this.pq[q];
	}

	exch(p, q) {
		let tmp = this.pq[p];
		this.pq[p] = this.pq[q];
		this.pq[q] = tmp;
	}

	print() {
		console.log(this.pq);
	}
}

module.exports = MaxPQ;