// https://learn.freecodecamp.org/coding-interview-prep/algorithms/find-the-symmetric-difference/

// Create a function that takes two or more arrays and returns an array
// of the symmetric difference (△ or ⊕) of the provided arrays.

// Given two sets (for example set A = {1, 2, 3} and set B = {2, 3, 4}),
// the mathematical term "symmetric difference" of two sets is the set of elements
// are in either of the two sets, but not in both (A △ B = C = {1, 4}).
// For every additional symmetric difference you take (say on a set D = {2, 3}),
// you should get the set with elements which are in either of the two the
// sets but not both (C △ D = {1, 4} △ {2, 3} = {1, 2, 3, 4}).
// The resulting array must contain only unique values (no duplicates).

function sym(args) {
  // First sym 2 arrays so we don't sym with an empty array 
  // in the sym arrays function.
  let sym = symArrays(arguments[0], arguments[1]);
  // Then sym all the other arrays using the previous sym'd array.
  for(let i = 2; i < arguments.length; i++) {
    sym = symArrays(sym, arguments[i]);
  }
  sym.sort();
  console.log(sym);
  return sym;
}

function symArrays(args) {
  let sym = [];
  for(let i = 0; i < arguments[0].length; i++) {
    // Only add unique elements between the arrays, and items already added to the sym array.
    if (!arguments[1].includes(arguments[0][i]) && !sym.includes(arguments[0][i])) {
      sym.push(arguments[0][i]);
    }
  }

  for (let i = 0; i < arguments[1].length; i++) {
    if (!arguments[0].includes(arguments[1][i]) && !sym.includes(arguments[1][i])) {
      sym.push(arguments[1][i]);
    }
  }
  return sym;
}