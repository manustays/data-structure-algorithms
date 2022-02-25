/**
 * A Quick-Union implementation with the following enhancements:
 * 1. Weighted Quick-Union: to avoid tall trees
 * 2. Quick-Union with Path Compression: to reduce node-travel
 */


class WeightedQuickUnionUF {

	/**
	 * Generates a UnionFind data-structure os length `size`
	 * @param {*} size The number of nodes in the UnionFind structure.
	 */
	constructor(size) {
		this.id_ = new Array(size);
		this.size_ = new Array(size);

		// Set id of each node to itself & the size to 1.
		for (let i=0; i < size; i++) {
			this.id_[i] = i;
			this.size_[i] = 1;
		}
	}

	/**
	 * Check if it is a valid node
	 * @param {Number} i The node to check
	 * @returns {Boolean}
	 */
	isValid(i) {
		return (i >= 0 && i < this.id_.length) ? true : false;
	}

	/**
	 * Get the root node of a given node.
	 * @param {Number} i The given node
	 * @returns {Number} The root node
	 */
	root(i) {
		if (!this.isValid(i)) {
			return -1;
		}

		while (i !== this.id_[i]) {
			this.id_[i] = this.id_[this.id_[i]];	// One-pass path compression
			i = this.id_[i];						// Goto root node
		}
		return i;
	}

	/**
	 * Check whether the nodes `p` & `q` are connected.
	 * @param {Number} p First node
	 * @param {Number} q Second node
	 * @returns {Boolean} True if p & q are connected; false otherwise.
	 */
	connected(p, q) {
		return this.root(p) === this.root(q);
	}

	/**
	 * Perform a union of nodes p & q.
	 * @param {Number} p The first node.
	 * @param {Number} q The second node.
	 */
	union(p, q) {
		if (!(this.isValid(p) && this.isValid(q))) {
			return false;
		}

		let proot = this.id_[p];
		let qroot = this.id_[q];

		// Change the root of the smaller tree to point to the root of teh larger tree
		if (this.size_[proot] < this.size_[qroot]) {
			this.id_[proot] = qroot;
			this.size_[qroot] += 1;
		} else {
			this.id_[qroot] = proot;
			this.size_[proot] += 1;
		}
	}

	/**
	 * Print the unions
	 */
	print() {
		var tmp = {};

		this.id_.forEach((p, i) => {
			let r = this.root(i);
			if (r in tmp) {
				tmp[r].push(i);
			} else {
				tmp[r] = [i]
			}
		});

		let out = "";
		for (let i in tmp) {
			out += (out && ' ') + "(" + tmp[i] + ")";
		}

		console.log(out);
	}
}

module.exports = { WeightedQuickUnionUF };