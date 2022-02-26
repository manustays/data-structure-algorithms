/**
 * Utility base class with common static functions used in other sorting algorithms or for testing
 */

class Sortable {

	/**
	 * Compare if `a` is less than `b` using a custom compare function (if provided)
	 * @param {*} a
	 * @param {*} b
	 * @param {function(*,*): number} compareFn The custom compare function.
	 * @returns {Boolean} true, if `a` is less than `b`
	 */
	static less(a, b, compareFn) {
		compareFn = compareFn || function (a, b) {
			return a < b ? -1 :
				a > b ? 1 :
					0;
		}
		return compareFn(a, b) < 0;
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
			if (this.less(list[i+1], list[i], compareFn)) {
				return false;
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
