// https://learn.freecodecamp.org/coding-interview-prep/algorithms/inventory-update/

// Compare and update the inventory stored in a 2D array against a second 2D array
// of a fresh delivery. Update the current existing inventory item quantities
// (in arr1). If an item cannot be found, add the new item and quantity
// into the inventory array. The returned inventory array should be in
// alphabetical order by item.


function updateInventory(arr1, arr2) {
  // All inventory must be accounted for or you're fired!
  for(let i=0; i < arr2.length; i++) {
      let isNewItem = true;
      for (let j = 0; j < arr1.length; j++) {
          // update inventory if item already exists
          if (arr1[j][1] === arr2[i][1]) {
              arr1[j][0] += arr2[i][0];
              isNewItem = false;
              break;
          }
      }
      // Only add to array if it is a new item
      if (isNewItem) {
          arr1.push(arr2[i]);
      }
  }
  // Sort the array alphabetically
  arr1.sort(function(el1, el2) {
      console.log(el1);
      if (el1[1] < el2[1]) {
          return -1
      } else if (el1[1] > el2[1]) {
          return 1
      }
      return 0;
  });
  return arr1;
}
