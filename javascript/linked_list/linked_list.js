/**
 * The data structure for a single node of a singly-linked-list.
 * Contains pointers to the next and the previous nodes.
 */
class Node {

	constructor(data) {
		/** @package {*} The data/value of the node */
		this.data = data;

		/** @package {!Node} Link to the next node */
		this.next = null;
	}
}


/**
 * The singly-linked list implementation
 */
class LinkedList {

	constructor() {
		this.head = null;
		this.length_ = 0;
	}

	get length() {
		return this.length_;
	}

	/**
	 * Insert a node at the beginning of the list
	 * @param {*} data
	 */
	push(data) {
		let newNode = new Node(data);	// Create the new node
		newNode.next = this.head;		// Push the new node to the beginning of the list
		this.head = newNode;			// Mark the new node as the head of the list
		this.length_ += 1;
	}

	/**
	 * Remove & return the node at the beginning of the list
	 * @param {*} data
	 * @returns {!Node} the deleted node or null (if not found)
	 */
	pop() {
		if (!this.head) {
			return null;
		}
		let node = this.head;
		this.head = this.head.next;
		return node;
	}

	/**
	 * Insert a node after a given `prevNode`
	 * @param {*} prevNode
	 * @param {*} data
	 */
	insertAfter(prevNode, data) {
		if (!prevNode) {
			return;
		}

		let newNode = new Node(data);	// Create the new node
		newNode.next = prevNode.next;	// Mark the next of the new node as the next of previous node
		prevNode.next = newNode;		// Mark the next of the previous node as the new node

		this.length_ += 1;
	}

	/**
	 * Insert a new node at the end of the list
	 * @param {*} data
	 */
	append(data) {
		// Create the new node
		let newNode = new Node(data);

		// If the list is empty, set the new node as the head
		if (this.head === null) {
			this.head = newNode;
			this.length_ = 1;
			return;
		}

		// Else, traverse to the end of the tree to add the new node.
		let lastNode = this.head;
		while (lastNode.next) {
			lastNode = lastNode.next;
		}

		// Add the new node at the end.
		lastNode.next = newNode;

		this.length_ += 1;
	}

	/**
	 * Delete a node with the given `data`
	 * @param {*} data
	 * @returns {!Node} the deleted node or null (if not found)
	 */
	delete(data) {
		let prevNode = null;
		let node = this.head;

		// Iterate over the list until the node to be deleted is found
		while (node) {
			if (node.data === data) {
				// This is the node to be deleted
				if (prevNode === null) {
					// Node to be deleted is the head node.
					// Set the next node as the head node.
					this.head = node.next;
				} else {
					// Connect the previous node to the next node;
					// effectively removing the current node from the list.
					prevNode.next = node.next;
				}

				this.length_ -= 1;
				return node;
			}

			prevNode = node;
			node = node.next;
		}

		return null;
	}


	/**
	 * Generater function to traverse the linked-list
	 */
	* traverse() {
		let node = this.head;
		while (node) {
			yield node;
			node = node.next;
		}
	}

	/**
	 * Print the linked-list
	 */
	toString() {
		let str = '';
		for (let node of this.traverse()) {
			str += ' → ' + node.data;
		};
		return str;
	}


	/**
	 * Find a node with the given `data` using linear search
	 * @param {*} data
	 * @returns
	 */
	linearSearch(data) {
		for (let node of this.traverse()) {
			if (node.data === data) {
				return node;
			};
		};
		return null;
	}
}



module.exports = { Node, LinkedList };
