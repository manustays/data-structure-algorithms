
class TreeNode {

	constructor(value) {
		this._value = value;
		this._left = null;			// Left node
		this._right = null;			// Right node
		this._parent = null;		// Parent node
		this.meta = {};				// Additional metadata for the nodes
	}

	get isRoot() {
		return this.parent === null;
	}

	get isLeaf() {
		return this.left === null && this.right === null;
	}

	get isLeftChild() {
		return this.isRoot ? false : this.parent.left.value === this.value;
	}

	get value() {
		return this._value;
	}

	set value(value) {
		this._value = value;
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


module.exports = TreeNode;
