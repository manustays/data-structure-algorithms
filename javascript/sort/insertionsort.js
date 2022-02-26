const Sortable = require('./sortable.js');

/**
 * Insertion Sort implementation
 * Also used as an enhancement with other sort techniques when the array size is very small
 *
 * @example
 * InsertionSort.sort([2,5,1,9]);
 */
class InsertionSort extends Sortable {

	/**
	 * Sorts an array in-place between the given indices using the provided compare function.
	 * @param {!Array<*>} list an array of items to sort
	 * @param {number} lo Start index
	 * @param {number} hi End index
	 * @param {function(*,*): number} compareFn the custom compare functions. Defaults to arithmetic comparison for primitives.
	 */
	static insertionSort(list, lo, hi, compareFn) {
		for (let i = lo + 1; i <= hi; i++) {
			// Swap until item on the left of j larger than item at j...
			for (let j = i; j > lo && this.less(list[j], list[j-1], compareFn); j--) {
				this.exch(list, j, j-1);
			}
		}
	}


	/**
	 * Sorts an array in-place using the provided compare function.
	 * @param {!Array<*>} list an array of items to sort
	 * @param {function(*,*): number} compareFn the custom compare functions. Defaults to arithmetic comparison for primitives.
	 */
	static sort(list, compareFn) {
		if (!(list && list.length > 1)) {
			console.error("Nothing to sort!");
			return;
		}

		this.insertionSort(list, 0, list.length-1, compareFn);
	}
}

module.exports = InsertionSort;
