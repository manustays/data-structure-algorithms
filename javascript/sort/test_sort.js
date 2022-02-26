const Sortable = require('./sortable.js');
const Mergesort = require('./mergesort.js');
const InsertionSort = require('./insertionsort.js');
const KnuthShuffle = require('./knuth_shuffle.js');

let arr = [5, 4, 8, 1, 3, 9, 2, 12, 0, 21];
let arr2 = [5, 4, 8, 1, 3, 9, 2, 12, 0, 21];

let rev = function (a, b) {
	return a === b ? 0 :
		a < b ? 1 :
			-1;
}

console.log("ORIGINAL ARRAY: ", Sortable.isSorted(arr), arr);

InsertionSort.sort(arr2);
console.log("\nAfter InsertionSort: ", InsertionSort.isSorted(arr2), arr2);

InsertionSort.sort(arr2, rev);
console.log("\nAfter REVERSE InsertionSort: ", InsertionSort.isSorted(arr2, rev), arr2);

KnuthShuffle.shuffle(arr2);
console.log("After Shuffle: ", InsertionSort.isSorted(arr2), arr2);

Mergesort.sort(arr);
console.log("After Mergesort: ", Mergesort.isSorted(arr), arr);

Mergesort.sort(arr, rev);
console.log("\nAfter REVERSE Mergesort: ", Mergesort.isSorted(arr, rev), arr);
