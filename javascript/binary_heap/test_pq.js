const MaxPQ = require('./priority_queue.js');
const HeapSort = require('./heap_sort.js');

let pq = new MaxPQ([4,9,12,1,8,3,76,23]);

console.log("Priority Queue created: ", pq.size());

pq.print();

while(!pq.isEmpty()) {
	console.log(pq.delMax());
	// pq.print();
}


let list = [4, 9, 12, 1, 8, 3, 76, 23];
HeapSort.sort(list);
console.log("After Heap Sort: ", list);
