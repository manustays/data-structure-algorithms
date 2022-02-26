# Data Structures & Algorithms
Data structure algorithm implementations for learning in various programming languages

## 🗃 Project Structure
- 📂 [**javascript/**](/javascript)
  - 📂 [**union_find/**](/javascript/union_find)
    - 📄 [**weighted_quick_union_uf.js**](/javascript/union_find/weighted_quick_union_uf.js): **`UnionFind`** with improvements:
	  - ✅ Quick-Union algorithm
	  - ✅ Weighted sub-trees
	  - ✅ Path compression
  - 📂 [**sort/**](/javascript/sort)
    - 📄 [**sortable.js**](/javascript/sort/sortable.js): Base class with common utility methods for array-based sorting algorithms.
	- 📄 [**knuth_shuffle.js**](/javascript/sort/knuth_shuffle.js): **`Knuth shuffle`** algorithm for arrays.
	- 📄 [**insertionsort.js**](/javascript/sort/insertionsort.js): **`Insertion sort`** algorithm for arrays.
	- 📄 [**mergesort.js**](/javascript/sort/mergesort.js): **`Mergesort`** algorithm for arrays with improvements:
	  - ✅ Insertion Sort for smaller subarrays
	  - ✅ Stop early if already sorted
	  - 🔲 Eliminate copy of auxiliary array
	- 📄 [**quicksort.js**](/javascript/sort/quicksort.js): **`Quicksort`** algorithm for arrays with improvements:
	  - ✅ Initial shuffle for performance guarantee
	  - ✅ Insertion Sort for smaller subarrays
	  - ✅ Median-of-3-samples to find optimal partition element
  - 📂 [**linked_list/**](/javascript/linked_list)
    - 📄 [**linked_list.js**](/javascript/tree/linked_list.js): A **`singly-linked-list`** implementation.
  - 📂 [**tree/**](/javascript/tree)
    - 📄 [**binary_tree.js**](/javascript/tree/binary_tree.js): **`BinaryTree`** class implementation.
    - 📄 [**binary_search_tree.js**](/javascript/tree/binary_search_tree.js): **`BinarySearchTree`** class implementation by extending the **`BinaryTree`** class.

