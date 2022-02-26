const Mergesort = require('./mergesort.js');
const InsertionSort = require('./insertionsort.js');

let arr = [5, 4, 8, 1, 3, 9, 2, 12, 0, 21];

Mergesort.sort(arr);
console.log("After Mergesort: ", Mergesort.sorted(arr), arr);

let rev = function(a,b) {
	return a === b ? 0 :
			a < b ? 1 :
			-1;
}

Mergesort.sort(arr, rev);
console.log("\nAfter REVERSE Mergesort: ", Mergesort.sorted(arr, rev), arr);

let arr2 = [5, 4, 8, 1, 3, 9, 2, 12, 0, 21];
InsertionSort.sort(arr2);
console.log("\nAfter InsertionSort: ", InsertionSort.sorted(arr2), arr2);

InsertionSort.sort(arr2, rev);
console.log("\nAfter REVERSE InsertionSort: ", InsertionSort.sorted(arr2, rev), arr2);
