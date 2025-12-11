# Time Complexity Analysis

This document explains the time complexity of the algorithms used in the Student Data System.

## Search Algorithms

### Linear Search
- **Algorithm**: Iterates through the entire list of students and checks if the name or ID matches the query.
- **Time Complexity**: O(n)
  - In the worst case, it has to check every student.
- **Space Complexity**: O(1) (if we don't count the result array) or O(k) where k is the number of matches.
- **Use Case**: Used when the data is unsorted or for partial text matching (regex).

### Binary Search
- **Algorithm**: Divides the sorted list in half repeatedly to find the target ID.
- **Time Complexity**: O(log n)
  - Much faster than linear search for large datasets.
- **Prerequisite**: The list must be sorted by the key being searched (Student ID).
- **Use Case**: Used for exact ID lookups when the list is already sorted.

## Sorting Algorithms

### Insertion Sort
- **Algorithm**: Builds the sorted array one item at a time.
- **Time Complexity**: 
  - Best Case: O(n) (already sorted)
  - Average/Worst Case: O(n^2)
- **Space Complexity**: O(1) (in-place)
- **Use Case**: Efficient for small datasets or nearly sorted data.

### Merge Sort
- **Algorithm**: Recursively divides the array into halves, sorts them, and merges them back.
- **Time Complexity**: O(n log n) in all cases.
- **Space Complexity**: O(n) (requires auxiliary space for merging).
- **Use Case**: Efficient for large datasets, stable sort.

### Bubble Sort
- **Algorithm**: Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.
- **Time Complexity**: O(n^2)
- **Space Complexity**: O(1)
- **Use Case**: Educational purposes, very small datasets. Inefficient for large lists.

### Selection Sort
- **Algorithm**: Divides the input list into two parts: a sorted sublist of items which is built up from left to right at the front (left) of the list and a sublist of the remaining unsorted items that occupy the rest of the list.
- **Time Complexity**: O(n^2)
- **Space Complexity**: O(1)
- **Use Case**: Simple to implement, good when memory write is a costly operation.

### Shell Sort
- **Algorithm**: An in-place comparison sort. It can be seen as either a generalization of sorting by exchange (bubble sort) or sorting by insertion (insertion sort).
- **Time Complexity**: Depends on the gap sequence. Typically O(n^1.5) or O(n log^2 n).
- **Space Complexity**: O(1)
- **Use Case**: Medium-sized arrays, faster than simple O(n^2) sorts.

## JSON Import Operation
- **Algorithm**: Parses JSON and inserts students one by one.
- **Time Complexity**: O(m * d)
  - m: Number of students in the JSON file.
  - d: Time to insert one student (database operation).
- **Optimization**: Batch insert (insertMany) would reduce database overhead but might be harder to handle individual errors. Current implementation is sequential for better error reporting.
