// BST: Binary Search Tree

const TreeNode = require("./BinaryTreeNode");


class BinarySearchTree {

	constructor() {
		this.root = null;
		this.size = 0;
	}


	/**
	 * Find a node with the given value or the parent node under which this value should be added
	 * @param {*} value The value to find
	 * @returns An object with foundNode and parent
	 */
	_findNodeAndParent(value) {
		let foundNode = this.root;
		let parent;

		while (foundNode) {
			if (foundNode.value === value) {
				break;
			}

			parent = foundNode;
			foundNode = (value < foundNode.value ? foundNode.left : foundNode.right);
		}

		return { foundNode, parent };
	}


	/**
	 * Find a node with the given value
	 * @param {*} value The value to find
	 * @returns A node or null if not found
	 */
	find(value) {
		let { foundNode } = this._findNodeAndParent(value);
		return foundNode;
	}


	/**
	 * Find the node with the minimum value with the entire tree or in a subtree.
	 * @param {*} node The root of the subtree. Default is the root node of the entire tree.
	 * @returns The minimum value node
	 */
	minNode(node) {
		let minNode = node || this.root;

		while (minNode.left !== null) {
			minNode = minNode.left;
		}

		return minNode;
	}


	/**
	 * Find the node with the maximum value with the entire tree or in a subtree.
	 * @param {*} node The root of the subtree. Default is the root node of the entire tree.
	 * @returns The maximum value node
	 */
	maxNode(node) {
		let maxNode = node || this.root;

		while (maxNode.right !== null) {
			maxNode = maxNode.right;
		}

		return maxNode;
	}


	/**
	 * Find the height of the tree, i.e., number of edges via the longest path between the root node and a leaf nodes.
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
	 * Add a value to the tree. If the value already exists in the node,
	 * its duplicate count is increased. Otherwise, a new node is added.
	 * @param {*} value
	 * @returns The node (either new or existing) with the given value.
	 */
	add(value) {

		const node = new TreeNode(value);

		if (this.root === null) {
			this.root = node;
		} else {
			const { foundNode, parent } = this._findNodeAndParent(value);

			if (foundNode) {
				foundNode.addDuplicate();
			} else {
				if (value < parent.value) {
					parent.left = node;
				} else {
					parent.right = node;
				}
			}
		}

		this.size += 1;
		return node;
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
	 * Traversal Order = Left SubTree --> Root Node --> Right SubTree.
	 * Usage:
	 *   1. Gives nodes in a non-decreasing sorted order.
	 * Time Complexity = O(n), where n is number of nodes.
	 * Space Complexity = O(1), due to generator function.
	 * @param {*} root The root node of the sub-tree to traverse
	 */
	*inOrderTraversal(root = this.root) {
		if (root.left) yield* this.inOrderTraversal(root.left);
		yield root;
		if (root.right) yield* this.inOrderTraversal(root.right);
	}

	/**
	 * Generator function to iterate over a tree using pre-order traversal (depth-first).
	 * Traversal Order = Root Node --> Left SubTree --> Right SubTree.
	 * Usage:
	 *   1. To create a copy of the tree.
	 *   2. Get prefix expression on an expression tree. See [Polish Notation](http://en.wikipedia.org/wiki/Polish_notation).
	 * Time Complexity = O(n), where n is number of nodes.
	 * Space Complexity = O(1), due to generator function.
	 * @param {*} root The root node of the sub-tree to traverse
	 */
	*preOrderTraversal(root = this.root) {
		yield root;
		if (root.left) yield* this.preOrderTraversal(root.left);
		if (root.right) yield* this.preOrderTraversal(root.right);
	}

	/**
	 * Generator function to iterate over a tree using post-order traversal (depth-first).
	 * Traversal Order = Root Node --> Right SubTree --> Left SubTree.
	 * Usage:
	 *   1. To delete an entire tree (delete children before deleting the root); especially if automatic garbage collection is not available.
	 *   2. Get postfix expression on an expression tree. See [Reverse Polish Notation](http://en.wikipedia.org/wiki/Reverse_Polish_notation).
	 * Time Complexity = O(n), where n is number of nodes.
	 * Space Complexity = O(1), due to generator function.
	 * @param {*} root The root node of the sub-tree to traverse
	 */
	*postOrderTraversal(root = this.root) {
		if (root.left) yield* this.postOrderTraversal(root.left);
		if (root.right) yield* this.postOrderTraversal(root.right);
		yield root;
	}

	/**
	 * Generator function to iterate over a tree using level-order traversal (breadth-first).
	 * Traversal Order = Root Node --> nodes of depth 1 (left to right) --> ...
	 * Time Complexity = O(n), where n is number of nodes.
	 * Space Complexity = O(n), due to the usage of queue.
	 * @param {*} root The root node of the sub-tree to traverse
	 */
	*levelOrderTraversal(root = this.root) {
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


	/**
	 * Utility function: Build a balanced BST from sorted array of nodes.
	 * @param {*} nodes Sorted array of nodes
	 * @param {*} start Start index of nodes array
	 * @param {*} end End index of nodes array
	 * @returns A new balanced BST
	 */
	_buildBSTFromNodes(nodes, start, end) {
		// base case
		if (start > end)
			return null;

		// Get the middle element and make it root
		let mid = parseInt((start + end) / 2, 10);
		let node = nodes[mid];
		node.parent = null;

		// Using nodes from the InOrder traversal array (sorted order),
		// construct the left and right subtrees
		node.left = this._buildBSTFromNodes(nodes, start, mid - 1);
		node.right = this._buildBSTFromNodes(nodes, mid + 1, end);

		if (node.left) node.left.parent = node;
		if (node.right) node.right.parent = node;

		return node;
	}


	/**
	 * Balance a (sub)tree
	 * Complexity: O(n)
	 * @param {*} node The previous root node of the (sub)tree
	 * @returns root node of the balanced tree
	 */
	getBalancedSubTree(node = this.root) {
		let nodes = this.getInOrderNodes(node);
		return this._buildBSTFromNodes(nodes, 0, nodes.length - 1);
	}


	/**
	 * Rebalance the tree (reduce to minimum depth)
	 */
	reBalanceTree() {
		this.root = this.getBalancedSubTree(this.root);
	}

};


module.exports = BinarySearchTree;
