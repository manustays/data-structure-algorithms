package union_find.test;

import union_find.WeightedQuickUnionUF;

public class test_main {
    public static void main (String[] args) {
        WeightedQuickUnionUF uf = new WeightedQuickUnionUF(10);
        System.out.println("Created UF of size 10");

        uf.union(0, 3);
        uf.union(0, 5);
        uf.union(4, 8);
        uf.union(4, 6);
        uf.union(4, 7);

		uf.print();
        System.out.println("3 & 5 connected? " + uf.connected(3, 5));
        System.out.println("3 & 6 connected? " + uf.connected(3, 6));
    }
}
