/**
 * Utility base class with common utility functions for Array-based sorting algorithms
 */

class Sortable {

	/**
	 * Compare two elements in an array to check whether
	 * the first element is smaller than the second element
	 * using a custom compare function (if provided).
	 * @param {!Array<*>} list The array of the elements to compare.
	 * @param {*} i Index of first element.
	 * @param {*} j Index of second element.
	 * @param {function(*,*): number} compareFn The custom compare function.
	 * @returns {Boolean} true, if the first element is less than the second element.
	 */
	static less(list, i, j, compareFn) {
		compareFn = compareFn || function (a, b) {
			return a < b ? -1 :
				a > b ? 1 :
					0;
		}
		return compareFn(list[i], list[j]) < 0;
	}


	/**
	 * Exchanges two values in an array.
	 * @param {!Array} list The array
	 * @param {number} a The first index to exchange
	 * @param {number} b The second array index to exchange
	 */
	static exch(list, i, j) {
		let tmp = list[i];
		list[i] = list[j];
		list[j] = tmp;
	}


	/**
	 * Checks if a subarray is sorted.
	 * @param {!Array<*>} list
	 * @param {number} lo
	 * @param {number} hi
	 * @param {function(*,*): number} compareFn
	 * @returns {boolean} true, if the array is sorted.
	 */
	static isSubArraySorted(list, lo, hi, compareFn) {
		for (let i = lo; i < hi; i++) {
			if (this.less(list, i+1, i, compareFn)) {
				return false;	// If next element is smaller, the array is not sorted
			}
		}
		return true;
	}

	/**
	 * Checks if an array is sorted.
	 * @param {!Array<*>} list
	 * @param {function(*,*): number} compareFn
	 * @returns {boolean} true, if the array is sorted.
	 */
	static isSorted(list, compareFn) {
		return this.isSubArraySorted(list, 0, list.length-1, compareFn);
	}

}

module.exports = Sortable;
