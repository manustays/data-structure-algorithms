const Sortable = require('./sortable.js');
const KnuthShuffle = require('./knuth_shuffle.js');
const InsertionSort = require('./insertionsort.js');

/**
 * Quicksort implementation with the following improvements:
 * 1. Initial shuffle for performance guarantee and avoiding the worst-case complexity.
 * 2. Use Insertion Sort for smaller subarrays.
 * 3. Use median-of-3-samples to find optimal partition element.
 *
 * @example
 * QuickSort.sort([2,5,1,9]);
 */
class QuickSort extends Sortable {

	static CUTOFF = 8;		// cutoff to insertion sort

	/**
	 * Get median of three elements of an array
	 * @param {!Array<*>} list The array
	 * @param {number} i Index of 1st element
	 * @param {number} j Index of 2nd element
	 * @param {number} k Index of 3rd element
	 * @param {function(*,*): number} compareFn Custom comparison function
	 * @returns {number} Index of the median element
	 */
	static median3(list, i, j, k, compareFn) {
		return (this.less(list[i], list[j], compareFn) ?
			(
				this.less(list[j], list[k], compareFn) ? j :
				this.less(list[i], list[k], compareFn) ? k : i
			) :
			(
				this.less(list[k], list[j], compareFn) ? j :
				this.less(list[k], list[i], compareFn) ? k : i
			)
		);
	}


	/**
	 * Partition an array (by partial sorting) at an index such that
	 * all elements to its left are smaller and all elements to its right are larger
	 * @param {!Array<*>} list The array to partition
	 * @param {number} lo
	 * @param {number} hi
	 * @param {function(*,*): number} compareFn Custom comparison function for sorting
	 * @returns {number} The partition index
	 */
	static partition(list, lo, hi, compareFn) {

		// list[lo] is the partitioning item

		let i = lo;
		let j = hi + 1;

		while (true) {
			i++;
			j--;

			// Find item on left to swap (first item larger than the partitioning item)
			while (this.less(list[i], list[lo], compareFn)) {
				i++;
				if (i === hi) {
					break;
				}
			}

			// Find item on right to swap (last item smaller than the partitioning item)
			while (this.less(list[lo], list[j], compareFn)) {
				j--;
				if (j === lo) {
					break;
				}
			}

			// If the pointers cross, break.
			if (i >= j) {
				break;
			}

			// Swap
			this.exch(list, i, j);
		}

		// Swap with partitioning item to get the partitioning item in the middle of the array
		this.exch(list, lo, j);
		return j;
	}


	/**
	 * Quicksort a subarray
	 * @param {!Array<*>} list The array to sort
	 * @param {number} lo Start index of the subarray to sort
	 * @param {number} hi End index of the subarray to sort
	 * @param {function(*,*): number} compareFn Custom comparison function for sorting
	 * @returns
	 */
	static quickSort(list, lo, hi, compareFn) {
		if (hi <= lo + this.CUTOFF) {
			InsertionSort.insertionSort(list, lo, hi, compareFn);
			return;
		}

		// Calculate median-of-3-samples to get a more efficient partition element
		let m = this.median3(list, lo, Math.floor(lo + (hi - lo) / 2), hi, compareFn);
		// Swap it to the `lo` index to make it the default aprtition element
		this.exch(list, lo, m);

		// Find a partition element such that
		//  all elements to its left are smaller
		//  and, all elements to its right are larger
		let j = this.partition(list, lo, hi, compareFn);

		// Recursively sort the subarrays to the left and right of the partition element
		this.quickSort(list, lo, j - 1, compareFn);
		this.quickSort(list, j + 1, hi, compareFn);
	}


	/**
	 * Quicksorts an array using the provided compare function.
	 * @param {!Array<*>} list an array of items to sort
	 * @param {function(*,*): number} compareFn the custom compare functions. Defaults to arithmetic comparison for primitives.
	 */
	static sort(list, compareFn) {
		// Shuffle the array for performance guarantee (avoid worst-case complexity)
		KnuthShuffle.shuffle(list);

		// Sort the array
		this.quickSort(list, 0, list.length - 1, compareFn);
	}

}

module.exports = QuickSort;
