/**
 * BST: Binary Search Tree implementation by extending a regular Binary Tree
 */


const { BinaryTree, TreeNode } = require('./binary_tree.js');


class BinarySearchTree extends BinaryTree {

	// constructor() {
	// 	super();
	// }


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
