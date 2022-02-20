/**
 * A Binary Tree implementation
 */


/**
 * The data structure for a single node of a binary tree.
 * Contains pointers to two child nodes: left & right.
 */
class TreeNode {

	constructor(value) {
		/** @param {Number} value The value of the node */
		this.value = value;

		this._left = null;			// Link to the left node (root-node of the left subtree)
		this._right = null;			// Link to the right node (root-node of the right subtree)
		this._parent = null;		// Link to the parent node
		this.meta = {};				// Additional metadata for the nodes
	}

	get isRoot() {
		return this.parent === null;
	}

	get isLeaf() {
		return this.left === null && this.right === null;
	}

	get isLeftChild() {
		return this.isRoot ? false : this.parent.left && this.parent.left.value === this.value;
	}

	get left() {
		return this._left;
	}

	set left(node) {
		this._left = node;
		if (node) {
			node.parent = this;
		}
	}

	get right() {
		return this._right;
	}

	set right(node) {
		this._right = node;
		if (node) {
			node.parent = this;
		}
	}

	get parent() {
		return this._parent;
	}

	set parent(node) {
		this._parent = node;
		// if (node === null || this._parent.left === this || this._parent.right === this) {
		// 	this._parent = node;
		// } else {
		// 	console.error("Invalid parent node: ", {this_node: this, parent: node});
		// }
	}

	get duplicates() {
		return this.meta.duplicates || 1;
	}

	addDuplicate() {
		this.meta.duplicates = (this.meta.duplicates || 1) + 1;
	}

	removeDuplicate() {
		if (this.meta.duplicates > 1) {
			this.meta.duplicates = (this.meta.duplicates || 2) - 1;
			return true;
		}

		return false;
	}

}




class BinaryTree {

	constructor() {
		this.root = null;
		this.size = 0;
	}


	/**
	 * Find the height of the tree, i.e., number of edges via the longest path between the root node and a leaf nodes.
	 *
	 * Time Complexity: O(n)
	 * @param {*} node The root node from which to calculate the height
	 * @returns The height of the tree
	 */
	height(root = this.root) {
		if (root === null) {
			return -1;
		}

		let left_height = this.height(root.left);
		let right_height = this.height(root.right);

		return (left_height > right_height ? left_height : right_height) + 1;
	}


	/**
	 * Find the depth of a node, i.e, distance from the root node.
	 * @param {*} node The node for finding the depth
	 * @returns The depth of the node
	 */
	depth(node) {
		if (!node) {
			return 0;
		}

		let depth = 0;
		while (node.parent && node.parent !== node) {
			node = node.parent;
			depth++;
		}

		return depth;
	}


	/**
	 * Delete a value from the tree
	 * @param {*} value The value to find and delete
	 * @returns true if successfully deleted
	 */
	delete(value) {
		// Find the node to delete
		const node = this.find(value);

		if (node === null) {
			return false;
		}

		const branch = node.isLeftChild ? 'left' : 'right';
		const hasBothChildren = node.left && node.right;

		if (node.duplicates > 1) {
			// Case 1: duplicate values present.
			// Just remove one duplicate from the right node.
			node.removeDuplicate();
		} else if (node.isLeaf) {
			// Case 2: node to be deleted has no children
			if (node.isRoot) {
				this.root = null;
			} else {
				node.parent[branch] = null;
			}
		} else if (!hasBothChildren) {
			// Case 3: node to be deleted has only one child
			const child = node.left || node.right;
			if (node.isRoot) {
				this.root = child;
			} else {
				node.parent[branch] = child;
			}
			child.parent = node.parent;
		} else {
			// Case 4: node to be deleted has both children
			const rightMostLeftNode = [...this.inOrderTraversal(node.left)].pop();

			// Detach the rightmost-left-node from the tree...
			const rightMostLeftNodeBranch = rightMostLeftNode.isLeftChild ? "left" : "right";
			rightMostLeftNode.parent[rightMostLeftNodeBranch] = null;
			rightMostLeftNode.parent = null;

			// Replace the node to be deleted with the rightmost-left node
			if (node.isRoot) {
				this.root = rightMostLeftNode;
			} else {
				node.parent[branch] = rightMostLeftNode;
			}
			rightMostLeftNode.parent = node.parent;
			rightMostLeftNode.left = node.left;
			rightMostLeftNode.right = node.right;
			rightMostLeftNode.left.parent = rightMostLeftNode;
			rightMostLeftNode.right.parent = rightMostLeftNode;
		}

		this.size -= 1;
		return true;
	}


	/**
	 * Delete the whole tree or a sub-tree.
	 * @param {*} node The root of the sub-tree to delete. Default = root of the tree.
	 */
	deleteTree(node = this.root) {
		// Javascript supports automatic garbage collection.
		// So, we can just set the root to null.

		if (node === null) {
			return;
		}

		const parent = node.parent;		// null for node node
		const branch = node.isLeftChild ? 'left' : 'right';
		if (parent) {
			// Delete subtree
			parent[branch] = null;
		} else {
			// Delete tree
			this.root = null;
		}
	}

	/**
	 * Delete the whole tree or a sub-tree one node at a time.
	 * @param {*} root The root of the sub-tree to delete. Default = root of the tree.
	 */
	deepDeleteTree(root = this.root) {
		const _isRoot = root.isRoot;
		for (let node of this.postOrderTraversal(root)) {
			node.left = null;
			node.right = null;
			node.parent = null;
			node.value = null;
		}

		if (_isRoot) {
			this.root = null;
		}
	}


	/**
	 * Generator function to iterate over a tree using in-order traversal (depth-first).
	 * - Traversal Order = Left SubTree --> Root Node --> Right SubTree.
	 * - Usage:
	 *   1. Gives nodes in a non-decreasing sorted order.
	 * - Time Complexity = O(n), where n is number of nodes.
	 * - Space Complexity = O(1), due to generator function.
	 * @param {*} root The root node of the sub-tree to traverse
	 */
	* inOrderTraversal(root = this.root) {
		if (root.left) yield* this.inOrderTraversal(root.left);
		yield root;
		if (root.right) yield* this.inOrderTraversal(root.right);
	}

	/**
	 * Generator function to iterate over a tree using pre-order traversal (depth-first).
	 * - Traversal Order = Root Node --> Left SubTree --> Right SubTree.
	 * - Usage:
	 *   1. To create a copy of the tree.
	 *   2. Get prefix expression on an expression tree. See [Polish Notation](http://en.wikipedia.org/wiki/Polish_notation).
	 * - Time Complexity = O(n), where n is number of nodes.
	 * - Space Complexity = O(1), due to generator function.
	 * @param {*} root The root node of the sub-tree to traverse
	 */
	* preOrderTraversal(root = this.root) {
		yield root;
		if (root.left) yield* this.preOrderTraversal(root.left);
		if (root.right) yield* this.preOrderTraversal(root.right);
	}

	/**
	 * Generator function to iterate over a tree using post-order traversal (depth-first).
	 * - Traversal Order = Left SubTree --> Right SubTree --> Root Node.
	 * - Usage:
	 *   1. To delete an entire tree (delete children before deleting the root); especially if automatic garbage collection is not available.
	 *   2. Get postfix expression on an expression tree. See [Reverse Polish Notation](http://en.wikipedia.org/wiki/Reverse_Polish_notation).
	 * - Time Complexity = O(n), where n is number of nodes.
	 * - Space Complexity = O(1), due to generator function.
	 * @param {*} root The root node of the sub-tree to traverse
	 */
	* postOrderTraversal(root = this.root) {
		if (root.left) yield* this.postOrderTraversal(root.left);
		if (root.right) yield* this.postOrderTraversal(root.right);
		yield root;
	}

	/**
	 * Generator function to iterate over a tree using level-order traversal (breadth-first).
	 * - Traversal Order = Root Node --> nodes of depth 1 (left to right) --> ...
	 * - Time Complexity = O(n), where n is number of nodes.
	 * - Space Complexity = O(n), due to the usage of queue.
	 * @param {*} root The root node of the sub-tree to traverse
	 */
	* levelOrderTraversal(root = this.root) {
		if (!root) {
			return;
		}

		let queue = [], node;
		queue.push(root);							// Queue

		while (queue.length > 0) {
			node = queue.shift();					// Dequeue
			yield node;
			if (node.left) queue.push(node.left);
			if (node.right) queue.push(node.right);
		}
	}


	printTree(tree, indent = "", last) {
		if (!this.root) {
			return;
		}

		if (!tree) {
			this.printTree(this.root, "", true);
			return;
		}

		console.log(indent + "+- " + tree.value);
		indent += last ? "   " : "|  ";

		if (tree.left) this.printTree(tree.left, indent, !tree.right);
		if (tree.right) this.printTree(tree.right, indent, true);
	}


	getInOrderNodes(root = this.root) {
		let arr = [];
		for (let node of this.inOrderTraversal(root)) {
			arr.push(node);
		}
		return arr;
	}


	getInOrderValues(root = this.root) {
		let arr = [];
		for (let node of this.inOrderTraversal(root)) {
			arr.push(node.value);
		}
		return arr;
	}


	getPreOrderValues(root = this.root) {
		let arr = [];
		for (let node of this.preOrderTraversal(root)) {
			arr.push(node.value);
		}
		return arr;
	}


	getPostOrderValues(root = this.root) {
		let arr = [];
		for (let node of this.postOrderTraversal(root)) {
			arr.push(node.value);
		}
		return arr;
	}


	getLevelOrderValues(root = this.root) {
		let arr = [];
		for (let node of this.levelOrderTraversal(root)) {
			arr.push(node.value);
		}
		return arr;
	}

};


module.exports = { BinaryTree, TreeNode };
