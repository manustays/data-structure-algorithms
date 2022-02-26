
/**
 * Heapsort implementation using a priority queue.
 */
class HeapSort {

	/**
	 * Sort an array using Heapsort algorithm.
	 * @static
	 * @param {!Array<*>} list The array to sort
	 */
	static sort(list) {
		let N = list.length;

		for (let j = Math.floor(N/2); j >= 1; j--) {
			this.sink(list, j, N);
		}

		while (N > 1) {
			this.exch(list, 1, N);
			N--;
			this.sink(list, 1, N);
		}
	}

	static sink(pq, k, N) {
		while (2*k <= N) {
			// Get child nodes (j & j+1)
			let j = 2 * k;
			// Select the larger node
			if (j < N && this.less(pq, j, j+1)) {
				j++;
			}
			if (!this.less(pq, k, j)) {
				break;
			}
			this.exch(pq, k, j);
			k = j;
		}
	}


	static less(pq, p, q) {
		p--;
		q--;
		return pq[p] < pq[q];
	}

	static exch(pq, p, q) {
		p--;
		q--;
		let tmp = pq[p];
		pq[p] = pq[q];
		pq[q] = tmp;
	}
}

module.exports = HeapSort;
