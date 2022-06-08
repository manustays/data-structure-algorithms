/**
 * Social Network Connectivity Example Algorithm
 *
 * Given a social network containing n members and a log file containing m timestamps at
 * which times pairs of members formed friendships, design an algorithm to determine the
 * earliest time at which all members are connected (i.e., every member is a friend of a
 * friend of a friend ... of a friend). Assume that the log file is sorted by timestamp and
 * that friendship is an equivalence relation. The running time of your algorithm should be
 * m log n or better and use extra space proportional to n.
 */

package union_find.test;

import sun.rmi.runtime.Log;
import union_find.WeightedQuickUnionUF;

class SocialNetworkConnectivity {

	/**
	 * Finds the earliest timestamp when all members are connected to each other.
	 * @param logs An an array of Log objects with three public members: first_member_id (int), second_member_id (int) & timestamp (long)
	 * @return timestamp in milliseconds when all members are connected, or zero.
	 */
	public long earliestTimeAllConnected(int member_count, Log[] logs) {

		WeightedQuickUnionUF uf = new WeightedQuickUnionUF(member_count);
		int connected_groups = member_count;

		for (log in logs) {
			if (!connected(log.first_member_id, log.second_member_id)) {
				union(log.first_member_id, log.second_member_id);
				connected_groups--;
			}

			if (connected_groups == 1) {
				// All members are connected in the same union...
				return log.timestamp;
			}
		}

		return 0;
	}

}