// In the next few exercises we are going to create a function to 
// emulate a data structure called a "Set".
// A Set is like an array, but it cannot contain duplicate values.
// The typical use for a Set is to simply check for the presence
// of an item.
// This can be implemented with an object, for instance:

// Part 1: https://learn.freecodecamp.org/coding-interview-prep/data-structures/create-a-set-class
// Instructions: Add to the set if the collection doesn't contain the item
// return true if added, false if not.

// Part 2: https://learn.freecodecamp.org/coding-interview-prep/data-structures/remove-from-a-set
// Instructions: Remove item from the set, true if removed, false if not removed.

// Part 3: https://learn.freecodecamp.org/coding-interview-prep/data-structures/size-of-the-set
// Instructions: this.size should return the size of the collection.

// Part 4: https://learn.freecodecamp.org/coding-interview-prep/data-structures/perform-a-union-on-two-sets
// Instructions: Perform a union on two sets using a union function.
// Method should take another set, and return the union between the two sets
// excluding any duplicate values.

// Part 5: https://learn.freecodecamp.org/coding-interview-prep/data-structures/perform-an-intersection-on-two-sets-of-data
// Instructions: Perform an intersection on 2 sets of data.
// Method called intersection on a set, takes another set,
// and return the intersection of the two sets.

// Part 6: https://learn.freecodecamp.org/coding-interview-prep/data-structures/perform-a-difference-on-two-sets-of-data
// Instructions: Perform a difference on 2 sets of data.
// Method called difference takes another Set and returns the difference
// of the two sets.

// Part 7: https://learn.freecodecamp.org/coding-interview-prep/data-structures/perform-a-subset-check-on-two-sets-of-data
// Instructions: Perform a subset test of 2 sets.
// Method called subset, which returns true if the first set is fully contained
// within the second set, otherwise returns false.

function Set() {
  // the var collection will hold our set
  var collection = [];
  // this method will check for the presence of an element and return true or false
  this.has = function(element) {
      return (collection.indexOf(element) !== -1);
  };
  // this method will return all the values in the set
  this.values = function() {
      return collection;
  };
  //Part 1: change code below this line
  this.add = element => {
    if (this.has(element)) {
      return false;
    } else {
      collection.push(element);
      return true;
    }
  }
  // change code above this line
  //Part 2: change code below this line
  this.remove = element => {
    let index = collection.indexOf(element);
    if (!this.has(element))  {
        return false;
    } else {
        collection.splice(index, 1);
        return true;
    }
  }
  // change code above this line
  //Part 3: change code below this line
  this.size = () => {
    return collection.length;
  }
  // change code above this line
  //Part 4: change code below this line
  this.union = (setB) => {
    let union = new Set();
    collection.forEach(element => {
        union.add(element);
    })
    setB.values().forEach(element => {
        union.add(element);
    })
    return union;
  }
  // change code above this line
  //Part 5 change code below this line
     this.intersection = (setB) => {
      let intersection = new Set();
      collection.forEach(element => {
          if (setB.has(element)) {
              intersection.add(element);
          }
      })
      return intersection;
  }
  // change code above this line
  //Part 6: change code below this line
  this.difference = (setB) => {
    let difference = new Set();
    collection.forEach(element => {
        if (!setB.has(element)) {
            difference.add(element);
        }
    })
    setB.values().forEach(element => {
        if (!this.has(element)) {
            difference.add(element);
        }
    })
    return difference;
  }
  // change code above this line
  //Part 7: change code below this line
  this.subset = setB => {
    collection.forEach(element => {
        if (!setB.has(element)) {
            return false;
        }
    })
    return true;
  }
  // change code above this line
}