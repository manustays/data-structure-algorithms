const { LinkedList } = require("./linked_list.js");

let list = new LinkedList();

// Create list: 2, 4, 6, 8, 10
list.append(6);
list.append(8);
list.append(10);
list.push(4);
list.push(2);

// Print list
console.log("Initial List: ", list.toString());


// Find node '6'
let node6 = list.linearSearch(6);
console.log("Searching for 6: ", node6 ? "Found" : "Not Found");

list.insertAfter(node6, 7);
console.log("Inserted 7 after node-6: ", list.toString());

list.delete(7);
console.log("After deleting 7: ", list.toString());

list.delete(2);
console.log("After deleting 2: ", list.toString());

console.log("List length: ", list.length);
