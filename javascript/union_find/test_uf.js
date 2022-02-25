const { WeightedQuickUnionUF } = require('./weighted_quick_union_uf.js');

let uf = new WeightedQuickUnionUF(10);

uf.union(4,3);
uf.union(3,8);
uf.union(6,5);
uf.union(9,4);
uf.union(2,1);
uf.union(8,9);

uf.print();

console.log("3, 9 connected? ", uf.connected(3,9));
console.log("3, 5 connected? ", uf.connected(3, 5));
