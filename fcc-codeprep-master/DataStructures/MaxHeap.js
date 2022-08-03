// Part 1: https://learn.freecodecamp.org/coding-interview-prep/data-structures/insert-an-element-into-a-max-heap
// Instructions: create a max heap with an insert and print method.
// Note: Description of problem mentioned using null as the first child to ignore the index-1 for parent index.

// Part 2: https://learn.freecodecamp.org/coding-interview-prep/data-structures/remove-an-element-from-a-max-heap
// Instructions: remove an element from a max heap

var MaxHeap = function() {

  // An element's left child: i * 2 + 1
  // An element's right child: i * 2 + 2
  // An element's parent: i-1 / 2

  // Part 1: change code below this line
  this.heap = [];

  this.insert = (value) => {
    this.heap.push(value);
    let swapParentRecursive = (index) => {
      let parentIndex = Math.floor(((index - 1) / 2));
      if (this.heap[index] > this.heap[parentIndex]) {
        let val = this.heap[parentIndex];
        this.heap[parentIndex] = this.heap[index];
        this.heap[index] = val;
        swapParentRecursive(parentIndex);
      }
    }
    swapParentRecursive(this.heap.length-1);
  }

  this.print = () => {
    return this.heap;
  }
  // Part 1: change code above this line

  // Part 2: change code below this line
  this.remove = () => {
    let swapWithChildRecursive = (index) => {
      // compare right and left children (with themselves if other is undefined)
      let left = this.heap[index * 2 + 1];
      let right = this.heap[index * 2 + 2];
      if (left > this.heap[index] && left >= (right !== undefined ? right : left)) {
        // swap bigger child with parent
        this.heap[index * 2 + 1] = this.heap[index];
        this.heap[index] = left;
        // keep swapping with further children if needed.
        swapWithChildRecursive(index * 2 + 1);
      } else if (right > this.heap[index] && right >= (left !== undefined ? left : right)) {
        this.heap[index * 2 + 2] = this.heap[index];
        this.heap[index] = right;
        swapWithChildRecursive(index * 2 + 2);
      }
    }
    if (this.heap.length > 1) {
      let val = this.heap[0];
      // pop the last value.
      this.heap[0] = this.heap.pop();
      // recursively swap with larget children
      swapWithChildRecursive(0);
      // return the original biggest value.
      return val;
    } else {
      // just pop & return the only value
      return this.heap.pop();
    }
  }
  // Part 2: change code above this line
};