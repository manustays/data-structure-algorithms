const Sortable = require('./sortable.js');

/**
 * Knuth shuffle algorithm implementation
 *
 * @example
 * KnuthShuffle.shuffle([1,2,3,4]);
 */
class KnuthShuffle extends Sortable {

	/**
	 * Generate a random number between min & max (inclusive of both min & max).
	 * @param {number} min
	 * @param {number} max
	 * @returns {number} a random number between min & max
	 */
	static random(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	/**
	 * Shuffle an array using the Knuth algorithm
	 * @param {!Array<*>} list The array to shuffle
	 */
	static shuffle(list) {
		if (!(list && list.length > 1)) {
			return;
		}

		let N = list.length;
		for (let i = 1; i < N; i++) {
			let r = this.random(0, i);	// Get a random index between 0 & i (included)
			this.exch(list, i, r);		// Exchange values at i & r
		}
	}

}

module.exports = KnuthShuffle;
