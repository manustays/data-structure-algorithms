const BinarySearchTree = require("./binary_search_tree");

// Create BST
let bst = new BinarySearchTree();

// Add nodes
bst.add(4);
bst.add(16);
let node2 = bst.add(2);
bst.add(8);
bst.add(24);
bst.add(56);
bst.add(23);
bst.add(76);
bst.add(8);		// Duplicate
bst.add(19);
bst.add(32);
bst.add(67);

// console.log("Root: ", bst.root);

console.log("Original BST:");
bst.printTree();
console.log("Tree Height: ", bst.height());
console.log("Depth of node '2': ", bst.depth(node2));
console.log("InOrder: ", bst.getInOrderValues());
// console.log("PreOrder: ", bst.getPreOrderValues());
// console.log("PostOrder: ", bst.getPostOrderValues());

bst.reBalanceTree();

console.log("\nBalanced BST:");
bst.printTree()
console.log("Tree Height: ", bst.height());
console.log("Depth of node '2': ", bst.depth(node2));
console.log("InOrder: ", bst.getInOrderValues());
console.log("LevelOrder: ", bst.getLevelOrderValues());


console.log("\nDeleting 32: ", bst.delete(32));
bst.printTree();
console.log("\nDeleting 67: ", bst.delete(67));
bst.printTree();
console.log("\nDeleting 8 (1 duplicate): ", bst.delete(8));
bst.printTree();
console.log("\nDeleting 8: ", bst.delete(8));
bst.printTree();


// console.log("Finding node 24: ", bst.find(24));
// bst.deleteTree(bst.find(24));
// console.log("\nSub-tree (24) Deleted:");
// bst.printTree();

// bst.deepDeleteTree();
// console.log("\nTree Deep-Deleted. Root = ", bst.root);


