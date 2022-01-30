const BinarySearchTree = require("./BinarySearchTree");

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

