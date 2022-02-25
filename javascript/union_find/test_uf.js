const { WeightedQuickUnionUF } = require('./weighted_quick_union_uf.js');

let uf = new WeightedQuickUnionUF(10);

uf.union(4,3);
uf.print();

uf.union(3,8);
uf.print();

uf.union(6, 5);
uf.print();

uf.union(9, 4);
uf.print();
