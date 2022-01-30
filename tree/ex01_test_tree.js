const BinarySearchTree = require("./BinarySearchTree");

function main() {

	let bst = new BinarySearchTree();

	console.log("BST created: ", bst);

	bst.add(4);
	bst.add(16);
	bst.add(2);
	bst.add(8);
	bst.add(24);
	bst.add(56);
	bst.add(23);
	bst.add(76);

	// console.log("Root: ", bst.root);
	console.log("Depth: ", bst.depth());

	console.log(bst.printTree());

	console.log("InOrder: ", bst.getInOrderValues());
	// console.log("PreOrder: ", bst.getPreOrderValues());
	// console.log("PostOrder: ", bst.getPostOrderValues());

	bst.reBalanceTree();

	console.log(bst.printTree());
	console.log("InOrder: ", bst.getInOrderValues());
}

main();
