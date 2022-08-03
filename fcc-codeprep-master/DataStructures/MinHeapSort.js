// https://learn.freecodecamp.org/coding-interview-prep/data-structures/implement-heap-sort-with-a-min-heap/
// Instructions: Use the max heap code and add a sort method.
// Sort method should just return an array of all the elements in the min heap sorted from smallest to largest.

// check if array is sorted
function isSorted(arr) {
  var check = (i) => (i == arr.length - 1) ? true : (arr[i] > arr[i + 1]) ? false : check(i + 1);
  return check(0);
}
// generate a randomly filled array
var array = new Array();
(function createArray(size = 5) {
  array.push(+(Math.random() * 100).toFixed(0));
  return (size > 1) ? createArray(size - 1) : undefined;
})(25);
var MinHeap = function() {

  this.heap = [];
  // change code below this line
   this.insert = (value) => {
    this.heap.push(value);
    let swapParentRecursive = (index) => {
      let parentIndex = Math.floor(((index - 1) / 2));
      //console.log('parent:'+this.heap[parentIndex])
      if (this.heap[index] < this.heap[parentIndex]) {
        //console.log('SWAP parent:'+this.heap[parentIndex] + " with:" + this.heap[index]);
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

  this.remove = () => {
    let swapWithChildRecursive = (index) => {
      // compare right and left children (with themselves if other is undefined)
      let left = this.heap[index * 2 + 1];
      let right = this.heap[index * 2 + 2];
      if (left < this.heap[index] && left <= (right !== undefined ? right : left)) {
        // swap bigger child with parent
        this.heap[index * 2 + 1] = this.heap[index];
        this.heap[index] = left;
        // keep swapping with further children if needed.
        swapWithChildRecursive(index * 2 + 1);
      } else if (right < this.heap[index] && right <= (left !== undefined ? left : right)) {
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

  this.sort = () => {
    let sorted = [];
    while (this.heap.length > 0) {
      // doesn't mention to worry about losing all the values in the minheap
      // so we'll just remove & push them.
      sorted.push(this.remove());
    }
    return sorted;
  }
  // change code above this line
};