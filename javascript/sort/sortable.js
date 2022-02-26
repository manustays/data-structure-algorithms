/**
 * Utility base class with common static functions used in other sorting algorithms or for testing
 */

class Sortable {

	/**
	 * Compare if `a` is less than `b` using a custom compare function (if provided)
	 * @param {*} a
	 * @param {*} b
	 * @param {*} compareFn The custom compare function.
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
	 * @param {*} a The first index to exchange
	 * @param {*} b The second array index to exchange
	 */
	static exch(list, i, j) {
		let tmp = list[i];
		list[i] = list[j];
		list[j] = tmp;
	}


	static sorted(arr, lo, hi, compareFn) {
		for (; lo<hi; lo++) {
			if (!this.less(arr[lo], arr[lo+1], compareFn)) {
				return false;
			}
		}
		return true;
	}

}

module.exports = Sortable;
