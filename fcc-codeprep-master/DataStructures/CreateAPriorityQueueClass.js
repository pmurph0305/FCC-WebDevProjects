// https://learn.freecodecamp.org/coding-interview-prep/data-structures/create-a-priority-queue-class

// We’ve started writing a PriorityQueue in the code editor.
// You will need to add an enqueue method for adding items with a priority,
// a dequeue method for removing items,
// a size method to return the number of items in the queue,
// a front method to return the element at the front of the queue,
// and finally an isEmpty method that will return true if the queue is empty
// or false if it is not.

// The enqueue should accept items with the format shown above (['human', 1])
// where 1 represents the priority. The dequeue should return only the current item,
// not its priority.

function PriorityQueue () {
  this.collection = [];
  this.printCollection = function() {
    console.log(this.collection);
  };
  // Only change code below this line
  this.enqueue = function(item) {
      for(let i=0; i< this.collection.length; i++) {
          if (this.collection[i][1] > item[1]) {
              this.collection.splice(i, 0, item);
              return;
          }
      }
      this.collection.push(item);
  }

  this.dequeue = function() {
      return this.collection.shift()[0];
  }

  this.size = function() {
      return this.collection.length;
  }

  this.front = function() {
      return this.collection[0];
  }

  this.isEmpty = function() {
      return this.collection.length === 0 ? true : false;
  }
  // Only change code above this line
}