const Sortable = require('./sortable.js');
const InsertionSort = require('./insertionsort.js');

/**
 * Mergesort implementation with enhancements:
 * 1. [TODO] Eliminate copy of auxiliary array in the merge function to save time.
 * 2. Use Insertion Sort for smaller subarrays.
 * 3. Stop if already sorted.
 *
 * @example
 * Mergesort.sort([2,5,1,9]);
 */
class Mergesort extends Sortable {

	static CUTOFF = 7;		// cutoff to insertion sort

	/**
	 * Merge two sorted subarrays within an array.
	 * @param {!Array<*>} src The array to merge
	 * @param {!Array<*>} dst Temporary array (of same size as `src`) used in merging
	 * @param {number} lo Start index of left subarray
	 * @param {number} mid End index of left subarray
	 * @param {number} hi End index of right subarray
	 * @param {function(*,*): number} compareFn Custom comparison function for sorting
	 */
	static merge(src, dst, lo, mid, hi, compareFn) {
		// Copy array to dst
		for (let k = lo; k <= hi; k++) {
			dst[k] = src[k];
		}

		let i = lo;
		let j = mid + 1;
		for (let k = lo; k <= hi; k++) {
			if (i > mid) {
				// First sub-array over? Copy elements from the second sub-array
				src[k] = dst[j];
				j++;
			} else if (j > hi) {
				// Second sub-array over? Copy elements from the first sub-array
				src[k] = dst[i];
				i++;
			} else if (this.less(dst, i, j, compareFn)) {
				src[k] = dst[i];
				i++;
			} else {
				src[k] = dst[j];
				j++;
			}
		}
	}

	/**
	 * Mergesort a subarray
	 * @param {!Array<*>} list The array to sort
	 * @param {!Array<*>} aux Auxiliary array (of same size as `list`) used in sorting
	 * @param {number} lo Start index of the subarray to sort
	 * @param {number} hi End index of the subarray to sort
	 * @param {function(*,*): number} compareFn Custom comparison function for sorting
	 * @returns
	 */
	static mergesort(list, aux, lo, hi, compareFn) {
		// if (lo >= hi) return;

		// Use Insertion sort for smaller sub-arrays
		if (hi <= lo + this.CUTOFF) {
			InsertionSort.insertionSort(list, lo, hi, compareFn);
			return;
		}

		// Recursively split the arrays and sort.
		// Notice that `list` & `aux` arrays have been switched
		//  to avoid copy of `aux` array in the merge function.
		let mid = Math.floor(lo + ((hi-lo) / 2));
		this.mergesort(list, aux, lo, mid, compareFn);
		this.mergesort(list, aux, mid+1, hi, compareFn);

		// Stop if already sorted
		// i.e, if biggest item in 1st half <= smallest item in second half
		if (this.less(list, mid, mid+1, compareFn)) {
			return;
		}

		// Merge the sorted sub-arrays
		this.merge(list, aux, lo, mid, hi, compareFn);
	}

	/**
	 * Mergesorts an array using the provided compare function.
	 * @param {!Array<*>} list an array of items to sort
	 * @param {function(*,*): number} compareFn the custom compare functions. Defaults to arithmetic comparison for primitives.
	 */
	static sort(list, compareFn) {
		if (!(list && list.length > 1)) {
			console.error("Nothing to sort!");
			return;
		}

		let aux = new Array(list.length);
		this.mergesort(list, aux, 0, list.length-1, compareFn);
	}

}

module.exports = Mergesort;
