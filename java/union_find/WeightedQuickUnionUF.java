package union_find;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;


/**
 * A Quick-Union implementation with the following enhancements:
 * 1. Weighted Quick-Union: to avoid tall trees
 * 2. Quick-Union with Path Compression: to reduce node-travel
 */

public class WeightedQuickUnionUF {
    private int[] id;
    private int[] size;     // IMPROVEMENT #1: Caching size(weight) of each tree
	private int N;

    /**
     * Constructor to create a UnionFind data structure.
     * @param _N Size of the UnionFind data structure.
     */
    public WeightedQuickUnionUF(int _N)
    {
		N = _N;
        id = new int[N];
        size = new int[N];
        // Set id of each object to itself & their size to 1
        // (2*N array accesses)
        for (int i = 0; i < N; i++) {
            id[i] = i;
            size[i] = 1;
        }
    }

    /**
     * Find the root of the given node
     * @param i The given node
     * @return The root node of the given node
     */
    private int root(int i)
    {
        // chase parent pointers until root is reached (depth of array accesses)
        while (i != id[i]) {
            // IMPROVEMENT #2: Simple one-pass flattening of the tree.
            // This keeps the tree completely flat for faster root finding.
            id[i] = id[id[i]];
            i = id[i];
        }
        return i;
    }

    /**
     * Check whether the nodes `p` & `q` are connected
     * @param p First node
     * @param q Second node
     * @return true if p & q are connected; false otherwise.
     */
    public boolean connected (int p, int q)
    {
        // check whether p and q have same root (depth of p and q array accesses)
        return root(p) == root(q);
    }

    /**
     * Perform a union of nodes p & q by connecting these nodes
     * @param p First node
     * @param q Second node
     */
    public void union (int p, int q)
    {
        int proot = root(p);
        int qroot = root(q);
        // IMPROVEMENT #1:
        // change root of smaller tree to point to root of the larger tree (depth of p and q array accesses)
        if (size[proot] < size[qroot]) {
            id[proot] = qroot;
            size[qroot] += size[proot];
        } else {
            id[qroot] = proot;
            size[proot] += size[qroot];
        }
    }

	/**
	 * Print the UnionFind sets
	 */
	public void print()
	{
		Map<Integer, List<Integer>> map = new HashMap<Integer, List<Integer>>();
		for (int i = 0; i < N; i++) {
			int root = root(i);
			map.putIfAbsent(root, new ArrayList<Integer>());
			map.get(root).add(i);
		}

		System.out.println("Union-find sets: ");
		String _out = "";
		for (Entry<Integer, List<Integer>> ee : map.entrySet()) {
			int key = ee.getKey();
			List<Integer> values = ee.getValue();
			_out += (_out.length() > 0 ? " " : "") + "(" + key;
			for (int i = 0; i < values.size(); i++)
				if (values.get(i) != key)
					_out += (", " + values.get(i));
			_out += ")";
		}

		System.out.println(_out);
	}
}
