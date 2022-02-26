const Sortable = require('./sortable.js');
const Mergesort = require('./mergesort.js');
const InsertionSort = require('./insertionsort.js');
const KnuthShuffle = require('./knuth_shuffle.js');
const QuickSort = require('./quicksort.js');

let arr = [5, 4, 8, 1, 3, 9, 2, 12, 0, 21, 3, 8, 51, 23, 26];

let rev = function (a, b) {
	return a === b ? 0 :
		a < b ? 1 :
			-1;
}

console.log("ORIGINAL ARRAY: ", Sortable.isSorted(arr), arr);

InsertionSort.sort(arr);
console.log("\nAfter InsertionSort: ", Sortable.isSorted(arr), arr);

InsertionSort.sort(arr, rev);
console.log("\nAfter REVERSE InsertionSort: ", Sortable.isSorted(arr, rev), arr);

console.log("\n\n", '-'.repeat(50), "\n\n");

KnuthShuffle.shuffle(arr);
console.log("After Shuffle: ", Sortable.isSorted(arr), arr);

Mergesort.sort(arr);
console.log("After Mergesort: ", Sortable.isSorted(arr), arr);

Mergesort.sort(arr, rev);
console.log("\nAfter REVERSE Mergesort: ", Sortable.isSorted(arr, rev), arr);

console.log("\n\n", '-'.repeat(50), "\n\n");

KnuthShuffle.shuffle(arr);
console.log("After Shuffle: ", Sortable.isSorted(arr), arr);

QuickSort.sort(arr);
console.log("After QuickSort: ", Sortable.isSorted(arr), arr);

QuickSort.sort(arr, rev);
console.log("\nAfter REVERSE QuickSort: ", Sortable.isSorted(arr, rev), arr);
