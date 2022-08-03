// https://learn.freecodecamp.org/coding-interview-prep/data-structures/create-and-add-to-sets-in-es6
// Now using ES6 built-in Set data structure.
// Create a set:
function checkSet() {
  var set = new Set([1, 2, 3, 3, 2, 1, 2, 3, 1]);
  // change code below this line
  set = new Set([1, 2, 3, 'Taco', 'Cat', 'Awesome'])
  // change code above this line
  console.log(set);
  return set;
}

checkSet();

// https://learn.freecodecamp.org/coding-interview-prep/data-structures/remove-items-from-a-set-in-es6
// Remove elements from set:
function checkSet(){
  var set = new Set([1,2,3,4,5]);//Create a set with values 1, 2, 3, 4, & 5
  //Remove the value 2
  set.delete(2);
  //Remove the value 5
  set.delete(5);
  //Return the set
  return set;
}

// https://learn.freecodecamp.org/coding-interview-prep/data-structures/use--has-and--size-on-an-es6-set
// Check if set has an element..
function checkSet(arrToBeSet, checkValue){
  // change code below this line
   var set = new Set(arrToBeSet);
   return set.has(checkValue);
  // change code above this line
}

// https://learn.freecodecamp.org/coding-interview-prep/data-structures/use-spread-and-notes-for-es5-set-integration
// Use spread and notes for ES5 Set() integration
// Return array from a set using the spread operator.
function checkSet(set){
  // change code below this line
   var arr = [...set];
   return arr;
  // change code above this line
}